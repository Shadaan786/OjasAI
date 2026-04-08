import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "./MyMeetings.css";

const statusLabels = {
  booked: "Booked",
  waiting_for_doctor: "Doctor notified",
  in_progress: "In progress",
  completed: "Completed",
};

function MyMeetings() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const [activeReminderAppointmentId, setActiveReminderAppointmentId] = useState("");
  const [notifiedInSession, setNotifiedInSession] = useState({});

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("Please login first to view your scheduled meetings.");
      return;
    }

    const meetingsQuery = query(
      collection(db, "appointments"),
      where("patientId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      meetingsQuery,
      (snapshot) => {
        const records = snapshot.docs
          .map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
          .sort((a, b) => {
            const left = new Date(a.appointmentDate || a.time || 0).getTime();
            const right = new Date(b.appointmentDate || b.time || 0).getTime();
            return left - right;
          });

        setAppointments(records);
        setLoading(false);
      },
      () => {
        setError("Unable to fetch your meetings right now.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const upcomingMeetings = useMemo(
    () => appointments.filter((item) => item.status !== "completed"),
    [appointments]
  );

  const ringBell = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const bell = (start) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.34);
      };

      bell(now);
      bell(now + 0.4);
      setTimeout(() => {
        ctx.close();
      }, 1200);
    } catch (audioError) {
      console.error("Unable to ring reminder bell:", audioError);
    }
  };

  useEffect(() => {
    if (!appointments.length) return;

    const interval = setInterval(async () => {
      const nowMs = Date.now();
      const reminders = appointments.filter((item) => {
        if (item.status === "completed") return false;
        const appointmentMs = new Date(item.appointmentDate || item.time || "").getTime();
        if (Number.isNaN(appointmentMs)) return false;
        const diffMs = appointmentMs - nowMs;
        const isWithinReminderWindow = diffMs <= 15 * 60 * 1000 && diffMs > 0;
        const alreadyReminded =
          item.patientReminderSentAt ||
          item.doctorReminderSentAt ||
          notifiedInSession[item.id];

        return isWithinReminderWindow && !alreadyReminded;
      });

      for (const appointment of reminders) {
        setReminderMessage(
          `Reminder: Your meeting with ${appointment.doctorName || "doctor"} starts in about 15 minutes.`
        );
        setActiveReminderAppointmentId(appointment.id);
        ringBell();
        setNotifiedInSession((prev) => ({ ...prev, [appointment.id]: true }));

        try {
          await updateDoc(doc(db, "appointments", appointment.id), {
            patientReminderSentAt: new Date(),
            doctorReminderSentAt: new Date(),
            doctorNotified: true,
          });
        } catch (reminderError) {
          console.error("Failed to store appointment reminder state:", reminderError);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [appointments, notifiedInSession]);

  const canJoinMeeting = (appointment) => {
    const appointmentMs = new Date(appointment.appointmentDate || appointment.time || "").getTime();
    if (Number.isNaN(appointmentMs) || appointment.status === "completed") return false;
    return appointmentMs - Date.now() <= 15 * 60 * 1000;
  };

  return (
    <div className="my-meetings">
      <header className="my-meetings__header">
        <h1>My Appointments</h1>
        <p>Track your booked appointments and join meetings from one place.</p>
        {location.state?.bookingSuccessMessage && (
          <p className="my-meetings__state success">
            {location.state.bookingSuccessMessage}
          </p>
        )}
        {reminderMessage && (
          <div className="my-meetings__bell-alert" role="alert">
            <span className="bell-icon">🔔</span>
            <div>
              <p>{reminderMessage}</p>
              <small>
                Join button is now enabled for your upcoming appointment.
              </small>
            </div>
          </div>
        )}
        <button type="button" onClick={() => navigate("/consult")}>
          Book another consultation
        </button>
      </header>

      {loading && <p className="my-meetings__state">Loading meetings...</p>}
      {error && <p className="my-meetings__state error">{error}</p>}

      {!loading && !error && upcomingMeetings.length === 0 && (
        <article className="my-meetings__card">
          <h2>No scheduled meetings</h2>
          <p>Your upcoming appointments will show here after booking.</p>
        </article>
      )}

      <section className="my-meetings__grid">
        {upcomingMeetings.map((appointment) => (
          <article key={appointment.id} className="my-meetings__card">
            <div className="my-meetings__top">
              <h2>{appointment.doctorName || "Doctor Consultation"}</h2>
              <span className={`chip chip-${appointment.status}`}>
                {statusLabels[appointment.status] || appointment.status}
              </span>
            </div>

            <p>
              <strong>Specialty:</strong>{" "}
              {appointment.doctorSpecialty || "General"}
            </p>
            <p>
              <strong>Schedule:</strong>{" "}
              {appointment.time || appointment.appointmentDate || "N/A"}
            </p>
            <p>
              <strong>Room ID:</strong> {appointment.roomId || "N/A"}
            </p>

            <div className="my-meetings__actions">
              <button
                type="button"
                onClick={() => navigate(`/call/${appointment.roomId}`)}
                disabled={!appointment.roomId || !canJoinMeeting(appointment)}
              >
                Join Meeting
              </button>
              {!canJoinMeeting(appointment) && (
                <small>
                  Join is enabled in the last 15 minutes before the appointment.
                </small>
              )}
              {activeReminderAppointmentId === appointment.id && (
                <small className="reminder-badge">🔔 Reminder active</small>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default MyMeetings;

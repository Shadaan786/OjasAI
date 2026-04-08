import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  collection,
  onSnapshot,
  query,
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
  const user = auth.currentUser;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="my-meetings">
      <header className="my-meetings__header">
        <h1>My Scheduled Meetings</h1>
        <p>Track your booked appointments and join meetings from one place.</p>
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
                disabled={!appointment.roomId}
              >
                Join Meeting
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default MyMeetings;

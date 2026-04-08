import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import "./DoctorPortal.css";

const activeStatuses = ["booked", "waiting_for_doctor", "in_progress"];
const doctorEmailToIdMap = {
  "drsinghania@ojasai.com": "derma123",
  "drsharma@ojasai.com": "ent123",
  "drpatel@ojasai.com": "ortho123",
  "drkumar@ojasai.com": "dental123",
};

const statusLabels = {
  booked: "Booked",
  waiting_for_doctor: "Patient is waiting",
  in_progress: "In progress",
  completed: "Completed",
};

function DoctorPortal() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const doctorName = useMemo(() => {
    const email = localStorage.getItem("ojasai_user_email");
    if (!email) return "Doctor";

    const label = email.split("@")[0]?.replace(/[._-]/g, " ") ?? "Doctor";

    return label
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  const selectedDoctorId = useMemo(() => {
    const email = (localStorage.getItem("ojasai_user_email") || "").toLowerCase();
    return doctorEmailToIdMap[email] || null;
  }, []);

  useEffect(() => {
    const appointmentsQuery = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      appointmentsQuery,
      (snapshot) => {
        const records = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        const filteredRecords = selectedDoctorId
          ? records.filter((item) => item.doctorId === selectedDoctorId)
          : records;

        setAppointments(filteredRecords);
        setLoading(false);
      },
      (firestoreError) => {
        setError("Unable to fetch doctor notifications right now.");
        setLoading(false);
        console.error(firestoreError);
      }
    );

    return () => unsubscribe();
  }, [selectedDoctorId]);

  const waitingCount = appointments.filter(
    (item) => item.status === "waiting_for_doctor"
  ).length;
  const scheduledNotificationCount = appointments.filter(
    (item) => item.status === "booked" && item.doctorNotified
  ).length;

  const activeAppointments = appointments.filter((item) =>
    activeStatuses.includes(item.status)
  );

  const joinMeeting = async (appointment) => {
    try {
      await updateDoc(doc(db, "appointments", appointment.id), {
        status: "in_progress",
        joinedByDoctorAt: new Date(),
      });

      navigate(`/call/${appointment.roomId}`);
    } catch (joinError) {
      setError("Unable to join this meeting right now.");
      console.error(joinError);
    }
  };

  const markCompleted = async (appointmentId) => {
    try {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: "completed",
        completedAt: new Date(),
      });
    } catch (completionError) {
      setError("Unable to update appointment status. Please retry.");
      console.error(completionError);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (logoutError) {
      console.error(logoutError);
    } finally {
      localStorage.removeItem("ojasai_user_email");
      navigate("/");
    }
  };

  return (
    <div className="doctor-portal">
      <header className="doctor-portal__header">
        <div>
          <p className="doctor-portal__eyebrow">OjasAI Doctor Workspace</p>
          <h1>Welcome, Dr. {doctorName}</h1>
          <p>
            Patients who start meetings appear here instantly so you can join
            quickly.
          </p>
        </div>

        <div className="doctor-portal__actions">
          <div className="doctor-notice-badge" aria-live="polite">
            🔔 {waitingCount} waiting now
          </div>
          <div className="doctor-notice-badge" aria-live="polite">
            📅 {scheduledNotificationCount} scheduled alerts
          </div>

          <button
            type="button"
            className="doctor-portal__logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {error && <p className="doctor-error">{error}</p>}

      <section className="doctor-portal__footer-card">
        <h3>Live consultation queue</h3>
        <p>
          When patients open the meeting room, their status becomes
          "Patient is waiting" and you can join in one click.
        </p>
      </section>

      <section className="doctor-portal__grid">
        {loading && <p>Loading appointments...</p>}

        {!loading && activeAppointments.length === 0 && (
          <article className="doctor-card">
            <h2>No active appointments</h2>
            <p>New bookings and meeting requests will appear here automatically.</p>
          </article>
        )}

        {!loading &&
          activeAppointments.map((appointment) => (
            <article key={appointment.id} className="doctor-card">
              <div className="doctor-card__top">
                <h2>{appointment.doctorSpecialty || "General"} Consultation</h2>
                <span className={`status-chip status-${appointment.status}`}>
                  {statusLabels[appointment.status] || appointment.status}
                </span>
              </div>

              <p>
                <strong>Patient:</strong>{" "}
                {appointment.patientEmail || appointment.patientId || "N/A"}
              </p>

              <p>
                <strong>Doctor:</strong>{" "}
                {appointment.doctorName || "Assigned doctor"}
              </p>

              <p>
                <strong>Schedule:</strong> {appointment.time || "Immediate"}
              </p>

              <p>
                <strong>Room:</strong> {appointment.roomId || "N/A"}
              </p>

              <div className="doctor-card__actions">
                <button
                  type="button"
                  onClick={() => joinMeeting(appointment)}
                  disabled={!appointment.roomId}
                >
                  Join Meeting
                </button>

                <button
                  type="button"
                  className="secondary"
                  onClick={() => markCompleted(appointment.id)}
                >
                  Mark Complete
                </button>
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}

export default DoctorPortal;

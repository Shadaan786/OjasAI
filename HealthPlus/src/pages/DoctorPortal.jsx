import { useMemo } from "react";
import { useNavigate } from "react-router";
import "./DoctorPortal.css";

const quickActions = [
  {
    title: "Today's Queue",
    description: "Review waiting patients and prioritize urgent consultations.",
    icon: "🩺",
  },
  {
    title: "Start Video Call",
    description: "Begin a secure telemedicine call from your doctor console.",
    icon: "🎥",
  },
  {
    title: "Patient Notes",
    description: "Write observations, diagnosis, and treatment plans.",
    icon: "📝",
  },
];

function DoctorPortal() {
  const navigate = useNavigate();

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

  return (
    <div className="doctor-portal">
      <header className="doctor-portal__header">
        <div>
          <p className="doctor-portal__eyebrow">OjasAI Doctor Workspace</p>
          <h1>Welcome, Dr. {doctorName}</h1>
          <p>Manage consultations, records, and follow-ups from one secure dashboard.</p>
        </div>
        <button
          type="button"
          className="doctor-portal__logout"
          onClick={() => {
            localStorage.removeItem("ojasai_user_email");
            navigate("/");
          }}
        >
          Logout
        </button>
      </header>

      <section className="doctor-portal__grid">
        {quickActions.map((action) => (
          <article key={action.title} className="doctor-card">
            <span className="doctor-card__icon" aria-hidden="true">
              {action.icon}
            </span>
            <h2>{action.title}</h2>
            <p>{action.description}</p>
          </article>
        ))}
      </section>

      <section className="doctor-portal__footer-card">
        <h3>Tip</h3>
        <p>
          Use this role-based login to separate provider access from patient journeys. You can
          integrate Firebase custom claims later for stronger role enforcement.
        </p>
      </section>
    </div>
  );
}

export default DoctorPortal;

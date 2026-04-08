import React, { useState } from "react";
import { useNavigate } from "react-router";
import { bookAppointment } from "../bookAppointment";
import "./Dental.css";
// import DentalImage from "../assets/Dental.jpg"; 
import { useTranslation } from "react-i18next";

function Dental() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [doctorInfo] = useState({
    name: "Dr. Kumar",
    specialty: t("dentalSpecialist"),
    experience: "10+ years",
    rating: 4.8,
    consultationFee: "₹30.00"
  });

  const timeSlots = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "14:00","14:30","15:00","15:30","16:00","16:30"
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert(t("selectDateTimeAlert"));
      return;
    }

    setLoading(true);
    try {
      const appointmentDateTime = `${selectedDate} ${selectedTime}`;
      const roomId = await bookAppointment("dental123", appointmentDateTime);
      console.log("Appointment booked:", roomId);
      navigate(`/call/${roomId}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="dental-container">
      <div className="dental-card">
        {/* Header */}
        <div className="dental-header">
          <div className="doctor-avatar">
            {/* <img src={DentalImage} alt={doctorInfo.name} className="doctor-image" /> */}
          </div>
          <div className="doctor-info">
            <h1>{doctorInfo.name}</h1>
            <p className="specialty">{doctorInfo.specialty}</p>
            <div className="doctor-details">
              <span className="experience">⭐ {doctorInfo.rating} • {doctorInfo.experience}</span>
              <span className="fee">💰 {doctorInfo.consultationFee}</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">
          <h3>{t("aboutDoctor", { name: doctorInfo.name })}</h3>
          <p>{t("dentalDoctorDescription")}</p>

          <div className="specialties">
            <h4>{t("specialties")}</h4>
            <div className="specialty-tags">
              <span className="tag">{t("teethCleaning")}</span>
              <span className="tag">{t("rootCanal")}</span>
              <span className="tag">{t("cosmeticDentistry")}</span>
              <span className="tag">{t("orthodontics")}</span>
              <span className="tag">{t("oralSurgery")}</span>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h3>{t("scheduleConsultation")}</h3>

          <div className="booking-form">
            <div className="form-group">
              <label htmlFor="date">{t("selectDate")}</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTomorrowDate()}
                className="date-input"
              />
            </div>

            <div className="form-group">
              <label>{t("selectTime")}</label>
              <div className="time-slots">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="consultation-details">
              <div className="detail-item">
                <span className="icon">⏱️</span>
                <span>{t("consultationDuration")}</span>
              </div>
              <div className="detail-item">
                <span className="icon">💻</span>
                <span>{t("videoSession")}</span>
              </div>
              <div className="detail-item">
                <span className="icon">📋</span>
                <span>{t("digitalPrescription")}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading || !selectedDate || !selectedTime}
              className={`book-button ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  {t("booking")}...
                </>
              ) : (
                <>
                  <span>📅</span>
                  {t("bookAppointment")} - {doctorInfo.consultationFee}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="dental-footer">
          <p>🔒 {t("secureAppointment")}</p>
          <p>📞 {t("supportAvailable")}</p>
        </div>
      </div>
    </div>
  );
}

export default Dental;

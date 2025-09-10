import React, { useState } from "react";
import { useNavigate } from "react-router";
import { bookAppointment } from "../bookAppointment";
import "./Derma.css";
import Dermat from "../assets/Dermat.jpg";

function Derma() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorInfo] = useState({
    name: "Dr. Singhania",
    specialty: "Dermatology",
    experience: "15+ years",
    rating: 4.9,
    consultationFee: "₹35.00"
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    setLoading(true);
    try {
      const appointmentDateTime = `${selectedDate} ${selectedTime}`;
      const roomId = await bookAppointment("derma123", appointmentDateTime);
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
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="derma-container">
      <div className="derma-card">
        {/* Header */}
        <div className="derma-header">
          <div className="doctor-avatar">
            <img src={Dermat} alt="Dr. Singhania" className="doctor-image" />
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
          <h3>About Dr. Singhania</h3>
          <p>
            Experienced dermatologist specializing in skin conditions, acne treatment, 
            anti-aging procedures, and cosmetic dermatology. Board-certified with 
            extensive experience in both medical and cosmetic dermatology.
          </p>
          
          <div className="specialties">
            <h4>Specialties:</h4>
            <div className="specialty-tags">
              <span className="tag">Acne Treatment</span>
              <span className="tag">Skin Cancer Screening</span>
              <span className="tag">Anti-Aging</span>
              <span className="tag">Cosmetic Procedures</span>
              <span className="tag">Eczema & Psoriasis</span>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h3>Schedule Your Consultation</h3>
          
          <div className="booking-form">
            <div className="form-group">
              <label htmlFor="date">Select Date:</label>
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
              <label>Select Time:</label>
              <div className="time-slots">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
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
                <span>30 minute consultation</span>
              </div>
              <div className="detail-item">
                <span className="icon">💻</span>
                <span>Video call session</span>
              </div>
              <div className="detail-item">
                <span className="icon">📋</span>
                <span>Digital prescription included</span>
              </div>
            </div>

            <button 
              onClick={handleBooking} 
              disabled={loading || !selectedDate || !selectedTime}
              className={`book-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Booking...
                </>
              ) : (
                <>
                  <span>📅</span>
                  Book Appointment - {doctorInfo.consultationFee}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="derma-footer">
          <p>🔒 Your appointment is secure and confidential</p>
          <p>📞 24/7 support available for any questions</p>
        </div>
      </div>
    </div>
  );
}

export default Derma;

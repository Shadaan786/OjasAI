import React, { useState } from "react";
import { useNavigate } from "react-router";
import { bookAppointment } from "../bookAppointment";
import "./ENT.css";
// import ENTImage from "../assets/ENT.jpg"; 

function ENT() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorInfo] = useState({
    name: "Dr. Sharma",
    specialty: "ENT Specialist",
    experience: "12+ years",
    rating: 4.8,
    consultationFee: "₹40.00"
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
      const roomId = await bookAppointment("ent123", appointmentDateTime);
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
    <div className="ent-container">
      <div className="ent-card">
        {/* Header */}
        <div className="ent-header">
          <div className="doctor-avatar">
            {/* <img src={ENTImage} alt="Dr. Sharma" className="doctor-image" /> */}
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
          <h3>About Dr. Sharma</h3>
          <p>
            Experienced ENT specialist focusing on ear, nose, and throat conditions. 
            Expert in treating hearing disorders, sinus problems, voice issues, and 
            sleep apnea. Board-certified with comprehensive experience in both medical 
            and surgical ENT treatments.
          </p>
          
          <div className="specialties">
            <h4>Specialties:</h4>
            <div className="specialty-tags">
              <span className="tag">Hearing Loss Treatment</span>
              <span className="tag">Sinus & Allergy Care</span>
              <span className="tag">Voice Disorders</span>
              <span className="tag">Sleep Apnea</span>
              <span className="tag">Throat Infections</span>
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
        <div className="ent-footer">
          <p>🔒 Your appointment is secure and confidential</p>
          <p>📞 24/7 support available for any questions</p>
        </div>
      </div>
    </div>
  );
}

export default ENT;

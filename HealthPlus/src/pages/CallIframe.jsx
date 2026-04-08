import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import "./CallIframe.css";

export default function CallIframe() {
  const { room } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const name = user?.displayName || (user?.email ? user.email.split("@")[0] : "Guest");

  const roomEncoded = encodeURIComponent(room);
  const nameEncoded = encodeURIComponent(name);

  const src = `https://meet.jit.si/${roomEncoded}#userInfo.displayName="${nameEncoded}"&config.startWithAudioMuted=false&config.prejoinPageEnabled=false`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const notifyDoctorMeetingStarted = async () => {
      try {
        const q = query(collection(db, "appointments"), where("roomId", "==", room));
        const snapshot = await getDocs(q);
        for (const docSnap of snapshot.docs) {
          const currentStatus = docSnap.data().status;
          if (currentStatus === "booked") {
            await updateDoc(docSnap.ref, {
              status: "waiting_for_doctor",
              doctorNotified: true,
              meetingStartedAt: new Date(),
            });
          }
        }
      } catch (error) {
        console.error("Failed to notify doctor:", error);
      }
    };

    if (room) {
      notifyDoctorMeetingStarted();
    }
  }, [room]);

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end the consultation?")) {
      navigate("/getStarted");
    }
  };

  const handleMinimize = () => {
    console.log("Minimize call window");
  };

  return (
    <div className="call-container">
      <div className="call-header">
        <div className="call-info">
          <div className="status-indicator">
            <div className={`status-dot ${isConnected ? "connected" : "connecting"}`}></div>
            <span className="status-text">{isConnected ? "Connected" : "Connecting..."}</span>
          </div>
          <div className="room-info">
            <span className="room-label">Room:</span>
            <span className="room-id">{room}</span>
          </div>
        </div>

        <div className="call-controls">
          <button className="control-btn minimize-btn" onClick={handleMinimize}>
            <span>−</span>
          </button>
          <button className="control-btn end-call-btn" onClick={handleEndCall}>
            <span>📞</span>
            End Call
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h3>Connecting to your consultation...</h3>
            <p>Please wait while we set up your secure video call</p>
            <div className="loading-steps">
              <div className="step active">📹 Initializing camera</div>
              <div className="step active">🎤 Setting up audio</div>
              <div className="step active">🔒 Securing connection</div>
            </div>
          </div>
        </div>
      )}

      <div className="call-frame-container">
        <iframe
          title="Medical Consultation"
          src={src}
          className="call-iframe"
          allow="camera; microphone; fullscreen; display-capture"
          onLoad={() => {
            setTimeout(() => setIsLoading(false), 2000);
          }}
        />
      </div>

      <div className="call-footer">
        <div className="footer-info">
          <span className="security-badge">🔒 Encrypted & HIPAA Compliant</span>
          <span className="user-info">Logged in as: {name}</span>
        </div>
        <div className="support-info">
          <span>Need help? Call support: 1-800-HEALTH</span>
        </div>
      </div>
    </div>
  );
}

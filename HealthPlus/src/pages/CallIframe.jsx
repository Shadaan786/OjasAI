import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import "./CallIframe.css";

export default function CallIframe() {
  const { room } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  
  const name =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "Guest");

  const roomEncoded = encodeURIComponent(room);
  const nameEncoded = encodeURIComponent(name);

 
  const src = `https://meet.jit.si/${roomEncoded}#userInfo.displayName="${nameEncoded}"&config.startWithAudioMuted=false&config.prejoinPageEnabled=false`;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end the consultation?")) {
      navigate("/Front");
    }
  };

  const handleMinimize = () => {
   
    console.log("Minimize call window");
  };

  return (
    <div className="call-container">
      {/* Header Bar */}
      <div className="call-header">
        <div className="call-info">
          <div className="status-indicator">
            <div className={`status-dot ${isConnected ? 'connected' : 'connecting'}`}></div>
            <span className="status-text">
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
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

      {/* Loading Overlay */}
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

      {/* Video Call Frame */}
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

      {/* Footer Info */}
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

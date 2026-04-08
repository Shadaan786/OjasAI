// // Create this new file for participants and chat
// import React, { useState } from 'react';

// const ParticipantsPanel = ({ participants, messages, onSendMessage, currentUser }) => {
//   const [newMessage, setNewMessage] = useState('');

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       onSendMessage(newMessage);
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="participants-panel">
//       <div className="participants-section">
//         <h3>Participants ({participants.length})</h3>
//         <div className="participants-list">
//           {participants.map(participant => (
//             <div key={participant.id} className="participant-item">
//               <div className="participant-avatar">
//                 <div className="avatar-circle">
//                   {participant.name?.charAt(0) || '?'}
//                 </div>
//                 <div className="online-indicator"></div>
//               </div>
//               <div className="participant-info">
//                 <div className="name">{participant.name}</div>
//                 <div className="specialty">{participant.specialty}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="chat-section">
//         <h3>Discussion</h3>
//         <div className="messages-container">
//           {messages.map(message => (
//             <div key={message.id} className="message-item">
//               <div className="message-header">
//                 <span className="sender-name">{message.senderName}</span>
//                 <span className="message-time">
//                   {message.timestamp?.toDate?.()?.toLocaleTimeString() || 'Just now'}
//                 </span>
//               </div>
//               <div className="message-content">{message.message}</div>
//             </div>
//           ))}
//         </div>
        
//         <form onSubmit={handleSendMessage} className="message-form">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="message-input"
//           />
//           <button type="submit" className="send-btn">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ParticipantsPanel;

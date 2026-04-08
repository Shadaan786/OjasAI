// // Create this new file with basic case presentation
// import React, { useState } from 'react';

// const CasePresentation = ({ caseData, liveSession, currentUser }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   if (!caseData) {
//     return (
//       <div className="case-presentation">
//         <p>Loading case data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="case-presentation">
//       <div className="case-tabs">
//         <button 
//           className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
//           onClick={() => setActiveTab('overview')}
//         >
//           Overview
//         </button>
//         <button 
//           className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
//           onClick={() => setActiveTab('documents')}
//         >
//           Documents
//         </button>
//       </div>

//       <div className="case-content">
//         {activeTab === 'overview' && (
//           <div className="case-overview">
//             <h3>Patient Information</h3>
//             <div className="patient-details">
//               <div className="detail-item">
//                 <span className="label">Age:</span>
//                 <span className="value">{caseData.patient?.age}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="label">Gender:</span>
//                 <span className="value">{caseData.patient?.gender}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="label">Diagnosis:</span>
//                 <span className="value">{caseData.patient?.diagnosis}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="label">Stage:</span>
//                 <span className="value">{caseData.patient?.stage}</span>
//               </div>
//             </div>
            
//             <h3>Clinical Question</h3>
//             <p className="clinical-question">{caseData.clinicalQuestion}</p>
//           </div>
//         )}

//         {activeTab === 'documents' && (
//           <div className="documents-section">
//             <h3>Case Documents</h3>
//             {caseData.documents?.length > 0 ? (
//               <div className="documents-list">
//                 {caseData.documents.map(doc => (
//                   <div key={doc.id} className="document-item">
//                     <div className="doc-icon">📄</div>
//                     <div className="doc-info">
//                       <div className="doc-name">{doc.type}</div>
//                       <div className="doc-description">{doc.description}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No documents uploaded yet.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CasePresentation;

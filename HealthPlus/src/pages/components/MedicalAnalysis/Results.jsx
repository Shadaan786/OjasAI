// // components/Results.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';

// const Results = () => {
//   const [analysis, setAnalysis] = useState(null);
//   const [analyzedImage, setAnalyzedImage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get data from localStorage
//     const storedAnalysis = localStorage.getItem('medicalAnalysis');
//     const storedImage = localStorage.getItem('analyzedImage');
    
//     if (storedAnalysis) {
//       setAnalysis(JSON.parse(storedAnalysis));
//     }
//     if (storedImage) {
//       setAnalyzedImage(storedImage);
//     }
//   }, []);

//   if (!analysis) {
//     return (
//       <div style={{ textAlign: 'center', padding: '2rem' }}>
//         <p>No analysis found. Please analyze an image first.</p>
//         <button onClick={() => navigate('/')}>Go Back</button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
//       <h2>📋 Medical Analysis Results</h2>
      
//       {analyzedImage && (
//         <div style={{ marginBottom: '2rem' }}>
//           <img 
//             src={analyzedImage} 
//             alt="Analyzed" 
//             style={{ maxWidth: '300px', borderRadius: '8px' }}
//           />
//         </div>
//       )}

//       <div style={{ 
//         backgroundColor: 'white',
//         padding: '2rem',
//         borderRadius: '12px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{ marginBottom: '1.5rem' }}>
//           <h3>🔍 Condition Identified</h3>
//           <p>{analysis.condition}</p>
//         </div>

//         <div style={{ marginBottom: '1.5rem' }}>
//           <h3>📊 Confidence Level</h3>
//           <p>{analysis.confidence}</p>
//         </div>

//         <div style={{ marginBottom: '1.5rem' }}>
//           <h3>💊 Recommended Action</h3>
//           <p>{analysis.treatment}</p>
//         </div>

//         <div style={{ marginBottom: '1.5rem' }}>
//           <h3>⚡ Severity Assessment</h3>
//           <p>{analysis.severity}</p>
//         </div>

//         {analysis.urgentCare && (
//           <div style={{ 
//             backgroundColor: '#fff5f5',
//             border: '2px solid #fed7d7',
//             padding: '1rem',
//             borderRadius: '8px',
//             marginBottom: '1.5rem'
//           }}>
//             <h3>🚨 Urgent Care Needed</h3>
//             <p>This condition may require immediate medical attention.</p>
//           </div>
//         )}

//         <div style={{ 
//           backgroundColor: '#f7fafc',
//           padding: '1rem',
//           borderRadius: '8px',
//           fontSize: '0.9rem'
//         }}>
//           <p><strong>Disclaimer:</strong> {analysis.disclaimer}</p>
//         </div>
//       </div>

//       <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//         <button 
//           onClick={() => navigate('/')}
//           style={{
//             padding: '1rem 2rem',
//             backgroundColor: '#667eea',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             fontSize: '1rem'
//           }}
//         >
//           ← Analyze Another Image
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Results;


const Results = ()=>{

  return (
    <h1>In developing phase!!!</h1>
  )
}


export default Results;
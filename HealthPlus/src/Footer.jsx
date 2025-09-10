// import React from "react";
// import { Link } from "react-router";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer style={{
//       background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
//       color: "#e2e8f0",
//       fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       paddingTop: "40px",
//       paddingBottom: "20px",
//       marginTop: "auto",
//       boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)"
//     }}>
//       <div style={{ 
//         maxWidth: "1200px", 
//         margin: "0 auto", 
//         padding: "0 20px" 
//       }}>
        
//         {/* Main Footer Content */}
//         <div style={{ 
//           display: "grid", 
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
//           gap: "30px", 
//           marginBottom: "30px" 
//         }}>
          
//           {/* Company Info */}
//           <div>
//             <div style={{ 
//               display: "flex", 
//               alignItems: "center", 
//               gap: "8px", 
//               marginBottom: "16px" 
//             }}>
//               <span style={{ fontSize: "28px" }}>🏥</span>
//               <span style={{
//                 fontSize: "24px",
//                 fontWeight: "700",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent"
//               }}>
//                 HealthCare Hub
//               </span>
//             </div>
//             <p style={{ 
//               color: "#a0aec0", 
//               lineHeight: "1.6", 
//               marginBottom: "20px", 
//               fontSize: "14px" 
//             }}>
//               Your trusted healthcare platform providing AI-powered medical analysis, 
//               expert consultations, and comprehensive lab services.
//             </p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
//                 <span>📞</span> 1-800-HEALTH (432584)
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
//                 <span>📧</span> support@healthcarehub.com
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
//                 <span>📍</span> 123 Medical Center Drive, Healthcare City
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 style={{ 
//               color: "#f7fafc", 
//               fontSize: "18px", 
//               fontWeight: "700", 
//               marginBottom: "16px" 
//             }}>
//               Quick Links
//             </h3>
//             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//               <Link to="/Front" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Home</Link>
//               <Link to="/Consult" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Consult Doctor</Link>
//               <Link to="/Askai" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>AI Analysis</Link>
//               <Link to="/upload" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Upload Documents</Link>
//               <Link to="/Lab" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Lab Reports</Link>
//             </div>
//           </div>

//           {/* Services */}
//           <div>
//             <h3 style={{ 
//               color: "#f7fafc", 
//               fontSize: "18px", 
//               fontWeight: "700", 
//               marginBottom: "16px" 
//             }}>
//               Our Services
//             </h3>
//             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//               <Link to="/derma" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Dermatology</Link>
//               <Link to="/ent" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>ENT Specialist</Link>
//               <Link to="/ortho" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Orthopedic Care</Link>
//               <Link to="/dentist" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Dental Services</Link>
//             </div>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 style={{ 
//               color: "#f7fafc", 
//               fontSize: "18px", 
//               fontWeight: "700", 
//               marginBottom: "16px" 
//             }}>
//               Support
//             </h3>
//             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//               <Link to="/help" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Help Center</Link>
//               <Link to="/contact" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Contact Us</Link>
//               <Link to="/faq" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>FAQ</Link>
//               <Link to="/support" style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>Technical Support</Link>
//             </div>
//           </div>
//         </div>

//         {/* Certifications */}
//         <div style={{ 
//           display: "grid", 
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
//           gap: "16px", 
//           padding: "20px 0", 
//           borderTop: "1px solid #4a5568",
//           borderBottom: "1px solid #4a5568" 
//         }}>
//           <div style={{ 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "8px", 
//             fontSize: "14px" 
//           }}>
//             <span style={{ fontSize: "20px" }}>🔒</span>
//             <div>
//               <div style={{ fontWeight: "600" }}>HIPAA Compliant</div>
//               <div style={{ color: "#a0aec0", fontSize: "12px" }}>Your data is secure</div>
//             </div>
//           </div>
//           <div style={{ 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "8px", 
//             fontSize: "14px" 
//           }}>
//             <span style={{ fontSize: "20px" }}>⚕️</span>
//             <div>
//               <div style={{ fontWeight: "600" }}>FDA Approved</div>
//               <div style={{ color: "#a0aec0", fontSize: "12px" }}>Medical grade platform</div>
//             </div>
//           </div>
//           <div style={{ 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "8px", 
//             fontSize: "14px" 
//           }}>
//             <span style={{ fontSize: "20px" }}>🏆</span>
//             <div>
//               <div style={{ fontWeight: "600" }}>Award Winning</div>
//               <div style={{ color: "#a0aec0", fontSize: "12px" }}>Best Healthcare App 2024</div>
//             </div>
//           </div>
//           <div style={{ 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "8px", 
//             fontSize: "14px" 
//           }}>
//             <span style={{ fontSize: "20px" }}>✅</span>
//             <div>
//               <div style={{ fontWeight: "600" }}>ISO 27001 Certified</div>
//               <div style={{ color: "#a0aec0", fontSize: "12px" }}>Information security</div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div style={{ 
//           paddingTop: "20px", 
//           display: "flex", 
//           justifyContent: "space-between", 
//           alignItems: "center", 
//           flexWrap: "wrap", 
//           gap: "16px" 
//         }}>
//           <div style={{ fontSize: "12px", color: "#718096" }}>
//             <div style={{ marginBottom: "8px" }}>
//               <Link to="/privacy-policy" style={{ color: "#a0aec0", textDecoration: "none", marginRight: "16px" }}>Privacy Policy</Link>
//               <Link to="/terms" style={{ color: "#a0aec0", textDecoration: "none", marginRight: "16px" }}>Terms of Service</Link>
//               <Link to="/disclaimer" style={{ color: "#a0aec0", textDecoration: "none" }}>Medical Disclaimer</Link>
//             </div>
//             <div>© {currentYear} HealthCare Hub. All rights reserved.</div>
//             <div style={{ fontSize: "11px", fontStyle: "italic", marginTop: "4px" }}>
//               This platform is for informational purposes only and does not replace professional medical advice.
//             </div>
//           </div>
          
//           <div style={{
//             background: "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
//             padding: "12px 16px",
//             borderRadius: "8px",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             fontSize: "14px"
//           }}>
//             <span style={{ fontSize: "18px" }}>🚨</span>
//             <div>
//               <div style={{ fontWeight: "bold" }}>Medical Emergency?</div>
//               <div style={{ fontSize: "12px" }}>Call 911 immediately</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

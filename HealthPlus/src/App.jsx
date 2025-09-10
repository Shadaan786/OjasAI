import Auth from "./Auth";
import { BrowserRouter, Routes, Route } from "react-router";
import Front from "./pages/Front";
import Consult from "./pages/Consult";
import Derma from "./pages/Derma";
import ENT from "./pages/ENT.jsx";
import Ortho from "./pages/Ortho.jsx";
import Dental from "./pages/Dental.jsx";
import CallIframe from "./pages/CallIframe";
import Askai from "./pages/Askai";
import Lab from "./pages/Lab";
import "./Auth.css";
import AnalysisResults from "./pages/AnalysisResults.jsx";
import OrderMedicine from "./pages/OrderMedicine.jsx";
import MedicalImageAnalysis from "./pages/components/MedicalAnalysis/MedicalAnalysis.jsx";
import Results from "./pages/components/MedicalAnalysis/Results.jsx";
import Sos from "./pages/Sos.jsx";

// import ProtectedRoute from "./ProtectedRoute";
// import Dashboard from "./Dashboard";
// import Login from "./Login";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


function App(){

  return(

    <>
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Auth/>}/>
      <Route path = '/getStarted' element = {<Front/>}/>
      <Route path = '/consult' element = {<Consult/>}/>
      <Route path = '/Sos' element = {<Sos/>}/>
      <Route path = '/derma' element = {<Derma/>}/>
      <Route path = '/ENT' element = {<ENT/>}/>
      <Route path = '/Ortho' element = {<Ortho/>}/>
      <Route path = '/Dentist' element = {<Dental/>}/>
      <Route path="/call/:room" element={<CallIframe />} />
      <Route path="/AskAi" element={<Askai />} />
      <Route path="/Lab" element={<Lab />} />
      <Route path="/analysis-results" element={<AnalysisResults />} />
      <Route path="/OrderMedicine" element={<OrderMedicine />} />
      <Route path="/getStarted/Medical" element={<MedicalImageAnalysis />} />
          <Route path="/results" element={<Results />} />
    </Routes>
    </BrowserRouter>

    </>
  )
}


export default App;
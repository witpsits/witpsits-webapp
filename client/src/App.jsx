import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Prospectus from "./pages/prospectus";
import Showcase from "./pages/showcase";
import AdminDashboard from "./pages/adminDashboard";
import ManageNews from "./components/admin/manageNews";
import AcademicResources from "./components/admin/academicResources";
import UserLogs from "./components/admin/userLogs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/prospectus" element={<Prospectus />} />
        <Route path="/showcase" element={<Showcase />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<ManageNews />} />
        <Route path="/admin/resources" element={<AcademicResources />} />
        <Route path="/admin/logs" element={<UserLogs />} />
      </Routes>
    </Router>
  );
}

export default App;
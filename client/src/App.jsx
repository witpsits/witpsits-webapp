import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Prospectus from "./pages/prospectus";
import Showcase from "./pages/showcase";
import AdminDashboard from "./pages/adminDashboard";
import ManageNews from "./components/admin/manageNews";
import AcademicResources from "./components/admin/academicResources";
import UserLogs from "./components/admin/userLogs";
import CreateContent from './components/admin/contentForm';
import OrgChart from "./pages/orgchart";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/prospectus" element={<Prospectus />} />
        <Route path="/org-chart" element={<OrgChart />} />
        <Route path="/showcase" element={<Showcase />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<ManageNews />} />
        <Route path="/admin/resources" element={<AcademicResources />} />
        <Route path="/admin/logs" element={<UserLogs />} />

        {/* Create Content Routes */}
        <Route path="/admin/create-announcement" element={<CreateContent />} />
        <Route path="/admin/create-news" element={<CreateContent />} />
        <Route path="/admin/create-resource" element={<CreateContent />} />
      </Routes>
    </Router>
  );
}

export default App;
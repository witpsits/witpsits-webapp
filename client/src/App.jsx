import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClickSpark from "./components/click-animation/clickEffect";
import Homepage from "./pages/homepage";
import Prospectus from "./pages/prospectus";
import Showcase from "./pages/showcase";
import AdminDashboard from "./pages/adminDashboard";
import ManageNews from "./components/admin/manageNews";
import AcademicResources from "./components/admin/academicResources";
import UserLogs from "./components/admin/userLogs";
import ManageOrgChart from "./components/admin/ManageOrgChart";
import ManageEvents from "./components/admin/ManageEvents";
import ManageAchievements from "./components/admin/ManageAchievements";
import ManageProspectus from "./components/admin/ManageProspectus";
import CreateContent from "./components/admin/contentForm";
import AdminLogin from "./components/admin/AdminLogin";
import OrgChart from "./pages/orgchart";
import FaqPage from "./pages/faq";
import Login from "./pages/login";
import Signup from "./pages/signup";
import TermsModal from "./components/TermsModal";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <TermsModal />
      <ClickSpark
        sparkColor="#f1f1f1f1"
        sparkCount={10}
        sparkSize={12}
        sparkRadius={20}
        duration={500}
      >
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/prospectus" element={<Prospectus />} />
            <Route path="/org-chart" element={<OrgChart />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute><ManageNews /></ProtectedRoute>} />
            <Route path="/admin/resources" element={<ProtectedRoute><AcademicResources /></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute><UserLogs /></ProtectedRoute>} />
            <Route path="/admin/org-chart" element={<ProtectedRoute><ManageOrgChart /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
            <Route path="/admin/achievements" element={<ProtectedRoute><ManageAchievements /></ProtectedRoute>} />
            <Route path="/admin/prospectus" element={<ProtectedRoute><ManageProspectus /></ProtectedRoute>} />

            {/* Create Content Routes - Protected */}
            <Route
              path="/admin/create-announcement"
              element={<ProtectedRoute><CreateContent /></ProtectedRoute>}
            />
            <Route path="/admin/create-news" element={<ProtectedRoute><CreateContent /></ProtectedRoute>} />
            <Route path="/admin/create-resource" element={<ProtectedRoute><CreateContent /></ProtectedRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute><CreateContent /></ProtectedRoute>} />
          </Routes>
        </Router>
      </ClickSpark>
    </AuthProvider>
  );
}

export default App;

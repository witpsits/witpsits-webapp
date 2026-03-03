import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Prospectus from "./pages/prospectus";
import Showcase from "./pages/showcase";
import OrgChart from "./pages/orgchart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/prospectus" element={<Prospectus />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/org-chart" element={<OrgChart />} />
      </Routes>
    </Router>
  );
}

export default App;

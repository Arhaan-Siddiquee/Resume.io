// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home"; // Assuming this is the current page
import Latex from "./components/latex"; // Import your latex.jsx page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latex" element={<Latex />} />
      </Routes>
    </Router>
  );
}

export default App;

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home"; 
import Latex from "./components/latex"; 
import Enhance from "./components/enhance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latex" element={<Latex />} />
        <Route path="/enhance" element={<Enhance />} />
      </Routes>
    </Router>
  );
}

export default App;
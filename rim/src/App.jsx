// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home"; 
import Latex from "./components/latex"; 

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

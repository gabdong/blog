import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header";
import Home from "./pages/Home";
import Board from './pages/Board';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Nav />
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:idx" element={<Board />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

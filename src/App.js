import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="disFlex flexColumn" id="wrapper">
      <Header />
      <div className="disFlex">
        <Router basename={process.env.PUBLIC_URL}>
          <Nav />
          <Pages />
        </Router>
      </div>
    </div>
  );
}

export default App;

import Navigation from "./Components/Nav/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import "./scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Routes from "./Components/Router/Routes";

function App() {
  return (
    <Router>
      <Container fluid className="App p-0">
        <Routes />
      </Container>
    </Router>
  );
}

export default App;

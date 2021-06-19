import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Routes from "./Components/Router/Routes";
import "./scss/custom.scss";

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

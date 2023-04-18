import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FirstContain from './components/Templates/FirstContain';
export function App() {

  const containerStyle = {
    backgroundColor: '#f8f8f8', /* Color de fondo suave */
    borderRadius: '10px',
    padding: '30px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Container fluid style={containerStyle}>
      <Row>
        <Col>
          <FirstContain />
        </Col>
      </Row>
    </Container>
  );
}
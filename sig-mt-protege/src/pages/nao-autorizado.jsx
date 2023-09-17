import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { Container, Row, Col, Alert, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../images/logo-black-mt-protege.png';

function NaoAutorizado() {
    return(
        <Container className="vertical-center">
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Image src={Logo} alt="Sua Logo" className="mb-3 center-image" style={{height: "40%", weight: "40%"}} fluid />
            <Alert variant="danger">
              <h4>Você não está autorizado a acessar esta página.</h4>
              <p>Por favor, faça login para acessar o conteúdo.</p>
              <Link to="/"> 
                <Button variant="primary">Voltar ao Login</Button>
              </Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
}

export default NaoAutorizado;
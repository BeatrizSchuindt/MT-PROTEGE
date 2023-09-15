import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../images/logo-black-mt-protege.png';

function NaoEncontrado() {
    return (
        <Container className="vertical-center">
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Image src={Logo} alt="Sua Logo" className="mb-3 center-image" style={{ height: "45%", weight: "45%" }} fluid />
                    <Card style={{ backgroundColor: "#E7F0FF" }}>
                        <Card.Body>
                            <Card.Title>404 - Página Não Encontrada</Card.Title>
                            <Card.Text>A página que você está procurando não existe.</Card.Text>
                            <Link to="/">
                                <Button variant="primary">Voltar para a tela de login</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default NaoEncontrado;
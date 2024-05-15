import React, { useState, useEffect } from 'react';
import api from '../api';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/home.css';
import axios from 'axios';

function Home() {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [userIsAuthorized, setUserIsAuthorized] = useState(false);
    const username = localStorage.getItem('username');

    useEffect(() => {
        api.get('/api/check_group/')
            .then(response => {
                if (response.data.is_superuser) {
                    setUserIsAuthorized(true);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        api.get('/api/user/avaliacoes/')
            .then(response => {
                setAvaliacoes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    // Group avaliacoes by avaliador
    const avaliadores = avaliacoes.reduce((groups, avaliacao) => {
        const key = avaliacao.avaliador;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(avaliacao);
        return groups;
    }, {});

    if (!userIsAuthorized) {
        console.log("notautorized");
        const avaliadorNumber = username.split('_').pop();

        return (
            <Table striped bordered hover className="shadow">
                <thead className="thead-dark">
                    <tr>
                        <th>Avaliador</th>
                        <th>Avaliados</th>
                        <th>Data Inicial</th>
                        <th>Data Final</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(avaliadores)
                        .filter(([avaliador]) => avaliador === avaliadorNumber)  // Only include rows where the current user is the avaliador
                        .map(([avaliador, avaliacoes], index) => (
                            avaliacoes.map((avaliacao, subIndex) => (
                                <tr key={`${index}-${subIndex}`}>
                                    <td>{avaliador}</td>
                                    <td>{avaliacao.avaliado}</td>
                                    <td>{avaliacao.data_inicial}</td>
                                    <td>{avaliacao.data_final}</td>
                                </tr>
                            ))
                        ))}
                </tbody>
            </Table>
        );
    }

    const handleDelete = async (avaliadorToDelete, avaliadoToDelete) => {
        const newAvaliacoes = avaliacoes.filter(avaliacao => !(avaliacao.avaliador === avaliadorToDelete && avaliacao.avaliado === avaliadoToDelete));
        setAvaliacoes(newAvaliacoes);
        try {
            await api.delete(`/api/user/delete/${avaliadorToDelete}/${avaliadoToDelete}/`);
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container fluid className="container-padding-top">
            <Row>
                <Col md={2} className="sidebar bg-light">
                    {/* Sidebar content */}
                </Col>
                <Col md={10}>
                    <h1 className="text-center mb-4 heading-margin-top">Avaliações</h1>
                    <Table striped bordered hover className="shadow">
                        <thead className="thead-dark">
                            <tr>
                                <th>Avaliador</th>
                                <th>Avaliados</th>
                                <th>Data Inicial</th>
                                <th>Data Final</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(avaliadores).map(([avaliador, avaliacoes], index) => (
                                avaliacoes.map((avaliacao, subIndex) => (
                                    <tr key={`${index}-${subIndex}`}>
                                        <td>{avaliador}</td>
                                        <td>{avaliacao.avaliado}</td>
                                        <td>{avaliacao.data_inicial}</td>
                                        <td>{avaliacao.data_final}</td>
                                        <td>
                                            <button onClick={() => handleDelete(avaliador, avaliacao.avaliado)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
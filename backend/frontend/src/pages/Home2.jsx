import React, { useState, useEffect } from 'react';
import api from '../api';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/home.css';

function Home() {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [isModifyOpen, setIsModifyOpen] = useState(false);

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

    const handleDelete = async (avaliadorToDelete, avaliadoToDelete) => {
        console.log(`Deleting avaliador: ${avaliadorToDelete}, avaliado: ${avaliadoToDelete}`);  // Log the avaliador and avaliado to delete
        let response;
    
        const newAvaliacoes = avaliacoes.filter(avaliacao => !(avaliacao.avaliador === avaliadorToDelete && avaliacao.avaliado === avaliadoToDelete));
        setAvaliacoes(newAvaliacoes);
        try {
            response = await api.delete(`/api/user/delete/${avaliadorToDelete}/${avaliadoToDelete}/`);
        } catch (error) {
            alert(error);
        }
        if (response) {
            window.location.reload();
        }
    };

    const handleModify = (avaliador, avaliacao) => {
        setCurrentAvaliacao({ avaliador, ...avaliacao });
        setIsModifyOpen(true);
    };

    const handleModifySubmit = async (avaliador, avaliacao) => {
        // Send a request to your API to update the avaliacao
        // ...

        setIsModifyOpen(false);
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
                                            <button onClick={() => handleModify(avaliador, avaliacao)}>Modify</button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </Table>
                    {isModifyOpen && (
                        <ModifyForm
                            avaliacao={currentAvaliacao}
                            onClose={() => setIsModifyOpen(false)}
                            onSubmit={handleModifySubmit}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
import React, { useState, useEffect } from 'react';
import api from '../api';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/home.css';
import axios from 'axios';

// function Home() {
//     const [avaliacoes, setAvaliacoes] = useState([]);
//     const [userIsAuthorized, setUserIsAuthorized] = useState(false);
//     const username = localStorage.getItem('username');

//     useEffect(() => {
//         api.get('/api/check_group/')
//             .then(response => {
//                 if (response.data.is_superuser) {
//                     setUserIsAuthorized(true);
//                 }
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     }, []);

//     useEffect(() => {
//         api.get('/api/user/avaliacoes/')
//             .then(response => {
//                 setAvaliacoes(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     }, []);

//     // Group avaliacoes by avaliador
//     const avaliadores = avaliacoes.reduce((groups, avaliacao) => {
//         const key = avaliacao.avaliador;
//         if (!groups[key]) {
//             groups[key] = [];
//         }
//         groups[key].push(avaliacao);
//         return groups;
//     }, {});

//     if (!userIsAuthorized) {
//         console.log("notautorized");
//         const avaliadorNumber = username.split('_').pop();

//         return (
//             <Table striped bordered hover className="shadow">
//                 <thead className="thead-dark">
//                     <tr>
//                         <th>Avaliador</th>
//                         <th>Avaliados</th>
//                         <th>Data Inicial</th>
//                         <th>Data Final</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Object.entries(avaliadores)
//                         .filter(([avaliador]) => avaliador === avaliadorNumber)  // Only include rows where the current user is the avaliador
//                         .map(([avaliador, avaliacoes], index) => (
//                             avaliacoes.map((avaliacao, subIndex) => (
//                                 <tr key={`${index}-${subIndex}`}>
//                                     <td>{avaliador}</td>
//                                     <td>{avaliacao.avaliado}</td>
//                                     <td>{avaliacao.data_inicial}</td>
//                                     <td>{avaliacao.data_final}</td>
//                                 </tr>
//                             ))
//                         ))}
//                 </tbody>
//             </Table>
//         );
//     }

//     const handleDelete = async (avaliadorToDelete, avaliadoToDelete) => {
//         const newAvaliacoes = avaliacoes.filter(avaliacao => !(avaliacao.avaliador === avaliadorToDelete && avaliacao.avaliado === avaliadoToDelete));
//         setAvaliacoes(newAvaliacoes);
//         try {
//             await api.delete(`/api/user/delete/${avaliadorToDelete}/${avaliadoToDelete}/`);
//             window.location.reload();
//         } catch (error) {
//             alert(error);
//         }
//     };

//     return (
//         <Container fluid className="container-padding-top">
//             <Row>
//                 <Col md={2} className="sidebar bg-light">
//                     {/* Sidebar content */}
//                 </Col>
//                 <Col md={10}>
//                     <h1 className="text-center mb-4 heading-margin-top">Avaliações</h1>
//                     <Table striped bordered hover className="shadow">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th>Avaliador</th>
//                                 <th>Avaliados</th>
//                                 <th>Data Inicial</th>
//                                 <th>Data Final</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Object.entries(avaliadores).map(([avaliador, avaliacoes], index) => (
//                                 avaliacoes.map((avaliacao, subIndex) => (
//                                     <tr key={`${index}-${subIndex}`}>
//                                         <td>{avaliador}</td>
//                                         <td>{avaliacao.avaliado}</td>
//                                         <td>{avaliacao.data_inicial}</td>
//                                         <td>{avaliacao.data_final}</td>
//                                         <td>
//                                             <button onClick={() => handleDelete(avaliador, avaliacao.avaliado)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Home;



function Home() {
    const data = [
      {
        processNumber: "000247",
        evaluatorNumber: "8",
        evaluatedNumber: "000332",
        status: "José Moreira",
        evaluator: "José Duarte",
        evaluated: "Ricardo Almeida",
        daysRemaining: "0 dias",
      },
      {
        processNumber: "000332",
        evaluatorNumber: "10",
        evaluatedNumber: "000439",
        status: "José Moreira",
        evaluator: "Carlos Silva",
        evaluated: "Ana Costa",
        daysRemaining: "3 dias",
      },
    ];
  
    return (
      <>
        <style jsx>{`
          .container {
            background-color: #e9ecf0;
            display: flex;
            flex-direction: column;
            padding-bottom: 80px;
          }
          .header-container {
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 20px;
            font-size: 16px;
            color: #000;
            font-weight: 400;
            padding: 8px 30px 8px 10px;
            text-align: center;
            flex-wrap: wrap;
          }
          .logo {
            aspect-ratio: 3.33;
            object-fit: cover;
            object-position: center;
            width: 212px;
            max-width: 100%;
          }
          .nav {
            display: flex;
            gap: 20px;
            margin: auto 0;
            flex-wrap: wrap;
          }
          .nav-item {
            font-family: Inter, sans-serif;
          }
          .nav-item-bordered {
            border: 1px solid rgba(0, 0, 0, 1);
            padding: 16px 19px;
            text-align: center;
          }
          .nav-item-black {
            background-color: #000;
            color: #fff;
            padding: 16px 31px;
            text-align: center;
          }
          .main-wrapper {
            background-color: #fff;
            align-self: center;
            display: flex;
            margin-top: 115px;
            width: 100%;
            max-width: 1251px;
            flex-direction: column;
            padding: 39px 27px 80px;
            flex-wrap: wrap;
          }
          .main-header {
            display: flex;
            gap: 20px;
            font-size: 20px;
            color: #000;
            font-weight: 600;
            flex-wrap: wrap;
            padding-right: 20px;
          }
          .main-header-title,
          .main-header-subtitle {
            font-family: Inter, sans-serif;
          }
          .main-content {
            border: 1px solid rgba(0, 0, 0, 1);
            background-color: #000;
            margin-top: 9px;
            height: 1px;
          }
  
          .process-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin: 15px 0 273px;
            flex-wrap: wrap;
          }
          .process-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: start;
            justify-content: space-between;
            flex-wrap: wrap;
          }
  
          .process {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            gap: 20px;
          }
          .process-number,
          .evaluator-number,
          .evaluated-number,
          .status-number,
          .status,
          .daysRemaining {
            font-family: Inter, sans-serif;
          }
          .evaluator-info,
          .evaluated-info {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          .options {
            display: flex;
            gap: 15px;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            flex-wrap: wrap;
          }
          .option {
            padding: 16px 14px;
            font-family: Inter, sans-serif;
            text-align: center;
            white-space: nowrap;
          }
          .bordered {
            border: 1px solid rgba(0, 0, 0, 1);
          }
          .red-bg {
            background-color: #dc0232;
            color: #fff;
          }
          .light-bg {
            background-color: #bfd3eb;
          }
          .flex-col-center {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .process-line {
            height: 18px;
            border: 1px solid rgba(0, 0, 0, 1);
          }
          .italic-text {
            color: #000;
            font: italic 400 16px Inter, -apple-system, Roboto, Helvetica, sans-serif;
          }
        `}</style>
        <div className="container">
          <header className="header-container">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&" className="logo" alt="Logo" />
            <nav className="nav">
              <div className="nav-item">Home</div>
              <div className="nav-item nav-item-bordered">Eventos</div>
              <div className="nav-item nav-item-bordered">Criar evento</div>
              <div className="nav-item nav-item-bordered">Novo registo</div>
              <div className="nav-item nav-item-black">Logout</div>
            </nav>
          </header>
          <main className="main-wrapper">
            <header className="main-header">
              <div className="main-header-title">processo n.º</div>
              <div className="main-header-subtitle">n.º</div>
              <div className="main-header-title">avaliador</div>
              <div className="main-header-title">avaliado</div>
              <div className="main-header-title">estado</div>
              <div className="main-header-title">tempo restante</div>
              <div className="main-header-title">opções</div>
            </header>
            <div className="main-content" />
            {data.map((item, idx) => (
              <section className="process-row" key={idx}>
                <div className="process-info">
                  <div className="process">
                    <div className="process-number">{item.processNumber}</div>
                  </div>
                  <div className="process">
                    <div className="evaluator-number">{item.evaluatorNumber}</div>
                  </div>
                  <div className="process">
                    <div className="evaluated-number">{item.evaluatedNumber}</div>
                  </div>
                </div>
                <div className="process-info">
                  <div className="evaluator-info">
                    <div className="main-header-title">{item.evaluator}</div>
                    <div className="evaluator-number">1</div>
                  </div>
                  <div className="evaluated-info">
                    <div className="main-header-subtitle">{item.evaluated}</div>
                    <div className="main-header-title">3</div>
                  </div>
                </div>
                <div className="process-info">
                  <div className="status">{item.status}</div>
                </div>
                <div className="process-info flex-col-center">
                  <div className="flex-col-center light-bg">
                    <div className="process-line" />
                    <div className="italic-text">{item.daysRemaining}</div>
                  </div>
                  <div className="options">
                    <div className="option bordered">Ficha</div>
                    <div className="option red-bg">Apagar</div>
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </>
    );
  }
  
  export default Home;
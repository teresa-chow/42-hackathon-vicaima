import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function EventForm({ route }) {
    const [avaliadores, setAvaliadores] = useState("");
    const [avaliados, setAvaliados] = useState("");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api.post(route, {
                avaliadores: avaliadores.split(',').map(item => item.trim()),
                avaliados: avaliados.split(',').map(item => item.trim()),
                data_inicial: dataInicial,
                data_final: dataFinal
            });
            navigate("/");
        } catch (error) {
            alert(error)
        }
    };
    return (
        <>
        <div className="container">
            <header className="header">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&"
                    alt="Company Logo"
                    className="logo"
                />
            <nav className="navigation">
                <a href="/" className="nav-link">
                    Home
                </a>
                <a href="/event" className="nav-link bordered">
                    Criar evento
                </a>
                <a href="/upload" className="nav-link bordered">
                    Novo registo
                </a>
                <a href="/logout" className="nav-link bordered" style={{ backgroundColor: 'black', color: 'white' }}>
                    Logout
                </a>
            </nav>
            </header>
            <main className="main-content">
                <h1 className="form-title">Novo evento</h1>
                <form onSubmit={handleSubmit} className="event-form">
                    <div className="input-field">
                        <label className="label">
                            <span className="bold-text">{"avaliador"}</span> {"(n.º de colaborador, separado por vírgula)"}
                        </label>
                        <input type="text" className="input" value={avaliadores} onChange={e => setAvaliadores(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <label className="label">
                            <span className="bold-text">{"avaliado"}</span> {"(n.º de colaborador, separado por vírgula)"}
                        </label>
                        <input type="text" className="input" value={avaliados} onChange={e => setAvaliados(e.target.value)}/>
                    </div>
                    <div className="date-field">
                        <label className="label">{"data de início"}</label>
                        <input type="date" className="input" value={dataInicial} onChange={e => setDataInicial(e.target.value)}/>
                    </div>
                    <div className="date-field">
                        <label className="label">{"data de término"}</label>
                        <input type="date" className="input" value={dataFinal} onChange={e => setDataFinal(e.target.value)}/>
                    </div>
                    <button type="submit" className="submit-button">
                        Criar
                    </button>
                </form>
            </main>
            </div>

            <style jsx>{`
                .container {
                background-color: #e9ecf0;
                display: flex;
                flex-direction: column;
                padding-bottom: 80px;
                color: #000;
                font-weight: 400;
                }

                .header {
                background-color: #fff;
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
                padding: 8px 30px 8px 10px;
                gap: 20px;
                font-size: 16px;
                text-align: center;
                }

                @media (max-width: 991px) {
                .header {
                    flex-wrap: wrap;
                    padding-right: 20px;
                }
                }

                .logo {
                width: 212px;
                max-width: 100%;
                aspect-ratio: 3.33;
                object-fit: contain;
                object-position: center;
                }

                .navigation {
                display: flex;
                gap: 20px;
                margin: auto 0;
                }

                @media (max-width: 991px) {
                .navigation {
                    flex-wrap: wrap;
                }
                }

                .nav-link {
                font-family: Inter, sans-serif;
                flex-grow: 1;
                margin: auto 0;
                text-decoration: none;
                color: inherit;
                }

                .bordered {
                border: 1px solid rgba(0, 0, 0, 1);
                padding: 17px 20px;
                }

                .logout {
                background-color: #000;
                color: #fff;
                white-space: nowrap;
                padding: 16px 31px;
                }

                @media (max-width: 991px) {
                .logout {
                    white-space: initial;
                    padding: 0 20px;
                }
                }

                .main-content {
                background-color: #fff;
                align-self: center;
                display: flex;
                flex-direction: column;
                width: 626px;
                max-width: 100%;
                margin-top: 115px;
                padding: 67px 53px;
                font-size: 14px;
                }

                @media (max-width: 991px) {
                .main-content {
                    margin-top: 40px;
                    padding: 0 20px;
                }
                }

                .form-title {
                text-align: center;
                align-self: center;
                font: 600 36px Inter, sans-serif;
                margin: 0;
                }

                .event-form {
                display: flex;
                flex-direction: column;
                }

                .input-field {
                margin-top: 40px;
                }

                @media (max-width: 991px) {
                .input-field {
                    margin-top: 40px;
                }
                }

                .label {
                font-family: Inter, sans-serif;
                }

                .bold-text {
                font-weight: 600;
                }

                .input {
                border: 1px solid rgba(0, 0, 0, 1);
                margin-top: 9px;
                height: 51px;
                width: 100%;
                padding: 0 10px;
                font: inherit;
                }

                .date-fields {
                display: flex;
                margin-top: 40px;
                gap: 20px;
                }

                @media (max-width: 991px) {
                .date-fields {
                    flex-wrap: wrap;
                }
                }

                .date-field {
                flex: 1;
                }

                .submit-button {
                background-color: #dc0232;
                align-self: center;
                margin-top: 70px;
                color: #fff;
                white-space: nowrap;
                text-align: center;
                justify-content: center;
                padding: 17px 37px;
                font: 600 16px Inter, sans-serif;
                border: none;
                cursor: pointer;
                }

                @media (max-width: 991px) {
                .submit-button {
                    margin-top: 40px;
                    white-space: initial;
                    padding: 0 20px;
                }
                }
            `}</style>
            </>
        );
        }

export default EventForm;
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
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{"Register"}</h1>
            <input
                className="form-input"
                type="text"
                placeholder="Avaliadores (comma separated)"
                value={avaliadores}
                onChange={e => setAvaliadores(e.target.value)}
            />
            <input
                className="form-input"
                type="text"
                placeholder="Avaliados (comma separated)"
                value={avaliados}
                onChange={e => setAvaliados(e.target.value)}
            />
            <input
                className="form-input"
                type="date"
                placeholder="Data Inicial"
                value={dataInicial}
                onChange={e => setDataInicial(e.target.value)}
            />
            <input
                className="form-input"
                type="date"
                placeholder="Data Final"
                value={dataFinal}
                onChange={e => setDataFinal(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default EventForm
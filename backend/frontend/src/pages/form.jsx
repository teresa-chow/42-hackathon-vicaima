import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // replace with your api import

const EvaluationForm = () => {
    const [assiduidade_in, setAssiduidadein] = useState('');
    const [assiduidade_ju, setAssiduidadeju] = useState('');
    const [responsabilidade, setResponsabilidade] = useState('');
    const [disponibilidade, setDisponibilidade] = useState('');
    const [conhecimento, setConhecimento] = useState('');
    const [produtividade, setProdutividade] = useState('');
    const username = localStorage.getItem('username');
    const avaliador = username.split('_').pop();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api.patch('/api/update/', {
                avaliador,
                assiduidade_in,
                assiduidade_ju,
                responsabilidade,
                disponibilidade,
                conhecimento,
                produtividade
            });
            navigate("/");
        } catch (error) {
            alert(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* existing form fields... */}
            <label>
                Assiduidade/Injustificadas:
                <select value={assiduidade_in} onChange={e => setAssiduidadein(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>
                Assiduidade/Justificadas:
                <select value={assiduidade_ju} onChange={e => setAssiduidadeju(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>
                Responsabilidade:
                <select value={responsabilidade} onChange={e => setResponsabilidade(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>
                Disponibilidade:
                <select value={disponibilidade} onChange={e => setDisponibilidade(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>
                Conhecimento:
                <select value={conhecimento} onChange={e => setConhecimento(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>
                Produtividade:
                <select value={produtividade} onChange={e => setProdutividade(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
export default EvaluationForm;
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function RegisterForm({ route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [numColab, setnumColab] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [depart, setdepart] = useState("");
    const [func, setfunc] = useState("");
    const [group, setgroup] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {
                username,
                password,
                user_profile: {
                    colab_num: numColab,
                    first_name: firstName,
                    last_name: lastName,
                    department: depart,
                    function: func,
                    group: group
                }
            });
            navigate("/login");
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{"Register"}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                className="form-input"
                type="text"
                value={numColab}
                onChange={(e) => setnumColab(e.target.value)}
                placeholder="Numero de colaborador"
            />
            <input
                className="form-input"
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                placeholder="Nome"
            />
            <input
                className="form-input"
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                placeholder="Apelido"
            />
            <input
                className="form-input"
                type="text"
                value={depart}
                onChange={(e) => setdepart(e.target.value)}
                placeholder="Departamento"
            />
            <input
                className="form-input"
                type="text"
                value={func}
                onChange={(e) => setfunc(e.target.value)}
                placeholder="Função"
            />
            <input
                className="form-input"
                type="text"
                value={group}
                onChange={(e) => setgroup(e.target.value)}
                placeholder="Groupo funcional"
            />
            <button className="form-button" type="submit">
                {"Register"}
            </button>
        </form>
    );
}

export default RegisterForm
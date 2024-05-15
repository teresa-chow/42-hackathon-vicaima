import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME } from "../constants";
import * as React from "react";

function LoginForm({ route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem(USERNAME, username);
            navigate("/")
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col justify-center text-black bg-white">
            <div className="flex flex-col justify-center w-full bg-white max-md:max-w-full">
                <div className="flex overflow-hidden relative flex-col pb-20 w-full min-h-[1024px] max-md:max-w-full">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&" alt="" className="object-cover absolute inset-0 size-full" />
                    <header className="flex relative gap-5 justify-between py-2 pr-8 pl-2.5 w-full text-base text-center whitespace-nowrap bg-white max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&" alt="Logo" className="shrink-0 max-w-full aspect-[3.33] w-[212px]" />
                        <div className="justify-center px-9 py-4 my-auto border border-black border-solid max-md:px-5">
                            Login
                        </div>
                    </header>
                    <form onSubmit={handleSubmit} className="flex relative flex-col self-center px-14 py-20 mt-36 mb-24 max-w-full text-sm font-semibold bg-white w-[424px] max-md:px-5 max-md:my-10">
                        <h1 className="self-center text-4xl text-center">Login</h1>
                        <label htmlFor="username" className="mt-20 max-md:mt-10">nome de utilizador</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="shrink-0 mt-3 border border-black border-solid h-[51px]" />
                        <label htmlFor="password" className="mt-10 max-md:mt-10">palavra-passe</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shrink-0 mt-2.5 border border-black border-solid h-[51px]" />
                        <button type="submit" className="justify-center self-center px-8 py-4 mt-20 mb-2 text-base text-center text-white whitespace-nowrap bg-rose-600 max-md:px-5 max-md:mt-10">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default LoginForm;

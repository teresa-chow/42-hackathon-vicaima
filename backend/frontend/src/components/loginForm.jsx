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
        <>
            <div className="div">
                <div className="div-2">
                    <div className="div-3">
                        <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f56bc2d2936a523dd14cb1aabdf7d61886e5fe31889901dd2f1b339fb7ba14e6?apiKey=d4ef87dbdadc4d0c82074c04dc070338&"
                            className="img"
                        />
                        <div className="div-4">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&"
                                className="img-2"
                            />
                            <div className="div-5">Login</div>
                        </div>
                        <div className="div-6">
                            <form onSubmit={handleSubmit} className="form-container">
                                <div className="div-7">Login</div>
                                <div className="div-8">nome de utilizador</div>
                                <input
                                    className="div-9"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                                <div className="div-10">palavra-passe</div>
                                <input
                                    className="div-11"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button className="div-12" type="submit" disabled={loading}>
                                    {loading ? "Carregando..." : "Entrar"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .div {
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                    color: #000;
                    justify-content: center;
                }
                .div-2 {
                    justify-content: center;
                    background-color: #fff;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                }
                @media (max-width: 991px) {
                    .div-2 {
                        max-width: 100%;
                    }
                }
                .div-3 {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                    min-height: 1024px;
                    width: 100%;
                    padding-bottom: 80px;
                }
                @media (max-width: 991px) {
                    .div-3 {
                        max-width: 100%;
                    }
                }
                .img {
                    position: absolute;
                    inset: 0;
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    object-position: center;
                }
                .div-4 {
                    position: relative;
                    background-color: #fff;
                    display: flex;
                    width: 100%;
                    gap: 20px;
                    font-size: 16px;
                    font-weight: 400;
                    white-space: nowrap;
                    text-align: center;
                    justify-content: space-between;
                    padding: 8px 30px 8px 10px;
                }
                @media (max-width: 991px) {
                    .div-4 {
                        max-width: 100%;
                        flex-wrap: wrap;
                        padding-right: 20px;
                        white-space: initial;
                    }
                }
                .img-2 {
                    aspect-ratio: 3.33;
                    object-fit: auto;
                    object-position: center;
                    width: 212px;
                    max-width: 100%;
                }
                .div-5 {
                    font-family: Inter, sans-serif;
                    border-color: rgba(0, 0, 0, 1);
                    border-style: solid;
                    border-width: 1px;
                    justify-content: center;
                    margin: auto 0;
                    padding: 16px 36px;
                }
                @media (max-width: 991px) {
                    .div-5 {
                        white-space: initial;
                        padding: 0 20px;
                    }
                }
                .div-6 {
                    position: relative;
                    background-color: #fff;
                    align-self: center;
                    display: flex;
                    width: 424px;
                    max-width: 100%;
                    flex-direction: column;
                    font-size: 14px;
                    font-weight: 600;
                    margin: 136px 0 93px;
                    padding: 75px 54px;
                }
                @media (max-width: 991px) {
                    .div-6 {
                        margin: 40px 0;
                        padding: 0 20px;
                    }
                }
                .div-7 {
                    text-align: center;
                    align-self: center;
                    font: 36px Inter, sans-serif;
                }
                .div-8 {
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    margin-top: 87px;
                }
                @media (max-width: 991px) {
                    .div-8 {
                        margin-top: 40px;
                    }
                }
                .div-9 {
                    border-color: rgba(0, 0, 0, 1);
                    border-style: solid;
                    border-width: 1px;
                    margin-top: 12px;
                    height: 51px;
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                }
                .div-10 {
                    font-family: Inter, sans-serif;
                    font-weight: 400;
                    margin-top: 41px;
                }
                @media (max-width: 991px) {
                    .div-10 {
                        margin-top: 40px;
                    }
                }
                .div-11 {
                    border-color: rgba(0, 0, 0, 1);
                    border-style: solid;
                    border-width: 1px;
                    margin-top: 9px;
                    height: 51px;
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                }
                .div-12 {
                    background-color: #dc0232;
                    align-self: center;
                    color: #fff;
                    white-space: nowrap;
                    text-align: center;
                    justify-content: center;
                    margin: 81px 0 7px;
                    padding: 17px 33px;
                    font: 16px Inter, sans-serif;
                    cursor: pointer;
                }
                @media (max-width: 991px) {
                    .div-12 {
                        margin-top: 40px;
                        white-space: initial;
                        padding: 0 20px;
                    }
                }
            `}</style>
        </>
    );
}

export default LoginForm;

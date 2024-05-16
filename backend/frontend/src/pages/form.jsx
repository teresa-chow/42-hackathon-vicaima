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
        <div className="div">
            <div className="div-2">
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&"
                    className="img"
                />
                <div className="div-3">
                    <a href="/" className="div-4" style={{ textDecoration: 'none', color: 'black' }}>Home</a>
                    <a href="/logout" className="div-7" style={{ textDecoration: 'none', color: 'white' }}>Logout</a>
                </div>
            </div>
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
            <style jsx>{`
        .div {
          background-color: #e9ecf0;
          display: flex;
          padding-bottom: 80px;
          flex-direction: column;
        }
        .div-2 {
          background-color: #fff;
          display: flex;
          width: 100%;
          gap: 20px;
          font-size: 16px;
          color: #000;
          font-weight: 400;
          text-align: center;
          justify-content: space-between;
          padding: 8px 30px 8px 10px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            padding-right: 20px;
          }
        }
        .img {
          aspect-ratio: 3.33;
          object-fit: auto;
          object-position: center;
          width: 212px;
          max-width: 100%;
        }
        .div-3 {
          display: flex;
          gap: 20px;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-3 {
            flex-wrap: wrap;
          }
        }
        .div-4 {
          font-family: Inter, sans-serif;
          flex-grow: 1;
          margin: auto 0;
        }
        .div-5 {
          font-family: Inter, sans-serif;
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          justify-content: center;
          padding: 17px 20px;
        }
        .div-6 {
          font-family: Inter, sans-serif;
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          justify-content: center;
          padding: 16px 19px;
        }
        .div-7 {
          font-family: Inter, sans-serif;
          background-color: #000;
          color: #fff;
          white-space: nowrap;
          justify-content: center;
          padding: 16px 31px;
        }
        @media (max-width: 991px) {
          .div-7 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-8 {
          background-color: #fff;
          align-self: center;
          display: flex;
          margin-top: 115px;
          width: 100%;
          max-width: 1251px;
          align-items: center;
          justify-content: center;
          padding: 64px 60px;
        }
        @media (max-width: 991px) {
          .div-8 {
            max-width: 100%;
            margin-top: 40px;
            padding: 0 20px;
          }
        }
        .div-9 {
          display: flex;
          width: 942px;
          max-width: 100%;
          flex-direction: column;
        }
        .div-10 {
          align-self: center;
          display: flex;
          width: 520px;
          max-width: 100%;
          flex-direction: column;
        }
        .div-11 {
          color: #000;
          text-align: center;
          align-self: center;
          font: 600 36px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-11 {
            max-width: 100%;
          }
        }
        .div-12 {
          color: #000;
          margin-top: 46px;
          font: 400 14px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-12 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-13 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          align-items: end;
          justify-content: center;
          padding: 0 60px;
        }
        @media (max-width: 991px) {
          .div-13 {
            max-width: 100%;
            padding-left: 20px;
          }
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 51px;
        }
        .div-14 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #000;
          margin-top: 41px;
          height: 1px;
        }
        @media (max-width: 991px) {
          .div-14 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-15 {
          margin-top: 33px;
        }
        @media (max-width: 991px) {
          .div-15 {
            max-width: 100%;
          }
        }
        .div-16 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-16 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 43%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-17 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-17 {
            margin-top: 19px;
          }
        }
        .div-18 {
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: #000;
          font-weight: 400;
        }
        .div-19 {
          display: flex;
          flex-direction: column;
        }
        .div-20 {
          font-family: Inter, sans-serif;
        }
        .div-21 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          margin-top: 12px;
          height: 51px;
        }
        .div-22 {
          font-family: Inter, sans-serif;
          margin-top: 28px;
        }
        .div-23 {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          flex-basis: 0;
          width: fit-content;
          margin: auto 0;
        }
        .div-24 {
          font-family: Inter, sans-serif;
        }
        .div-25 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          margin-top: 12px;
          height: 51px;
        }
        .div-26 {
          font-family: Inter, sans-serif;
          align-self: end;
          margin-top: 29px;
        }
        @media (max-width: 991px) {
          .div-26 {
            margin-right: 10px;
          }
        }
        .div-27 {
          display: flex;
          margin-top: 9px;
          gap: 17px;
          padding: 0 2px;
        }
        .div-28 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          width: 253px;
          max-width: 100%;
          height: 51px;
        }
        .div-29 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          width: 123px;
          height: 51px;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 57%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-30 {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 14px;
          color: #000;
          font-weight: 400;
        }
        @media (max-width: 991px) {
          .div-30 {
            max-width: 100%;
            margin-top: 19px;
          }
        }
        .div-31 {
          display: flex;
          gap: 20px;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .div-31 {
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-32 {
          display: flex;
          flex-direction: column;
          flex: 1;
          flex-grow: 1;
          flex-basis: 0;
          width: fit-content;
        }
        @media (max-width: 991px) {
          .div-32 {
            white-space: initial;
          }
        }
        .div-33 {
          font-family: Inter, sans-serif;
        }
        .div-34 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          margin-top: 9px;
          height: 51px;
        }
        .div-35 {
          display: flex;
          flex-direction: column;
          flex: 1;
          flex-grow: 1;
          flex-basis: 0;
          width: fit-content;
        }
        @media (max-width: 991px) {
          .div-35 {
            white-space: initial;
          }
        }
        .div-36 {
          font-family: Inter, sans-serif;
        }
        .div-37 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          margin-top: 9px;
          height: 51px;
        }
        .div-38 {
          display: flex;
          margin-top: 28px;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .div-38 {
            flex-wrap: wrap;
          }
        }
        .div-39 {
          display: flex;
          flex-direction: column;
          flex: 1;
          flex-grow: 1;
          flex-basis: 0;
          width: fit-content;
        }
        .div-40 {
          font-family: Inter, sans-serif;
        }
        .div-41 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          margin-top: 9px;
          height: 51px;
        }
        .div-42 {
          display: flex;
          flex-direction: column;
          flex: 1;
          flex-grow: 1;
          flex-basis: 0;
          width: fit-content;
        }
        .div-43 {
          font-family: Inter, sans-serif;
        }
        .div-44 {
          border-color: rgba(0, 0, 0, 1);
          border-style: solid;
          border-width: 1px;
          margin-top: 12px;
          height: 51px;
        }
        .div-45 {
          background-color: #dc0232;
          align-self: start;
          margin-top: 55px;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          justify-content: center;
          padding: 16px 25px;
          font: 600 16px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-45 {
            margin-top: 40px;
            white-space: initial;
            padding: 0 20px;
          }
        }
      `}</style>
        </div>
    );
}
export default EvaluationForm;
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function Upload({ route }) {
  const [numColab, setNumColab] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numAval, setnumAval] = useState("");
  const [depart, setDepart] = useState("");
  const [func, setFunc] = useState("");
  const [data, setdata] = useState("");
  const [group, setGroup] = useState("");
  const [diretor, setdiretor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)
    try {
      const response = await api.post(route, formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post('/api/create/', {
        numero_colaborador: numColab,
        primeiro_nome: firstName,
        ultimo_nome: lastName,
        avaliador: numAval,
        departamento: depart,
        função: func,
        data_admissao: data,
        grupo: group,
        diretor: diretor,
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eab3563f117d37a0aba7d9f1e0437d07e9641ada43a08ad0c0e29d55a22d1107?apiKey=d4ef87dbdadc4d0c82074c04dc070338&"
            className="img"
          />
          <div className="div-3">
            <a href="/" className="div-4" style={{textDecoration: 'none', color: 'black'}}>Home</a>
            <a href="/event" className="div-5" style={{textDecoration: 'none', color: 'black'}}>Criar evento</a>
            <a href="/upload" className="div-6" style={{textDecoration: 'none', color: 'black'}}>Novo registo</a>
            <a href="/logout" className="div-7" style={{textDecoration: 'none', color: 'white'}}>Logout</a>
          </div>
        </div>
        <div className="div-8">
          <h1 className="registration-title">Registo de colaboradores</h1>
          <form onSubmit={onFormSubmit} className="csv-upload">
            <input type="file" name="file" onChange={onFileChange} />
            <input type="submit" value="Upload" />
          </form>
          <div className="div-9">
            <div className="div-10">
              <div className="div-11">Registo de colaboradores</div>
              <form onSubmit={handleSubmit} className="div-12">
                <input
                  className="form-input"
                  type="text"
                  value={numColab}
                  onChange={(e) => setNumColab(e.target.value)}
                  placeholder="Numero de colaborador"
                />
                <input
                  className="form-input"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nome"
                />
                <input
                  className="form-input"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Apelido"
                />
                <input
                  className="form-input"
                  type="text"
                  value={numAval}
                  onChange={(e) => setnumAval(e.target.value)}
                  placeholder="Numero de avaliador"
                />
                <input
                  className="form-input"
                  type="text"
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  placeholder="Departamento"
                />
                <input
                  className="form-input"
                  type="text"
                  value={func}
                  onChange={(e) => setFunc(e.target.value)}
                  placeholder="Função"
                />
                <input
                  className="form-input"
                  type="date"
                  value={data}
                  onChange={(e) => setdata(e.target.value)}
                  placeholder="Data de admissão"
                />
                <input
                  className="form-input"
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  placeholder="Grupo funcional"
                />
                <input
                  className="form-input"
                  type="text"
                  value={diretor}
                  onChange={(e) => setdiretor(e.target.value)}
                  placeholder="Diretor de Unidade"
                />
                <button className="form-button" type="submit">
                  {loading ? "Loading..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default Upload;


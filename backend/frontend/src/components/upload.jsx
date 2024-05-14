import { useState } from "react";
import api from "../api";

function Upload({ route }) {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)
        try {
            const response = await api.post(route, formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input type="file" name="file" onChange={onFileChange} />
            <input type="submit" value="Upload" />
        </form>
    );
}

export default Upload;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from "../components/Form"

function Register() {
    const [userIsAuthorized, setUserIsAuthorized] = useState(false);

    useEffect(() => {
        // Replace this with the actual API call to your backend
        axios.get('/api/user/check_group/')
            .then(response => {
                if (response.is_member_of_group || response.is_superuser) {
                    setUserIsAuthorized(true);
                }
            });
    }, []);

    if (!userIsAuthorized) {
        return <div>You are not authorized to view this page.</div>;
    }

    return <Form route="/api/user/register/" method="register"/>;
}

export default Register;
import React, { useEffect, useState } from 'react';
import api from '../api';
import Upload from '../components/upload';

function Register() {
    const [userIsAuthorized, setUserIsAuthorized] = useState(false);

    useEffect(() => {
        api.get('/api/check_group/')
            .then(response => {
                if (response.data.is_member_of_group || response.data.is_superuser) {
                    setUserIsAuthorized(true);
                }
            });
    }, []);

    if (!userIsAuthorized) {
        return <div>You are not authorized to view this page.</div>;
    }
    return <Upload route="/api/user/upload/" />;
}

export default Register;
import React, { useEffect, useState } from 'react';
import RegisterForm from "../components/registerForm"
import api from '../api';
import EventForm from '../components/eventForm';

function Event() {
    const [userIsAuthorized, setUserIsAuthorized] = useState(false);

    useEffect(() => {
        api.get('/api/user/check_group/')
            .then(response => {
                if (response.data.is_member_of_group || response.data.is_superuser) {
                    setUserIsAuthorized(true);
                }
            });
    }, []);

    if (!userIsAuthorized) {
        return <div>You are not authorized to view this page.</div>;
    }
    return <EventForm route="/api/user/event/" />;
}

export default Event;
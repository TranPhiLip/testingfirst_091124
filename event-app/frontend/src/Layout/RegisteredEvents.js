import { useEffect, useState } from "react";
import React from "react";

const RegisteredEvents = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        // Fetch registered events from localStorage or API
        const storedData = localStorage.getItem('registeredEvents');
        if (storedData) {
            setRegisteredEvents(JSON.parse(storedData));
        }
    }, []);

    return (
        <div>
            <h2>Your Registered Events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {registeredEvents.map(event => (
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegisteredEvents;
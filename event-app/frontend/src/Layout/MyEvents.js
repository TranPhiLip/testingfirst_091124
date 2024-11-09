import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyEvents = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        // Lấy danh sách ID sự kiện đã đăng ký từ localStorage
        const registeredEventIds = JSON.parse(localStorage.getItem('registeredEvents')) || [];

        // Lấy danh sách sự kiện từ API hoặc từ localStorage (nếu bạn đã lưu chúng)
        const fetchRegisteredEvents = async () => {
            try {
                const response = await fetch("http://localhost:3000/events");
                const allEvents = await response.json();

                // Lọc các sự kiện đã đăng ký
                const filteredEvents = allEvents.filter(event => registeredEventIds.includes(event.id));
                setRegisteredEvents(filteredEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchRegisteredEvents();
    }, []);

    const handleUnregister = (eventId) => {
        // Cập nhật localStorage để xóa sự kiện đã hủy đăng ký
        const updatedRegisteredEventIds = registeredEvents.map(event => event.id).filter(id => id !== eventId);
        localStorage.setItem('registeredEvents', JSON.stringify(updatedRegisteredEventIds));

        // Cập nhật danh sách sự kiện đã đăng ký trong state
        setRegisteredEvents(registeredEvents.filter(event => event.id !== eventId));
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>My Events</h2>
                </div>
                <div className="card-body">
                    {registeredEvents.length > 0 ? (
                        <div className="table-container">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredEvents.map(event => (
                                        <tr key={event.id}>
                                            <td>{event.title}</td>
                                            <td>{event.description}</td>
                                            <td>{event.date}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleUnregister(event.id)}>
                                                    Unsubscribe
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <p>You have not registered for any events.</p>
                    )}
                    <div className="divbtn">
                        <Link to="/events" className="btn btn-primary">Return to event list</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
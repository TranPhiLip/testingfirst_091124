import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import './EventListing.css'; // Đảm bảo bạn đã tạo file CSS tương ứng

const EventListing = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchEvents = () => {
        // Fetch sự kiện từ db.json
        fetch("http://localhost:3000/events")
            .then(res => res.json())
            .then(data => {
                const registeredEventIds = JSON.parse(localStorage.getItem('registeredEvents')) || [];
                const updatedEvents = data.map(event => ({
                    ...event,
                    isRegistered: registeredEventIds.includes(event.id)
                }));
                setEvents(updatedEvents);
            })
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const registerEvent = (id) => {
        // Cập nhật sự kiện đã đăng ký trên server
        fetch(`http://localhost:3000/events/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isRegistered: true })
        })
            .then(() => {
                // Cập nhật localStorage
                const registeredEventIds = JSON.parse(localStorage.getItem('registeredEvents')) || [];
                localStorage.setItem('registeredEvents', JSON.stringify([...registeredEventIds, id]));

                // Lấy lại danh sách sự kiện
                fetchEvents();
            })
            .catch(err => console.log(err.message));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const goToMyEvents = () => {
        navigate('/my-events');
    };


    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Event Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/event/create" className="btn btn-success">Create New Event</Link>
                        <button onClick={goToMyEvents} className="myevent btn btn-info">My Events</button>
                        <button onClick={handleLogout} className="logout btn btn-danger">Logout</button>
                    </div>

                    <input
                        className="input"
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="table-container">
                        <table className="table table-bordered">
                            <thead >
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase())).map(event => (
                                    <tr key={event.id}>
                                        <td>{event.title}</td>
                                        <td>{event.description}</td>
                                        <td>{event.date}</td>
                                        <td>{event.isRegistered ? 'Registered' : 'Not Registered'}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => navigate(`/event/detail/${event.id}`)}>Details</button>
                                            <button className="btn btn-success" onClick={() => registerEvent(event.id)} disabled={event.isRegistered}>
                                                {event.isRegistered ? 'Registered' : 'Register'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventListing;
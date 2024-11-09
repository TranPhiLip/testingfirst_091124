import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import './EventCreate.css'; // Đảm bảo bạn đã tạo file CSS tương ứng

const EventCreate = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { title, description, date, location, isRegistered: false };

        fetch("http://localhost:3000/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to create event');
                }
                return res.json();
            })
            .then(() => {
                alert('Event created successfully.');
                navigate('/events');
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    return (
        <div className="containerCreate">
            <div className="card">
                <div className="card-title">
                    <h2>Create New Event</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" required value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input className="form-control" type="date" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div className="button-both">
                        <button type="submit" className="btn btn-success">Save</button>
                        <Link to="/events" className="btn btn-danger">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventCreate; 
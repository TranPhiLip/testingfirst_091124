import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import React from "react";
import './EventDetail.css'; // Đảm bảo bạn đã tạo file CSS tương ứng

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/events/${eventId}`)
            .then(res => res.json())
            .then(data => {
                setEvent(data);
            })
            .catch(err => console.log(err.message));
    }, [eventId]);

    return (
        <div className="container">
            <div className="card">
                {event && (
                    <div className="card-body">
                        <div className="card-title">
                            <h2>{event.title}</h2>
                        </div>
                        <p>{event.description}</p>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        <Link to="/events" className="btn btn-danger">Back to Events</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetail;
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import './EventEdit.css'; // Import the CSS file

const EventEdit = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [id, idchange] = useState("");
    const [title, titlechange] = useState("");
    const [description, descriptionchange] = useState("");
    const [date, datechange] = useState("");
    const [completed, setCompleted] = useState(false); // Thêm trạng thái hoàn thành
    const [validation, valchange] = useState(false);
    const [empdata, empdatachange] = useState([]);

    useEffect(() => {
        // Tải thông tin nhân viên từ API
        fetch("http://localhost:3000/events/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                idchange(resp.id);
                titlechange(resp.title);
                descriptionchange(resp.description);
                datechange(resp.date);
                setCompleted(resp.completed); // Tải trạng thái hoàn thành
            })
            .catch((err) => {
                console.log(err.message);
            });

        // Tải dữ liệu nhân viên từ localStorage
        const storedData = localStorage.getItem('empdata');
        if (storedData) {
            empdatachange(JSON.parse(storedData));
        }
    }, [empid]);

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdataToUpdate = { id, title, description, date, completed }; // Bao gồm trạng thái hoàn thành

        fetch("http://localhost:3000/events/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdataToUpdate)
        })
        .then((res) => {
            if (res.ok) {
                // Cập nhật localStorage
                const updatedEmpdata = empdata.map(emp => emp.id === empid ? empdataToUpdate : emp);
                empdatachange(updatedEmpdata);
                localStorage.setItem('empdata', JSON.stringify(updatedEmpdata));
                alert('Saved successfully.');
                navigate('/home');
            } else {
                throw new Error('Failed to update employee');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input
                                                required
                                                value={title}
                                                onMouseDown={() => valchange(true)}
                                                onChange={e => titlechange(e.target.value)}
                                                className="form-control"
                                            />
                                            {title.length === 0 && validation && <span className="text-danger">Enter the title</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input
                                                value={description}
                                                onChange={e => descriptionchange(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input
                                                value={date}
                                                onChange={e => datechange(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                checked={completed}
                                                onChange={e => setCompleted(e.target.checked)}
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label">Completed</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/home" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EventEdit;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
export default function QuestionsReview() {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('100'); 
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        fetchData(); 
    }, [selectedValue]);

    const fetchData = () => {
        const postData = {
            subject_name: selectedValue
        };

        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                setQuizData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSubmit = (sID,qID) => {
        navigate(`/EditQuestions/${sID}/${qID}`);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
                <div className="container-fluid">
                    <img className="navbar-brand"
                        src="/assests/quizLogo.jpg"
                        height="60"
                        alt="Logo"
                        loading="lazy"
                        style={{ marginTop: "-1px" }}
                    />
                    <div className="d-flex flex-grow-1 align-items-center">
                        <label htmlFor="subjectDropdown" className="me-1 ms-2">Choose Subject:</label>
                        <select
                            className="form-control me-auto"
                            id="subjectDropdown"
                            name="subject_id"
                            value={selectedValue}
                            onChange={e => setSelectedValue(e.target.value)}>
                            <option value="100">HTML</option>
                            <option value="200">CSS</option>
                            <option value="300">JavaScript</option>
                            <option value="400">Java</option>
                        </select>
                        <div className="d-flex align-items-center ms-4 height">
                            <Link to="/AddQuestions" className="me-2"><Button btnName="Add Ques" /></Link>
                            <Link to="/Login"><Button btnName="Logout" /></Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Question_id</th>
                            <th>Subject_id</th>
                            <th>Question</th>
                            <th>Option1</th>
                            <th>Option2</th>
                            <th>Option3</th>
                            <th>Option4</th>
                            <th>Correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizData.map(row => (
                            <tr key={row.question_id}>
                                <td>{row.question_id}</td>
                                <td>{row.subject_id}</td>
                                <td>{row.question_text}</td>
                                <td>{row.option1}</td>
                                <td>{row.option2}</td>
                                <td>{row.option3}</td>
                                <td>{row.option4}</td>
                                <td>{row.correct_option}</td>
                                <td><button className="btn btn-primary button small" onClick={()=>handleSubmit(row.subject_id,row.question_id)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
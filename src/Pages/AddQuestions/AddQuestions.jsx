import React, { useState } from 'react';
import './AddQuestions.css'
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
export default function AddQuestions(){
    const [formData, setFormData] = useState({
        questionId: '',
        subjectId: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_option: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/saveFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Data added successfully!");
        })
        .catch(error => {
            console.error('Error saving form data:', error);
        });
    };

    return (
        <div className="container ">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div >
                        <form  className="box-area box-style" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="questionId" placeholder="Question ID" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="subjectId" placeholder="Subject ID" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="question" placeholder="Question" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="option1" placeholder="Option 1" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="option2" placeholder="Option 2" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="option3" placeholder="Option 3" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="option4" placeholder="Option 4" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="correct_option" placeholder="Correct Answer Option Number" onChange={handleChange} />
                            </div>
                            <div className=" submit mb-3 text-center mb-5 d-flex">
                            <Button btnName="Save"/>  
                            <div className="me-3"></div>
                             <Link to="/QuestionsReview" ><Button btnName="Go Back"/></Link>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
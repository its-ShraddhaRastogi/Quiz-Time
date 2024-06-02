import React, { useState, useEffect } from 'react';
import './EditQuestions.css';
import Button from '../../Components/Button/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function EditQuestions() {
    const { subjectIDE, questionId } = useParams();
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [subjectIDE, questionId]);

    const fetchData = () => {
        const postData = {
            subject_id: subjectIDE,
            question_id: questionId
        };

        fetch('http://localhost:5000/retrieveEditQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                setFormData({
                    questionId: data.data.question_id,
                    subjectId: data.data.subject_id,
                    question: data.data.question_text,
                    option1: data.data.option1,
                    option2: data.data.option2,
                    option3: data.data.option3,
                    option4: data.data.option4,
                    correct_option: data.data.correct_option
                });
                setLoading(false);
            } else {
                console.error('No data found:', data);
                setLoading(false);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data to be submitted:', formData);

        fetch('http://localhost:5000/updateFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Save response:', data);
            alert("Data updated successfully!");
            navigate("/QuestionsReview");
        })
        .catch(error => {
            console.error('Error saving form data:', error);
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <form className="box-area box-style" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="questionId" placeholder="Question ID" onChange={handleChange} value={formData.questionId} disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="subjectId" placeholder="Subject ID" onChange={handleChange} value={formData.subjectId} disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="question" placeholder="Question" onChange={handleChange} value={formData.question} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="option1" placeholder="Option 1" onChange={handleChange} value={formData.option1} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="option2" placeholder="Option 2" onChange={handleChange} value={formData.option2} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="option3" placeholder="Option 3" onChange={handleChange} value={formData.option3} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="option4" placeholder="Option 4" onChange={handleChange} value={formData.option4} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="correct_option" placeholder="Correct Answer Option Number" onChange={handleChange} value={formData.correct_option} />
                                </div>
                                <div className="submit mb-3 text-center mb-5 d-flex">
                                    <Button btnName="Update"/>  
                                    <div className="me-3"></div>
                                    <Link to="/QuestionsReview"><Button btnName="Go Back"/></Link>  
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

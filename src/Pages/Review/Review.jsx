import React, { useState, useEffect, useContext } from 'react';
import './Review.css';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
export default function Review()  {
    const navigate = useNavigate();
    const { selectedAnswers, setSelectedAnswers,  subID, setSubID } = useContext(UserContext);
    const [attemptedQuizData, setAttemptedQuizData] = useState([]);
  
    useEffect(() => {
        fetchQuizData(subID);
    }, [subID]);

    useEffect(() => {
        console.log("Attempted quiz data:", attemptedQuizData);
    }, [attemptedQuizData]);

    const handleSubmit = async () => {
        navigate("/Score");
    }

    const fetchQuizData = (subjectId) => {
        console.log("fetch data called")
        fetch('http://localhost:5000/getBySubjectId', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subjectId })
        })
            .then(response => response.json())
            .then(data => {
                console.log("the data is", data.data);
                console.log("selected answers array", selectedAnswers)
                setAttemptedQuizData(data.data);
                console.log("attempted quiz data", attemptedQuizData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <>
        <div className="backButton">
                <button className="me-4 btn btn-primary button small" onClick={handleSubmit}>Go Back</button>
                </div>
        <div className="review-table">
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                        <th>Correct Answer</th>
                        <th>Your Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {attemptedQuizData.map((question, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'light-grey' : 'white'}>
                            <td>{question.question_text}</td>
                                <td>{question.option1}</td>
                                <td>{question.option2}</td>
                                <td>{question.option3}</td>
                                <td>{question.option4}</td>
                                <td>{question.correct_option}</td>
                                <td>{selectedAnswers[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

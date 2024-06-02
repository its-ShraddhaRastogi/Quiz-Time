import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import './Preview.css'
export default function Preview() {
    const { subjectIDE } = useParams();
    const navigate = useNavigate();
    const { selectedAnswers, setSelectedAnswers} = useContext(UserContext);
    const [attemptedQuizData, setAttemptedQuizData] = useState([])

    useEffect(() => {
        fetchQuizData(subjectIDE)
    }, [subjectIDE]);

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
                setAttemptedQuizData(data.data)
                console.log("attempquiz data", attemptedQuizData)

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const goBackToQuiz=(questionId)=>{
        console.log(questionId)
        navigate(`/Quiz/${subjectIDE}/${questionId}`)
    }

    return (
        <>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Option 1</th>
                            <th>Option 2</th>
                            <th>Option 3</th>
                            <th>Option 4</th>
                            <th>Selected Answer</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attemptedQuizData.map((question, index) => (
                            <tr key={index}>
                                <td>{question.question_text}</td>
                                <td>{question.option1}</td>
                                <td>{question.option2}</td>
                                <td>{question.option3}</td>
                                <td>{question.option4}</td>
                                <td>{selectedAnswers[index]}</td>
                                <td>
                                    <button className="me-4 btn btn-primary button small" onClick={()=>goBackToQuiz(index)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody> 
                </table>
                <div className="backButton">
                <button className="me-4 btn btn-primary button small" onClick={()=>goBackToQuiz(attemptedQuizData.length-1)}>Go Back To Submit</button>
                </div>
            </div>
        </>
    )
}
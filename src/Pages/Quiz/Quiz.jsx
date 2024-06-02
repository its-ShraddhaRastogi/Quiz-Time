import React, { useState, useEffect, useContext } from 'react';
import './Quiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function Quiz() {
    const navigate = useNavigate();
    const { subjectIDE = 0, questionId } = useParams();
    const ID = parseInt(subjectIDE)
    const id = parseInt(questionId);
    const [quizData, setQuizData] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(id || 0);
    const [attemptedQuestionsCount, setAttemptedQuestionsCount] = useState(0);
    const { loggedInUserName, setLoggedInUserName, score, setScore, selectedAnswers, setSelectedAnswers, subID, setSubID } = useContext(UserContext);
    const subjectId = ID;

    useEffect(() => {
        fetchQuizData(ID)
    }, [subjectId]);

    useEffect(() => {
        const count = selectedAnswers.filter(answer => answer !== null).length;
        setAttemptedQuestionsCount(count);
        console.log(count);
    }, [selectedAnswers]);

    const fetchQuizData = (subjectId) => {
        console.log("fetch data called")
        setSubID(subjectId);
        fetch('http://localhost:5000/getBySubjectId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subjectId })
        })
            .then(response => response.json())
            .then(data => {
                console.log("the data is")
                setQuizData(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleAnswerSelection = (answer) => {
        console.log(answer)
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[questionIndex] = answer;
        setSelectedAnswers(updatedSelectedAnswers);

    };

    const showPreview = () => {
        navigate(`/${subjectId}`);
    }

    const handlePreviousQuestion = () => {
        setQuestionIndex(prevIndex => Math.max(0, prevIndex - 1));

    };

    const handleNextQuestion = () => {
        setQuestionIndex(prevIndex => Math.min(quizData.length - 1, prevIndex + 1));
    };

    const saveAnswer = () => {

        const confirmed = window.confirm(`You have attempted ${attemptedQuestionsCount}/${quizData.length} questions. Are you sure you want to submit?`);
        if (confirmed) {
            fetch('http://localhost:5000/checkAnswers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selectedAnswers, subjectId })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message)
                    console.log(data.count)
                    setScore(data.count);
                    console.log("array of the user answers is:", selectedAnswers)
                    navigate("/Score")
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    useEffect(() => {
        console.log("your score is", score);
    }, [score]);

    console.log(selectedAnswers);
    return (
        <div className="App">
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <img className="navbar-brand me-2"
                            src="/assests/quizLogo.jpg"
                            height="60"
                            alt="Logo"
                        />
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2">
                                <li className="nav-item">
                                    <p className="nav-link">{ }</p>
                                </li>
                                <li className="nav-item mt-1">
                                    <h5 className="nav-link">Questions Attempted: {attemptedQuestionsCount}/{quizData.length}</h5>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center username-style">
                                <p><b>&#x1F464;{loggedInUserName}</b></p>
                            </div>
                        </div>
                    </div>
                </nav>
                <section className="container question-display">
                    <div className="mb-4">
                        <h2>Question {questionIndex + 1}</h2>
                        <p style={{ textAlign: "left" }}>{quizData[questionIndex]?.question_text}</p>
                        <li style={{ textAlign: "left", padding: '8px' }}>
                            <input
                                type="radio"
                                id="option1"
                                name="answer"
                                value={1}
                                onChange={() => handleAnswerSelection(1)}
                                checked={selectedAnswers[questionIndex] === 1}
                            />
                            <label htmlFor="option1" className="ms-2">{quizData[questionIndex]?.option1}</label>
                        </li>
                        <li style={{ textAlign: "left", padding: '8px' }}>
                            <input
                                type="radio"
                                id="option2"
                                name="answer"
                                value={2}
                                onChange={() => handleAnswerSelection(2)}
                                checked={selectedAnswers[questionIndex] === 2}
                            />
                            <label htmlFor="option2" className="ms-2">{quizData[questionIndex]?.option2}</label>
                        </li>
                        <li style={{ textAlign: "left", padding: '8px' }}>
                            <input
                                type="radio"
                                id="option3"
                                name="answer"
                                value={3}
                                onChange={() => handleAnswerSelection(3)}
                                checked={selectedAnswers[questionIndex] === 3}
                            />
                            <label htmlFor="option3" className="ms-2">{quizData[questionIndex]?.option3}</label>
                        </li>
                        <li style={{ textAlign: "left", padding: '8px' }}>
                            <input
                                type="radio"
                                id="option4"
                                name="answer"
                                value={4}
                                onChange={() => handleAnswerSelection(4)}
                                checked={selectedAnswers[questionIndex] === 4}
                            />
                            <label htmlFor="option4" className="ms-2">{quizData[questionIndex]?.option4}</label>
                        </li>
                    </div>
                    <div className="button-container">
                        <div className="button-container">
                            <button onClick={handlePreviousQuestion} className="me-4 btn btn-primary button small" style={{ display: questionIndex === 0 ? 'none' : 'block' }}>Previous Question</button>
                            <button onClick={handleNextQuestion} className=" btn btn-primary button small" style={{ display: questionIndex === quizData.length - 1 ? 'none' : 'block' }}>Next Question</button>
                        </div>
                        <div className="button-container">
                            <button onClick={saveAnswer} className="me-4 btn btn-primary button small" style={{ display: questionIndex === quizData.length - 1 ? 'block' : 'none' }}>Submit</button>
                            <button className="btn btn-primary button small" onClick={showPreview}>Preview</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

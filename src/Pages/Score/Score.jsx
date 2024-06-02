import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './Score.css';
export default function Score() {
    const navigate = useNavigate();
    const { loggedInUserName, score } = useContext(UserContext);
    const handleSubmit = async () => {
        navigate("/Review");
    }
    const handleSubmit2 = async () => {
        navigate("/Login");
    }
    return (
        <>
        <div className="backButton">
                <button className="me-4 btn btn-primary button small1" onClick={handleSubmit2}>Log Out</button>
                </div>
            <section>
                <div style={{ marginTop: '3%' }} className="container">
                    <div className="row mb-2">
                        <div className="col-md-4 mx-auto">
                            <div className="card text-center rounded-5 p-3 shadow box-area">
                                <div className="card-header bg-white image">
                                    <img src="./assests/hurray.jpeg" className="card-img-top" alt="Image" />
                                </div>
                                <div className="card-body mb-1">
                                    <h5 className="card-title">Your Test Has Been Submitted Successfully! &#9989;</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container  rounded-3 p-3 bg-white shadow mx-auto score-box" >
                        <div className="text-center">
                            <h5>Your Score:{score}</h5>
                        </div>
                    </div>
                    <div className="container1">
                    <div>
                        <button className="me-4 btn btn-primary button small" onClick={handleSubmit}>Review Anwers</button>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}
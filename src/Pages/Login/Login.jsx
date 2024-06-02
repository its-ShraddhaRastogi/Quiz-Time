
import React, { useState, useContext, useEffect } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Button from '../../Components/Button/Button';
import { url } from '../config';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const { loggedInUserName, setLoggedInUserName } = useContext(UserContext);
    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async () => {

        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, userEmail, password })
            });

            const data = await response.json();

            if (data.success) {
                console.log(data)
                console.log(data.name);
                if (data.userType === 'admin') {
                    setLoggedInUserName(data.name)
                    navigate("/QuestionsReview");
                } else if (data.userType === 'user') {
                    setLoggedInUserName(data.name)
                    navigate("/Instructions");
                    console.log("success in login");
                } else {
                    console.log(data.userType);
                    setMessage('Invalid user type');
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };
    const emailRegex = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (!regex.test(email)) {
            setMessage("Invalid email format");
            return false;
        } else {
            setMessage(""); 
            return true;
        }
    };

    return (
        <>
            <div className="outerBox">
                <div className="container d-flex justify-content-center align-items-center mt-5">
                    <div className="row border rounded-2 border-shadow-color box-area">
                        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column left-box1 px-0">
                            <img src="./assests/quizImg.jpg" className="image_style" alt="Quiz" />
                        </div>
                        <div className="col-md-6 p-2 right-box">
                            <div className="row align-items-center pl-4 d-flex justify-content-center align-items-center flex-column left-box2">
                                <p className=" fs-2 text-center login-box-style ">Here We Go!</p>
                                <form className="text-center mb-2">
                                    <div className="mb-1">
                                        <InputForm
                                            type="text"
                                            id="name"
                                            placeholder="👤 Enter Name"
                                            value={userName}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <InputForm
                                            type="text"
                                            id="email"
                                            placeholder="📧 Enter Mail"
                                            value={userEmail}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                const isValidEmail = emailRegex(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <InputForm
                                            type="password"
                                            id="password"
                                            placeholder="🔒 Enter Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            visibility={true}
                                        />
                                    </div>
                                </form>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <Button
                                        onClick={handleSubmit}
                                        btnName="Login"
                                        />
                                </div>

                                <div id="loginMessage" className="text-center">
                                    {message && <p className="text-danger">{message}</p>}
                                </div>
                                <div className="d-flex justify-content-center align-items-center text-style">
                                    <Link to="/ForgotPassword"><p className="me-5 link-style">Password?</p></Link>
                                    <Link to="/SignUp"><p className="link-style">Sign Up?</p></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
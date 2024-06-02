import React, { useState, useEffect } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import Button from '../../Components/Button/Button';
import { url } from '../config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userOtp, setUserOtp] = useState(0);
    const [otpEntered, setOtpEntered] = useState('');
    const [userEnteredPassword, setUserEnteredPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userTypeSelected, setUserTypeSelected] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showValidationFields, setShowValidationFields] = useState(false);
    const [showDetailsInputFields, setShowDetailsInputFields] = useState(true);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [bgButton, setBgButton] = useState(false);
    var otp;


    const validateInputs = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let isValid = true;

        if (userName.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        if (userEmail.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        } else if (!emailPattern.test(userEmail)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }

        return isValid;
    };

    const sendEmail = async () => {
        if (!validateInputs()) {
            return;
        }
        otp = Math.floor(1000 + Math.random() * 9000);
        setUserOtp(otp);
        await new Promise(resolve => setTimeout(resolve, 0));
        const response = await fetch(`${url}/checkEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail })
        });
        const data = await response.json();
        if (data.exists) {
            setEmailError('Email already exists');
            return false;
        }
        return true;
    };

    const handleSendOtp = async (e) => {
        console.log("send button clicked")
        console.log(userEmail)
        console.log(userName)
        const isValid = await sendEmail();

        if (isValid) {
            setBgButton(true)
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowDetailsInputFields(false)
            setShowValidationFields(true)
            await userDetailsValidation();
        }
    };

    const userDetailsValidation = async () => {
        const isValidEmail = await sendEmail();
        console.log("the usestste otp is",userOtp);
        if (isValidEmail) {
            const formData = {
                userName: userName,
                userEmail: userEmail,
                userOtp: otp
            };
            const response = await fetch('http://localhost:5000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                console.log("data saved")
            } else {
                console.error(data.message);
            }
        }
    };

    const validateOTP = async () => {
        const response = await fetch('http://localhost:5000/checkOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, userEmail, otpEntered })
        });
        const data = await response.json();
        if (data.success) {
            setShowPasswordFields(true);
        } else {
            setOtpError('Invalid OTP');
        }
    };

    const validatePasswords = () => {
        if (userEnteredPassword !== userConfirmPassword) {
            setPasswordError('Passwords do not match');
            return false;
        }

        if (userEnteredPassword.length < 8) {
            setPasswordError('Password should be at least 8 characters long');
            return false;
        }

        const regex = {
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /[0-9]/,
            special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
        };

        let strength = 0;

        if (regex.uppercase.test(userEnteredPassword)) {
            strength++;
        }

        if (regex.lowercase.test(userEnteredPassword)) {
            strength++;
        }

        if (regex.number.test(userEnteredPassword)) {
            strength++;
        }

        if (regex.special.test(userEnteredPassword)) {
            strength++;
        }

        if (strength < 3) {
            setPasswordError('Password should contain at least 3 of the following: uppercase letter, lowercase letter, number, special character');
            return false;
        }

        return true;
    };

    const setUserPassword = async () => {
        const isValidPassword = validatePasswords();
        if (isValidPassword) {
            const response = await fetch('http://localhost:5000/savePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userConfirmPassword, userTypeSelected, userEmail })
            });
            const data = await response.json();
            if (data.success) {
                navigate("/Login")
            } else {
                setPasswordError('Cannot login');
            }
        }
    };
    const emailRegex = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!regex.test(email)) {
            setEmailError("Invalid email format");
            return false;
        } else {
            setEmailError("");
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
                                <p className=" fs-2 text-center login-box-style ">SignUp</p>
                                <div id="initialFields" className="text-center mb-4" style={{ display: !showPasswordFields ? 'block' : 'none' }}>
                                <div id="detailsInputFields" style={{ display: showDetailsInputFields ? 'block' : 'none' }}>
                                    <form id="userDetails">
                                        <div className="mb-1">
                                            <InputForm
                                                type="text"
                                                id="userName"
                                                placeholder="👤 Enter Name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                            <div id="nameError" className="text-danger">{nameError}</div>
                                        </div>
                                        <div className="mb-1">
                                            <InputForm
                                                type="text"
                                                id="userEmail"
                                                placeholder="📧 Enter Mail"
                                                value={userEmail}
                                                onChange={(e) => {
                                                    setUserEmail(e.target.value);
                                                    const emailValidation = emailRegex(e.target.value);
                                                }
                                                }
                                            />
                                            <div id="emailError" className="text-danger">{emailError}</div>
                                        </div>
                                    </form>
                                    <div className="mb-3 d-flex justify-content-center">
                                        <Button
                                            status={bgButton}
                                            onClick={handleSendOtp}
                                            btnName="&#128231;SEND OTP"
                                        />
                                    </div>
                                    </div>
                                <div id="otpValidationFields" style={{ display: showValidationFields ? 'block' : 'none' }}>
                                        <div className="mb-1">
                                            <InputForm
                                                type="text"
                                                id="otp"
                                                placeholder="🔓 OTP"
                                                value={otpEntered}
                                                onChange={(e) => setOtpEntered(e.target.value)} />
                                            <div id="otpError" className="text-danger">{otpError}</div>
                                        </div>
                                        <div className="mb-1 text-center">
                                            <Button
                                                onClick={validateOTP}
                                                btnName="✅ Validate"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id="passwordFields" style={{ display: showPasswordFields ? 'block' : 'none' }}>
                                   <div className="mb-1 text-center">
                                        <InputForm
                                            type="password"
                                            id="enterPassword"
                                            placeholder="Enter Password"
                                            value={userEnteredPassword}
                                            onChange={(e) => setUserEnteredPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-1 text-center">
                                        <InputForm
                                            type="password"
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={userConfirmPassword}
                                            onChange={(e) => setUserConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3 text-center">
                                        <select id="userType" value={userTypeSelected} onChange={(e) => setUserTypeSelected(e.target.value)}>
                                            <option>User Type</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                    <div className="mb-1 text-center">
                                        <Link to="Login">
                                            <Button
                                                btnName="➡️ Login"
                                                onClick={(e) => setUserPassword(e)} /></Link>
                                        <div id="passwordError" className="text-danger">{passwordError}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
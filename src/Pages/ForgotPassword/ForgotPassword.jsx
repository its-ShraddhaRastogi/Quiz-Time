import React, { useState } from 'react';
import InputForm from '../../Components/InputForm/InputForm';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [otpEntered, setOtpEntered] = useState('');
    const [userEnteredPassword, setUserEnteredPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userTypeSelected, setUserTypeSelected] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [bgButton, setBgButton] = useState(false);


    const validateEmail = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!userEmail.trim()) {
            setEmailError('Email is required');
            return false;
        } else if (!emailPattern.test(userEmail)) {
            setEmailError('Invalid email format');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const sendEmail = () => {
        console.log("hello");
        if (!validateEmail()) {
            return;
        }
        setUserOtp(Math.floor(Math.random() * 100000));
        var params = {
            otp: userOtp,
        };
        return fetch('http://localhost:5000/checkEmailExistance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail })
        })
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    updateUserOtp()
                } else {
                    setEmailError(data.message)
                }
            })
            .catch(error => {
                console.error('Error checking email:', error);
                return false;
            });
    };

    const updateUserOtp = () => {
        fetch('http://localhost:5000/updateOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userOtp, userEmail })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setBgButton(true)
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error sending otp:', error);
            });
    };

    const validateOTP = () => {
        if (!otpEntered.trim()) {
            setOtpError('Please enter OTP');
            return;
        } else {
            setOtpError('');
        }
        console.log("Entered OTP:", otpEntered);
        console.log("Generated OTP:", userOtp);

        fetch('http://localhost:5000/checkUpdatedOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail, otpEntered })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setShowPassword(true)
                } else {
                    console.error(data.message);
                    setOtpError('Invalid OTP');
                }
            })
            .catch(error => {
                console.error('Error validating OTP:', error);
                setOtpError('Error validating OTP');
            });
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

        setPasswordError('');
        return true;
    };

    const setUserPassword = () => {
        if (!validatePasswords()) {
            return;
        }

        fetch('http://localhost:5000/savePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userConfirmPassword, userTypeSelected, userEmail })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    navigate("/Login");
                } else {
                    console.log(data.message);
                    setPasswordError('Cannot login');
                }
            })
            .catch(error => {
                console.error('Error saving password:', error);
                setPasswordError('Error saving password');
            });
    };


    return (
        <>
            <section>
                <div className="outerBox">
                    <div className="container d-flex justify-content-center align-items-center" style={{ margin: '70px auto' }}>
                        <div className="row border rounded-5 p-1 bg-white" style={{ boxShadow: '0 0 10px rgb(248, 227, 181)' }}>
                            <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                                style={{ background: '#ffa500' }}>
                                <div className="featured-image" style={{ marginTop: '20px' }}>
                                    <img src="./assests/forgotPassword.jpg" className="image-fluid centered-image mb-3" alt="Forgot Password Image" />
                                </div>
                            </div>
                            <div className="col-md-6 right-box ">
                                <div className="row align-items-center pl-4">
                                    <p className="text-black fs-2 text-center"
                                        style={{ fontFamily: 'Courier New', fontWeight: 600 }}>&#128274; Password?</p>
                                    {!showPassword && (
                                        <div id="checkEmailFields ">
                                            <div className="mb-3 text-center">
                                                <InputForm style={{ marginBottom: '20px' }}
                                                    type="text"
                                                    id="userEmail"
                                                    placeholder="&#128231; Enter Mail"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)} />
                                                <div className="text-danger">{emailError}</div>
                                            </div>
                                            <div className="mb-3 text-center">
                                                <Button status={bgButton} id="button" value="SEND OTP" onClick={sendEmail} btnName="&#128231; SEND OTP" />
                                            </div>
                                            <div className="mb-1 text-center">
                                                <InputForm style={{ marginBottom: '7px' }}
                                                    type="text"
                                                    id="otp"
                                                    placeholder="&#x1F513;OTP"
                                                    value={otpEntered}
                                                    onChange={(e) => setOtpEntered(e.target.value)} />
                                                <div className="text-danger">{otpError}</div>
                                            </div>
                                            <div className="mb-1 text-center">
                                                <Button id="validateButton" value="OTP" onClick={validateOTP} btnName="&#10003; Validate" />
                                            </div>
                                        </div>
                                    )}
                                    {showPassword && (
                                        <div id="setPasswordFields">
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
                                                <select id="userType" className="user-type"
                                                    value={userTypeSelected} onChange={(e) => setUserTypeSelected(e.target.value)}>
                                                    <option>User Type</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>
                                            <div className="mb-1 text-center">
                                                <Button
                                                    id="loginButton"
                                                    value="login"
                                                    onClick={setUserPassword}
                                                    btnName="&#8658; Login" />
                                                <div className="text-danger">{passwordError}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

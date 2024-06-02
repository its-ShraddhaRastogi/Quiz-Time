import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Instructions.css"; 

export default function Instructions() {
  const { loggedInUserName, setLoggedInUserName, setSelectedAnswers } =
    useContext(UserContext);
  const navigate = useNavigate();
  const handleNav = (value) => {
    navigate(value);
    setSelectedAnswers([]);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img
            className="navbar-brand me-2"
            src="./assests/quizLogo.jpg"
            height="60"
            alt="Logo"
          />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-buttons">
              <li className="nav-item">
                <button
                  className="navbar-button"
                  onClick={() => handleNav("/Quiz/100")}
                >
                  HTML
                </button>
              </li>
              <li className="nav-item">
                  <button className="navbar-button"
                  onClick={() => handleNav("/Quiz/200")}>CSS</button>
              </li>
              <li className="nav-item">
                  <button className="navbar-button"
                  onClick={() => handleNav("/Quiz/300")}>JavaScript</button>
              </li>
              <li className="nav-item">
                  <button className="navbar-button"
                  onClick={() => handleNav("/Quiz/400")}>JAVA</button>
              </li>
            </ul>
            <div className="navbar-right d-flex align-items-center">
              <p className="navbar-username username-style">
                &#x1F464;{loggedInUserName}
              </p>
            </div>
          </div>
        </div>
      </nav>
      <section className="container instructions-container">
        <h4 className="font-style">Instructions:</h4>
        <ol>
          <li>
            The quiz consists of questions carefully designed to help you
            self-assess your comprehension...
          </li>
          <li>
            The quiz consists of questions carefully designed to help you
            self-assess your comprehension of the information presented on the
            topics covered in the module.
          </li>
          <li>
            Each question in the quiz is of multiple-choice. Read each question
            carefully, and click on the button to submit your response.
          </li>
          <li>
            For each question you will be given a time period of one minute.
          </li>
          <li>
            Each correct question will be given a point. There is no negative
            marking.
          </li>
          <li>
            After responding to a question, click on the "Next Question" button
            at the bottom to go to the next questino. After responding to the
            10th question, click on "Submit" to exit the quiz.
          </li>
          <li>
            From the above make a choice of the subject by clicking and you are
            ready to start!
          </li>
        </ol>
      </section>
    </>
  );
}

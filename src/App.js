
import './App.css';
import React, { useState, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login/Login';
import Layout from './Pages/Layout/Layout';
import Welcome from './Pages/Welcome/Welcome';
import SignUp from './Pages/SignUp/SignUP'
import Quiz from './Pages/Quiz/Quiz';
import Instructions from './Pages/Instructions/Instructions';
import Score from './Pages/Score/Score';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import QuestionsReview from './Pages/QuestionsReview/QuestionsReview';
import Preview from './Pages/Preview/Preview';
import Review from './Pages/Review/Review';
import AddQuestions from './Pages/AddQuestions/AddQuestions';
import EditQuestions from './Pages/EditQuestions/EditQuestions';
import ContactUs from './Pages/ContactUs/ContactUs';
import About from './Pages/About/About';

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Welcome/>,
      },
      {
        path: "/Login",
        element: <Login/>,
      },
      {
        path:"/SignUp",
        element:<SignUp/>
      },
      {
        path:"/ForgotPassword",
        element:<ForgotPassword/>
      },
      {
        path:"/ContactUs",
        element:<ContactUs/>
      },
      {
        path:"/About",
        element:<About/>
      }
      
    ],
  },
  {
    path:"/QuestionsReview",
    element:<QuestionsReview/>
  },
  {
    path:"/AddQuestions",
    element:<AddQuestions/>
  },
 
  {
    path:"/Instructions",
    element:<Instructions/>
  },
  {
    path:"/Score",
    element:<Score/>
  },
  {
    path:"/:subjectIDE",
    element:<Preview/>
  },
  {
    path:"/Quiz/:subjectIDE",
    element:<Quiz/>
  },
  {
    path:"/Quiz/:subjectIDE/:questionId",
    element:<Quiz/>
  },
  {
    path:"/Review",
    element:<Review/>
  },
  {
    path:"/EditQuestions/:subjectIDE/:questionId",
    element:<EditQuestions/>
  }
]);
export const UserContext=createContext();

function App() {
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const[ score, setScore]=useState(0);
  const [subID, setSubID] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  return (
    <>
    <UserContext.Provider value={{loggedInUserName,setLoggedInUserName, score, setScore,selectedAnswers, setSelectedAnswers, subID, setSubID}}>
    <RouterProvider router={route}>
      </RouterProvider>
  </UserContext.Provider>
  </>
  );
}

export default App;

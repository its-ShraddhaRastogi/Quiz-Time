import Button from "../../Components/Button/Button";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
export default function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white  sticky-top">
                <div className="container">
                    <img className="navbar-brand me-2"
                        src={props.image}
                        height="60"
                        alt="Logo"
                        loading="lazy"
                        style={{ marginTop: "-1px", marginLeft: "-40px" }}
                    />
                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/About" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/ContactUs" className="nav-link">Contact Us</Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <Link to="Login" className="me-3"><Button btnName="Login" /></Link>
                            <Link to="SignUp"><Button btnName="Sign Up" /></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}


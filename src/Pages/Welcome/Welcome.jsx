
import React from 'react';
import './Welcome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoCard from "../../Components/InfoCard/InfoCard";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <div className="header-section">
                <img
                    src="./assests/quizWallpaperImage.jpg"
                    height="200"
                    alt="Logo"
                    loading="lazy"
                    className="logo-image"
                />
                <div className="text-overlay">
                    <h1>Welcome</h1>
                    <p>Challenge Your Mind, Expand Your Horizons</p>
                </div>
            </div>
            <div className="info-cards-container">
                <InfoCard
                    className="info-card"
                    title="Mission"
                    image="./assests/our_mission.jpg"
                    content="To provide an engaging platform that fosters learning, curiosity, and intellectual growth through interactive quizzes. We aim to empower individuals of all ages to explore diverse topics, challenge themselves, and expand their knowledge in a fun and accessible manner."
                />
                <InfoCard
                    className="info-card"
                    title="Vision"
                    image="./assests/our_vision.jpg"
                    content="Our vision is to become the go-to destination for quiz enthusiasts worldwide, offering a vast repository of thought-provoking quizzes across various subjects and interests. We aspire to create a vibrant community of learners who are passionate about continuous self-improvement and sharing knowledge."
                />
                <InfoCard
                    className="info-card"
                    title="Values"
                    image="./assests/our_values.jpg"
                    content="At our core, we value excellence, accessibility, integrity, and community. We believe in fostering a culture of curiosity and lifelong learning while prioritizing fun and continuous improvement. Our commitment to these values guides us in providing engaging quizzes, fostering inclusivity, and creating a supportive environment where individuals can connect, learn, and grow together."
                />
            </div>
        </div>
    );
}

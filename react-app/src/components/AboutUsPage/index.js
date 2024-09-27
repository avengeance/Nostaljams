import React from 'react';
import './AboutUs.css';
import userImgPlaceholder from './user-placeholder-guy.jpg';
const creators = [
    {
        name: 'Geryko Menta',
        github: 'https://github.com/glmenta',
        linkedin: 'https://www.linkedin.com/in/geryko-menta-36a0b0215/',
        // website: 'https://geryko-website.com',
        image: userImgPlaceholder,
    },
    {
        name: 'Jesse Fernandez',
        github: 'https://github.com/00jferna',
        linkedin: 'https://www.linkedin.com/in/jessejfernandez/',
        // website: 'https://google.com',
        image: userImgPlaceholder,
    },
    {
        name: 'Calvin Le',
        github: 'https://github.com/avengeance',
        linkedin: 'https://www.linkedin.com/in/calvin-le-442162140/',
        // website: 'https://google.com',
        image: userImgPlaceholder,
    },
];

const CreatorCard = ({ creator }) => (
    <div className="creator-card">
        <img src={creator.image} alt={creator.name} className="creator-image" />
        <h3>{creator.name}</h3>
        <a href={creator.github} target="_blank" rel="noreferrer">GitHub</a>
        <br />
        {creator.linkedin ? (
            <a href={creator.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        ) : (
            <button onClick={() => alert('LinkedIn - Work in progress')}>LinkedIn</button>
        )}
        <br />
        {creator.website ? (
            <a href={creator.website} target="_blank" rel="noreferrer">Personal Website</a>
        ) : (
            <button onClick={() => alert('Personal Website - Work in progress')}>Personal Website</button>
        )}
    </div>
);


const AboutUs = () => (
    <div className="about-us-container">
        <h2>About Us</h2>
        <div className="creators-container">
        {creators.map(creator => (
            <CreatorCard key={creator.name} creator={creator} />
        ))}
        </div>
    </div>
);

export default AboutUs;

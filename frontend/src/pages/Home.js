import React from 'react';
import './Home.css';
import profilePhoto from '../assets/profile.jpg';
import schoolLogo1 from '../assets/logo1.png';
import schoolLogo2 from '../assets/logo2.png';
import schoolLogo3 from '../assets/logo3.png';
import schoolLogo4 from '../assets/logo4.jpeg';
import schoolLogo5 from '../assets/logo5.jpeg';

const Home = () => {
  return (
    <section id="home">
      <div className="home-container">
     
        <div className="top-content">
          <div className="photo-block">
            <img src={profilePhoto} alt="Yikan" className="profile-photo" />
          <div className="school-logos">
              <img src={schoolLogo1} alt="School 1" className="school-logo" />
              <img src={schoolLogo2} alt="School 2" className="school-logo" />
              <img src={schoolLogo3} alt="School 3" className="school-logo" />
              <img src={schoolLogo4} alt="School 4" className="school-logo" />
              <img src={schoolLogo5} alt="School 5" className="school-logo" />
            </div>
        
          </div>
          <div className="bio-block">
            <h2>It's me...</h2>
            <ul>
              
              <li>Occupation: Construction Inspector</li>
              <li>Education: Master of Science in Computer Science</li>
              <li>Education: Bachelor of Engineering in Civil Engineering</li>
              <li>Location: Toronto, Canada</li>
              <li>Language: English, Chinese, Korean</li>

    
            </ul>
          </div>
        </div>
        <div className="bottom-content">
          <div className="skills-block">
            <h2>About Me...</h2>
            <p>Hello! My name is Yikan. I have a diverse educational background with 
              a Master's degree in Computer Science and a Bachelor's degree in Civil 
              Engineering. My journey began with a diploma program in civil engineering. 
              After graduation, I started my career as a construction inspector. 
              Simultaneously, I worked and studied to complete my Bachelor's degree 
              in Civil Engineering.</p>
            <p>As my life and financial situation stabilized, I decided to pursue my 
              childhood dream of studying computer science. I was fortunate to be 
              accepted into a Master's program in Computer Science, which 
              I completed while working full-time.</p>
            <p>While I am proud of my dual skills in civil engineering and computer
               science, I am still exploring ways to combine these fields to 
               make a unique impact. I am passionate about DIY computer-related 
               projects and constantly seek new ideas to leverage my dual background.</p>
            <p>This personal website is my platform to track my goals and showcase 
              my projects. It is continuously growing and becoming more content-rich.
               Feel free to contact me if you have any ideas on how I can better 
               utilize my dual skills or if you just want to connect.</p>     
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

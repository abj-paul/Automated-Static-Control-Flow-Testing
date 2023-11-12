import React from 'react';
import './LandingPage.css';
import Button from './Button';

const LandingPage = () => {
  return (
    <div className="divided-container">
      <div className="left-side">
        <Button><a href="/data-flow-testing">Perform Static Data Flow Testing</a></Button><br /><hr /><br />
        <Button><a href="/control-flow-testing">Perform Static Control Flow Testing</a></Button><br /><hr /> <br />
        <Button><a href="https://github.com/abj-paul/Automated-Static-Control-Flow-Testing/blob/main/User-Manual.org">View User Manual</a></Button><br /><hr /><br />
      </div>
      <div className="right-side">
        <img src="./logo.jpg" alt="Logo" /><br /><hr /><br />
        <Button><a href="https://github.com/abj-paul/Automated-Static-Control-Flow-Testing/blob/main/README.org">View Project Features</a></Button>
      </div>
    </div>
  );
};

export default LandingPage;
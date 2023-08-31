import React, { useState } from "react";
import "../../../../styles/Registration/SignUp/SectionRight/Home.scss";
import polygon1 from "./icon/Polygon1.svg";
import polygon2 from "./icon/Polygon2.svg";
import user from "./icon/user.svg";
import briefcase from "./icon/briefcase.svg";
import { NavLink } from "react-router-dom";

const SectionRight = ({ setHome, setPersonalInfo, setCaseSignup }) => {
  const clickHandler = (e) => {
    setErrorCode(true);
    if (code == "2914") {
      setErrorCode(false);
      setHome(false);
      setPersonalInfo(true);
      setCaseSignup(e);
    }
  };
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState();
  const [errorCode, setErrorCode] = useState(false);
  return (
    <div className="homeSectionRight">
      <div className="headerSignIn">
        <span>
          Already have an account? <NavLink to={"/Signin"}>Sign In</NavLink>
        </span>
      </div>
      <div className="selectForm">
        <div className="header">
          <h1>Join Us!</h1>
          <span>
            To begin this journey, tell us what type of account you’d be
            opening.
          </span>
        </div>
        <div className="box" onClick={() => clickHandler("user")}>
          <div className="icon">
            <img src={polygon1} alt="polygon1"/>
            <img src={user} alt="user"/>
          </div>
          <div className="contentBox">
            <h1>Individual</h1>
            <p>Personal account to manage all you activities.</p>
          </div>
          <div className="backgroundIcon"></div>
        </div>
        <div className="box" onClick={() => setShowCode(true)}>
          <div className="icon">
            <img src={polygon2} alt="polygon2"/>
            <img src={briefcase} alt="briefcase"/>
          </div>
          <div className="contentBox">
            <h1>Business</h1>
            <p>Own or belong to a company, this is for you.</p>
          </div>
          <div className="backgroundIcon"></div>
        </div>
      </div>
      {showCode && (
        <div className="enterCode">
          <div className="code">
            <h1>Add the key to continue</h1>
            <input
              type="password"
              placeholder="Enter the code"
              onChange={(e) => setCode(e.target.value)}
              className={errorCode && 'errorInput'}
            />
            <button onClick={() => clickHandler("admin")}>Check code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionRight;

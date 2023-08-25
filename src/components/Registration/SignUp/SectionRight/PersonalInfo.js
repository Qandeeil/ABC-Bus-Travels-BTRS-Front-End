import React, { useState } from "react";
import "../../../../styles/Registration/SignUp/SectionRight/PersonalInfo.scss";
import Header from "./Header";
import TextInput from "./TextInput";
import Button from "./Button";
import { useSelector } from "react-redux";

const PersonalInfo = (props) => {
  const { setHome, setPersonalInfo, screen, setResidencyInfo, caseSignup } = props;
  const [fullname, setFullname] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checkbox, setCheckbox] = useState(false);

  const [errorFullname, setErrorFullname] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorCheckbox, setErrorCheckbox] = useState(false);

  const { users } = useSelector((state) => state);

  return (
    <div className="PersonalInfoSectionRight">
      <Header
        setHome={setHome}
        setPersonalInfo={setPersonalInfo}
        screen={screen}
        title={"Personal Info."}
        pageNumber={"01"}
      />
      <form>
        <h1>Register Individual Account!</h1>
        <p>
          For the purpose of industry regulation, your details are required.
        </p>
        <TextInput
          title="Your fullname*"
          type="text"
          placeholder="Enter your fullname"
          getValue={setFullname}
          value={fullname}
          error={errorFullname}
          messageError={"Name is required"}
        />
        <TextInput
          title="Your username*"
          type="username"
          placeholder="Enter your username"
          getValue={setUsername}
          value={username?.replace(/\s/g, "").toLowerCase()}
          error={errorUsername}
          checkDatabase={users?.createAccount?.checkUsername}
          messageDatabase={users?.createAccount?.message}
          messageError={"Please enter a valid username"}
        />
        <TextInput
          title="Email address*"
          type="email"
          placeholder="Enter email address"
          getValue={setEmail}
          value={email}
          error={errorEmail}
          checkDatabase={users?.createAccount?.checkEmail}
          messageDatabase={users?.createAccount?.message}
          messageError={"please enter a valid email address"}
        />
        <TextInput
          title="Create password*"
          type="password"
          placeholder="Enter your password"
          getValue={setPassword}
          value={password}
          error={errorPassword}
          messageError={"Please enter a password of at least 6 characters"}
        />
        <label
          htmlFor="checkBoxSignUp"
          className="checkBox"
          onChange={(e) => setCheckbox(e.target.checked)}
        >
          <input type="checkbox" id="checkBoxSignUp" />
          <span className={errorCheckbox && "errorSpanInput"}>
            I agree to terms & conditions
          </span>
        </label>
        <Button
          setResidencyInfo={setResidencyInfo}
          setPersonalInfo={setPersonalInfo}
          setHome={setHome}
          title={"Registration"}
          fullname={fullname}
          username={username}
          email={email}
          password={password}
          checkbox={checkbox}
          setErrorFullname={setErrorFullname}
          setErrorUsername={setErrorUsername}
          setErrorEmail={setErrorEmail}
          setErrorPassword={setErrorPassword}
          setErrorCheckbox={setErrorCheckbox}
          caseSignup = {caseSignup}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;

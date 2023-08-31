import React, { useEffect, useState } from "react";
import "../../../../styles/Registration/SignIn/SectionRight/Form.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../../../store/Registration/Login";
import useLocalStorage from "use-local-storage";

const Form = () => {
  const [, setDataAccount] = useLocalStorage("DataAccount", null);
  const { Login } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [emailORusername, setEmailORusername] = useState();
  const [password, setPassword] = useState();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const LoginHandler = (e) => {
    e.preventDefault();
    !emailORusername ? setErrorEmail(true) : setErrorEmail(false);
    !password ? setErrorPassword(true) : setErrorPassword(false);
    if (emailORusername && password?.length > 0) {
      const Data = {
        username: emailORusername,
        email: emailORusername,
        password: password,
      };
      setErrorEmail(false);
      setErrorPassword(false);
      dispatch(loginAccount(Data));
    }
  };

  useEffect(() => {
    setDataAccount(Login?.isLogin?.DataAccount);
  }, [Login, setDataAccount]);

  return (
    <div className="formSectionRight">
      <div className="headerSignUn">
        <span>
          Already have an account?{" "}
          <NavLink to={"/Registration"}>Sign Up</NavLink>
        </span>
      </div>
      <form onSubmit={LoginHandler}>
        <h1>Account Login</h1>
        <p>
          If you are already a member you can login with your email address and
          password.
        </p>
        <div
          className={
            errorEmail || (Login.isLogin && !Login?.isLogin?.isLoginEmail)
              ? "container errorContainer"
              : "container"
          }
        >
          <span>Email address or username</span>
          <input
            type="text"
            placeholder="Email address or username"
            onChange={(e) => setEmailORusername(e.target.value)}
          />
          <span style={{ marginTop: "5px", textAlign: "center" }}>
            {errorEmail
              ? "*Please fill in the field"
              : !Login?.isLogin?.isLoginEmail
              ? Login?.isLogin?.message
              : null}
          </span>
        </div>
        <div
          className={
            errorPassword || (Login.isLogin && !Login?.isLogin?.isLoginPassword)
              ? "container errorContainer"
              : "container"
          }
        >
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ marginTop: "5px", textAlign: "center" }}>
            {errorPassword
              ? "*Please fill in the field"
              : !Login?.isLogin?.isLoginPassword
              ? Login?.isLogin?.message
              : null}
          </span>
        </div>
        <label htmlFor="checkboxLogin" className="checkBox">
          <input type="checkbox" id="checkboxLogin" />
          <span>Remember me</span>
        </label>
        <input
          type="submit"
          className="button"
          value={"Sign in"}
          onClick={LoginHandler}
        />
      </form>
    </div>
  );
};

export default Form;

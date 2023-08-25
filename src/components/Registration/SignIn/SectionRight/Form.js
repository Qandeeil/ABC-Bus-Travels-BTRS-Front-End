import React, { useEffect, useState } from "react";
import "../../../../styles/Registration/SignIn/SectionRight/Form.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginAdmin } from "../../../../store/Registration/Login";
import useLocalStorage from "use-local-storage";

const Form = () => {
  const [dataAccount, setDataAccount] = useLocalStorage("DataAccount", null);
  const { checkLogin } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [emailORusername, setEmailORusername] = useState();
  const [password, setPassword] = useState();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [data, setData] = useState();

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
      setData(Data)
      setErrorEmail(false);
      setErrorPassword(false);
      dispatch(loginUser(Data));
    }
  };

  useEffect(() => {
    if (!checkLogin?.isLogin?.isLoginEmail) {
      dispatch(loginAdmin(data));
    }
    setDataAccount(checkLogin?.isLogin?.DataAccount)
  }, [checkLogin?.isLogin?.isLoginEmail]);  


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
            errorEmail ||
            (checkLogin.isLogin && !checkLogin?.isLogin?.isLoginEmail)
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
              : !checkLogin?.isLogin?.isLoginEmail
              ? checkLogin?.isLogin?.message
              : null}
          </span>
        </div>
        <div
          className={
            errorPassword ||
            (checkLogin.isLogin && !checkLogin?.isLogin?.isLoginPassword)
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
              : !checkLogin?.isLogin?.isLoginPassword
              ? checkLogin?.isLogin?.message
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

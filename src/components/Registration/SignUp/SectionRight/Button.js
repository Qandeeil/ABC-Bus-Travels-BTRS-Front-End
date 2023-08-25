import React, { useEffect, useState } from "react";
import "../../../../styles/Registration/SignUp/SectionRight/Button.scss";
import {
  createAccount,
  updateAccount,
} from "../../../../store/Registration/SignUp";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "use-local-storage";

const Button = (props) => {
  const {
    setResidencyInfo,
    setPersonalInfo,
    setHome,
    title,
    fullname,
    username,
    email,
    password,
    checkbox,
    setErrorFullname,
    setErrorUsername,
    setErrorEmail,
    setErrorPassword,
    setErrorCheckbox,
    phoneNumber,
    country,
    address,
    setErrorPhoneNumber,
    setErrorCountry,
    setErrorAddress,
    caseSignup,
  } = props;
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const [dataAccount, setDataAccount] = useLocalStorage("DataAccount", null);

  const registerAccountHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (title == "Registration") {
      !fullname ? setErrorFullname(true) : setErrorFullname(false);
      !username ? setErrorUsername(true) : setErrorUsername(false);
      !email ? setErrorEmail(true) : setErrorEmail(false);
      !emailRegex.test(email) ? setErrorEmail(true) : setErrorEmail(false);
      !password ? setErrorPassword(true) : setErrorPassword(false);
      password?.length >= 6 ? setErrorPassword(false) : setErrorPassword(true);
      !checkbox ? setErrorCheckbox(true) : setErrorCheckbox(false);

      if (
        fullname &&
        username &&
        emailRegex.test(email) &&
        password?.length >= 6 &&
        checkbox
      ) {
        const data = {
          name: fullname,
          username: username.replace(/\s/g, "").toLowerCase(),
          email: email.toLowerCase(),
          password: password,
        };
        console.log({ data: data, case: caseSignup });
        dispatch(createAccount({ data: data, case: caseSignup }));
      }
    } else if (title == "Continue") {
      !phoneNumber ? setErrorPhoneNumber(true) : setErrorPhoneNumber(false);
      !country ? setErrorCountry(true) : setErrorCountry(false);
      !address ? setErrorAddress(true) : setErrorAddress(false);
    }

    if (phoneNumber && country && address) {
      const data = {
        _id: users?.createAccount?.userId
          ? users?.createAccount?.userId
          : users?.createAccount?.adminId,
        phoneNumber: `+${phoneNumber}`,
        country: country,
        address: address,
      };
      dispatch(updateAccount({ data: data, case: caseSignup }));
    } else if (phoneNumber && country) {
      const data = {
        _id: users?.createAccount?.userId
          ? users?.createAccount?.userId
          : users?.createAccount?.adminId,
        phoneNumber: `+${phoneNumber}`,
        country: country,
      };
      dispatch(updateAccount({ data: data, case: caseSignup }));
    } else if (address) {
      const data = {
        _id: users?.createAccount?.userId
          ? users?.createAccount?.userId
          : users?.createAccount?.adminId,
        address: address,
      };
      dispatch(updateAccount({ data: data, case: caseSignup }));
    }
    setDataAccount(users?.createAccount?.DataAccount);
  };

  console.log(users?.createAccount)

  useEffect(() => {
    if (users?.createAccount?.userId || users?.createAccount?.adminId) {
      setResidencyInfo(true);
      setPersonalInfo(false);
      setHome(false);
    }
  }, [users, dataAccount]);

  useEffect(() => {
    if (dataAccount) {
      window.location = "/";
    }
  }, [dataAccount]);
  
  return (
    <div className="buttonRegistration">
      <button onClick={registerAccountHandler}>{title}</button>
    </div>
  );
};

export default Button;

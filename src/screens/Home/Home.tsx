import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getAdmins } from "../../store/Registration/SignUp";

import useLocalStorage from "use-local-storage";
import { Account } from "../../interfaces/Account";
import "../../styles/Home/Home.scss";
import Header from "../../components/Home/Header";
import Main from "../../components/Home/Main";
import SectionLeft from "../../components/Home/SectionLeft";

interface UserData {
  _id: string;
  case: "user" | "admin";
}

const Home: React.FC = () => {
  const [dataAccount, setDataAccount] = useLocalStorage<UserData | null>(
    "DataAccount",
    null
  );
  const dispatch = useDispatch<any>();
  const { _id } = useParams();

  useEffect(() => {
    if (!dataAccount) {
      window.location.href = "/Signin";
    } else {
      if (dataAccount.case === "user") {
        dispatch(getUsers());
      } else if (dataAccount.case === "admin") {
        dispatch(getAdmins());
      }
    }
  }, [dataAccount]);

  const { users, admins } = useSelector((state: any) => state);

  const renderUserData = (userData: Account) => (
    <div className="container" key={userData._id}>
      <div className="containerImage">
        <img src={userData.profilePicture} alt={`${userData.name}'s profile`} />
      </div>
      <div className="contanierBox">
        <label>Name</label>
        <span>{userData.name}</span>
        <label>Country</label>
        <span>{userData.country}</span>
        <label>Phone</label>
        <span>{userData.phoneNumber}</span>
      </div>
      <div className="contanierBox">
        <label>Email</label>
        <span>{userData.email}</span>
        <label>Address</label>
        <span>{userData.address}</span>
        <label>Case</label>
        <span>{userData.case}</span>
      </div>
    </div>
  );

  return (
    <div className="home">
      {dataAccount && (
        <div className="infoAccount">
          <SectionLeft />
          <div className="content">
            <Header />
            <Main />
          </div>
        </div>
      )}
      {/* <button onClick={() => setDataAccount(null)}>Logout</button> */}
    </div>
  );
};

export default Home;

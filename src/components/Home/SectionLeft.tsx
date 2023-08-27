import React from "react";
import Logo from './Logo/logo.svg'
import calendar from './Logo/calendar-line.svg'
import phone from './Logo/phone-line.svg'
import mapPin from './Logo/map-pin-user-line.svg'
import '../../styles/Home/SectionLeft.scss'
import { Account } from "../../interfaces/global";

type Props = {
  user: Account
}

const SectionLeft: React.FC<Props> = ({user}) => {
  return (
    <div className="homeSectionLeft">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>Oasis</span>
      </div>
      <div className="contentUser">
        <img src={user?.profilePicture}/>
        <h1>{user?.name}</h1>
        <span>{user?.email}</span>
      </div>
      <div className="infoUser">
        <div className="info">
          <img src={calendar} alt="calendar"/>
          <span>{user?.username}</span>
        </div>
        <div className="info">
          <img src={phone} alt="phone"/>
          <span>{user?.phoneNumber}</span>
        </div>
        <div className="info">
          <img src={mapPin} alt="mapPin"/>
          <span>{user?.address}, {user?.country}</span>
        </div>
      </div>
    </div>
  );
};

export default SectionLeft;

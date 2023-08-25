import React from "react";
import Logo from './Logo/logo.svg'
import calendar from './Logo/calendar-line.svg'
import phone from './Logo/phone-line.svg'
import mapPin from './Logo/map-pin-user-line.svg'
import '../../styles/Home/SectionLeft.scss'
import person from './Logo/person.svg'

const SectionLeft = () => {
  return (
    <div className="homeSectionLeft">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>Oasis</span>
      </div>
      <div className="contentUser">
        <img src={person}/>
        <h1>Mahmoud Qandeel</h1>
        <span>mahmoudqandieel@gmail.com</span>
      </div>
      <div className="infoUser">
        <div className="info">
          <img src={calendar} alt="calendar"/>
          <span>21-09-2001</span>
        </div>
        <div className="info">
          <img src={phone} alt="phone"/>
          <span>0775140765</span>
        </div>
        <div className="info">
          <img src={mapPin} alt="mapPin"/>
          <span>Amman, Jordan</span>
        </div>
      </div>
    </div>
  );
};

export default SectionLeft;

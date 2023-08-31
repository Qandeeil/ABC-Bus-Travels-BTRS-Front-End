import React, { useState } from "react";
import Header from "./Header";
import "../../../../styles/Registration/SignUp/SectionRight/ResidencyInfo.scss";
import TextInput from "./TextInput";
import Button from "./Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import lock from "./icon/lock.svg";
import ChoosePicture from "./ChoosePicture";

const ResidencyInfo = ({
  setHome,
  setPersonalInfo,
  screen,
  setResidencyInfo,
  caseSignup
}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();

  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  return (
    <div className="residencyInfo">
      <Header
        setHome={setHome}
        setPersonalInfo={setPersonalInfo}
        screen={screen}
        setResidencyInfo={setResidencyInfo}
        title={"Residency Info."}
        pageNumber={"02"}
      />
      <form>
        <h1>Complete Your Profile!</h1>
        <p>
          For the purpose of industry regulation, your details are required.
        </p>
        <ChoosePicture caseSignup={caseSignup}/>
        <span
          className={
            !errorPhoneNumber
              ? "titlePhoneNumber"
              : "titlePhoneNumber errorPhoneNumber"
          }
        >
          Phone Number*
        </span>
        <PhoneInput
          country={"jo"}
          value={phoneNumber}
          onChange={(phone, country) => {
            setPhoneNumber(phone);
            setCountry(country.name);
          }}
          inputStyle={
            !errorPhoneNumber
              ? {
                  color: "#1565D8",
                  width: "81%",
                  height: "50px",
                  border: "1.5px solid #8692A6",
                }
              : {
                  color: "red",
                  width: "81%",
                  height: "50px",
                  border: "1.5px solid red",
                }
          }
          buttonStyle={{ border: "none", background: "transparent" }}
          containerStyle={{ marginBottom: "16px", marginTop: "8px" }}
          placeholder="Please enter phone number"
        />
        <TextInput
          title="Your address*"
          type="email"
          placeholder="Please enter address"
          getValue={setAddress}
          error={errorAddress}
        />
        <Button
          setResidencyInfo={setResidencyInfo}
          setPersonalInfo={setPersonalInfo}
          setHome={setHome}
          title={"Continue"}
          phoneNumber={phoneNumber}
          country={country}
          address={address}
          setErrorPhoneNumber={setErrorPhoneNumber}
          setErrorCountry={setErrorCountry}
          setErrorAddress={setErrorAddress}
          caseSignup={caseSignup}
        />
        <div className="secured">
          <img src={lock} alt="lock"/>
          <span>Your Info is safely secured</span>
        </div>
      </form>
    </div>
  );
};

export default ResidencyInfo;

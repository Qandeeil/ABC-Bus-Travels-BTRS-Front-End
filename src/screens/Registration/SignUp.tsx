import React, { useEffect, useState } from "react";
import "../../styles/Registration/SignUp/SignUp.scss";
import SectionLeft from "../../components/Registration/SectionLeft/SectionLeft";
import Home from "../../components/Registration/SignUp/SectionRight/Home";
import PersonalInfo from "../../components/Registration/SignUp/SectionRight/PersonalInfo";
import ResidencyInfo from "../../components/Registration/SignUp/SectionRight/ResidencyInfo";
import useLocalStorage from "use-local-storage";

type Props = {};

const SignUp: React.FC<Props> = () => {
  const [home, setHome] = useState(true);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [residencyInfo, setResidencyInfo] = useState(false);
  const [caseSignup, setCaseSignup] = useState();

  const [dataAccount,] = useLocalStorage("DataAccount", null);
  useEffect(() => {
    if (dataAccount) {
      window.location.href = "/signin";
    }
  }, [dataAccount]);

  return (
    <div className="signUp">
      <SectionLeft />
      {home ? (
        <Home
          setHome={setHome}
          setPersonalInfo={setPersonalInfo}
          setCaseSignup={setCaseSignup}
        />
      ) : personalInfo ? (
        <PersonalInfo
          setHome={setHome}
          setPersonalInfo={setPersonalInfo}
          setResidencyInfo={setResidencyInfo}
          screen={"PersonalInfo"}
          caseSignup={caseSignup}
        />
      ) : residencyInfo ? (
        <ResidencyInfo
          setHome={setHome}
          setPersonalInfo={setPersonalInfo}
          setResidencyInfo={setResidencyInfo}
          screen={"ResidencyInfo"}
          caseSignup={caseSignup}
        />
      ) : null}
    </div>
  );
};

export default SignUp;

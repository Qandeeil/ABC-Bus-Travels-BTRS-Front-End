import React, { useEffect } from "react";
import SectionLeft from "../../components/Registration/SectionLeft/SectionLeft";
import Form from "../../components/Registration/SignIn/SectionRight/Form";
import "../../styles/Registration/SignIn/SignIn.scss";
import useLocalStorage from "use-local-storage";

const SignIn: React.FC = () => {
  const [dataAccount, setDataAccount] = useLocalStorage("DataAccount", null);
  useEffect(() => {
    if (dataAccount) {
      window.location.href = "/";
    }
  }, [dataAccount]);

  return (
    <div className="signIn">
      <SectionLeft />
      <Form />
    </div>
  );
};

export default SignIn;

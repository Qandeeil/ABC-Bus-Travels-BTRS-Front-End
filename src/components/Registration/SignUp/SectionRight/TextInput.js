import React from "react";
import "../../../../styles/Registration/SignUp/SectionRight/TextInput.scss";

const TextInput = (props) => {
  const {
    title,
    type,
    placeholder,
    getValue,
    error,
    messageError,
    value,
    checkDatabase,
    messageDatabase,
  } = props;
  return (
    <div className="TextInputFormSliderRight">
      <span className={error || checkDatabase ? "errorInput" : null}>
        {title}
      </span>
      {error ? (
        <span
          style={{
            marginLeft: "10px",
            color: "red",
            opacity: 0.7,
            textAlign: "right",
            width: "100%",
          }}
        >
          {messageError}
        </span>
      ) : (
        <span></span>
      )}
      {!error && checkDatabase ? (
        <span
          style={{
            marginLeft: "10px",
            color: "red",
            opacity: 0.7,
            textAlign: "right",
            width: "100%",
          }}
        >
          {messageDatabase}
        </span>
      ) : (
        <span></span>
      )}
      <div className="contanierInput">
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => getValue(e.target.value)}
          value={value}
          className={error || checkDatabase ? "errorInput" : null}
        />
      </div>
    </div>
  );
};

export default TextInput;

// checkDatabase?.checkEmail

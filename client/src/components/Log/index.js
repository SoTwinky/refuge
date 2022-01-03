import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = ( props ) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signUpModal ? null : "active-btn"}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {!signUpModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { Progress } from "nes-react";

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
    passwordVerification: "",
    passwordStrength: 0,
    errors: {
      hasLowerCaract: true,
      hasUpperCaract: true,
      hasRequireLength: true,
      hasDigit: true,
      hasSpecialCaract: true,
      notCorresponding: true,
    },
  });

  const {
    username,
    password,
    passwordVerification,
    passwordStrength,
    errors,
  } = state;

  useEffect(() => {
    checkPassword(password);
  }, [password]);

  useEffect(() => {
    checkSamePassword(passwordVerification);
  }, [passwordVerification]);

  const onChange = (event: React.FormEvent<HTMLInputElement>): any => {
    const { name, value } = event.currentTarget;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkPassword = (password: string) => {
    let score = 0;
    const hasLowerCaract = /[a-z]/.test(password);
    const hasUpperCaract = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialCaract = /[!"#$%&'()*+-,]/.test(password);
    const hasRequireLength = password.length >= 8;

    hasLowerCaract && score++;
    hasUpperCaract && score++;
    hasDigit && score++;
    hasSpecialCaract && score++;
    hasRequireLength && score++;

    setState((prevState) => ({
      ...prevState,
      passwordStrength: score,
      errors: {
        hasLowerCaract,
        hasUpperCaract,
        hasRequireLength,
        hasDigit,
        hasSpecialCaract,
        notCorresponding: false,
      },
    }));

    return {
      hasLowerCaract,
      hasUpperCaract,
      hasSpecialCaract,
      hasDigit,
      hasRequireLength,
      score,
    };
  };

  const checkSamePassword = (passwordVerif: string) => {
    setState((prevState) => ({
      ...prevState,
      errors: {
        ...errors,
        notCorresponding: passwordVerif === password,
      },
    }));
  };

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): any => {
    event.preventDefault();
    if (passwordStrength > 4 && password === passwordVerification) {
      sessionStorage.setItem("logged", "true");
      history.push("/game");
    }
  };

  return (
    <>
      <form className="login-form">
        <div className="nes-field">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            name="username"
            className="nes-input"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="nes-field">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            className="nes-input"
            value={password}
            onChange={onChange}
          />
        </div>
        <Progress value={passwordStrength} max={5} />
        <div className="nes-field">
          <label htmlFor="passwordVerification">Mot de passe</label>
          <input
            type="password"
            id="passwordVerification"
            name="passwordVerification"
            className="nes-input"
            value={passwordVerification}
            onChange={onChange}
          />
        </div>
        <button onClick={onClick} className="nes-btn is-success">
          Inscription
        </button>
      </form>
      <ErrorMessage errors={errors} />
    </>
  );
};

export default LoginForm;

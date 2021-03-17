interface ErrorMessageProps {
  errors: {
    notCorresponding: boolean;
    hasUpperCaract: boolean;
    hasLowerCaract: boolean;
    hasDigit: boolean;
    hasRequireLength: boolean;
    hasSpecialCaract: boolean;
  };
}

export const ErrorMessage = ({ errors }: ErrorMessageProps) => {
  const {
    notCorresponding,
    hasUpperCaract,
    hasLowerCaract,
    hasDigit,
    hasRequireLength,
    hasSpecialCaract,
  } = errors;

  return (
    <>
      <h3
        className={`login__error login__error--notCorresponding ${
          notCorresponding && "hide"
        }`}
      >
        Les mots de passes ne correspondent pas
      </h3>
      <h3
        className={`login__error login__error--hasUpperCaract ${
          hasUpperCaract && "hide"
        }`}
      >
        Le mot de passe doit contenir une majuscule
      </h3>
      <h3
        className={`login__error login__error--hasLowerCaract ${
          hasLowerCaract && "hide"
        }`}
      >
        Le mot de passe doit contenir une minuscule
      </h3>
      <h3
        className={`login__error login__error--hasDigit ${hasDigit && "hide"}`}
      >
        Le mot de passe doit contenir un chiffre
      </h3>
      <h3
        className={`login__error login__error--hasSpecialCaract ${
          hasSpecialCaract && "hide"
        }`}
      >
        Le mot de passe doit contenir un char spécial
      </h3>
      <h3
        className={`login__error login__error--hasRequireLength ${
          hasRequireLength && "hide"
        }`}
      >
        Le mot de passe doit contenir au moins 8 char
      </h3>
    </>
  );
};

export default ErrorMessage;

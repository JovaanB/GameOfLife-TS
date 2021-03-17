import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "nes-react";

export const Header = () => {
  const history = useHistory();

  const onLogout = () => {
    sessionStorage.setItem("logged", "false");
    history.push("/");
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Game Of Life
        {window.location.pathname !== "/" && (
          <button onClick={onLogout} className="nes-btn is-error">
            Déconnexion
          </button>
        )}
      </div>
    </Container>
  );
};

export default Header;

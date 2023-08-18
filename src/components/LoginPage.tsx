import React from "react";

const LoginPage: React.FC = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectionUri = process.env.REACT_APP_REDIRECT_URL;
  const url = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectionUri}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <a href={url}>
        <button
          style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
        >
          Login with Patreon
        </button>
      </a>
    </div>
  );
};

export default LoginPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OAuthPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const redirectionUri = process.env.REACT_APP_REDIRECT_URL;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [patreonOk, setPatreonOk] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (code && clientId && clientSecret && redirectionUri) {
        try {
          const response = await axios.post(
            `https://www.patreon.com/api/oauth2/token`,
            `code=${code}&grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectionUri}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log("API Response:", response.data);
          if (response.data && response.data.access_token) {
            const ptResponse = await fetch(
              "https://www.patreon.com/api/oauth2/v2/identity?include=memberships.campaign&fields%5Bmember%5D=patron_status",
              {
                method: "GET",
                headers: {
                  "Access-Control-Allow-Headers" : "Content-Type",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                  accept: "application/json",
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              }
            );

            if (ptResponse.status !== 200) return ptResponse;

            try {
              const ptData = await ptResponse.json();
              console.log("ptData", ptData);
            } catch (error) {
              console.error("Error parsing Patreon data:", error);
            }
            setLoggedIn(true);
          }
        } catch (error) {
          console.error("API Error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [code, clientId, clientSecret, redirectionUri]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {loggedIn
            ? patreonOk
              ? "Logged In (Patreon)"
              : "Logged In (Not Patreon)"
            : "Not Logged In"}
        </p>
      )}
    </div>
  );
};

export default OAuthPage;

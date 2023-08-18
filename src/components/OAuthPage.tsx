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

  useEffect(() => {
    const fetchData = async () => {
      if (code && clientId && clientSecret && redirectionUri) {
        try {
          console.log("redirectionUri",redirectionUri)
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
            setLoggedIn(true);
            // try {
            //   const ptResponse = await axios.get(
            //     "https://www.patreon.com/api/oauth2/v2/identity?include=memberships.campaign&fields%5Bmember%5D=patron_status",
            //     {
            //       headers: {
            //         Authorization: `Bearer ${response.data.access_token}`,
            //       },
            //     }
            //   );

            //   console.log("ptData", ptResponse);
            //   if (ptResponse.status !== 200) return ptResponse;
            // } catch (error) {
            //   console.log("error", error);
            // }
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
        <p>{loggedIn ? "Logged In" : "Not Logged In"}</p>
      )}
    </div>
  );
};

export default OAuthPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constant";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activateEmail = async () => {
        try {
          const res = await axios.post(`${baseUrl}/user/activation`, {
            activation_token,
          });
        } catch (err) {
          setError(true);
          console.log(err);
        }
      };
      activateEmail();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token expires!!</p>
      ) : (
        <p>Your account activated successfully!!</p>
      )}
    </div>
  );
};

export default ActivationPage;

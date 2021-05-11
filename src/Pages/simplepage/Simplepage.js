import React, { useEffect } from "react";
import axios from "axios";
import Cookieservice from "../../component/cokieservice/Cookieservice.js";

const Simplepage = () => {
  const massage = "Authorization failed";
  const [details, setDetails] = React.useState([]);
  const Details = () => {
    axios
      .get(
        "address",
        {
          headers: {
            Authorization: "Bearer " + Cookieservice.get("token"), //the token is a variable which holds the token
          },
        }
      )
      .then(function (response) {
        if (response.data.message === massage) {
          console.log(response.data.message);
          Cookieservice.remove('token')
          window.location.reload(true);
        } else {
          setDetails(response.data);
        }
      });
  };

  useEffect(() => {
    Details();
  }, []);

  return <div>{"Welcome" + details.data[0].name}</div>;
};
export default Simplepage;

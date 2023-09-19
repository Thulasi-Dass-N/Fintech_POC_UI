// import React from "react";
// import "../../../App.css"
// import UrlIcon from "../../../assets/jklogo.png";

// const ContactLink = () => {
//   return (
//     <a href="tel:1999" className="tel-link">
//       <img className="url-icon" alt="CallIcon" src={UrlIcon} />
//       <h1 className="tel-header"> Call 1999 </h1>
//     </a>
//   );
// };

// export default ContactLink;
import "../../../App.css";
import Savingdata from "./savingData";
const GeneralOptions = (props) => {
  const options = [
    {
      name: "Open A new CORPORATE account",
      handler: props.actionProvider.handleCorporateBalance,
      id: 1,
    },
    {
      name: "Know your account Balance",
      handler: props.actionProvider.handleCorporateBalance,
      id: 2,
    },
  ];
  return <Savingdata options={options} title="Options" {...props} />;
};

export default GeneralOptions;
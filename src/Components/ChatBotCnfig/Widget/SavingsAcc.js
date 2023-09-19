// import React, { useState, useEffect } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import "../../../App.css"
// import { getData } from "../data";
// import Options from "./Options";

// const Statistics = (props) => {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getStats = async () => {
//       const stats = await getData();

//       // const filteredFlights = flights.filter((item) => item.Status === null);

//       setStats(stats);
//       setLoading(false);
//     };
//     getStats();
//   }, []);
//   const options = [
//     {
//       name: "Open A new SAVINGS account",
//       handler: props.actionProvider.handleLocalStats,
//       id: 1
//     },
//     {
//       name: "Know your account Balance",
//       // handler: props.actionProvider.handleLocalStats,
//       id: 2
//     },

//   ];

//   return (
//     <Options options={options} title="Options" {...props} />
//     // <div className="stats">
//     //   <div className="column-left">
//     //     <p> Total Cases :</p>
//     //     <p> New Cases :</p>
//     //     <p> Recovered :</p>
//     //     <p> Deaths :</p>
//     //   </div>

//     //   <div className="column-right">
//     //     <ClipLoader color={"#fff"} loading={loading} />
//     //     <p>{stats.global_total_cases}</p>
//     //     <p>{stats.global_new_cases}</p>
//     //     <p>{stats.global_recovered}</p>
//     //     <p>{stats.global_deaths}</p>
//     //   </div>
//     // </div>
//   );
// };

// export default Statistics;

import "../../../App.css";
import Savingdata from "./savingData";
const GeneralOptions = (props) => {
  const options = [
    {
      name: "Open A new SAVINGS account",
      handler: props.actionProvider.handleNewSavingAccount,
      id: 1,
    },
    {
      name: "Know your account Balance",
      handler: props.actionProvider.handleSavingBalance,
      id: 2,
    },
  ];
  return <Savingdata options={options} title="Options" {...props} />;
};

export default GeneralOptions;

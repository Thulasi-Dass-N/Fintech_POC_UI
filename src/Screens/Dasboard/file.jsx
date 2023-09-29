// /* eslint-disable no-unused-vars */
// import React, { useState, useContext, useEffect } from "react";
// import Papa from "papaparse";
// import "./HomeScreen.css";

// import { AppContext } from "../../context/AppContext";

// const Uploadfile = () => {
//   const { apiUrl } = useContext(AppContext);

//   const [data, setData] = useState([]);
//   // const [transfer, setTransfer] = useState(false);
//   // const [addTransfer, setAddTransfer] = useState(false);
//   const [error, setError] = useState("");

//   const [Transaction, setTransaction] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [transferDetails, setTransferDetails] = useState({
//     ToAccountNumber: "",
//     Amount: 0,
//     TransactionNotes: "",
//   });
//   const [transferDetails1, setTransferDetails1] = useState({
//     ToAccountNumber: "",
//     Amount: 0,
//     TransactionNotes: "",
//   });

//   useEffect(() => {
//     var data1 = {};
//     var tempData = [];

//     data?.forEach((element) => {
//       data1 = {
//         ToAccountNumber: element[0],
//         Amount: Number(element[1]),
//         TransactionNotes: element[2],
//       };
//       console.log(data1.ToAccountNumber, "Account");
//       if (data1?.ToAccountNumber !== "") {
//         tempData.push(data1);
//       }

//       setTransaction(tempData);
//     });
//   }, [data]);

//   const FundTransfer = () => {
//     console.log(Transaction, "dtaaaaaaa");
//     setLoading(true);
//     fetch(`http://${apiUrl.ip_port}/transferfunds`, {
//       method: "POST",
//       body: JSON.stringify({
//         CustomerID: "ADMIN",
//         AccountNumber: "ADMIN",
//         Transactions: Transaction,
//         // Transactions: [
//         //   {
//         //     ToAccountNumber: Transaction[0]?.ToAccountNumber,
//         //     Amount: Transaction[0]?.Amount,
//         //     TransactionNotes: Transaction[0]?.TransactionNotes,
//         //   },
//         // ],
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         "api-key": apiUrl?.api_key,
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//       .then((response) => response.json())
//       .then((resp) => {
//         console.log(resp, "response");
//         if (resp.StatusCode === "LOGIN SUCCESSFUL") {
//           // login();
//         }
//         if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
//           setError("FAILED");
//           setLoading(true);
//         }
//       })
//       .catch((err) => {
//         setError(err);
//         console.error(err);
//         setLoading(false);
//       });
//   };
//   return (
//     <div className="App">
//       <input
//         type="file"
//         accept=".csv,.xlsx,.xls"
//         onChange={(e) => {
//           const files = e.target.files;
//           console.log(files);
//           if (files) {
//             console.log(files[0]);
//             Papa.parse(files[0], {
//               complete: function (results) {
//                 setData(results?.data);
//               },
//             });
//           }
//         }}
//       />

//       <button
//         type="button"
//         onClick={() => {
//           FundTransfer();
//         }}
//       >
//         Happy
//       </button>

//       {data?.map((da) => (
//         <div>{da}</div>
//       ))}
//     </div>
//   );
// };

// export default Uploadfile;

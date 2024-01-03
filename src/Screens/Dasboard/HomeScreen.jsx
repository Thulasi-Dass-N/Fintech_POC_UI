import Papa from "papaparse";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal";
// import BankImg from "../../assets/jklogo.png";
import Jkbank from "../../assets/banklogo.png";
import logout from "../../assets/logout.png";
import { AppContext } from "../../context/AppContext";
import LoadingSpinner from "../Spinner/spinner";
import "./HomeScreen.css";
import FundTransaction from "./Transaction";
import TransactionHistory from "./TransactionHistory";

const HomeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser, setAccount, apiUrl, setapiUrl } =
    useContext(AppContext);
  const [success, setSucces] = useState(false);
  const [port, setPort] = useState({
    ipAddress: "",
    APIKey: "",
  });
  const [data, setData] = useState([]);
  const [accountsFile, setAccountsFile] = useState([]);
  const [fileTotal, setFileTotal] = useState(0);
  const [fileName, setFileName] = useState("");
  const [Transaction, setTransaction] = useState([]);
  const [transfer, setTransfer] = useState(false);
  const [addTransfer, setAddTransfer] = useState(false);
  const [loanEnable, setLoanEnable] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [cnfStatus, setCnfStatus] = useState(false);
  const [response, setResponse] = useState("");
  const [loanConfirm, setLoanConfirm] = useState(null);

  const [loading, setLoading] = useState(false);
  const [transferDetails, setTransferDetails] = useState({
    ToAccountNumber: "",
    Amount: 0,
    TransactionNotes: "",
  });
  const [transferDetails1, setTransferDetails1] = useState({
    ToAccountNumber: "",
    Amount: 0,
    TransactionNotes: "",
  });
  const [benifitiaryAccounts, SetBenifitiaryAccounts] = useState([]);

  useEffect(() => {
    if (location?.state?.data) {
      setData(user);
    }
  }, [location?.state?.data, user]);

  useEffect(() => {
    fetch(`http://${apiUrl.ip_port}/getBenifitiaryAccounts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        var tempData = [];
        const value = resp?.Accounts;
        value?.forEach((element) => {
          if (element?.AccountNumber !== user.AccountNumber) {
            tempData.push(element);
          }

          SetBenifitiaryAccounts(tempData);
        });

        // value.splice(
        //   value.findIndex((a) => a.AccountNumber === user.AccountNumber),
        //   1
        // );
      });
  }, [user.AccountNumber, apiUrl]);

  useEffect(() => {
    let sum = 0;
    if (Transaction) {
      Transaction.map((item) => (sum = sum + item?.Amount));
      setFileTotal(sum);
    }
  }, [Transaction]);

  useEffect(() => {
    var transactionDetails = {};
    var tempData = [];

    accountsFile?.forEach((element) => {
      transactionDetails = {
        ToAccountNumber: element[0],
        Amount: Number(element[1]),
        TransactionNotes: element[2] || "",
      };

      if (
        transactionDetails?.ToAccountNumber !== "" &&
        transactionDetails?.ToAccountNumber.length === 11 &&
        transactionDetails?.Amount > 0
      ) {
        tempData.push(transactionDetails);
      }

      setTransaction(tempData);
    });
  }, [accountsFile]);

  const login = async () => {
    fetch(`http://${apiUrl.ip_port}/login`, {
      method: "POST",
      body: JSON.stringify({
        UserID: data?.CustomerID,
        Password: "string",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setUser(resp);
        setLoanEnable(false);
        setTransferDetails({});
        setTransferDetails1({});
        setAccount("");
        setAddTransfer(false);
        setTransfer(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const FundTransferFile = () => {
    setLoading(true);
    fetch(`http://${apiUrl.ip_port}/transferfunds`, {
      method: "POST",
      body: JSON.stringify({
        CustomerID: data?.CustomerID,
        AccountNumber: data?.AccountNumber,
        Transactions: Transaction,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setFileName("");

        if (resp.StatusCode === "LOGIN SUCCESSFUL") {
          login();
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
          setError("FAILED");
          setLoading(true);
        }
      })
      .catch((err) => {
        setError(err);
        // console.log(err);
        setLoading(false);
      });
  };

  const FundTransfer = () => {
    setLoading(true);
    fetch(`http://${apiUrl.ip_port}/transferfunds`, {
      method: "POST",
      body: JSON.stringify({
        CustomerID: data?.CustomerID,
        AccountNumber: data?.AccountNumber,

        Transactions: addTransfer
          ? [
              {
                ToAccountNumber: transferDetails?.ToAccountNumber,
                Amount: Number(transferDetails?.Amount),
                TransactionNotes: transferDetails?.TransactionNotes,
              },
              {
                ToAccountNumber: transferDetails1?.ToAccountNumber,
                Amount: Number(transferDetails1?.Amount),
                TransactionNotes: transferDetails1?.TransactionNotes,
              },
            ]
          : [
              {
                ToAccountNumber: transferDetails?.ToAccountNumber,
                Amount: Number(transferDetails?.Amount),
                TransactionNotes: transferDetails?.TransactionNotes,
              },
            ],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp.StatusCode === "LOGIN SUCCESSFUL") {
          login();
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
          setError("FAILED");
          setLoading(true);
        }
      })
      .catch((err) => {
        setError(err);
        console.error(err);
        setLoading(false);
      });
  };

  // LOAN
  // http://3.110.146.107:8080
  //  fetch(`http://${apiUrl.ip_port}/applyloan`, {
  //  fetch(`http://${apiUrl?.ip_port}/confirmloan`, {
  const applyForLoan = () => {
    setLoading(true);

    fetch(`http://${apiUrl.ip_port}/applyloan`, {
      method: "POST",
      body: JSON.stringify({
        CustomerID: user?.CustomerID,
        CustName: user?.CustomerName,
        PAN_NO: "",
        AadharNo: "",
        MobileNo: user?.MobileNo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        // setResponse(resp);
        // setShowcustomerID(true);
        setLoading(false);

        // setCustomerDetails({
        //   ...customerDetails,
        //   CustName: "",
        //   PAN_NO: "",
        //   AadharNo: "",
        //   MobileNo: "",
        // });
        if (resp.StatusCode === 100) {
          setResponse(resp);
          setLoanEnable(true);
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const confirmLoan = () => {
    setLoading(true);

    fetch(`http://${apiUrl?.ip_port}/confirmloan`, {
      method: "POST",
      body: JSON.stringify({
        EnquiryNumber: response?.EnquiryNumber,
        OfferID: Number(loanConfirm),
        CustomerID: response?.CustomerID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        // setResponse(resp);
        // setShowcustomerID(true);
        setLoading(false);
        console.log(resp, "confirm");

        // setCustomerDetails({
        //   ...customerDetails,
        //   CustName: "",
        //   PAN_NO: "",
        //   AadharNo: "",
        //   MobileNo: "",
        // });
        setCnfStatus(true);
        if (resp.StatusCode === 100) {
          setConfirmation(resp);
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setSucces(!success);
  };

  const closeModal1 = () => {};

  return (
    <div className="d-flex flex-column">
      <Modal className="backdrop" isOpen={loading} onClose={closeModal1}>
        <LoadingSpinner />
      </Modal>

      <Modal className="backdrop" isOpen={success} onClose={closeModal}>
        <div
          style={{
            top: "27%",
            left: "30%",
          }}
          className=" d-flex flex-column rounded-3  align-items-center login-1 position-absolute  translate-middle input-border-radius box-shadow bg-white"
        >
          <div
            className="mt-4 mb-3"
            style={{
              width: "300px",
            }}
          >
            <div>IP_PORT:</div>
            <input
              style={{
                width: "100%",
              }}
              className="user-input border border-1 p-1 rounded-1 bg-secondary bg-opacity-25 "
              id=""
              placeholder=" port number"
              defaultValue={apiUrl?.ip_port || ""}
              onChange={(e) => {
                setPort({
                  ...port,
                  ipAddress: e?.target?.value,
                });
              }}
            />
          </div>
          <div
            className=" mb-2"
            style={{
              width: "300px",
            }}
          >
            <div>API Key:</div>
            <input
              style={{
                width: "100%",
              }}
              className="user-input border border-1 p-1 rounded-1 bg-secondary bg-opacity-25 "
              id=""
              placeholder="api key"
              onChange={(e) => {
                setPort({
                  ...port,
                  APIKey: e?.target?.value,
                });
              }}
              defaultValue={apiUrl?.api_key}
            />
          </div>
          <div className="d-flex mt-4  w-100 justify-content-evenly ">
            <div
              role="presentation"
              className="px-3 border border-1 w-25 text-center bg-success text-white rounded-2"
              onClick={() => {
                setapiUrl({
                  ...apiUrl,
                  ip_port: port?.ipAddress ? port?.ipAddress : apiUrl?.ip_port,
                  api_key: port?.APIKey ? port?.APIKey : apiUrl?.api_key,
                });
                setSucces(false);
              }}
            >
              save
            </div>
            <div
              role="presentation"
              className="px-3 border border-1 w-25 text-center bg-secondary bg-opacity-25 text-dark rounded-2"
              onClick={() => {
                setSucces(false);
              }}
            >
              cancel
            </div>
          </div>
        </div>
      </Modal>

      <div
        className="fixed-top"
        style={{
          width: "100%",
          height: "150px",
        }}
      >
        <div className="headerTopContainer">
          <div className="headerTop">Banking Service</div>
          <div className="headerTop">ATM Locator</div>
          <div className="headerTop">Contact Us</div>
          <div className="headerTop">About Us</div>
          <div className="headerTop">Feedback</div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "25%",
            backgroundColor: "#CCE6F1",
            alignItems: "center",
          }}
        >
          <div className="headerTop1">Account Details</div>
          <div className="headerTop1">Card Details</div>
          <div
            className="headerTop1"
            role="presentation"
            onClick={() => {
              setTransfer(true);
            }}
          >
            NEFT/IMPS
          </div>
          <div
            className="headerTop1"
            role="presentation"
            onClick={() => {
              setSucces(true);
            }}
          >
            Settings
          </div>
          <div
            className="headerTop1"
            role="presentation"
            onClick={() => {
              applyForLoan();
            }}
          >
            Loan
          </div>
        </div>
        <div
          style={{
            width: "100%",
            // height: "50%",
            backgroundColor: "white",
            boxShadow: "5px 0.5px #888888",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "",
              marginLeft: "10px",
            }}
          >
            <img className="logoimg" src={Jkbank} alt="icon" />
          </div>

          <div
            className="px-5"
            role="presentation"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            onClick={() => {
              setUser({});
              navigate("/login");
            }}
          >
            <div
              className="rounded-circle  text-center d-flex justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                alignItems: "center",
                marginRight: "3px",
              }}
            >
              <img
                style={{
                  width: "20px",
                }}
                src={logout}
                alt="icon"
              />
            </div>
            <div className="px-2"> {data?.CustomerID}</div>
          </div>
        </div>
      </div>
      {!loanEnable ? (
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="d-flex justify-content-start "
            style={{
              width: "90%",
              marginTop: "200px",
            }}
          >
            <p className="text-primary fs-6 fw-bold  float-start">
              Customer Details
            </p>
          </div>
          <div
            className="customerdetails"
            style={{
              display: "flex",
              width: "90%",
              height: "250px",
              border: "2px",
              borderColor: "black",
              boxShadow: "5px",
              justifyContent: "space-evenly",
              flexDirection: "column",
              borderRadius: "5px",
            }}
          >
            <div
              className="d-flex justify-content-between  px-5 "
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "33%",
                }}
              >
                {/* <div className="fs-6">Customer ID</div> */}
                <div className="border border-1 bordertype">
                  <span>Customer ID : </span> {data?.CustomerID}
                </div>
              </div>
              <div
                style={{
                  width: "33%",
                  marginLeft: "20px",
                }}
              >
                {/* <div>Customer Name</div> */}
                <div className="border border-1 bordertype">
                  <span> Customer Name : </span>
                  {data?.CustomerName}
                </div>
              </div>
              <div
                style={{
                  width: "33%",
                  marginLeft: "20px",
                }}
              >
                {/* <div>Account Number</div> */}
                <div className="border border-1 bordertype">
                  <span> Account Number : </span> {data?.AccountNumber}
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between  px-5 "
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "33%",
                }}
              >
                {/* <div className="fs-6">Account Type</div> */}
                <div className="border border-1 bordertype">
                  <span> Account Type : </span> {data?.AccountType}
                </div>
              </div>
              <div
                style={{
                  width: "33%",
                  marginLeft: "20px",
                }}
              >
                {/* <div>Mobile Number</div> */}
                <div className="border border-1 bordertype">
                  <span> Mobile Number : </span> {data?.MobileNumber}
                </div>
              </div>
              <div
                style={{
                  width: "33%",
                  marginLeft: "20px",
                }}
              >
                {/* <div>Account Balance</div> */}
                <div className="border border-1 bordertype ">
                  <span> Account Balance : </span> {data?.AccountBalance}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "90%",
              border: "2px",
              borderColor: "black",
              boxShadow: "5px",
              justifyContent: "space-evenly",
              flexDirection: "column",
              borderRadius: "5px",
              marginTop: "50px",
            }}
          >
            {transfer ? (
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center "
                  style={{
                    width: "100%",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        // width: "75%",
                        marginRight: "40px",
                      }}
                      className="text-primary fs-6 fw-bold  float-start"
                    >
                      Fund Transfer
                    </div>
                    {!addTransfer ? (
                      <div
                        className="  px-3   bg-secondary rounded-2 text-white  "
                        role="presentation"
                        onClick={() => {
                          setAddTransfer(true);
                        }}
                      >
                        Add +
                      </div>
                    ) : (
                      <div
                        className="  px-3   bg-secondary rounded-2 text-white  "
                        role="presentation"
                        onClick={() => {
                          setAddTransfer(false);
                          setTransferDetails1({});
                        }}
                      >
                        remove -
                      </div>
                    )}
                  </div>
                  {error ? <div className="text-danger">{error}</div> : ""}
                  <div className="d-flex">
                    {fileName ? (
                      <button
                        style={{
                          // width: "75%",
                          marginRight: "20px",
                        }}
                        type="button"
                        // disabled="True"
                        className=" px-5  border border-0 bg-info text-center rounded-2 text-white  "
                        role="presentation"
                        onClick={() => {
                          if (Transaction.length) {
                            if (fileTotal <= Number(user?.AccountBalance)) {
                              FundTransferFile();
                            } else {
                              setFileName("");
                              setError("INSUFFICIENT FUNDS");
                              setLoading(false);
                            }
                          } else {
                            setFileName("");
                            setError("Invalid file");
                          }
                        }}
                      >
                        Upload {fileName}
                      </button>
                    ) : (
                      <input
                        className="  "
                        type="file"
                        // disabled
                        accept=".csv"
                        onChange={(e) => {
                          setError("");
                          const files = e?.target?.files;
                          setFileName(files[0].name);
                          if (files) {
                            Papa.parse(files[0], {
                              complete: function (results) {
                                setAccountsFile(results?.data);
                              },
                            });
                          }
                        }}
                      />
                    )}
                    <button
                      style={{
                        // width: "75%",
                        marginRight: "20px",
                      }}
                      type="button"
                      className=" px-5  border border-0 bg-primary text-center rounded-2 text-white  "
                      role="presentation"
                      onClick={() => {
                        if (
                          addTransfer &&
                          transferDetails.ToAccountNumber !== "" &&
                          transferDetails.Amount > 0 &&
                          transferDetails.TransactionNotes !== "" &&
                          transferDetails1.ToAccountNumber !== "" &&
                          transferDetails1.Amount > 0 &&
                          transferDetails1.TransactionNotes !== ""
                        ) {
                          if (
                            Number(
                              transferDetails.Amount + transferDetails1.Amount
                            ) < Number(user?.AccountBalance)
                          ) {
                            FundTransfer();
                          } else {
                            setError("INSUFFICIENT FUNDS");
                            setLoading(false);
                          }
                        } else if (
                          !addTransfer &&
                          transferDetails.ToAccountNumber !== "" &&
                          transferDetails.Amount > 0 &&
                          transferDetails.TransactionNotes !== ""
                        ) {
                          if (
                            Number(transferDetails.Amount) <
                            Number(user?.AccountBalance)
                          ) {
                            FundTransfer();
                          } else {
                            console.log(
                              user?.AccountBalance,
                              transferDetails.Amount
                            );
                            setError("INSUFFICIENT FUNDS");
                            setLoading(false);
                          }
                        } else {
                          setError("Please fill all the feilds");
                          setLoading(false);
                        }
                      }}
                    >
                      Confirm
                    </button>
                    <div
                      className="  px-3 p-1 bg-secondary rounded-2 text-white  "
                      role="presentation"
                      onClick={() => {
                        setError("");

                        setAddTransfer(false);
                        setTransferDetails({});
                        setTransfer(false);
                        setAccount("");
                        setFileName("");
                        setAccountsFile([]);
                        setTransaction("");
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
                <div className="d-flex ">
                  <FundTransaction
                    setError={setError}
                    setTransfer={setTransfer}
                    setTransferDetails={setTransferDetails}
                    error={error}
                    transferDetails={transferDetails}
                    benifitiaryAccounts={benifitiaryAccounts}
                    FundTransfer={FundTransfer}
                    user={user}
                  />
                  {addTransfer ? (
                    <FundTransaction
                      setError={setError}
                      setTransfer={setTransfer}
                      setTransferDetails={setTransferDetails1}
                      error={error}
                      transferDetails={transferDetails1}
                      benifitiaryAccounts={benifitiaryAccounts}
                      FundTransfer={FundTransfer}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <TransactionHistory data={data} />
            )}
          </div>
        </div>
      ) : (
        <div className="w-100 d-flex justify-content-center px-5  py-5 ">
          <div
            className="offerCard px-3 bg-white rounded-3 
        flex-column d-flex align-items-center "
          >
            {!cnfStatus ? (
              <>
                <div className="d-flex w-100 px-3 justify-content-around fs-4 mt-5">
                  <div>CustomerID : {response?.CustomerID}</div>
                  <div>EnquiryNumber : {response?.EnquiryNumber}</div>
                </div>
                {!terms ? (
                  <div className=" w-100 d-flex flex-column  px-5  mt-5 ">
                    <div className="fs-4 text-center">
                      {" "}
                      Select offer to continue!
                    </div>
                    <div className="row py-4 mt-5 justify-content-between">
                      {response?.Offers?.map((data) => (
                        <div
                          className={`col-5 user-select-none  
               fs-5 rounded-3 py-3
                 card-bg text-white shadow-5  ${
                   data.OfferID === Number(loanConfirm) ? " loan-select " : ""
                 }`}
                          key={data.OfferID}
                          role="presentation"
                          onClick={() => {
                            setLoanConfirm(Number(data.OfferID));
                          }}
                        >
                          <div className=" py-2  ms-3 ">
                            Offer ID: {data.OfferID}
                          </div>
                          <div className=" py-2 ms-3">
                            {" "}
                            Loan Amount: ₹ {data.LoanAmount}
                          </div>
                          <div className=" py-2 ms-3 ">
                            Loan Tenure: {data.LoanTenure}
                          </div>
                          <div className=" py-2 ms-3">
                            Tenure Unit: {data.TenureUnit}
                          </div>
                          <div className="  py-2 ms-3">ROI: {data.ROI}</div>
                        </div>
                      ))}
                    </div>

                    <div className="py-3 text-end px-3">
                      <button
                        type="button"
                        className="btn btn-success px-4 mx-5"
                        onClick={() => {
                          setLoanEnable(false);
                        }}
                      >
                        reject
                      </button>
                      <button
                        type="button"
                        disabled={loanConfirm === null}
                        className="btn btn-success px-4 "
                        onClick={() => {
                          setTerms(true);
                        }}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-wrap mt-5 d-flex align-items-start 
            flex-column"
                  >
                    <h4 className="card-title py-3 px-4 cardtext">
                      Terms and Conditions
                    </h4>
                    <div
                      style={{
                        minHeight: "500px",
                      }}
                      className="w-70 terms-height px-4 py-4 
         text-white card-bg rounded-3 "
                    >
                      GENERAL TERMS AND CONDITIONS OF THE PERSONAL LOAN
                      AGREEMENT <br /> ARTICLE I 1.1 <br />
                      CONSTRUCTION OF THE AGREEMENT <br />
                      a. The preamble portion of this agreement shall be deemed
                      to be an integral part of this agreement. <br /> b. The
                      terms, conditions, covenants etc. contained in this
                      agreement shall apply, subsist and be operative in respect
                      of the credit facilities granted or to be granted by the
                      Bank and this agreement shall be construed and read as
                      part and parcel of documents/agreements executed/to be
                      executed by the Borrower(s) in favour of the Bank. <br />{" "}
                      c. The Loan Application shall be deemed to constitute the
                      basis of this agreement and of the loan advanced or to be
                      advanced by the Bank hereunder. <br /> d. The Borrower(s)
                      agree and understand that whenever the context requires,
                      singular term shall include plural and plural term shall
                      include singular. <br /> 1.2 BORROWER’S WARRANTY,
                      UNDERTAKING & DECLARATION <br />
                      a. The borrower hereby warrants the correctness of each
                      and every one of the statement and particulars therein
                      contained and undertakes to carry out the proposals
                      therein set forth. <br /> b. The Borrower/s hereby agrees
                      that the said advance shall be governed by the terms and
                      conditions contained herein as well as those embodied in
                      the loan sanction letter, Deed of Guarantee, and other
                      loan and/or security documents except in so far as the
                      loan/security documents may expressly or by necessary
                      implication be modified by these presents. <br /> c. The
                      Borrower/s agrees and undertakes that the said advance
                      shall be utilized exclusively for the purpose set forth in
                      the Borrower’s proposal and for no other purpose <br /> d.
                      The Borrower/s agrees and undertakes to notify the bank in
                      writing of any circumstances affecting the correctness of
                      any particulars set forth in the Borrowers proposal
                      immediately after the occurrence of any such
                      circumstances. <br /> e. The Borrower will furnish the
                      Bank with all such information as the Bank may reasonably
                      require for the Bank’s satisfaction as due compliance with
                      the terms of the advance and all such periodical reports
                      and information at such times, in such form and containing
                      such particulars as the Bank may call for, for the purpose
                      of ascertaining the results of the utilization of the said
                      advance. <br /> f. That the Borrower mutually agrees that
                      each one or any of them are authorized and empowered by
                      the others to appoint and acknowledge the Borrower’s
                      individual and collective liability to the Bank by any
                      payment into the account or by way of express writing in
                      any manner or otherwise and any such admission and
                      acknowledgment of the liability by one or more of them
                      shall be construed and deemed to have been made on behalf
                      of each and all of them jointly and severally. <br /> g.
                      The Borrower hereby confirm that Borrower has no objection
                      to the bank giving a separate mandate to Borrower’s
                      auditors for issue of certificate regarding
                      diversion/siphoning off funds borrowed from the bank.{" "}
                      <br /> h. Each of the Borrowers represent(s) and
                      warrant(s) that (which shall be deemed to have been
                      repeated to the Bank on the date of the Disbursement and
                      on each date thereafter till entire repayment): ( a) The
                      Borrower is a citizen of India and a major (in terms of
                      age) and is of sound mind and is competent to contract and
                      enter into and perform his /her obligations contemplated
                      under this document/ other document/in respect of the
                      Loan; (b) There is no impediment or restriction, whether
                      under law, judgment, order, award, contract or otherwise,
                      for any of the Borrowers entering into and/or performing
                      any of the transactions contemplated by this/other
                      documents/ in respect of the Loan and all approvals and
                      consents , wherever necessary have been duly obtained and
                      are and will continue to be in full force; (c) The
                      execution hereof constitutes legal, valid and binding
                      obligations of the Borrower. (d) That there is no Event of
                      Default existing; (e) All declarations made by Borrower
                      are true and complete and no material information has been
                      suppressed / withheld. <br />
                      i. The Borrower covenants and agrees that, save and except
                      with the prior, specific and express written consent of
                      the Bank, the Borrower shall not: (a) create, assume or
                      incur any further indebtedness to any person; or lend or
                      advance any amounts to any person; or undertake any
                      guarantee or security obligation; (b) except in favour of
                      the Bank, sell, license, let, lease, transfer, alienate,
                      dispose of in any manner whatsoever, surrender or
                      otherwise encumber any of its assets, rights, title or
                      interest, receivables, or any part thereof; or create,
                      facilitate or permit to exist any charge , encumbrance or
                      lien of any kind whatsoever over any of its property or
                      grant any option or other right to purchase, lease or
                      otherwise acquire, any such assets or part thereof; (c)
                      permit or effect any direct or indirect change in the
                      legal or beneficial ownership or control; (d) Change/
                      cease/ retire from/ terminate/ resign from the present
                      employment/ profession/business disclosed in the
                      Application; or change, terminate or open any bank
                      account. <br /> j. The Bank shall have the right to not
                      return the Application, the photographs, information and
                      documents submitted by the Borrower. The Bank shall have
                      the right, without notice to or without any consent of the
                      Borrower, to approach, make enquiries, obtain information,
                      from any person including other banks/finance
                      entities/credit bureaus, Borrower’s employer/family
                      members, any other person related to the Borrower, to
                      obtain any information for assessing track record, credit
                      risk, or for establishing contact with the Borrower or for
                      the purpose of recovery of dues from the Borrower. <br />{" "}
                      k. Any notice, approvals, instructions, demand and other
                      communications given or made by the Bank shall be deemed
                      to be duly given and served if sent by normal post,
                      courier, registered Post, facsimile, electronic mail,
                      personal delivery, SMS or by pre-paid registered mail
                      addressed to the Borrower’s address, phone/ mobile number,
                      fax number or email as given in the Application (or at the
                      address changed on which Bank’s acknowledgement is duly
                      obtained) and such notice and service shall be deemed to
                      take effect on the third working day following the date of
                      the posting thereof in case of normal post, courier,
                      registered post, at the time of delivery if given by
                      personal delivery, upon receipt of a transmission report
                      if given by facsimile, upon sending the electronic mail or
                      SMS if given by electronic mail or SMS. The Borrower
                      undertakes to keep the Bank informed at all times in
                      writing of any change in the mailing address, email id,
                      phone and mobile number(s) as provided in the Application
                      and to obtain Bank’s written acknowledgement on the
                      intimation given to Bank for any such change.
                    </div>

                    <div className="d-flex align-items-center mt-3 px-3">
                      <input
                        className="   "
                        type="checkbox"
                        placeholder="Enter captcha"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTermsChecked(true);
                          } else {
                            setTermsChecked(false);
                          }
                        }}
                      />
                      <span className="fs-11 ms-2">
                        Check to agree to our{" "}
                        <span className="text-a-tag">Terms & Conditions</span>{" "}
                        and
                        <span className="text-a-tag"> Privacy Policy</span>
                      </span>
                    </div>
                    <div className="py-3">
                      <button
                        type="button"
                        disabled={!termsChecked}
                        className="btn btn-success px-4 "
                        onClick={() => {
                          confirmLoan();
                          // setTerms(true);
                        }}
                      >
                        Agree
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className=" w-100">
                <div className="d-flex mt-5 pt-5 flex-column justify-content-center align-items-center">
                  <div className="fs-3 text-capitalize ">
                    {" "}
                    {confirmation.Status}
                  </div>
                  <div className=" mt-5">
                    <button
                      type="button"
                      className="btn btn-success px-3"
                      onClick={() => {
                        login();
                        // setLoanEnable(false);
                      }}
                    >
                      okay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default HomeScreen;

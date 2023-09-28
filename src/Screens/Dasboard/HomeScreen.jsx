import React, { useEffect, useState, useContext } from "react";
import "./HomeScreen.css";
import BankImg from "../../assets/jklogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import logout from "../../assets/logout.png";
import { AppContext } from "../../context/AppContext";
import FundTransaction from "./Transaction";
import Modal from "../../Components/Modal";
import TransactionHistory from "./TransactionHistory";
import LoadingSpinner from "../Spinner/spinner";

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
  const [transfer, setTransfer] = useState(false);
  const [addTransfer, setAddTransfer] = useState(false);
  const [error, setError] = useState("");

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
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        const value = resp?.Accounts;

        console.log(resp, "benfit");

        value.splice(
          value.findIndex((a) => a.AccountNumber === user.AccountNumber),
          1
        );

        SetBenifitiaryAccounts(value);
        if (resp.StatusCode === "LOGIN SUCCESSFUL") {
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
        }
      });
  }, [user.AccountNumber, transferDetails.ToAccountNumber, apiUrl]);

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
  const closeModal = () => {
    setSucces(!success);
  };

  const closeModal1 = () => {
    // setSucces(!success);
  };

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
              // value={port?.ipAddress}
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
          <div className="headerTop1 text-muted">Loan</div>
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
            <img className="logoimg" src={BankImg} alt="icon" />
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
                  <button
                    style={{
                      // width: "75%",
                      marginRight: "20px",
                    }}
                    type="button"
                    // disabled="True"
                    className=" px-5  border border-0 bg-primary text-center rounded-2 text-white  "
                    role="presentation"
                    onClick={() => {
                      console.log(user);
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
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </div>
              <div
                className="d-flex "
                style={
                  {
                    // width:'100%'
                  }
                }
              >
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
    </div>
  );
};
export default HomeScreen;

import React, { useState } from "react";
import "../../../App.css";

import Modal from "../../Modal";

import ClipLoader from "react-spinners/ClipLoader";
const NewSavingsAccount = () => {
  const [open, setOpen] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [userdetails, setUserdetails] = useState({
    AccountsType: "CORPORATE",
    CustName: "",
    CustAddress: "",
    PAN_NO: "",
    AadharNo: "",
    MobileNo: "",
    Profession: "",
    EmployerName: "",
    MonthlySalary: "",
  });
  const [accountBalance, setAccountBalance] = useState();

  const [balanceView, setBalanceView] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const login = async (userDetails) => {
    console.log(userDetails, "hello");
    setLoading(true);
    fetch("http://3.108.222.3:8080/login", {
      method: "POST",
      body: JSON.stringify({
        // UserID: "SA-1000002",
        // Password: "string",
        UserID: userDetails.UserID,
        Password: userDetails.Password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp, "chat bot");

        if (resp.StatusCode === "LOGIN SUCCESSFUL") {
          setBalanceView(true);
          setAccountBalance(resp.AccountBalance);
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
          setError("Credentials error !!");
        }

        setLoading(false);

        // setOpen(!open);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  // {
  //   "AccountsType": "CORPORATE",
  //   "CustName": "BAHWAN CYBERTEK, CHENNAI",
  //   "CustAddress": "CHENNAI",
  //   "PAN_NO": "BCTCN1234C",
  //   "AadharNo": "4321-7878-9000",
  //   "MobileNo": "0212-32329",
  //   "Profession": "",
  //   "EmployerName": "",
  //   "MonthlySalary": ""
  // }
  const closeModal = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <ClipLoader color={"#fff"} loading={loading} />

      {open && (
        <Modal className="" isOpen={true} onClose={closeModal}>
          <div className=" bg-white border border-2 rounded-2">
            {error ? (
              <div className="p-3 text-center text-danger fs-6">{error}</div>
            ) : (
              <>
                {balanceView ? (
                  <div className="p-3 text-center text-primary fs-6">
                    {" "}
                    Account Balance : ₹<span> {accountBalance} </span>{" "}
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="p-5">
                      <div
                        className=""
                        style={{
                          display: "flex",
                          flexDirection: "column",

                          justifyContent: "center",
                        }}
                      >
                        {!verifyOtp ? (
                          <>
                            <div> Account Type</div>
                            <input
                              disabled
                              className="user-input rounded-2 px-2"
                              style={{
                                color: "black",
                              }}
                              type="text"
                              placeholder=""
                              // onChange={(e) => {
                              //   setUserdetails({
                              //     ...userdetails,
                              //     UserID: e.target.value,
                              //   });
                              // }}
                              value={userdetails.AccountsType}
                            />
                            <div>Customer Name</div>
                            <input
                              className="user-input rounded-2 px-2"
                              style={{
                                color: "black",
                              }}
                              type="text"
                              placeholder=""
                              onChange={(e) => {
                                setUserdetails({
                                  ...userdetails,
                                  CustName: e.target.value,
                                });
                              }}
                              value={userdetails.CustName}
                            />
                            <div> Customer Address</div>
                            <input
                              className="user-input rounded-2 px-2"
                              style={{
                                color: "black",
                              }}
                              type="text"
                              placeholder=""
                              onChange={(e) => {
                                setUserdetails({
                                  ...userdetails,
                                  CustAddress: e.target.value,
                                });
                              }}
                              value={userdetails.CustAddress}
                            />
                            <div>PAN No</div>
                            <input
                              className="user-input rounded-2 px-2"
                              style={{
                                color: "",
                              }}
                              type="text"
                              placeholder=""
                              onChange={(e) => {
                                setUserdetails({
                                  ...userdetails,
                                  PAN_NO: e.target.value,
                                });
                              }}
                              value={userdetails.PAN_NO}
                            />
                            <div> AadharNo</div>
                            <input
                              className="user-input rounded-2 px-2"
                              style={{
                                color: "",
                              }}
                              type="text"
                              placeholder=""
                              onChange={(e) => {
                                setUserdetails({
                                  ...userdetails,
                                  AadharNo: e.target.value,
                                });
                              }}
                              value={userdetails.AadharNo}
                            />
                          </>
                        ) : (
                          <>
                            <div> Customer ID : {userdetails?.UserID}</div>
                            <div className="d-flex mt-2">
                              <div className="mx-2"> OTP: </div>
                              <input
                                className="user-input rounded-2 px-"
                                style={{
                                  color: "black",
                                  width: "100px",
                                }}
                                type="text"
                                placeholder=""
                                onChange={(e) => {
                                  setUserdetails({
                                    ...userdetails,
                                    Password: e.target.value,
                                  });
                                }}
                                value={userdetails.Password}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      {!verifyOtp ? (
                        <div
                          className="bg-primary text-white mt-5 align-items-center text-center rounded-2"
                          role="presentation"
                          onClick={() => {
                            if (userdetails.UserID) {
                              setVerifyOtp(true);
                            } else {
                            }
                            // setOpen(!open)
                          }}
                        >
                          {"Submit"}
                        </div>
                      ) : (
                        <div
                          className="bg-primary text-white mt-5 align-items-center text-center rounded-2"
                          role="presentation"
                          onClick={() => {
                            if (userdetails) {
                              //Api call
                              // setUserdetails({});
                              login(userdetails);
                              setVerifyOtp(false);
                            } else {
                            }
                            // setOpen(!open)
                          }}
                        >
                          {"verifyOtp"}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewSavingsAccount;

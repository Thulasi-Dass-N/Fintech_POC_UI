import React, { useState, useContext } from "react";
import "../../../App.css";
// import LoadingSpinner from "../../../Screens/Spinner/spinner";
import Modal from "../../Modal";
import { AppContext } from "../../../context/AppContext";

const SavingsBalance = () => {
  const { apiUrl } = useContext(AppContext);
  const [open, setOpen] = useState(true);

  const [verifyOtp, setVerifyOtp] = useState(false);
  const [userdetails, setUserdetails] = useState({
    UserID: "",
    Password: "",
  });
  const [accountBalance, setAccountBalance] = useState();

  const [balanceView, setBalanceView] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const login = async (userDetails) => {

    setLoading(true);
    fetch(`http://${apiUrl.ip_port}/login`, {
      method: "POST",
      body: JSON.stringify({
        UserID: userDetails.UserID,
        Password: userDetails.Password,
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
          setBalanceView(true);
          setAccountBalance(resp.AccountBalance);
          setLoading(false);
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
          setError("Credentials error !!");
        }

        setLoading(false);

        // setOpen(!open);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setOpen(!open);
  };
  // const closeModal1 = () => {};
  return (
    <div className="">
      {open && (
        <Modal className="" isOpen={true} onClose={closeModal}>
          <div className=" bg-white border border-2 rounded-2">
            {/* <Modal className="backdrop" isOpen={loading} onClose={closeModal1}>
              <LoadingSpinner />
            </Modal> */}
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
                            <div> Customer Id</div>
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
                                  UserID: e.target.value,
                                });
                              }}
                              value={userdetails.customerId}
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
                              setLoading(true);
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

export default SavingsBalance;

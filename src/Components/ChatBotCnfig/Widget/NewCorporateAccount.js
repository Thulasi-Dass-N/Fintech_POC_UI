import React, { useState, useContext } from "react";
import "../../../App.css";

import Modal from "../../Modal";
import { validateMob, validatePan } from "../../../Utils/Validation";
import { AppContext } from "../../../context/AppContext";
import LoadingSpinner from "../../../Screens/Spinner/spinner";

const NewCorporateAccount = () => {
  const [open, setOpen] = useState(true);
  const { apiUrl } = useContext(AppContext);
  const [userdetails, setuserdetails] = useState({
    AccountsType: "SAVINGS",
    CustName: "",
    CustAddress: "",
    PAN_NO: "",
    AadharNo: "",
    MobileNo: "",
    Profession: "",
    EmployerName: "",
    MonthlySalary: "",
  });
  const [loading, setLoading] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [response, setResponse] = useState("");
  const [showscustomerID, setShowcustomerID] = useState(false);

  const customerOnboard = () => {
    setLoading(true);

    fetch(`http://${apiUrl.ip_port}/apply`, {
      method: "POST",
      body: JSON.stringify({
        AccountsType: userdetails?.AccountsType,
        CustName: userdetails?.CustName,
        CustAddress: userdetails?.CustAddress,
        PAN_NO: userdetails?.PAN_NO,
        AadharNo: userdetails?.AadharNo,
        MobileNo: userdetails?.MobileNo,
        Profession: userdetails?.Profession,
        EmployerName: userdetails?.EmployerName,
        MonthlySalary: userdetails?.MonthlySalary,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.APIKey,
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setResponse(resp);
        setShowcustomerID(true);
        setLoading(false);

        setuserdetails({
          ...userdetails,
          AccountsType: "",
          CustName: "",
          CustAddress: "",
          PAN_NO: "",
          AadharNo: "",
          MobileNo: "",
          Profession: "",
          EmployerName: "",
          MonthlySalary: "",
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setOpen(!open);
  };
  // const closeModal1 = () => {};

  return (
    <div className="">
      {/* <Modal className="backdrop" isOpen={loading} onClose={closeModal1}>
        <LoadingSpinner />
      </Modal> */}

      {open && (
        <Modal className="" isOpen={true} onClose={closeModal}>
          <div className=" bg-white border border-2 rounded-2">
            <div className="p-2">
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "center",
                }}
              >
                {showscustomerID ? (
                  <div className="w-100  ">
                    <div className="d-flex flex-column justify-content-around  align-items-start">
                      <div className="w- fw-bold text-start text-info ">
                        Customer ID:
                      </div>
                      <div className="w- text-start text-white ">
                        {response?.CustomerID}
                      </div>
                    </div>
                    <div className="d-flex flex-column mt-3 justify-content-between  align-items-start">
                      <div className="w- fw-bold  text-start text-info ">
                        ApplicationStatus :
                      </div>
                      <div className="w- text-start text-white">
                        {response?.ApplicationStatus}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column mt-3 justify-content-between px-2">
                    <div> Account Type</div>
                    <input
                      disabled
                      className="user-input rounded-2 px-2"
                      style={{
                        color: "black",
                      }}
                      type="text"
                      placeholder=""
                      value={userdetails.AccountsType}
                    />
                    <div>Customer Name</div>
                    <input
                      className="user-input rounded-2 px-2 border border-1"
                      style={{
                        color: "black",
                      }}
                      type="text"
                      placeholder=""
                      onChange={(e) => {
                        setuserdetails({
                          ...userdetails,
                          CustName: e.target.value,
                        });
                      }}
                      value={userdetails.CustName}
                    />
                    <div> Customer Address</div>
                    <input
                      className="user-input rounded-2 px-2 border border-1"
                      style={{
                        color: "black",
                      }}
                      type="text"
                      placeholder=""
                      onChange={(e) => {
                        setuserdetails({
                          ...userdetails,
                          CustAddress: e.target.value,
                        });
                      }}
                      value={userdetails.CustAddress}
                    />
                    <div>PAN No</div>
                    <input
                      className="user-input rounded-2 px-2 border border-1"
                      style={{
                        color: "",
                      }}
                      type="text"
                      placeholder=""
                      onChange={(e) => {
                        setuserdetails({
                          ...userdetails,
                          PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                        });
                      }}
                      value={userdetails.PAN_NO}
                    />
                    <div> AadharNo</div>
                    <input
                      className="user-input rounded-2 px-2 border border-1"
                      style={{
                        color: "",
                      }}
                      type="number"
                      placeholder=""
                      onChange={(e) => {
                        setuserdetails({
                          ...userdetails,
                          AadharNo: e.target.value,
                        });
                      }}
                      value={userdetails.AadharNo}
                    />
                    <div>Mobile</div>
                    <input
                      className="user-input rounded-2 px-2 border border-1"
                      style={{
                        color: "",
                      }}
                      type="number"
                      placeholder=""
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (validateMob(e?.target?.value)) {
                          setuserdetails({
                            ...userdetails,
                            MobileNo: e?.target?.value,
                          });
                        } else {
                          setuserdetails({
                            ...userdetails,
                            MobileNo: "",
                          });
                          console.log("erro");
                        }
                      }}
                      value={mobileNumber}
                    />
                    {/* <div className=" w-100 mt-2 justify-content-around align-items-center">
                      <div className="">Type of Income </div>
                      <div className=" mt-1 form-group">
                        <select
                          className="form-select form-control pt-2 pb-2 rounded-3"
                          aria-label="Default select example"
                          id="account"
                          onChange={(e) => {
                            setuserdetails({
                              ...userdetails,
                              Profession: e?.target?.value,
                            });
                          }}
                        >
                          <option
                            disabled
                            selected={userdetails?.Profession === ""}
                            label="Choose Profession"
                          />
                          <option
                            selected={userdetails?.Profession === "BUSINESS"}
                            value="BUSINESS"
                          >
                            BUSINESS
                          </option>
                          <option
                            selected={userdetails?.Profession === "SALARIZED"}
                            value="SALARIZED"
                          >
                            SALARIZED
                          </option>
                        </select>
                      </div>
                    </div>
                    {userdetails?.Profession && (
                      <>
                        <div>
                          {userdetails?.Profession === "BUSINESS"
                            ? "Describe your business"
                            : "Employer Name"}
                        </div>
                        <input
                          className="user-input rounded-2 px-2 border border-1"
                          style={{
                            color: "",
                          }}
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setuserdetails({
                              ...userdetails,
                              EmployerName: e.target.value,
                            });
                          }}
                          value={userdetails.EmployerName}
                        />
                      </>
                    )}
                    <div>Monthly Income</div>
                    <input
                      className="user-input rounded-2 px-2 border border-1"
                      style={{
                        color: "",
                      }}
                      type="text"
                      placeholder=""
                      onChange={(e) => {
                        setuserdetails({
                          ...userdetails,
                          MonthlySalary: e.target.value,
                        });
                      }}
                      value={userdetails.MonthlySalary}
                    /> */}

                    <button
                      disabled={
                        userdetails?.AccountsType === "" ||
                        userdetails?.CustName === "" ||
                        userdetails?.CustAddress === "" ||
                        userdetails?.PAN_NO === "" ||
                        userdetails?.AadharNo === "" ||
                        userdetails?.MobileNo === "" ||
                        // userdetails?.Profession === "" ||
                        // userdetails?.EmployerName === "" ||
                        // userdetails?.MonthlySalary === "" ||
                        userdetails?.PAN_NO.length !== 10 ||
                        userdetails?.AadharNo.length !== 12
                      }
                      type="button"
                      className="btn btn-success  mx-3 mt-2 mb-2 "
                      onClick={() => {
                        if (
                          userdetails?.AccountsType !== "" &&
                          userdetails?.CustName !== "" &&
                          userdetails?.CustAddress !== "" &&
                          userdetails?.PAN_NO !== "" &&
                          userdetails?.AadharNo !== "" &&
                          userdetails?.MobileNo !== "" 
                          // userdetails?.Profession !== "" &&
                          // userdetails?.EmployerName !== "" &&
                          // userdetails?.MonthlySalary !== ""
                        ) {
                          setLoading(true);

                          customerOnboard();
                        } else {
                          console.log("error");
                        }
                      }}
                    >
                      submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewCorporateAccount;

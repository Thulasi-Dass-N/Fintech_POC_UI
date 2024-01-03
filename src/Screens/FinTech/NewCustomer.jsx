import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../Components/Modal";
import logo from "../../assets/finteck.png";
import { AppContext } from "../../context/AppContext";
import LoadingSpinner from "../Spinner/spinner";
import "./NewCustomer.css";
// import { getComponents } from "../Common/common";

import { nameValid, validateMob, validatePan } from "../../Utils/Validation";

const NewCustomer = () => {
  const navigate = useNavigate();
  const [applyNow, setApplyNow] = useState(false);
  const { finApiUrl, setFinApiUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [response, setResponse] = useState("");
  const [showscustomerID, setShowcustomerID] = useState(false);
  const [success, setSucces] = useState(false);
  const [port, setPort] = useState({
    ipAddress: "",
    APIKey: "",
  });

  const [serachParams, setSearchParams] = useSearchParams({
    id: "0",
    type: "",
  });

  const id = serachParams.get("id");
  const type = serachParams.get("type");

  const [customerDetails, setCustomerDetails] = useState({
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

  const closeModal = () => {
    setSucces(!success);
  };
  const closeModal1 = () => {
    // setSucces(!success);
  };

  const customerOnboard = () => {
    setLoading(true);

    fetch(`http://${finApiUrl?.ip_port}/apply`, {
      method: "POST",
      body: JSON.stringify({
        AccountsType: customerDetails?.AccountsType,
        CustName: customerDetails?.CustName,
        CustAddress: customerDetails?.CustAddress,
        PAN_NO: customerDetails?.PAN_NO,
        AadharNo: customerDetails?.AadharNo,
        MobileNo: customerDetails?.MobileNo,
        Profession: customerDetails?.Profession,
        EmployerName: customerDetails?.EmployerName,
        MonthlySalary: customerDetails?.MonthlySalary,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": finApiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setResponse(resp);
        setShowcustomerID(true);
        setLoading(false);

        setCustomerDetails({
          ...customerDetails,
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
        if (resp.StatusCode === "LOGIN SUCCESSFUL") {
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getComponents = (id) => {
    switch (id) {
      case "0":
        return (
          <>
            <div className="mb-3 in-left text-white  w-100 justify-content-around  align-items-center px-5 ">
              <div className=" d-flex  mb-3  text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5  text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-100 in-left mt-5 py-5 px-2 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  setCustomerDetails({
                    ...customerDetails,
                    AccountsType: "",
                  });
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={customerDetails?.AccountsType === ""}
                className="btn btn-success mx-3 w-25"
                onClick={() => {
                  if (customerDetails?.AccountsType !== "") {
                    setSearchParams((prev) => {
                      prev.set("id", "1");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );
      case "1":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex  mb-3 text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5  text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3 text-white w-100 in-left justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-100  mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });

                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === ""
                }
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "2");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );

      case "2":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex  mb-3  text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3 text-white w-100 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex in-left mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50 mt-3 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    type="text"
                    placeholder="Address"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-100 mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  // setCustomerDetails({});
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === ""
                }
                className="btn btn-success mx-3    w-25"
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "3");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );

      case "3":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex  mb-3 text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex  mt-3 text-white w-100 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50 mt-3 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Address"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 in-left text-white w-100 justify-content-around align-items-center ">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your PAN number :{" "}
                </div>
                <div className="  form-group  w-50 ">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Pan card number"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={customerDetails?.PAN_NO}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-100  mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  // setCustomerDetails({});
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.PAN_NO.length !== 10
                }
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "4");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );
      case "4":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex   mb-3 text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3 text-white w-100 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50 mt-3 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Address"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex  mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your PAN number :{" "}
                </div>
                <div className="  form-group  w-50 ">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Pan card number"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={customerDetails?.PAN_NO}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 in-left text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your Aadhaar number :
                </div>
                <div className=" w-50  form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Aadhaar number"
                    maxLength={12}
                    minLength={12}
                    type="number"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        AadharNo: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-100 mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success mx-3  w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  // setCustomerDetails({});
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.AadharNo === "" ||
                  customerDetails?.PAN_NO.length !== 10 ||
                  customerDetails?.AadharNo.length !== 12
                }
                className="btn btn-success mx-3  w-25"
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== "" &&
                    customerDetails?.AadharNo !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "5");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );
      case "5":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex  mb-3   text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex text-white w-100 mt-3 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white   w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50 mt-3 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Address"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white  w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your PAN number :{" "}
                </div>
                <div className="  form-group  w-50 ">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Pan card number"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={customerDetails?.PAN_NO}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white  w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your Aadhaar number :
                </div>
                <div className=" w-50  form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Aadhaar number"
                    maxLength={12}
                    minLength={12}
                    type="number"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        AadharNo: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 in-left text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Where should we call you:
                </div>
                <div className="  w-50 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Mobile number"
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e?.target?.value);

                      if (validateMob(e?.target?.value)) {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: e?.target?.value,
                        });
                      } else {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-100  mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  // setCustomerDetails({});
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.AadharNo === "" ||
                  customerDetails?.MobileNo === "" ||
                  customerDetails?.PAN_NO.length !== 10 ||
                  customerDetails?.AadharNo.length !== 12
                }
                className="btn btn-success mx-3   w-25"
                onClick={() => {
                  if (type === "CORPORATE" || type === "SAVINGS") {
                    if (
                      customerDetails?.AccountsType !== "" &&
                      customerDetails?.CustName !== "" &&
                      customerDetails?.CustAddress !== "" &&
                      customerDetails?.PAN_NO !== "" &&
                      customerDetails?.AadharNo !== "" &&
                      customerDetails?.MobileNo !== ""
                    ) {
                      setLoading(true);
                      customerOnboard();
                    } else {
                    }
                  } else if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== "" &&
                    customerDetails?.AadharNo !== "" &&
                    customerDetails?.MobileNo !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "6");
                      return prev;
                    });
                  } else {
                  }
                }}
              >
                {type === "CORPORATE" || type === "SAVINGS"
                  ? "submit"
                  : "next >>"}
              </button>
            </div>
          </>
        );
      case "6":
        return (
          <>
            <div className="mb-3 text-white  w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex   mb-3 text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3 text-white w-100 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3  text-white w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50 mt-3 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Address"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your PAN number :{" "}
                </div>
                <div className="   form-group  w-50 ">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Pan card number"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={customerDetails?.PAN_NO}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3  text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your Aadhaar number :
                </div>
                <div className=" w-50  form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Aadhaar number"
                    maxLength={12}
                    minLength={12}
                    type="number"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        AadharNo: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Where should we call you:
                </div>
                <div className="  w-50 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Mobile number"
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e?.target?.value);

                      if (validateMob(e?.target?.value)) {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: e?.target?.value,
                        });
                      } else {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 in-left text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Type of Income :{" "}
                </div>
                <div className="  form-group w-50">
                  <select
                    className="form-select form-control pt-2 pb-2   text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        Profession: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.Profession === ""}
                      label="Choose Profession"
                    />
                    <option
                      selected={customerDetails?.Profession === "BUSINESS"}
                      value="BUSINESS"
                    >
                      BUSINESS
                    </option>
                    <option
                      selected={customerDetails?.Profession === "SALARIED"}
                      value="SALARIED"
                    >
                      SALARIED
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-100 mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success   mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  // setCustomerDetails({});
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.AadharNo === "" ||
                  customerDetails?.MobileNo === "" ||
                  customerDetails?.Profession === "" ||
                  customerDetails?.PAN_NO.length !== 10 ||
                  customerDetails?.AadharNo.length !== 12
                }
                className="btn btn-success   mx-3 w-25"
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== "" &&
                    customerDetails?.AadharNo !== "" &&
                    customerDetails?.MobileNo !== "" &&
                    customerDetails?.Profession !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "7");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );

      case "7":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex  mb-3 text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3 text-white w-100 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex  mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50 mt-3 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Address"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your PAN number :{" "}
                </div>
                <div className="  form-group  w-50 ">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Pan card number"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={customerDetails?.PAN_NO}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your Aadhaar number :
                </div>
                <div className=" w-50  form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Aadhaar number"
                    maxLength={12}
                    minLength={12}
                    type="number"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        AadharNo: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Where should we call you:
                </div>
                <div className="  w-50 form-group">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Mobile number"
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e?.target?.value);

                      if (validateMob(e?.target?.value)) {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: e?.target?.value,
                        });
                      } else {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3  text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Type of Income :{" "}
                </div>
                <div className="  form-group w-50">
                  <select
                    className="form-select form-control pt-2 pb-2   text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        Profession: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.Profession === ""}
                      label="Choose Profession"
                    />
                    <option
                      selected={customerDetails?.Profession === "BUSINESS"}
                      value="BUSINESS"
                    >
                      BUSINESS
                    </option>
                    <option
                      selected={customerDetails?.Profession === "SALARIED"}
                      value="SALARIED"
                    >
                      SALARIED
                    </option>
                  </select>
                </div>
              </div>

              <div className="d-flex in-left mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  {customerDetails?.Profession === "BUSINESS"
                    ? " Describe your business"
                    : "Employer name :"}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Employer name"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        EmployerName: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-100 mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });
                  // setCustomerDetails({});
                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success  mx-3 w-25"
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.AadharNo === "" ||
                  customerDetails?.MobileNo === "" ||
                  customerDetails?.Profession === "" ||
                  customerDetails?.EmployerName === "" ||
                  customerDetails?.PAN_NO.length !== 10 ||
                  customerDetails?.AadharNo.length !== 12
                }
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== "" &&
                    customerDetails?.AadharNo !== "" &&
                    customerDetails?.MobileNo !== "" &&
                    customerDetails?.Profession !== "" &&
                    customerDetails?.EmployerName !== ""
                  ) {
                    setSearchParams((prev) => {
                      prev.set("id", "8");
                      return prev;
                    });
                  }
                }}
              >
                Next {">>"}
              </button>
            </div>
          </>
        );

      case "8":
        return (
          <>
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className=" d-flex   mb-3 text-white w-100 justify-content-between  align-items-center">
                <div className="w-50 fs-5 text-end px-2 ">Account Type :</div>
                <div className=" w-50 form-group">
                  <select
                    className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        prev.set("type", e?.target?.value);

                        return prev;
                      });
                      setCustomerDetails({
                        ...customerDetails,
                        AccountsType: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.AccountsType === ""}
                      label=" Select Account Type"
                    />
                    <option
                      selected={customerDetails?.AccountsType === "CORPORATE"}
                      value="CORPORATE"
                    >
                      CORPORATE
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "SAVINGS"}
                      value="SAVINGS"
                    >
                      SAVINGS
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "LOAN"}
                      value="LOAN"
                    >
                      LOAN
                    </option>
                    <option
                      selected={customerDetails?.AccountsType === "CREDITCARD"}
                      value="CREDITCARD"
                    >
                      CREDIT CARD
                    </option>
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3 text-white w-100 justify-content-start align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  May we know your name :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Enter your name"
                    type="text"
                    value={customerDetails?.CustName || ""}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustName: nameValid(e?.target?.value),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5 w-50 text-end px-2">
                  Where should we contact you:
                </div>
                <div className="  w-50  form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Address"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        CustAddress: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2 ">
                  Can you please help us with your PAN number :{" "}
                </div>
                <div className="  form-group  w-50 ">
                  <input
                    className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                    placeholder="Pan card number"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={customerDetails?.PAN_NO}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        PAN_NO: validatePan(e?.target?.value).toUpperCase(),
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3  text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Can you please help us with your Aadhaar number :
                </div>
                <div className=" w-50  form-group">
                  <input
                    className=" w-100 px-2 py-1  rounded-2 user-input border-0"
                    placeholder="Aadhaar number"
                    type="number"
                    maxLength={12}
                    minLength={12}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        AadharNo: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Where should we call you:
                </div>
                <div className="  w-50 form-group">
                  <input
                    className=" w-100 px-2 py-1  rounded-2 user-input border-0"
                    placeholder="Mobile number"
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e?.target?.value);

                      if (validateMob(e?.target?.value)) {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: e?.target?.value,
                        });
                      } else {
                        setCustomerDetails({
                          ...customerDetails,
                          MobileNo: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="d-flex mt-3  text-white w-100  justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  Type of Income :{" "}
                </div>
                <div className="  form-group w-50">
                  <select
                    className="form-select form-control pt-2 pb-2   text-primary rounded-3"
                    aria-label="Default select example"
                    id="account"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        Profession: e?.target?.value,
                      });
                    }}
                  >
                    <option
                      disabled
                      selected={customerDetails?.Profession === ""}
                      label="Choose Profession"
                    />
                    <option
                      selected={customerDetails?.Profession === "BUSINESS"}
                      value="BUSINESS"
                    >
                      BUSINESS
                    </option>
                    <option
                      selected={customerDetails?.Profession === "SALARIED"}
                      value="SALARIED"
                    >
                      SALARIED
                    </option>
                  </select>
                </div>
              </div>

              <div className="d-flex mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5  w-50 text-end px-2">
                  {customerDetails?.Profession === "BUSINESS"
                    ? " Describe your business"
                    : "Employer name"}{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Employer name"
                    type="text"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        EmployerName: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="d-flex in-left mt-3 text-white w-100 justify-content-around align-items-center">
                <div className="fs-5   w-50 text-end px-2">
                  Monthly Income :{" "}
                </div>
                <div className=" w-50 form-group">
                  <input
                    className=" w-100 px-2 p-1 rounded-2 user-input border-0"
                    placeholder="Monthly Income"
                    type="number"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        MonthlySalary: e?.target?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-100 mt-5 py-5 d-flex justify-content-around ">
              <button
                type="button"
                className="btn btn-success mx-3  w-25"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("id", "");
                    prev.set("type", "");
                    return prev;
                  });

                  setApplyNow(false);
                }}
              >
                Cancel
              </button>
              <button
                disabled={
                  customerDetails?.AccountsType === "" ||
                  customerDetails?.CustName === "" ||
                  customerDetails?.CustAddress === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.AadharNo === "" ||
                  customerDetails?.MobileNo === "" ||
                  customerDetails?.Profession === "" ||
                  customerDetails?.EmployerName === "" ||
                  customerDetails?.MonthlySalary === "" ||
                  customerDetails?.PAN_NO.length !== 10 ||
                  customerDetails?.AadharNo.length !== 12
                }
                type="button"
                className="btn btn-success  mx-3 w-25"
                onClick={() => {
                  if (
                    customerDetails?.AccountsType !== "" &&
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== "" &&
                    customerDetails?.AadharNo !== "" &&
                    customerDetails?.MobileNo !== "" &&
                    customerDetails?.Profession !== "" &&
                    customerDetails?.EmployerName !== "" &&
                    customerDetails?.MonthlySalary !== ""
                  ) {
                    setLoading(true);

                    customerOnboard();
                  } else {
                  }
                }}
              >
                submit
              </button>
            </div>
          </>
        );

      default:
        return "";
    }
  };
  return (
    <div className="main_div">
      <Modal className="backdrop" isOpen={loading} onClose={closeModal1}>
        <LoadingSpinner />
      </Modal>
      <Modal className="backdrop" isOpen={success} onClose={closeModal}>
        <div
          style={{
            top: "32%",
            left: "80%",
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
              onChange={(e) => {
                setPort({
                  ...port,
                  ipAddress: e?.target?.value,
                });
              }}
              defaultValue={finApiUrl?.ip_port || ""}
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
              defaultValue={finApiUrl?.api_key}
            />
          </div>
          <div className="d-flex mt-4  w-100 justify-content-evenly ">
            <div
              role="presentation"
              className="px-2 border border-1 w-25 text-center bg-success text-white rounded-2"
              onClick={() => {
                setFinApiUrl({
                  ...finApiUrl,
                  ip_port: port?.ipAddress
                    ? port?.ipAddress
                    : finApiUrl?.ip_port,
                  api_key: port?.APIKey ? port?.APIKey : finApiUrl?.api_key,
                });
                setSucces(false);
              }}
            >
              save
            </div>
            <div
              role="presentation"
              className="px-2 border border-1 w-25 text-center bg-secondary bg-opacity-25 text-dark rounded-2"
              onClick={() => {
                setSucces(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
      <div className=" d-flex justify-content-around px-1">
        <div className="mt-4 left-pad">
          <img
            className="img-logo"
            style={{
              width: "90px",

              // height: "150px",
            }}
            src={logo}
            alt="icon"
          />
        </div>
        <ul className="nav right-pad">
          <div className="d-flex mt-5">
            <li className="nav-item ">
              <a
                className="nav-link  active text-color"
                aria-current="page"
                href="#1"
              >
                ABOUT US
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-color" aria-current="page" href="#1">
                CREDIT CARD
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-color" aria-current="page" href="#1">
                FEATURES
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-color" aria-current="page" href="#1">
                ACCOUNTS
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-color" aria-current="page" href="#1">
                RESOURCES
              </a>
            </li>
            <li className="nav-item ">
              <div
                className="nav-link text-color"
                aria-current="page"
                role="presentation"
                onClick={() => {
                  setSucces(true);
                }}
              >
                SETTINGS
              </div>
            </li>
            <div className="">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  setApplyNow(!applyNow);
                  setShowcustomerID(false);
                  setCustomerDetails({
                    ...customerDetails,
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
                  setMobileNumber("");
                  setSearchParams((prev) => {
                    prev.set("id", "0");
                    prev.set("type", "");
                    return prev;
                  });
                }}
              >
                {applyNow ? "Cancel" : "Apply now"}
              </button>
              <button
                type="button"
                className="btn btn-success ms-2"
                onClick={() => {
                  navigate("/loan");
                }}
              >
                Apply For Loan
              </button>
            </div>
          </div>
        </ul>
      </div>
      {applyNow ? (
        <div className="d-flex flex-row w-100 mb-3 mt-3 py-3 px-2 align-items-center  ">
          <div className=" d-flex w-25  align-items-center justify-content-center mx-5">
            <video
              className="video-size"
              autoPlay={true}
              muted
              playsinline
              loop
              poster="https://dza2kd7rioahk.cloudfront.net/assets/pngs/home-page_poster.png"
              src="https://dza2kd7rioahk.cloudfront.net/assets/videos/home-page_poster.webm"
            />
          </div>
          <div className="  w-75">
            {showscustomerID ? (
              <div className="w-100  ">
                {/* AppicationRefNo */}
                {response?.AppicationRefNo !== "NaN" ? (
                  <div className="d-flex justify-content-around  align-items-center">
                    <div className="w-25 fw-bold text-start text-info ">
                      Application No:
                    </div>
                    <div className="w-75 text-start text-white ">
                      {response?.AppicationRefNo}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {response?.CustomerID ? (
                  <div className="d-flex justify-content-around  align-items-center">
                    <div className="w-25 fw-bold text-start text-info ">
                      Customer ID:
                    </div>
                    <div className="w-75 text-start text-white ">
                      {response?.CustomerID}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex mt-3 justify-content-between  align-items-center">
                  <div className="w-25 fw-bold  text-start text-info ">
                    ApplicationStatus :
                  </div>
                  <div className="w-75 text-start text-white">
                    {response?.ApplicationStatus}
                  </div>
                </div>
              </div>
            ) : (
              getComponents(id)
            )}
          </div>
        </div>
      ) : (
        <div class="d-flex w-100 mb-3 mt-5 py-5 px-2 align-items-center ">
          <div class=" w-50 px-5 left-container">
            <h1 className="text-white left-font-h1">For all things money</h1>
            <p className="left-font">
              Whether it's planning your savings with a new-age savings account,
              investing in mutual funds and high-interest products or tracking
              your expenses - do it all on Fi.
            </p>
          </div>
          <div class=" d-flex w-50  align-items-center justify-content-center">
            <video
              className="video-size"
              autoPlay={true}
              muted
              playsinline
              loop
              poster="https://dza2kd7rioahk.cloudfront.net/assets/pngs/home-page_poster.png"
              src="https://dza2kd7rioahk.cloudfront.net/assets/videos/home-page_poster.webm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCustomer;

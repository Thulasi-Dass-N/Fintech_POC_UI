import React from "react";
import { nameValid, validatePan, validateMob } from "../../Utils/Validation";

export const getComponents = ({
  id,
  setSearchParams,
  setCustomerDetails,
  customerDetails,
  setApplyNow,
  setMobileNumber,
  mobileNumber,
  setLoading,
  customerOnboard,
  type,
}) => {
  switch (id) {
    case "0":
      return (
        <>
          <div className="mb-3 in-left text-white  w-100 justify-content-around  align-items-center px-5 ">
            <div className=" d-flex  mb-3  text-white w-100 justify-content-between  align-items-center">
              <div className="w-50 fs-5  text-start ">Account Type :</div>
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
          <div className="w-100 in-left mt-5 py-5 px-3 d-flex justify-content-around ">
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
              <div className="w-50 fs-5  text-start ">Account Type :</div>
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
            <div className="d-flex text-white w-100 in-left justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex  text-white w-100 justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex in-left  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex   text-white w-100 justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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

            <div className="d-flex in-left text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your PAN number :{" "}
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex  text-white w-100 justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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

            <div className="d-flex   text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your PAN number :{" "}
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

            <div className="d-flex in-left text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your Aadhar number :
              </div>
              <div className=" w-50  form-group">
                <input
                  className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                  placeholder="Aadhar number"
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex text-white w-100  justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex  text-white   w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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

            <div className="d-flex text-white  w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your PAN number :{" "}
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

            <div className="d-flex text-white  w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your Aadhar number :
              </div>
              <div className=" w-50  form-group">
                <input
                  className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                  placeholder="Aadhar number"
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

            <div className="d-flex in-left text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Where should I call you:
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
                      console.log("erro");
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
                    console.log("error");
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
                  console.log("error");
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex  text-white w-100 justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex   text-white w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your PAN number :{" "}
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your Aadhar number :
              </div>
              <div className=" w-50  form-group">
                <input
                  className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                  placeholder="Aadhar number"
                  type="text"
                  onChange={(e) => {
                    setCustomerDetails({
                      ...customerDetails,
                      AadharNo: e?.target?.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Where should I call you:
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
                      console.log("erro");
                    }
                  }}
                />
              </div>
            </div>

            <div className="d-flex mt-3 in-left text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">Type of Income : </div>
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
                    selected={customerDetails?.Profession === "SALARIZED"}
                    value="SALARIZED"
                  >
                    SALARIZED
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex  text-white w-100 justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex   text-white w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your PAN number :{" "}
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your Aadhar number :
              </div>
              <div className=" w-50  form-group">
                <input
                  className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                  placeholder="Aadhar number"
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Where should I call you:
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
                      console.log("erro");
                    }
                  }}
                />
              </div>
            </div>

            <div className="d-flex mt-3  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">Type of Income : </div>
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
                    selected={customerDetails?.Profession === "SALARIZED"}
                    value="SALARIZED"
                  >
                    SALARIZED
                  </option>
                </select>
              </div>
            </div>

            <div className="d-flex in-left mt-3 text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">Employer name : </div>
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
              <div className="w-50 fs-5 text-start ">Account Type :</div>
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
            <div className="d-flex  text-white w-100 justify-content-start align-items-center">
              <div className="fs-5 w-50 text-start">
                May I Know your name :{" "}
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5 w-50 text-start">
                Where should I contact you:
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your PAN number :{" "}
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

            <div className="d-flex   text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Can you please help me with your Aadhar number :
              </div>
              <div className=" w-50  form-group">
                <input
                  className=" w-100 px-2 py-1 rounded-2 user-input border-0"
                  placeholder="Aadhar number"
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

            <div className="d-flex  text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">
                Where should I call you:
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
                      console.log("erro");
                    }
                  }}
                />
              </div>
            </div>

            <div className="d-flex mt-3  text-white w-100  justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">Type of Income : </div>
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
                    selected={customerDetails?.Profession === "SALARIZED"}
                    value="SALARIZED"
                  >
                    SALARIZED
                  </option>
                </select>
              </div>
            </div>

            <div className="d-flex  mt-3 text-white w-100 justify-content-around align-items-center">
              <div className="fs-5  w-50 text-start">Employer name : </div>
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
              <div className="fs-5   w-50 text-start">Monthly Income : </div>
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
                  console.log("error");
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

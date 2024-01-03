import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../../Components/Modal";
import logo from "../../assets/finteck.png";
import { AppContext } from "../../context/AppContext";
import LoadingSpinner from "../Spinner/spinner";
import "./NewCustomer.css";
// import { getComponents } from "../Common/common";

import { nameValid, validateMob, validatePan } from "../../Utils/Validation";

const Loan = () => {
  // const [applyNow, setApplyNow] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const { finApiUrl, setFinApiUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [response, setResponse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [cnfStatus, setCnfStatus] = useState(false);
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
  // const type = serachParams.get("type");

  const [customerDetails, setCustomerDetails] = useState({
    CustName: "",
    PAN_NO: "",
    AadharNo: "",
    MobileNo: "",
  });

  const [loanConfirm, setLoanConfirm] = useState(null);
  const closeModal = () => {
    setSucces(!success);
  };
  const closeModal1 = () => {
    // setSucces(!success);
  };

  // confirmloan
  const confirmLoan = () => {
    setLoading(true);

    fetch(`http://${finApiUrl?.ip_port}/confirmloan`, {
      method: "POST",
      body: JSON.stringify({
        EnquiryNumber: response?.EnquiryNumber,
        OfferID: Number(loanConfirm),
        CustomerID: response?.CustomerID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": finApiUrl?.api_key,
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

  const applyForLoan = () => {
    setLoading(true);

    fetch(`http://${finApiUrl?.ip_port}/applyloan`, {
      method: "POST",
      body: JSON.stringify({
        CustomerID: "",
        CustName: customerDetails?.CustName,
        PAN_NO: customerDetails?.PAN_NO,
        AadharNo: customerDetails?.AadharNo,
        MobileNo: customerDetails?.MobileNo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": finApiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setLoading(false);
      

        setCustomerDetails({
          ...customerDetails,
          CustName: "",
          PAN_NO: "",
          AadharNo: "",
          MobileNo: "",
        });
        if (resp.StatusCode === 100) {
          setResponse(resp);
          setShowcustomerID(true);
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
            <div className="mb-3 text-white w-100 justify-content-around  align-items-center px-5">
              <div className="d-flex mt-3 in-left text-white w-100 justify-content-start align-items-center">
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
            <div className="w-100 mt-5 py-5 d-flex justify-content-end pe-5">
              {/* <button
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
              </button> */}
              <button
                type="button"
                disabled={
                  customerDetails?.CustName === "" ||
                  customerDetails?.MobileNo === ""
                }
                className="btn btn-success mx-3    w-15"
                onClick={() => {
                  if (
                    customerDetails?.CustName !== "" &&
                    customerDetails?.MobileNo !== ""
                  ) {
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
                 
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  customerDetails?.CustName === "" ||
                  customerDetails?.MobileNo === "" ||
                  customerDetails?.PAN_NO === "" ||
                  customerDetails?.AadharNo === "" ||
                  customerDetails?.PAN_NO.length !== 10 ||
                  customerDetails?.AadharNo.length !== 12
                }
                className="btn btn-success mx-3  w-25"
                onClick={() => {
                  if (
                    customerDetails?.CustName !== "" &&
                    customerDetails?.CustAddress !== "" &&
                    customerDetails?.PAN_NO !== "" &&
                    customerDetails?.AadharNo !== "" &&
                    customerDetails?.MobileNo !== ""
                  ) {
                    applyForLoan();
                  }
                }}
              >
                Apply
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
      <div className=" d-flex justify-content-around px-5">
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
                  window.location = "/";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </ul>
      </div>

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
            <div className="w-100 d-flex justify-content-center px-5  ">
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
                         data.OfferID === Number(loanConfirm)
                           ? " loan-select "
                           : ""
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
                              window.location = "/";
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
                          className="w-70 terms-height px-4 py-4 
               text-white card-bg rounded-3 "
                        >
                          GENERAL TERMS AND CONDITIONS OF THE PERSONAL LOAN
                          AGREEMENT <br /> ARTICLE I 1.1 <br />
                          CONSTRUCTION OF THE AGREEMENT <br />
                          a. The preamble portion of this agreement shall be
                          deemed to be an integral part of this agreement.{" "}
                          <br /> b. The terms, conditions, covenants etc.
                          contained in this agreement shall apply, subsist and
                          be operative in respect of the credit facilities
                          granted or to be granted by the Bank and this
                          agreement shall be construed and read as part and
                          parcel of documents/agreements executed/to be executed
                          by the Borrower(s) in favour of the Bank. <br /> c.
                          The Loan Application shall be deemed to constitute the
                          basis of this agreement and of the loan advanced or to
                          be advanced by the Bank hereunder. <br /> d. The
                          Borrower(s) agree and understand that whenever the
                          context requires, singular term shall include plural
                          and plural term shall include singular. <br /> 1.2
                          BORROWER’S WARRANTY, UNDERTAKING & DECLARATION <br />
                          a. The borrower hereby warrants the correctness of
                          each and every one of the statement and particulars
                          therein contained and undertakes to carry out the
                          proposals therein set forth. <br /> b. The Borrower/s
                          hereby agrees that the said advance shall be governed
                          by the terms and conditions contained herein as well
                          as those embodied in the loan sanction letter, Deed of
                          Guarantee, and other loan and/or security documents
                          except in so far as the loan/security documents may
                          expressly or by necessary implication be modified by
                          these presents. <br /> c. The Borrower/s agrees and
                          undertakes that the said advance shall be utilized
                          exclusively for the purpose set forth in the
                          Borrower’s proposal and for no other purpose <br /> d.
                          The Borrower/s agrees and undertakes to notify the
                          bank in writing of any circumstances affecting the
                          correctness of any particulars set forth in the
                          Borrowers proposal immediately after the occurrence of
                          any such circumstances. <br /> e. The Borrower will
                          furnish the Bank with all such information as the Bank
                          may reasonably require for the Bank’s satisfaction as
                          due compliance with the terms of the advance and all
                          such periodical reports and information at such times,
                          in such form and containing such particulars as the
                          Bank may call for, for the purpose of ascertaining the
                          results of the utilization of the said advance. <br />{" "}
                          f. That the Borrower mutually agrees that each one or
                          any of them are authorized and empowered by the others
                          to appoint and acknowledge the Borrower’s individual
                          and collective liability to the Bank by any payment
                          into the account or by way of express writing in any
                          manner or otherwise and any such admission and
                          acknowledgment of the liability by one or more of them
                          shall be construed and deemed to have been made on
                          behalf of each and all of them jointly and severally.{" "}
                          <br /> g. The Borrower hereby confirm that Borrower
                          has no objection to the bank giving a separate mandate
                          to Borrower’s auditors for issue of certificate
                          regarding diversion/siphoning off funds borrowed from
                          the bank. <br /> h. Each of the Borrowers represent(s)
                          and warrant(s) that (which shall be deemed to have
                          been repeated to the Bank on the date of the
                          Disbursement and on each date thereafter till entire
                          repayment): ( a) The Borrower is a citizen of India
                          and a major (in terms of age) and is of sound mind and
                          is competent to contract and enter into and perform
                          his /her obligations contemplated under this document/
                          other document/in respect of the Loan; (b) There is no
                          impediment or restriction, whether under law,
                          judgment, order, award, contract or otherwise, for any
                          of the Borrowers entering into and/or performing any
                          of the transactions contemplated by this/other
                          documents/ in respect of the Loan and all approvals
                          and consents , wherever necessary have been duly
                          obtained and are and will continue to be in full
                          force; (c) The execution hereof constitutes legal,
                          valid and binding obligations of the Borrower. (d)
                          That there is no Event of Default existing; (e) All
                          declarations made by Borrower are true and complete
                          and no material information has been suppressed /
                          withheld. <br />
                          i. The Borrower covenants and agrees that, save and
                          except with the prior, specific and express written
                          consent of the Bank, the Borrower shall not: (a)
                          create, assume or incur any further indebtedness to
                          any person; or lend or advance any amounts to any
                          person; or undertake any guarantee or security
                          obligation; (b) except in favour of the Bank, sell,
                          license, let, lease, transfer, alienate, dispose of in
                          any manner whatsoever, surrender or otherwise encumber
                          any of its assets, rights, title or interest,
                          receivables, or any part thereof; or create,
                          facilitate or permit to exist any charge , encumbrance
                          or lien of any kind whatsoever over any of its
                          property or grant any option or other right to
                          purchase, lease or otherwise acquire, any such assets
                          or part thereof; (c) permit or effect any direct or
                          indirect change in the legal or beneficial ownership
                          or control; (d) Change/ cease/ retire from/ terminate/
                          resign from the present employment/
                          profession/business disclosed in the Application; or
                          change, terminate or open any bank account. <br /> j.
                          The Bank shall have the right to not return the
                          Application, the photographs, information and
                          documents submitted by the Borrower. The Bank shall
                          have the right, without notice to or without any
                          consent of the Borrower, to approach, make enquiries,
                          obtain information, from any person including other
                          banks/finance entities/credit bureaus, Borrower’s
                          employer/family members, any other person related to
                          the Borrower, to obtain any information for assessing
                          track record, credit risk, or for establishing contact
                          with the Borrower or for the purpose of recovery of
                          dues from the Borrower. <br /> k. Any notice,
                          approvals, instructions, demand and other
                          communications given or made by the Bank shall be
                          deemed to be duly given and served if sent by normal
                          post, courier, registered Post, facsimile, electronic
                          mail, personal delivery, SMS or by pre-paid registered
                          mail addressed to the Borrower’s address, phone/
                          mobile number, fax number or email as given in the
                          Application (or at the address changed on which Bank’s
                          acknowledgement is duly obtained) and such notice and
                          service shall be deemed to take effect on the third
                          working day following the date of the posting thereof
                          in case of normal post, courier, registered post, at
                          the time of delivery if given by personal delivery,
                          upon receipt of a transmission report if given by
                          facsimile, upon sending the electronic mail or SMS if
                          given by electronic mail or SMS. The Borrower
                          undertakes to keep the Bank informed at all times in
                          writing of any change in the mailing address, email
                          id, phone and mobile number(s) as provided in the
                          Application and to obtain Bank’s written
                          acknowledgement on the intimation given to Bank for
                          any such change.
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
                            <span className="text-a-tag">
                              Terms & Conditions
                            </span>{" "}
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
                      <div className="fs-3 text-capitalize "> {confirmation.Status}</div>
                      <div className=" mt-5">
                        <button
                          type="button"
                          className="btn btn-success px-3"
                          onClick={() => {
                            window.location = "/";
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
          ) : (
            getComponents(id)
          )}
        </div>
      </div>
    </div>
  );
};

export default Loan;

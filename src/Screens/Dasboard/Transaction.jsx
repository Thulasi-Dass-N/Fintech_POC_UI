import React, {  useContext } from "react";
import "./HomeScreen.css";
import { AppContext } from "../../context/AppContext";

const FundTransaction = ({
  setError,
  setTransferDetails,
  transferDetails,
  benifitiaryAccounts,
}) => {
  const { account, setAccount } = useContext(AppContext);


  const SelectedAccount = (data) => {

    if (account === data) {
      setError("Account already selected");
    } else {
      setTransferDetails({
        ...transferDetails,
        ToAccountNumber: data,
      });
      setAccount(data);
    }
  };
  return (
    <div className="px-5 ">
      {/* <div
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
          <div
            className="  px-3   bg-secondary rounded-2 text-white  "
            role="presentation"
            onClick={() => {
              // setError("");
              // setTransferDetails({});
              // setTransfer(false);
            }}
          >
            Add +
          </div>
        </div>
        <div className="d-flex">
          <button
            style={{
              // width: "75%",
              marginRight: "20px",
            }}
            type="button"
            // disabled="True"
            className=" px-5   bg-primary text-center rounded-2 text-white  "
            role="presentation"
            onClick={() => {
              if (
                transferDetails.ToAccountNumber !== "" &&
                transferDetails.Amount > 0 &&
                transferDetails.TransactionNotes !== ""
              ) {
                FundTransfer(transferDetails);
              } else {
                setError("Please fill all the feilds");
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
              setTransferDetails({});
              setTransfer(false);
            }}
          >
            Cancel
          </div>
        </div>
      </div> */}
      <div>
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            className=" mt-3 pb-3"
            style={{
              width: "100%",
            }}
          >
            {!transferDetails?.ToAccountNumber ? (
              <div className=" form-group">
                <select
                  className="form-select form-control pt-2 pb-2 mt-2  text-primary rounded-3"
                  aria-label="Default select example"
                  id="account"
                  onChange={(e) => {
                    SelectedAccount(e?.target?.value.toString());
                  }}
                >
                  <option
                    disabled
                    selected
                    label=" Select beneficiary Account"
                  />

                  {benifitiaryAccounts?.map((account) => {
                    return (
                      <option
                        key={account?.AccountNumber}
                        value={account.AccountNumber}
                      >
                        {account.CustomerName}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <h6> Transfer To</h6>
            )}
          </div>
          {transferDetails?.ToAccountNumber ? (
            <>
              <div
                className="pb-1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "300px",
                }}
              >
                <div className="bg-secondary bg-opacity-25  border p-2 px-1 mb-1 rounded-2 ">
                  {benifitiaryAccounts?.map((account) => (
                    <>
                      <div>
                        {account.AccountNumber ===
                        transferDetails.ToAccountNumber
                          ? account.CustomerName
                          : ""}
                      </div>
                      <div>
                        {account.AccountNumber ===
                        transferDetails.ToAccountNumber
                          ? account.AccountNumber
                          : ""}
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div
                className="mb-4"
                style={{
                  width: "300px",
                }}
              >
                <div>Amount</div>
                <input
                  style={{
                    width: "100%",
                  }}
                  className="user-input border border-1 p-1 rounded-1 bg-secondary bg-opacity-25 "
                  id=""
                  type="number"
                  placeholder=" INR Enter Amount"
                  onChange={(e) => {
                    setError("");
                    setTransferDetails({
                      ...transferDetails,
                      Amount: Number(e?.target?.value),
                    });
                  }}
                  value={
                    transferDetails.Amount > 0 ? transferDetails.Amount : ""
                  }
                />
              </div>

              <div
                class="form-floating pb-3"
                style={{
                  width: "300px",
                }}
              >
                <div>Description</div>
                <textarea
                  class="form-control user-input bg-secondary bg-opacity-25 "
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  onChange={(e) => {
                    setError("");
                    setTransferDetails({
                      ...transferDetails,
                      TransactionNotes: e?.target?.value,
                    });
                  }}
                  value={transferDetails.TransactionNotes}
                />
                {/* <label for="floatingTextarea">Description</label> */}
              </div>
              {/* <button
                  style={{
                    width: "75%",
                  }}
                  type="button"
                  className=" p-2 mb-5 px-4 bg-primary text-center rounded-3 text-white  "
                  role="presentation"
                  onClick={() => {
                    if (
                      transferDetails.ToAccountNumber !== "" &&
                      transferDetails.Amount > 0 &&
                      transferDetails.TransactionNotes !== ""
                    ) {
                      FundTransfer(transferDetails);
                    } else {
                      setError("Please fill all the feilds");
                    }
                  }}
                >
                  Confirm
                </button> */}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FundTransaction;

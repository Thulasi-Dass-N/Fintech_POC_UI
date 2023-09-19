import React from "react";
import "./HomeScreen.css";
import Moment from "moment";

const TransactionHistory = ({ data }) => {
  return (
    <div>
      <div
        className="d-flex justify-content-between border-bottom align-items-center border-top px-3"
        style={{
          width: "100%",
        }}
      >
        <div
          className="d-flex justify-content-center"
          style={{
            width: "10%",
          }}
        >
          <p className={`fs-14 fw-6 `}>S.NO</p>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{
            width: "20%",
          }}
        >
          <p className={`fs-14 fw-6 `}>Date & Time</p>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{
            width: "40%",
          }}
        >
          <p className={`fs-14 fw-6`}>Description</p>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{
            width: "10%",
          }}
        >
          <p className={`fs-14 fw-6 `}>Debit Amount</p>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{
            width: "10%",
          }}
        >
          <p className={`fs-14 fw-6 `}>Credit Amount</p>
        </div>
      </div>
      <div
        style={{
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {data?.Passbook?.map((transaction, index) => (
          <div
            className="d-flex justify-content-between border-bottom px-3 "
            style={{
              width: "100%",
            }}
          >
            <div
              className="d-flex justify-content-center "
              style={{
                width: "10%",
              }}
            >
              <p className="table-font ">{index + 1}</p>
            </div>

            <div
              className="d-flex justify-content-center"
              style={{
                width: "20%",
              }}
            >
              <p className="table-font">
                {Moment(transaction.TimeStamp).format("DD-MM-YYYY, h:mm:ss a")}
              </p>
            </div>
            <div
              className="d-flex justify-content-start "
              style={{
                width: "40%",
              }}
            >
              <p className="table-font ">{transaction.Description}</p>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                width: "10%",
              }}
            >
              <p className="table-font">{transaction.DebitAmount || "-"}</p>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                width: "10%",
              }}
            >
              <p className="table-font">{transaction.CreditAmount || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;

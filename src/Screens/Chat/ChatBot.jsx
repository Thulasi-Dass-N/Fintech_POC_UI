/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./chatbot.css";
import "../../App.css"
// import help from "../../assets/help.png"
import Chatbot from "react-chatbot-kit";
import ActionProvider from "../../Components/ChatBotCnfig/ActionProvider";
import config from "../../Components/ChatBotCnfig/config";
import MessageParser from "../../Components/ChatBotCnfig/MessageParser";
// import { category } from "./category";

const Chatbox = ({ handleClose }) => {
  
  

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
     
    <div id="chatbox">
      <div className="chatbox-wrapper">
        <div className="chatbox-top">
          <div>Ask JIA</div>

          <div className="chatbox-intro">
            I am JIA your personal banking assistant to help you with J&K Bank
            related queries. Please use the quick links below or type your own
            query 💬
          </div>
        </div>

        <div className="faq-wrapper ">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            headerText='Chatbot'
            placeholderText='Input placeholder'
            messageHistory={loadMessages()}
            saveMessages={saveMessages}
            // validator={validateInput}
            runInitialMessagesWithHistory
            disableScrollToBottom = {false}
          />
          {/* {!chat ? (  <>
                    <div className="bot-img">
                        <img src={help} alt="bot" />
                    </div>
                    <div className="faq-lists">
                        <h2>Frequently Asked Questions</h2>
                        {faq && (
                            <ul>
                                {list.length > 0 && list.map((question, key) => (
                                    <li key={key}>
                                        <span>⦿</span>
                                        {question}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {startBtn && (
                        <div className="start-btn">
                            <button onClick={handleOpen}> <p>Start a New Conversation</p></button>
                        </div>
                    )}
                  </>) : (
                       <div
                       style={{
                         // width:"200px",
                         border: "5px",
                         borderColor: "black",
                         marginRight: "30px",
                       }}
                     >
                        <img
                         className=""
                         style={{
                           width: "18px",
                           height: "18px",
                           objectFit: "contain",
                         }}
                         src=""
                         alt="icon"
                       />
                       <input
                         style={{
                           // color: "blue",
         
                           border: "none",
                         }}
                         type="text"
                         className=""
                         placeholder="search"
                         onChange={(e) => {}}
                         // value={""}
                       />
                     
                     </div>
                  ) } */}
        </div>
        <button className="close-btn" onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  );
};

export default Chatbox;

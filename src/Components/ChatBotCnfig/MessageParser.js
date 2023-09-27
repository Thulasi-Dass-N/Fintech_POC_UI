import React from "react";

const MessageParser = ({ children, actions }) => {
  // const data = ['123454','234555','909090']

  const parse = (message) => {
    console.log(message);

    const messages = message.toLowerCase();
    
    if (messages.includes("stats")) {
      actions.handleLocalStats();
    }
    if (messages.includes("hello" || "options")) {
      actions.handleOptions();
    }
    if (messages.includes("joke" || "jokes")) {
      actions.handleJoke();
    }
    if (messages.includes("thanks" || "thank you")) {
      actions.handleThanks();
    }
    if (messages.includes("emergency")) {
      actions.handleContact();
    }
    if (messages.includes("medical")) {
      actions.handleMedicine();
    }
    // actions.handleOptions();
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};
export default MessageParser;

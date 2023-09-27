import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleOptions = (options) => {
    const botMessage = createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options,
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSavingBalance = () => {
    const botMessage = createChatBotMessage("please provide the customer Id.", {
      widget: "handleSavingBalance",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  //handleNewCorporateAccount
  const handleNewSavingAccount = () => {
    const botMessage = createChatBotMessage("please fill the form", {
      widget: "handleNewSavingAccount",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleCorporateBalance = () => {
    const botMessage = createChatBotMessage("please provide the customer Id.", {
      widget: "handleCorporateBalance",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleNewCorporateAccount = () => {
    const botMessage = createChatBotMessage("please fill the form", {
      widget: "handleNewCorporateAccount",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleGlobalStats = () => {
    const botMessage = createChatBotMessage(
      "Please select the below options.",

      {
        widget: "globalStatistics",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleLocalStats = () => {
    const botMessage = createChatBotMessage("please fill the form", {
      widget: "localStatistics",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleContact = () => {
    const botMessage = createChatBotMessage("Enter the CustomerId", {
      widget: "emergencyContact",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleMedicine = () => {
    const botMessage = createChatBotMessage("please fill the form", {
      widget: "medicineDelivery",
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleJoke = () => {
    const botMessage = createChatBotMessage(
      "Please help to share OTP sent your registered mobile number"
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleThanks = () => {
    const botMessage = createChatBotMessage("You're welcome, and stay safe!");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleOptions,
            handleContact,
            handleGlobalStats,
            handleLocalStats,
            handleJoke,
            handleSavingBalance,
            handleMedicine,
            handleThanks,
            handleCorporateBalance,
            handleNewSavingAccount,
            handleNewCorporateAccount,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

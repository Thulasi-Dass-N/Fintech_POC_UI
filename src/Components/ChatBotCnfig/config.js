import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./Widget/OverView";
import GlobalStatistics from "./Widget/SavingsAcc";
import LocalStatistics from "./Widget/Creditcard";
import Contact from "./Widget/Corporate";
import MedicineDelivery from "./Widget/Loan";
import SavingsBalance from "./Widget/Savings";
import CorporateBalance from "./Widget/CorporateAccount";
import NewSavingsAccount from "./Widget/NewSavings";
import NewCorporateAccount from "./Widget/NewCorporateAccount";
import CoBotAvatar from "./BotAvatar";

import React from "react";

const botName = "JIA";

const config = {
  // Defines the chatbot name
  botName: botName,
  // Defines an array of initial messages that will be displayed on first render
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName} from ABC bank`),
    createChatBotMessage("Please select the below option to continue", {
      widget: "overview",
      delay: 500,
    }),
  ],
  // Defines an object that will be injected into the chatbot state, you can use this state in widgets for example
  state: {
    airports: [],
    flightType: "",
    selectedFlightId: "",
    selectedFlight: null,
    // messages:""
  },
  // Defines an object of custom components that will replace the stock chatbot components.
  // customComponents: {
  //    // Replaces the default header
  //   header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
  //   // Replaces the default bot avatar
  //   botAvatar: (props) => <FlightBotAvatar {...props} />,
  //   // Replaces the default bot chat message container
  //   botChatMessage: (props) => <CustomChatMessage {...props} />,
  //   // Replaces the default user icon
  //   userAvatar: (props) => <MyUserAvatar {...props} />,
  //   // Replaces the default user chat message
  //   userChatMessage: (props) => <MyUserChatMessage {...props} />
  // },
  // Register your own set of components as custom message types
  // customMessages: {
  //     "custom": (props) => <MyCustomMessage {...props} />
  // },
  // Defines an object of custom styles if you want to override styles
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  customComponents: { botAvatar: (props) => <CoBotAvatar {...props} /> },
  // Defines an array of widgets that you want to render with a chatbot message
  widgets: [
    {
      // defines the name you will use to reference to this widget in "createChatBotMessage".
      widgetName: "overview",
      // Function that will be called internally to resolve the widget
      widgetFunc: (props) => <Overview {...props} />,
      // Any props you want the widget to receive on render
      props: {},
      // Any piece of state defined in the state object that you want to pass down to this widget
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "globalStatistics",
      widgetFunc: (props) => <GlobalStatistics {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "localStatistics",
      widgetFunc: (props) => <LocalStatistics />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: (props) => <Contact {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "medicineDelivery",
      widgetFunc: (props) => <MedicineDelivery />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "handleSavingBalance",
      widgetFunc: (props) => <SavingsBalance />,
    },
    {
      widgetName: "handleNewSavingAccount",
      widgetFunc: (props) => <NewSavingsAccount />,
    },
    {
      widgetName: "handleCorporateBalance",
      widgetFunc: (props) => <CorporateBalance />,
    },
    {
      widgetName: "handleNewCorporateAccount",
      widgetFunc: (props) => <NewCorporateAccount />,
    },
  ],
};
//handleNewCorporateAccount

export default config;

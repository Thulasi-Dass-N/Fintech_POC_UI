import Options from "./Options";
import "../../../App.css"
const GeneralOptions = (props) => {
  const options = [
    {
      name: "SAVINGS ACCOUNT",
      handler: props.actionProvider.handleGlobalStats,
      id: 1
    },
    {
      name: "CREDIT CARDS",
      handler: props.actionProvider.handleLocalStats,
      id: 2
    },
    {
      name: "CORPORATE ACCOUNT",
      handler: props.actionProvider.handleContact,
      id: 3
    },
    {
      name: "LOAN",
      handler: props.actionProvider.handleMedicine,
      id: 4
    }
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;

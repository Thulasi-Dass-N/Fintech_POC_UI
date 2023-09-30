import * as yup from "yup";

export const nameValid = (data) => data.replace(/[^a-z A-Z]/g, "");
export const validatePan = (data) => data.replace(/[^a-z A-Z0-9]/g, "");
export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
export const validateMob = (mobile) => {
  const mobileRegEx = /^[6-9][0-9]{9}$/;
  var ValidData = mobileRegEx.test(mobile);
  if (!ValidData) {
    return false;
  } else {
    return true;
  }
};
export const mobileNumberInput = (value, setPhoneNumber) => {
  if (
    !(Number.isNaN(Number(value)) || value.includes(".") || value.includes(" "))
  ) {
    setPhoneNumber(value);
  }
};
const mobileRegEx = /^[6-9][0-9]$/;

const mobileValidation = yup.object({
  phone: yup.string().min(10).matches(mobileRegEx),
});
export default mobileValidation;

export const ValidateEmail = (inputText) => {
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mailValid = emailRegEx.test(inputText);
  if (mailValid) {
    return true;
  } else {
    return false;
  }
};

import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const requireMsg = "This field is required";
const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required(requireMsg)
    .matches(email, "Invalid email address!"),

  password: yup
    .string()
    .required(requireMsg)
    .minLowercase(1, "At least 1 lowercase letter is required!")
    .minUppercase(1, "At least 1 upperrcase letter is required!")
    .minNumbers(1, "At least 1 number is required!")
    .min(8, "At least 8 chars is required!")
    .max(20, "To long!"),

  confirmPassword: yup
    .string()
    .required(requireMsg)
    .oneOf([yup.ref("password")], "Your passwords do not match!"),
});

export default signUpSchema;

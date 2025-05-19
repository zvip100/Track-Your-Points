import * as yup from "yup";

const requireMsg = "This field is required";
const minMsg = "At least 3 chars required!";
const maxMsg = "To long!";
const name = /^[a-zA-Z]+$/;
const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const addUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(name, "Only letters allowed!")
    .required(requireMsg)
    .min(3, minMsg)
    .max(15, maxMsg),

  lastName: yup
    .string()
    .matches(name, "Only letters allowed!")
    .required(requireMsg)
    .min(3, minMsg)
    .max(15, maxMsg),

  email: yup
    .string()
    .matches(email, "Invalid email address!")
    .required(requireMsg),
});

export default addUserSchema;

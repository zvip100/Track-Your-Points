function InputField({
  name,
  placeholder,
  value,
  type,
  handleChange,
  handleBlur,
  touched,
  error,
}) {
  return (
    <>
      <div className="input-container">
        <input
          placeholder={placeholder}
          value={value}
          id={name}
          name={name}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <p className="error-msg_">{touched ? error : ""} </p>
      </div>
    </>
  );
}

export default InputField;

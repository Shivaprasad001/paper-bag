export default function FormErrors(props) {
  const { errorList } = props;
  console.log(errorList);
  if (!errorList.length) {
    return null;
  }
  return (
    <ul className="form-errors">
      {errorList.map((error, index) => {
        return (
          <li key={index} className="form-errors__error-msg form-error-msg">
            {error.message}
          </li>
        );
      })}
    </ul>
  );
}

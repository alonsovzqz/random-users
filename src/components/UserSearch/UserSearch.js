const UserSearch = ({ userVal, setUserVal, onSubmit }) => {
  const userInputValueHandler = (event) => {
    setUserVal(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (<form onSubmit={onSubmitHandler}>
    <input
      type="text"
      name="user"
      id="user-input"
      value={userVal}
      onChange={userInputValueHandler}
    />
  </form>);
};

export default UserSearch;

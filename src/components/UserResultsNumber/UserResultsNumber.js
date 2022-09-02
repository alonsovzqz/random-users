const availableUserNumbers = [10, 20, 50, 100];

const UserResultsNumber = ({ userResult, updateUserNumber }) => {
  const updateUserNumberHandler = (userNumberValue) => {
    updateUserNumber(userNumberValue);
  };

  return (
    <div>
      {availableUserNumbers.map((item) => (
        <button
          key={item}
          onClick={() => updateUserNumberHandler(item)}
          disabled={userResult === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default UserResultsNumber;

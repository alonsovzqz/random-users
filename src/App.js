import { useEffect, useState } from "react";
import "./App.css";
import UserSearch from "./components/UserSearch/UserSearch";
import UserResultsNumber from "./components/UserResultsNumber/UserResultsNumber";
import UserList from "./components/UsersList/UsersList";


const filterRandomUsers = (userList, search) => {
  return (
    userList &&
    userList.filter(
      (user) =>
        search.toLowerCase() === user.name.first.toLowerCase() ||
        search.toLowerCase() === user.name.last.toLowerCase()
    )
  );
};

function App() {
  const [userValue, setUserValue] = useState("");
  const [userNumber, setUserNumber] = useState(10);
  const [randomUsers, setRandomUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const displayedUsers = filteredUsers.length > 0 ? filteredUsers : randomUsers;

  const fetchRandomUsers = () => {
    setIsLoading(true);
    fetch(`https://randomuser.me/api/?nat=US&results=${userNumber}&seed=foobar`)
      .then((res) => res.json())
      .then((res) => {
        setRandomUsers(res.results);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRandomUsers();
  }, [userNumber]);

  const onSubmitHandler = () => {
    const filterUsersConst = filterRandomUsers(randomUsers, userValue);
    setFilteredUsers(filterUsersConst);
  };

  const updateUserNumberHandler = (userNumberValue) => {
    setUserNumber(userNumberValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random users</h1>
        <UserResultsNumber
          userResult={userNumber}
          updateUserNumber={updateUserNumberHandler}
        />
        <UserSearch
          userVal={userValue}
          setUserVal={setUserValue}
          onSubmit={onSubmitHandler}
        />
      </header>
      <main>
        {!isLoading ? <UserList users={displayedUsers} /> : <p>Loading...</p>}
      </main>
    </div>
  );
}

export default App;

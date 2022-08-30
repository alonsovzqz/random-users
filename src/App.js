import { useEffect, useState } from "react";
import "./App.css";
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
  const [randomUsers, setRandomUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const displayedUsers = filteredUsers.length > 0 ? filteredUsers : randomUsers;

  const userInputValueHandler = (event) => {
    setUserValue(event.target.value);
  };

  const fetchRandomUsers = () => {
    fetch("https://randomuser.me/api/?nat=US&results=200")
      .then((res) => res.json())
      .then((res) => setRandomUsers(res.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRandomUsers();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const filterUsersConst = filterRandomUsers(randomUsers, userValue);
    console.log(filterUsersConst);
    setFilteredUsers(filterRandomUsers(randomUsers, userValue));
  }, [userValue]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random users</h1>
        <input
          type="text"
          name="user"
          id="user-input"
          value={userValue}
          onChange={userInputValueHandler}
        />
      </header>
      <main>
        {!isLoading ? <UserList users={displayedUsers} /> : <p>Loading...</p>}
      </main>
    </div>
  );
}

export default App;

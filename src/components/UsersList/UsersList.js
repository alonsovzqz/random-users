const UserList = ({ users }) => {
  return (
    users && (
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id.value}>
              <div>{`${user.name.first} ${user.name.last}`}</div>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default UserList;

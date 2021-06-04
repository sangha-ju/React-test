import { useMemo, useRef, useState } from "react";
import CreateUsers from "./CreateUsers";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "a",
      email: "aaa@aaa.com",
      active: true,
    },
    {
      id: 2,
      username: "b",
      email: "bbb@bbb.com",
      active: false,
    },
    {
      id: 3,
      username: "c",
      email: "ccc@ccc.com",
      active: false,
    },
  ]);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const nextId = useRef(4);

  const onCreate = (e) => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    setUsers({ ...users, user });
    setInputs({
      username: "",
      email: "",
    });

    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };

  const countActiveUsers = (users) => {
    console.log("활성 사용자 수 세는 중...");
    return users.filter((user) => user.active).length;
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className="App">
      <CreateUsers
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
    </div>
  );
}

export default App;

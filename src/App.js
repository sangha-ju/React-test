import React, { useRef, useState, useMemo, useCallback } from "react";
import CreateUser from "./CreateUsers";
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

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs],
  );

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers((users) => users.concat(user));
    setInputs({
      username: "",
      email: "",
    });
    console.log(nextId.current);
    nextId.current += 1;
  }, [username, email, users]);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  }, []);

  const countActiveUsers = (users) => {
    console.log("활성 사용자 수 세는 중...");
    return users.filter((user) => user.active).length;
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;

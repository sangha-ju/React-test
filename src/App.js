import React, { useReducer, useMemo, useCallback, createContext } from "react";
import CreateUser from "./CreateUsers";
import UserList from "./UserList";
import produce from "immer";

const initialState = {
  users: [
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
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    // return {
    //   users: state.users.concat(action.user),
    // };
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    // return {
    //   ...state,
    //   users: state.users.map((user) =>
    //     user.id === action.id ? { ...user, active: !user.active } : user,
    //   ),
    // };
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    // return {
    //   ...state,
    //   users: state.users.filter((user) => user.id !== action.id),
    // };
    default:
      throw new Error("Unhandled action");
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const countActiveUsers = (users) => {
    console.log("활성 사용자 수 세는 중...");
    return users.filter((user) => user.active).length;
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;

import React, {
  useReducer,
  useMemo,
  useCallback,
  useRef,
  createContext,
} from "react";
import CreateUser from "./CreateUsers";
import UserList from "./UserList";
import useInputs from "./useInputs";

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
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user,
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      throw new Error("Unhandled action");
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(4);
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const { username, email } = form;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  const countActiveUsers = (users) => {
    console.log("활성 사용자 수 세는 중...");
    return users.filter((user) => user.active).length;
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;

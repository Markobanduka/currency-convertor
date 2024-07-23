interface UserState {
  username: string;
  money: number;
  isUserCreated: boolean | null;
}

interface Action {
  type: string;
  payload: any;
}

export const initialUserState: UserState = {
  username: "",
  money: 0,
  isUserCreated: false,
};

export const userReducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "SET_MONEY":
      return {
        ...state,
        money: Number(action.payload),
      };
    case "SET_USER_CREATED":
      return {
        ...state,
        isUserCreated: action.payload,
      };
    default:
      return state;
  }
};

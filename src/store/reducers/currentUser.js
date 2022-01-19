let initialState = {};

let currentUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "CLEAR_USER":
      return {};
    default:
      return state;
  }
};

export default currentUser;

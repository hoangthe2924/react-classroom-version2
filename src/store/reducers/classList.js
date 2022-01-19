let initialState = [];

let classList = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "DELETE":
      return [];
    default:
      return state;
  }
};

export default classList;

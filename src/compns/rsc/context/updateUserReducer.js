
export const updateUserEmailReducer = (state = true, action) => {
    switch (action.type) {
        case "UPDATE_USER_EMAIL": {
            debugger
            return (state) ? false : true;
        }
        default:
            return state;
    }
}
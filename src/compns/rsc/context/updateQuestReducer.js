export const updateQuestReducer = (state = true, action) => {
    switch (action.type) {
        case "UPDATE_QUEST": {
            return (state) ? false : true;
        }
        default:
            return state;
    }
}
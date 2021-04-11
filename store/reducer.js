import { ADD_PENNY, RESET_JAR, ADD_REASON, DELETE_REASON, FETCH_STATE } from "./actions";
import 'react-native-get-random-values';

const initialState = {
    pennies: 0,
    reasons: []
}

export default (state = initialState, action) => {
    let index;
    switch (action.type) {
        case ADD_PENNY:
            return {
                ...state,
                pennies: state.pennies + 1
            };
        case ADD_REASON:
            index = state.reasons.findIndex(
                (r) => action.reason === r.text
            )
            if (index >= 0) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    reasons: [...state.reasons, {id: action.id, text: action.reason}]
                };
            }
        case RESET_JAR:
            return {
                ...state,
                pennies: 0
            };
        case DELETE_REASON:
            index = state.reasons.findIndex(
                (r) => action.id === r.id
            )
            if (index >= 0) {
                const updatedReasons = [...state.reasons];
				updatedReasons.splice(index, 1);
                return {
                    ...state,
                    reasons: updatedReasons
                };
            } else {
                return {
                    ...state
                }
            };
        case FETCH_STATE:
            return {
                pennies: action.state.pennies,
                reasons: action.state.reasons
            }
        default:
            return state;
    }
}
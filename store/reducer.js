import { ADD_PENNY, RESET_JAR, ADD_REASON, DELETE_REASON } from "./actions";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    pennies: 0,
    reasons: [{id: uuidv4(), text: "test reason"}]
}

const jarReducer = (state = initialState, action) => {
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
                    reasons: [...state.reasons, {id: uuidv4(), text: action.reason}]
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
        default:
            return state;
    }
}

export default jarReducer;
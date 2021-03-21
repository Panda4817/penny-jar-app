export const ADD_PENNY = "ADD_PENNY";
export const ADD_REASON = "ADD_REASON";
export const RESET_JAR = "RESET_JAR";
export const DELETE_REASON = "DELETE_REASON";

export const addPenny = () => {
    return {
        type: ADD_PENNY
    }
}

export const addReason = (reason) => {
    return {
        type: ADD_REASON,
        reason: reason
    }
}

export const resetJar = () => {
    return {
        type: RESET_JAR
    }
}

export const deleteReason = (id) => {
    return {
        type: DELETE_REASON,
        id: id
    }
}
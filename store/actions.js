import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
export const ADD_PENNY = "ADD_PENNY";
export const ADD_REASON = "ADD_REASON";
export const RESET_JAR = "RESET_JAR";
export const DELETE_REASON = "DELETE_REASON";
export const FETCH_STATE = "FETCH_STATE";

const getItem = async () => {
	const jsonValue = await AsyncStorage.getItem("state");
	const results =
		jsonValue != null ? JSON.parse(jsonValue) : null;
	return results;
};

export const addPenny = () => {
	return async (dispatch) => {
		try {
            let results = await getItem();
            if (results){
                const jsonValue = JSON.stringify({
                    ...results,
                    pennies: results.pennies + 1
                });
                await AsyncStorage.setItem('state', jsonValue)

            }
            dispatch({
				type: ADD_PENNY,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const addReason = (reason) => {
	return async (dispatch) => {
		try {
			let results = await getItem();
			if (results) {
				index = results.reasons.findIndex(
					(r) => reason === r.text
				);
				if (index < 0) {
					const id = uuidv4();
					const jsonValue = JSON.stringify({
						...results,
						reasons: [
							...results.reasons,
							{ id: id, text: reason },
						],
					});
					await AsyncStorage.setItem("state", jsonValue);
					dispatch({
						type: ADD_REASON,
						reason: reason,
						id: id,
					});
				}
			} else {
				const id = uuidv4();
				const jsonValue = JSON.stringify({
					reasons: [{ id: id, text: reason }],
					pennies: 0,
				});
				await AsyncStorage.setItem("state", jsonValue);
				dispatch({
					type: ADD_REASON,
					reason: reason,
					id: id,
				});
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const resetJar = () => {
	return async (dispatch) => {
		try {
			let results = await getItem();
			const jsonValue = JSON.stringify({
				...results,
				pennies: 0,
			});
			await AsyncStorage.setItem("state", jsonValue);
			dispatch({
				type: RESET_JAR,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const deleteReason = (id) => {
	return async (dispatch) => {
		try {
			let results = await getItem();
			if (results && results.reasons) {
				index = results.reasons.findIndex(
					(r) => id === r.id
				);
				if (index >= 0) {
					const updatedReasons = [...results.reasons];
					updatedReasons.splice(index, 1);
					results = {
						...results,
						reasons: updatedReasons,
					};
					const jsonValue = JSON.stringify(results);
					await AsyncStorage.setItem("state", jsonValue);
					dispatch({
						type: DELETE_REASON,
						id: id,
					});
				}
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const fetchState = () => {
	return async (dispatch) => {
		try {
			let results = await getItem();
            if (!results){
                results = {
                    reasons: [],
                    pennies: 0
                }
                const jsonValue = JSON.stringify(results);
                await AsyncStorage.setItem("state", jsonValue);
            }
			dispatch({
				type: FETCH_STATE,
				state: results,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

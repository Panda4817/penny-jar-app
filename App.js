import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Navigator from "./navigation/navigation";
import jarReducer from "./store/reducer";

enableScreens();

const rootReducer = combineReducers({
	jar: jarReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};
export default function App() {
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
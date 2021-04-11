import React, {
	useCallback,
	useLayoutEffect,
	useState,
	useEffect,
} from "react";
import {
	View,
	Text,
	ScrollView,
	ImageBackground,
	StyleSheet,
	Alert,
	ActivityIndicator,
	Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import {
	addPenny,
	resetJar,
	fetchState,
} from "../store/actions";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { Audio } from "expo-av";

const JarScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const { navigation } = props;
	const pennies = useSelector((state) => state.jar.pennies);
	const reasons = useSelector((state) => state.jar.reasons);
	const [sound, setSound] = useState();

	const dispatch = useDispatch();
	const loadState = useCallback(async () => {
		setError(null);
		try {
			await dispatch(fetchState());
		} catch (err) {
			setError(err.message);
		}
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener(
			"focus",
			loadState
		);

		return () => {
			unsubscribe();
		};
	}, [loadState]);

	useEffect(() => {
		setIsLoading(true);
		loadState().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadState]);

	const addPennyHandler = () => {
		if (reasons.length > 0) {
			playSound();
			dispatch(addPenny());
		} else {
			Alert.alert(
				"Add a Reason",
				"No reason added to keep a penny jar.",
				[{ text: "OK", style: "cancel" }]
			);
		}
	};

	const resetJarHandler = useCallback(() => {
		dispatch(resetJar());
	}, [dispatch]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<HeaderButtons
					HeaderButtonComponent={CustomHeaderButton}
				>
					<Item
						iconName="reload"
						onPress={resetJarHandler}
						name="ionicons"
					/>
				</HeaderButtons>
			),
		});
	}, [resetJarHandler]);

	async function playSound() {
		let r;
		if (pennies < 100) {
			r = require("../assets/coin-drop.mp3");
		} else {
			r = require("../assets/coin-drop-on-coins.mp3");
		}
		const { sound } = await Audio.Sound.createAsync(r);
		setSound(sound);
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button
					title="Try again"
					onPress={loadState}
					color={Colors.primary}
				/>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size="large"
					color={Colors.primary}
				/>
			</View>
		);
	}
	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<View>
				<ImageBackground
					source={require("../assets/jar2.png")}
					style={styles.image}
				>
					<View style={styles.insideJar}>
						<Text style={styles.text}>{pennies}</Text>
						<CustomButton
							style={styles.addButton}
							onPress={addPennyHandler}
						>
							<Ionicons
								name="add-circle-outline"
								size={100}
								color={Colors.accentColor}
							/>
						</CustomButton>
					</View>
				</ImageBackground>
			</View>
		</ScrollView>
	);
};

export const jarOptions = (navData) => {
	return {
		headerTitle: "The Penny Jar",
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		margin: 10,
	},
	insideJar: {
		flex: 1,
		flexDirection: "column",
		margin: 100,
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		flex: 1,
		resizeMode: "contain",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	text: {
		color: "white",
		fontSize: 50,
		textAlign: "center",
		fontFamily: "open-sans-bold",
	},
	addButton: {
		backgroundColor: "transparent",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		margin: 10,
	},
});

export default JarScreen;

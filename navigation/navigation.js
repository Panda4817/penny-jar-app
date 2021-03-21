import React from "react";
import {
	Platform,
	Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import JarScreen, {
	jarOptions,
} from "../screens/JarScreen";
import ReasonsScreen, {
	reasonsOptions,
} from "../screens/ReasonsScreen";
import AddReasonScreen, {
	addReasonOptions,
} from "../screens/AddReasonScreen";
import Colors from "../constants/Colors";

const defaultStackOptions = {
	headerStyle: {
		backgroundColor:
			Colors.primaryColor,
	},
	headerTintColor: Colors.accentColor,
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans-bold",
	},
};

const JarStack = createStackNavigator();
const JarsStackNavigator = () => {
	return (
		<JarStack.Navigator
			screenOptions={
				defaultStackOptions
			}
		>
			<JarStack.Screen
				name="Jar"
				component={JarScreen}
				options={jarOptions}
			/>
		</JarStack.Navigator>
	);
};

const ReasonsStack = createStackNavigator();
const ReasonsStackNavigator = () => {
	return (
		<ReasonsStack.Navigator
			screenOptions={
				defaultStackOptions
			}
		>
			<ReasonsStack.Screen
				name="Reasons"
				component={ReasonsScreen}
				options={reasonsOptions}
			/>
			<ReasonsStack.Screen
				name="AddReason"
				component={AddReasonScreen}
				options={addReasonOptions}
			/>
		</ReasonsStack.Navigator>
	);
};

const Tabs =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator()
		: createBottomTabNavigator();

const tabsOptions =
	Platform.OS === "ios"
		? {
				labelStyle: {
					fontFamily: "open-sans-bold",
					padding: 3,
				},
				activeTintColor: "white",
				inactiveTintColor: "lightgray",
				activeBackgroundColor:
					Colors.accentColor,
				inactiveBackgroundColor:
					Colors.primaryColor,
		  }
		: {
				activeTintColor: "black",
		  };

const TabsNavigator = () => {
	return (
		<Tabs.Navigator
			tabBarOptions={tabsOptions}
			shifting={true}
		>
			<Tabs.Screen
				name="Jar"
				component={JarsStackNavigator}
				options={{
					tabBarLabel:
						Platform.OS ===
						"android" ? (
							<Text
								style={{
									fontFamily:
										"open-sans-bold",
								}}
							>
								Jar
							</Text>
						) : (
							"Jar"
						),
					tabBarIcon: (tabInfo) => {
						return (
							<FontAwesome5
								name="coins"
								size={20}
								color={tabInfo.color}
							/>
						);
					},
					tabBarColor:
						Colors.primaryColor,
				}}
			/>
			<Tabs.Screen
				name="Reasons"
				component={
					ReasonsStackNavigator
				}
				options={{
					tabBarLabel:
						Platform.OS ===
						"android" ? (
							<Text
								style={{
									fontFamily:
										"open-sans-bold",
								}}
							>
								Reasons
							</Text>
						) : (
							"Reasons"
						),
					tabBarIcon: (tabInfo) => {
						return (
							<FontAwesome5
								name="question"
								size={20}
								color={tabInfo.color}
							/>
						);
					},
					tabBarColor:
						Colors.accentColor,
				}}
			/>
		</Tabs.Navigator>
	);
};

const Navigator = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<TabsNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default Navigator;

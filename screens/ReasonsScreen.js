import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import ReasonItem from '../components/ReasonItem/ReasonItem';
import { useSelector } from "react-redux";


const ReasonsScreen = (props) => {
    const reasons = useSelector((state) => state.jar.reasons);
    if (reasons.length === 0) {
		return (
			<View style={styles.screen}>
				<Text style={styles.defaultText}>No reasons added.</Text>
			</View>
		);
	}
    const renderReasonItem = (itemData) => {
		return (
			<ReasonItem
				item={itemData.item}
			/>
		);
	};
    return (
        <FlatList
            data={reasons}
            renderItem={renderReasonItem}
            style={{ width: "100%", padding: 10 }}
        />
    )
}

export const reasonsOptions = (navData) => {
	return {
		headerTitle: "Reasons",
        headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					iconName="add-to-list"
					onPress={() => {
						navData.navigation.navigate("AddReason");
					}}
				/>
			</HeaderButtons>
		),
	};
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
		justifyContent: "center",
		alignItems: "center",
    },
    defaultText: {
        fontFamily: 'open-sans'
    }
})

export default ReasonsScreen;

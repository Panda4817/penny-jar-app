import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';

const AddReasonScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text>Hello</Text>
            </View>
        </ScrollView>
    )
}

export const addReasonOptions = (navData) => {
	return {
		headerTitle: "Add a Reason",
	};
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    }
})

export default AddReasonScreen;

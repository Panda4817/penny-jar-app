import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton/CustomButton';
import { useDispatch } from "react-redux";
import { addReason } from "../store/actions";

const AddReasonScreen = (props) => {
    const { navigation } = props;
    const [input, setInput] = useState("");

    const dispatch = useDispatch();
    const addReasonHandler = () => {
        if (input.length > 0){
            dispatch(addReason(input));
            setInput();
            navigation.navigate("Reasons");
        }
	};

    const inputHandler = (inputText) => {
        setInput(inputText);
    }
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    blurOnSubmit={true}
                    autoCapitalize='none'
                    autoCorrect={true}
                    onChangeText={inputHandler}
                    value={input}
                    placeholder="Enter your reason"
                    maxLength={30}
                />
                
                <CustomButton
                    onPress={addReasonHandler}
                    style={styles.submitButton}
                >
                Submit
                </CustomButton> 
                    
                
                
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
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    inputContainer: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: Colors.primaryColor,
        padding: 20,
        borderRadius: 10,
        margin: 20
    },
    input: {
        height: 50,
        width: Dimensions.get('window').width * 0.8,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: "white"
    },
    submitButton: {
        backgroundColor: Colors.accentColor,
        padding: 10,
    }
})

export default AddReasonScreen;

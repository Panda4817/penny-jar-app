import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const CustomButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21){
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.viewContainer}>
            <ButtonComponent onPress={props.onPress} activeOpacity={0.7}>
                <View style={{...styles.buttonContainer, ...props.style}}>
                    {props.icon}
                    <Text style={styles.buttonText}>
                        {props.children}
                    </Text>
                </View>
            </ButtonComponent>
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        borderRadius: 100,
        overflow: "hidden"

    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans',
        textAlign: "center"
    },
    

});

export default CustomButton;
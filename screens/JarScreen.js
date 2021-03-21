import React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { addPenny, resetJar } from "../store/actions";

const JarScreen = (props) => {
    const pennies = useSelector(state => state.jar.pennies)

    const dispatch = useDispatch();
    const addPennyHandler = () => {
		dispatch(addPenny());
	};

    const resetJarHandler = () => {
		dispatch(resetJar());
	};

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.jar}>
                    <ImageBackground source={require('../assets/jar2.png')} style={styles.image}>
                        <View style={styles.insideJar}>
                            <Text style={styles.text}>{pennies}</Text>
                            <CustomButton
                                style={styles.addButton} 
                                onPress={addPennyHandler}
                            >
                                <Ionicons name="add-circle-outline" size={100} color="white" />
                            </CustomButton>
                        </View>
                        
                    </ImageBackground>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton 
                        style={{backgroundColor: Colors.accentColor, padding: 10}} 
                        onPress={resetJarHandler}
                    >
                        <Ionicons name="reload" size={25} color="white"/>Reset Jar
                    </CustomButton>
                    
                </View>
            </View>
        </ScrollView>
    )
}

export const jarOptions = (navData) => {
	return {
		headerTitle: "The Penny Jar",
	};
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
    },
    jar : {
        height: Dimensions.get('window').height * 0.6
    },
    insideJar: {
        flex: 1,
        flexDirection: "column",
        margin: 100,
        justifyContent: "flex-start",
        alignItems: "center"

    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    text: {
        color: "white",
        fontSize: 50,
        textAlign: "center",
        fontFamily: 'open-sans-bold'
    },
    addButton : {
        backgroundColor: "transparent",

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    }
})

export default JarScreen;

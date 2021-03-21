import React, { useCallback } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from "../../constants/Colors";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { deleteReason } from "../../store/actions";

const ReasonItem = (props) => {
    const dispatch = useDispatch();
    const deleteReasonHandler = useCallback(() => {
		dispatch(deleteReason(props.item.id));
	}, [dispatch]);

    return (
        <View style={styles.outContainer}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.item.text}</Text>
                <CustomButton
                    style={styles.delButton} 
                    onPress={deleteReasonHandler}
                >
                    <Ionicons name="trash-outline" size={24} color={Colors.accentColor} />
                </CustomButton>
            </View>  
        </View>
        
    )
};

const styles = StyleSheet.create({
    outContainer:{
        overflow: "hidden",
        borderRadius: 10,
    },
    container: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: Colors.primaryColor,
        padding: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: "column"
    },
    text: {
        fontFamily: "open-sans",
        color: 'white',
        fontSize: 20
    },
    delButton: {
        backgroundColor: "transparent",
        padding: 10

    }
})


export default ReasonItem;
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from "../../constants/Colors";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { deleteReason } from "../../store/actions";

const ReasonItem = (props) => {
    const dispatch = useDispatch();
    const deleteReasonHandler = () => {
		dispatch(deleteReason(props.item.id));
	};

    return (
        <View style={styles.outContainer}>
            <View style={styles.container}>
                <Text style={styles.text} numberOfLines={1}>{props.item.text}</Text>
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
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
        shadowOpacity: 0.30,
        elevation: 5,
        backgroundColor: Colors.primaryColor,
    },
    container: {
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
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
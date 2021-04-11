import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={props.name == "entypo" ? Entypo : Ionicons}
			iconSize={23}
			color={Colors.accentColor}
		/>
	);
};

export default CustomHeaderButton;

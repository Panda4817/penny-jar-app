import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Entypo}
			iconSize={23}
			color={Colors.accentColor}
		/>
	);
};

export default CustomHeaderButton;

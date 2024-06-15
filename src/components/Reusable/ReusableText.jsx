import React from "react";
import { Text } from "react-native";

const ResuableText = ({
    text,
    size,
    color,
    fontWeight,
    textAlign = "center",
    moreStyles,
}) => {
    const textStyle = {
        fontSize: size,
        color: color,
        fontWeight: fontWeight,
        textAlign: textAlign || "center",
    };
    return <Text style={[textStyle, moreStyles]}>{text}</Text>;
};
export default ResuableText;

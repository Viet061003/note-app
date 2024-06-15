import React from "react";
import { StyleSheet, View } from "react-native";

const OverLayWrapper = ({ children }) => {
    return (
        <View style={styles.overlay}>
            <View style={styles.modalWrapper}>{children}</View>
        </View>
    );
};

export default OverLayWrapper;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 11,
        backgroundColor: "rgba(0,0,0,.2)",
        justifyContent: "center",
    },
    modalWrapper: {
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 40,
        gap: 20,
    },
});

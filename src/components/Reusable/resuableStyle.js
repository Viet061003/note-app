import { Platform, StyleSheet } from "react-native";

const resuableStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginLeft: Platform.OS === "android" ? 0 : 20,
        marginRight: Platform.OS === "android" ? 0 : 20,
    },
    rowWithSpace: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    withSpace: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    btnBottomRight: {
        zIndex: 9,
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    position: {
        position: "relative",
        width: "100%",
    },
    textInput: {
        fontSize: 12,
        fontWeight: "700",
        position: "absolute",
        top: -8,
        left: 18,
        backgroundColor: "white",
        zIndex: 1,
        paddingHorizontal: 4,
    },
    inputText: {
        width: "100%",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 14,
        borderWidth: 1,
    },
});

export default resuableStyle;

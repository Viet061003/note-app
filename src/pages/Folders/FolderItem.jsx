import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ResuableText from "../../components/Reusable/ReusableText";
import resuableStyle from "../../components/Reusable/resuableStyle";
import getRandomColor from "../../utils/BgRadom";

const FolderItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={[
                styles.folderWrapper,
                resuableStyle.rowWithSpace,
                {
                    borderColor: getRandomColor(),
                },
            ]}
            onPress={() =>
                navigation.push("FolderDetail", {
                    forderData: item,
                })
            }
        >
            <View>
                <ResuableText
                    text={` ${item.name}`}
                    size={20}
                    color={"black"}
                    fontWeight={"700"}
                />
                <View style={styles.titleWrapper}>
                    <ResuableText
                        textAlign="center"
                        text={` ${item.listNote?.length} note`}
                        size={14}
                        color={"#4DA2ED"}
                        fontWeight={"500"}
                    />
                </View>
            </View>
            <TouchableOpacity>
                <MaterialIcons name="navigate-next" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default FolderItem;

const styles = StyleSheet.create({
    folderWrapper: {
        backgroundColor: "white",
        padding: 10,
        shadowColor: "#000",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleWrapper: {
        flexDirection: "row",
        alignContent: "center",
        gap: 8,
    },
});

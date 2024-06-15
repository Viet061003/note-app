import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ResuableText from "../../components/Reusable/ReusableText";
import resuableStyle from "../../components/Reusable/resuableStyle";
import Label from "../../models/Label";
import { SaveLabel, getListLabel } from "../../utils/labelUtils";

const Labels = ({ navigation }) => {
    const [searchOrCreatelabel, setSearchOrCreatelabel] = useState("");
    const [updateLabel, setUpdateLabel] = useState(undefined);
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const labels = await getListLabel();
                    if (labels && labels.length > 0) {
                        const formattedLabels = labels
                            .map((label) => new Label(label.id, label.label))
                            ?.reverse();
                        setData(formattedLabels);
                    }
                } catch (err) {
                    console.log(err);
                    Alert.alert("Error loading labels");
                }
            };

            fetchData();
        }, [searchOrCreatelabel, updateLabel])
    );
    const handleSaveLabel = async () => {
        await SaveLabel({ label: searchOrCreatelabel }, navigation);
        setSearchOrCreatelabel("");
    };

    const handleUpdateLabel = async () => {
        await SaveLabel(updateLabel, navigation);
        setUpdateLabel(undefined);
    };
    return (
        <SafeAreaView style={[resuableStyle.container]}>
            <View
                style={[
                    {
                        backgroundColor: "#d3d3d3",
                        borderRadius: 10,
                        marginBottom: 10,
                    },
                    { padding: Platform.OS === "android" ? 12 : 20 },
                ]}
            >
                {!updateLabel ? (
                    <TextInput
                        placeholder="tìm kiếm hoặc tạo label..."
                        maxLength={25}
                        value={searchOrCreatelabel}
                        onChangeText={(text) => setSearchOrCreatelabel(text)}
                    />
                ) : (
                    <TextInput
                        placeholder="tìm kiếm hoặc tạo label..."
                        maxLength={25}
                        value={updateLabel.label}
                        onChangeText={(text) =>
                            setUpdateLabel((pre) => ({ ...pre, label: text }))
                        }
                    />
                )}
            </View>
            {searchOrCreatelabel !== "" ? (
                <TouchableOpacity
                    style={styles.addStyle}
                    onPress={handleSaveLabel}
                >
                    <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="black"
                    />
                    <ResuableText
                        moreStyles={{
                            fontWeight: "600",
                        }}
                        text={`Tạo label : ${searchOrCreatelabel}`}
                        fontWeight={"600"}
                        color={"black"}
                    />
                </TouchableOpacity>
            ) : updateLabel ? (
                <TouchableOpacity
                    style={styles.addStyle}
                    onPress={handleUpdateLabel}
                >
                    <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="black"
                    />
                    <ResuableText
                        moreStyles={{
                            fontWeight: "600",
                        }}
                        text={`cập nhật label : ${updateLabel.label}`}
                        fontWeight={"600"}
                        color={"black"}
                    />
                </TouchableOpacity>
            ) : null}
            <View style={styles.listLabel}>
                {data.length ? (
                    data.map((label) => (
                        <TouchableOpacity
                            onPress={() => {
                                setUpdateLabel(label);
                                if (searchOrCreatelabel !== "")
                                    setSearchOrCreatelabel("");
                            }}
                            key={label.id}
                            style={styles.btnLabel}
                        >
                            <ResuableText
                                text={label.label}
                                color={"black"}
                                fontWeight={"600"}
                            />
                        </TouchableOpacity>
                    ))
                ) : (
                    <ResuableText
                        size={16}
                        fontWeight={"600"}
                        moreStyles={{ width: "100%" }}
                        text={"Chưa có lables nào được tạo"}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Labels;

const styles = StyleSheet.create({
    addStyle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginVertical: 8,
        padding: 10,
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 6,
    },
    listLabel: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
        marginTop: 8,
    },
    btnLabel: {
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "rgba(100, 168, 239, .8)",
    },
});

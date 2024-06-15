import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Label from "../models/Label";

export const SaveLabel = async (label, navigation) => {
    async function getKey() {
        const label = await AsyncStorage.getItem("labelKey");
        if (label === null) {
            await AsyncStorage.setItem("labelKey", "1");
            return 1;
        } else {
            const key = String(Number(label) + 1);
            await AsyncStorage.setItem("labelKey", key);
            return key;
        }
    }

    if (label.label === "") {
        Alert.alert("Error", "Please enter a label!", [
            {
                text: "OK",
                style: "cancel",
            },
        ]);
    } else {
        try {
            let data = [];
            if (label.id) {
                // Update existing label
                if (
                    Array.isArray(
                        JSON.parse(await AsyncStorage.getItem("labels"))
                    )
                ) {
                    data = JSON.parse(await AsyncStorage.getItem("labels"));
                } else {
                    data.push(JSON.parse(await AsyncStorage.getItem("labels")));
                }
                // Update the label in the list
                const updatedData = data.map((item) =>
                    item.id === label.id ? label : item
                );
                await AsyncStorage.setItem(
                    "labels",
                    JSON.stringify(updatedData)
                );
            } else {
                // Save new label
                label.id = await getKey();
                if ((await AsyncStorage.getItem("labels")) == null) {
                    await AsyncStorage.setItem(
                        "labels",
                        JSON.stringify([label])
                    );
                } else {
                    if (
                        Array.isArray(
                            JSON.parse(await AsyncStorage.getItem("labels"))
                        )
                    ) {
                        data = JSON.parse(await AsyncStorage.getItem("labels"));
                    } else {
                        data.push(
                            JSON.parse(await AsyncStorage.getItem("labels"))
                        );
                    }
                    data.push(label);
                    await AsyncStorage.setItem("labels", JSON.stringify(data));
                }
            }
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "An error occurred while saving the label.", [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
        }
    }
};
export const getListLabel = async () => {
    try {
        let labels = await AsyncStorage.getItem("labels");
        if (labels === null) {
            labels = "[]";
        }
        // Parse the stored labels and map them to Label objects
        const parsedLabels = JSON.parse(labels).map(
            (label) => new Label(label.id, label.label)
        );
        return parsedLabels;
    } catch (err) {
        console.log(err);
        Alert.alert("Error", "Error loading labels hihi");
        return [];
    }
};

// Hàm xóa nhãn
export const deleteLabel = async (label, navigation) => {
    // Hiển thị hộp thoại xác nhận xóa nhãn
    Alert.alert(
        "Xác nhận",
        "Bạn có chắc muốn xóa nhãn này?",
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        // Lấy danh sách nhãn từ local storage
                        let labels =
                            (await AsyncStorage.getItem("labels")) || "[]";
                        labels = JSON.parse(labels);

                        // Cập nhật danh sách nhãn sau khi xóa
                        labels = labels.filter((item) => item.id !== label.id);
                        await AsyncStorage.setItem(
                            "labels",
                            JSON.stringify(labels)
                        );

                        // Điều hướng người dùng trở lại màn hình trước đó
                        navigation.goBack();
                    } catch (error) {
                        console.error("Error deleting label:", error);
                        Alert.alert("Error", "Xóa nhãn không thành công");
                    }
                },
            },
        ],
        { cancelable: false }
    );
};
export const getLabelValues = (note, labels) => {
    return note.labelIds
        .map((labelId) => {
            const label = labels.find((l) => l.id === labelId);
            return label ? label.label : null;
        })
        .filter((label) => label !== null);
};
export const getLabelValuesByKey = (labelIds, labels) => {
    return labelIds
        .map((labelId) => {
            const label = labels.find((label) => label.id === labelId);
            return label ? label.label : null;
        })
        .filter((labelName) => labelName !== null); // Lọc bỏ các giá trị null
};

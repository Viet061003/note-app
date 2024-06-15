import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Hàm xử lý xóa hoặc khôi phục ghi chú
export const handleTrashNoteAction = async (note, navigation) => {
    Alert.alert(
        "Hành động",
        "Bạn muốn làm gì với ghi chú này?",
        [
            {
                text: "Xóa vĩnh viễn",
                onPress: async () => {
                    try {
                        // Lấy danh sách ghi chú đã xóa từ local storage
                        let trashNotes = await AsyncStorage.getItem(
                            "trashNotes"
                        );
                        trashNotes = JSON.parse(trashNotes) || [];

                        // Tìm và xóa ghi chú vĩnh viễn khỏi danh sách
                        trashNotes = trashNotes.filter((n) => n.id !== note.id);

                        // Lưu danh sách ghi chú đã xóa sau khi xóa ghi chú vào local storage
                        await AsyncStorage.setItem(
                            "trashNotes",
                            JSON.stringify(trashNotes)
                        );

                        // Điều hướng người dùng trở lại màn hình trước đó
                        navigation.goBack();
                    } catch (error) {
                        console.error("Error deleting note:", error);
                        Alert.alert("Error", "Xóa ghi chú không thành công");
                    }
                },
            },
            {
                text: "Khôi phục",
                onPress: async () => {
                    try {
                        // Lấy danh sách ghi chú đã xóa và ghi chú hiện tại từ local storage
                        let trashNotes = await AsyncStorage.getItem(
                            "trashNotes"
                        );
                        let notes = await AsyncStorage.getItem("notes");

                        trashNotes = JSON.parse(trashNotes) || [];
                        notes = JSON.parse(notes) || [];

                        // Tìm và khôi phục ghi chú từ thùng rác về danh sách ghi chú hiện tại
                        const restoredNote = trashNotes.find(
                            (n) => n.id === note.id
                        );
                        if (restoredNote) {
                            notes.push(restoredNote);
                            trashNotes = trashNotes.filter(
                                (n) => n.id !== note.id
                            );
                        }

                        // Lưu danh sách ghi chú và ghi chú đã xóa sau khi khôi phục vào local storage
                        await AsyncStorage.setItem(
                            "notes",
                            JSON.stringify(notes)
                        );
                        await AsyncStorage.setItem(
                            "trashNotes",
                            JSON.stringify(trashNotes)
                        );

                        // Điều hướng người dùng trở lại màn hình trước đó
                        navigation.goBack();
                    } catch (error) {
                        console.error("Error restoring note:", error);
                        Alert.alert(
                            "Error",
                            "Khôi phục ghi chú không thành công"
                        );
                    }
                },
            },
        ],
        { cancelable: true }
    );
};

export const deleteAllTrash = async (navigation) => {
    Alert.alert(
        "Xác nhận",
        "Bạn có chắc muốn xóa tất cả thùng rác không?",
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        // Xóa danh sách ghi chú đã xóa từ local storage
                        await AsyncStorage.removeItem("trashNotes");
                        navigation.push("DrawerNav");
                    } catch (error) {
                        console.error("Error delete notes:", error);
                        Alert.alert("Error", "xóa ghi chú không thành công");
                    }
                },
            },
        ],
        { cancelable: false }
    );
};
export const restoreAllNotes = async (navigation) => {
    Alert.alert(
        "Xác nhận",
        "Bạn có chắc muốn khôi phục tất cả các ghi chú đã xóa?",
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        let notes = await AsyncStorage.getItem("notes");
                        notes = JSON.parse(notes) || [];
                        let trashNotes = await AsyncStorage.getItem(
                            "trashNotes"
                        );
                        trashNotes = JSON.parse(trashNotes) || [];
                        notes.push(...trashNotes);
                        await AsyncStorage.removeItem("trashNotes");
                        await AsyncStorage.setItem(
                            "notes",
                            JSON.stringify(notes)
                        );
                        navigation.push("DrawerNav");
                    } catch (error) {
                        console.error("Error restoring notes:", error);
                        Alert.alert(
                            "Error",
                            "Khôi phục ghi chú không thành công"
                        );
                    }
                },
            },
        ],
        { cancelable: false }
    );
};

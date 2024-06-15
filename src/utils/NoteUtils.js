import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const SaveNote = async (note, setShowModal, setDataUpdate) => {
    async function getKey() {
        const note = await AsyncStorage.getItem("0");
        if (note === null) {
            await AsyncStorage.setItem("0", "1");
            return 1;
        } else {
            const key = String(Number(note) + 1);
            await AsyncStorage.setItem("0", key);
            return key;
        }
    }

    if (note.content === "") {
        Alert.alert("ERRO", "Preencha todos os campos!", [
            {
                text: "OK",
                style: "cancel",
            },
        ]);
    } else {
        try {
            let data = [];
            if (note.id) {
                if (
                    Array.isArray(
                        JSON.parse(await AsyncStorage.getItem("notes"))
                    )
                ) {
                    data = JSON.parse(await AsyncStorage.getItem("notes"));
                } else {
                    data.push(JSON.parse(await AsyncStorage.getItem("notes")));
                }
                data = updateNote(data, note);
                await AsyncStorage.setItem("notes", JSON.stringify(data));
            } else {
                note.id = await getKey();
                if ((await AsyncStorage.getItem("notes")) == null) {
                    await AsyncStorage.setItem("notes", JSON.stringify(note));
                } else {
                    if (
                        Array.isArray(
                            JSON.parse(await AsyncStorage.getItem("notes"))
                        )
                    ) {
                        data = JSON.parse(await AsyncStorage.getItem("notes"));
                    } else {
                        data.push(
                            JSON.parse(await AsyncStorage.getItem("notes"))
                        );
                    }
                    data.push(note);
                    await AsyncStorage.setItem("notes", JSON.stringify(data));
                }
            }
            if (setDataUpdate) setDataUpdate(undefined);
            setShowModal(false);
        } catch (err) {
            console.log(err);
            Alert.alert("ERROR", "Enter Some Info before Saving.", [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
        }
    }
};

// update Notes
export const updateNote = (data, note) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == note.id) {
            data[i] = note;
            return data;
        }
    }
};
// Hàm xóa ghi chú
export const deleteNoteAndSaveToTrash = async (
    note,
    setShowModal,
    setDataUpdate
) => {
    // Hiển thị hộp thoại xác nhận xóa ghi chú
    Alert.alert(
        "Xác nhận",
        "Bạn có chắc muốn xóa ghi chú này?",
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        // Lấy danh sách ghi chú từ local storage
                        let notes =
                            (await JSON.parse(
                                await AsyncStorage.getItem("notes")
                            )) || [];
                        // Thêm ghi chú đã xóa vào danh sách ghi chú đã xóa
                        const trashNotes =
                            (await JSON.parse(
                                await AsyncStorage.getItem("trashNotes")
                            )) || [];
                        if (note.content && note.id && note.labelIds)
                            trashNotes.push(note);
                        // Lưu danh sách ghi chú đã xóa xuống local storage
                        await AsyncStorage.setItem(
                            "trashNotes",
                            JSON.stringify(trashNotes)
                        );
                        // Cập nhật danh sách ghi chú sau khi xóa
                        notes = notes.filter((item) => item.id !== note.id);
                        await AsyncStorage.setItem(
                            "notes",
                            JSON.stringify(notes)
                        );
                        if (setDataUpdate) setDataUpdate(undefined);
                        setShowModal(false);
                    } catch (error) {
                        console.error("Error deleting note:", error);
                        Alert.alert("Error", "Xóa ghi chú không thành công");
                    }
                },
            },
        ],
        { cancelable: false }
    );
};
export const getListNotes = async (type = "notes") => {
    try {
        let notes = await AsyncStorage.getItem(type);
        if (notes === undefined || notes === null) {
            notes = "[]";
        }
        if (notes.length > 0 && notes[0] !== "[") {
            notes = `[${notes}]`;
        }
        return JSON.parse(notes);
    } catch (err) {
        console.log(err);
        alert("Error loading notes");
    }
};

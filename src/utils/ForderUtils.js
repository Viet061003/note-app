import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getListNotes } from "./NoteUtils";

export const saveFolder = async (folder, setShowModel) => {
    async function getKey() {
        const folderKey = await AsyncStorage.getItem("folderKey");
        if (folderKey === null) {
            await AsyncStorage.setItem("folderKey", "1");
            return 1;
        } else {
            const key = String(Number(folderKey) + 1);
            await AsyncStorage.setItem("folderKey", key);
            return key;
        }
    }

    if (folder.name === "") {
        Alert.alert("Error", "Please enter a folder name!", [
            {
                text: "OK",
                style: "cancel",
            },
        ]);
    } else {
        try {
            let data = [];
            if (folder.id) {
                // Update existing folder
                if (
                    Array.isArray(
                        JSON.parse(await AsyncStorage.getItem("folders"))
                    )
                ) {
                    data = JSON.parse(await AsyncStorage.getItem("folders"));
                } else {
                    data.push(
                        JSON.parse(await AsyncStorage.getItem("folders"))
                    );
                }
                // Update the folder in the list
                const updatedData = data.map((item) =>
                    item.id === folder.id ? folder : item
                );
                await AsyncStorage.setItem(
                    "folders",
                    JSON.stringify(updatedData)
                );
            } else {
                // Save new folder
                folder.id = await getKey();
                folder.listNoteId = folder.listNoteId || [];
                if ((await AsyncStorage.getItem("folders")) == null) {
                    await AsyncStorage.setItem(
                        "folders",
                        JSON.stringify([folder])
                    );
                } else {
                    if (
                        Array.isArray(
                            JSON.parse(await AsyncStorage.getItem("folders"))
                        )
                    ) {
                        data = JSON.parse(
                            await AsyncStorage.getItem("folders")
                        );
                    } else {
                        data.push(
                            JSON.parse(await AsyncStorage.getItem("folders"))
                        );
                    }
                    data.push(folder);
                    await AsyncStorage.setItem("folders", JSON.stringify(data));
                }
            }
            if (setShowModel) setShowModel(false);
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "An error occurred while saving the folder.", [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
        }
    }
};

// Hàm lấy danh sách các folder và note đã được nhóm
export const getListFolder = async () => {
    try {
        const folders = await AsyncStorage.getItem("folders");
        if (folders && folders !== null) {
            const parsedFolders = JSON.parse(folders);
            const notes = await getListNotes(); // Lấy danh sách các note

            // Mảng để lưu trữ kết quả
            const foldersWithNotes = [];

            // Duyệt qua từng folder
            parsedFolders.forEach((folder) => {
                const folderId = folder.id;
                const folderName = folder.name;
                const folderNotes = [];

                // Duyệt qua các noteId của folder và lấy thông tin note tương ứng
                folder.listNoteId.forEach((noteId) => {
                    const note = notes.find((note) => note.id === noteId);
                    if (note) {
                        folderNotes.push({
                            ...note,
                        });
                    }
                });

                // Thêm folder và danh sách các note của folder vào mảng foldersWithNotes
                foldersWithNotes.push({
                    id: folderId,
                    name: folderName,
                    listNote: folderNotes,
                });
            });

            return foldersWithNotes; // Trả về mảng các folder và note đã được nhóm
        }
        return []; // Trả về mảng rỗng nếu không có dữ liệu
    } catch (error) {
        console.error("Error getting list of folders with notes: ", error);
        return []; // Trả về mảng rỗng nếu có lỗi xảy ra
    }
};

import { AntDesign, Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Note from "../../models/Note";
import { saveFolder } from "../../utils/ForderUtils";
import { getListNotes } from "../../utils/NoteUtils";
import HeightSpace from "../Reusable/HeightSpace";
import OverLayWrapper from "../Reusable/OverLayWrapper";
import ResuableText from "../Reusable/ReusableText";
import resuableStyle from "../Reusable/resuableStyle";

const ModalOverlay = ({ setShowModel, type = "create", itemUpdate }) => {
    const [formForder, setFormForder] = useState(
        itemUpdate || { name: "", listNote: [] }
    );
    const [listNoteLocal, setListNoteLocal] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const notes = await getListNotes();
                const formattedNotes = notes.map(
                    (note) =>
                        new Note(
                            note.id,
                            note.color || null,
                            note.labelIds || [],
                            note.content,
                            note.updateAt,
                            note.isBookmarked
                        )
                );
                setListNoteLocal(formattedNotes);
            } catch (err) {
                console.log(err);
                alert("Error loading notes");
            }
        };
        getData();
    }, []);
    const handleCloseModal = () => {
        setShowModel(false);
    };
    const handleSaveFoder = () => {
        const noteIds = formForder.listNote.map((note) => note.id);
        saveFolder(
            { name: formForder.name, id: formForder.id, listNoteId: noteIds },
            setShowModel
        );
    };
    return (
        <OverLayWrapper>
            <ResuableText
                size={20}
                fontWeight={"700"}
                text={
                    type === "update"
                        ? "Cập nhật danh sách"
                        : "Tạo danh sách mới"
                }
            />
            <View style={resuableStyle.position}>
                <ResuableText
                    moreStyles={resuableStyle.textInput}
                    text={"Tên danh sách"}
                />
                <TextInput
                    style={resuableStyle.inputText}
                    autoFocus={false}
                    maxLength={40}
                    value={formForder.name}
                    placeholder={"Nhập tên"}
                    onChangeText={(text) => {
                        setFormForder({
                            ...formForder,
                            name: text,
                        });
                    }}
                />
            </View>
            <View>
                <View
                    style={[
                        {
                            borderWidth: 1,
                            borderRadius: 10,
                        },
                    ]}
                >
                    <ResuableText
                        moreStyles={resuableStyle.textInput}
                        text={"Danh sách ghi chú"}
                    />

                    <Picker
                        style={{
                            width: "100%",
                        }}
                        onValueChange={(noteValue) => {
                            const checked = formForder.listNote.some(
                                (note) => note.id === noteValue.id
                            );
                            setFormForder({
                                ...formForder,
                                listNote: checked
                                    ? [...formForder.listNote]
                                    : [...formForder.listNote, noteValue],
                            });
                        }}
                    >
                        <Picker.Item
                            enabled={false}
                            label={"Chọn các notes"}
                            value={"Chọn các notes"}
                        />
                        {listNoteLocal.map((item) => (
                            <Picker.Item
                                label={item.content}
                                value={item}
                                key={item.id}
                            />
                        ))}
                    </Picker>
                </View>
                <HeightSpace height={4} />
                <ResuableText
                    text="Danh sách note đã chọn"
                    size={14}
                    fontWeight={"600"}
                    textAlign="left"
                />
                <HeightSpace height={6} />
                {formForder.listNote?.length ? (
                    <View style={styles.noteWrapper}>
                        <View style={styles.noteValues}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => (
                                    <View style={{ width: 10 }}></View>
                                )}
                                data={formForder.listNote}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        style={styles.noteItem}
                                        onPress={() => {
                                            const updatedList =
                                                formForder.listNote.filter(
                                                    (note) =>
                                                        note.id !==
                                                        formForder.listNote[
                                                            index
                                                        ].id
                                                );
                                            setFormForder({
                                                ...formForder,
                                                listNote: updatedList,
                                            });
                                        }}
                                    >
                                        <ResuableText
                                            size={12}
                                            fontWeight={"600"}
                                            text={item.content}
                                        />
                                        <View style={styles.closebtn}>
                                            <AntDesign
                                                name="close"
                                                size={12}
                                                color="red"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal={true}
                            />
                        </View>
                    </View>
                ) : null}
            </View>
            <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
                <TouchableOpacity
                    onPress={handleSaveFoder}
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor:
                                formForder.name !== "" ? "#017CE9" : "#ddd",
                            flex: 1,
                        },
                    ]}
                    disabled={formForder.name === "" ? true : false}
                >
                    <Feather name="save" size={29} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCloseModal}
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor: "#CE2626",
                            flex: 1,
                        },
                    ]}
                >
                    <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </OverLayWrapper>
    );
};

export default ModalOverlay;

const styles = StyleSheet.create({
    actionButton: {
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    noteWrapper: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
    noteItem: {
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: "rgba(77, 162, 237, .4)",
        fontSize: 12,
        fontWeight: "600",
        color: "#444",
        borderRadius: 4,
    },
    noteValues: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
    },
    noteItem: {
        position: "relative",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    closebtn: {
        position: "absolute",
        top: 2,
        right: 4,
    },
});

import { AntDesign, Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SaveNote, deleteNoteAndSaveToTrash } from "../../utils/NoteUtils";
import { COLORS } from "../../utils/dummy-data";
import { getLabelValuesByKey, getListLabel } from "../../utils/labelUtils";
import OverLayWrapper from "../Reusable/OverLayWrapper";
import ResuableText from "../Reusable/ReusableText";
import resuableStyle from "../Reusable/resuableStyle";

const ModalNote = ({ dataUpdate, setDataUpdate, setShowModal }) => {
    const [labelValues, setLabelValues] = useState([]);
    const [dataLabel, setDataLabel] = useState([]);
    const [note, setNote] = useState(
        dataUpdate || {
            content: "",
            color: "",
            isBookmarked: false,
            labelIds: [],
            updateAt: new Date(),
        }
    );
    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                try {
                    const labels = await getListLabel();
                    setDataLabel(labels);
                } catch (err) {
                    alert("Error loading notes");
                }
            };
            getData();
        }, [])
    );
    useEffect(() => {
        const listValue = getLabelValuesByKey(note.labelIds, dataLabel);
        setLabelValues(listValue);
    }, [note.labelIds, dataLabel]);
    const handleSaveNote = () => {
        if (dataUpdate) {
            SaveNote(note, setShowModal, setDataUpdate);
        } else {
            SaveNote(note, setShowModal);
        }
    };
    const handleDelateOrCancel = () => {
        if (dataUpdate) {
            deleteNoteAndSaveToTrash(note, setShowModal, setDataUpdate);
        } else {
            setShowModal(false);
        }
    };
    return (
        <OverLayWrapper>
            <ResuableText
                text={dataUpdate ? "CẬP NHẬT GHI CHÚ" : "TẠO MỚI GHI CHÚ"}
                fontWeight={"700"}
                size={20}
            />
            <View style={{ gap: 20, width: "100%", marginTop: 20 }}>
                <View style={resuableStyle.position}>
                    <ResuableText
                        text="Nội dung ghi chú"
                        moreStyles={resuableStyle.textInput}
                    />
                    <TextInput
                        style={resuableStyle.inputText}
                        autoFocus={false}
                        maxLength={40}
                        value={note.content}
                        placeholder={"Nhập nội dung"}
                        onChangeText={(text) =>
                            setNote({ ...note, content: text })
                        }
                    />
                </View>
                <View
                    style={[
                        resuableStyle.position,
                        {
                            borderWidth: 1,
                            borderRadius: 10,
                        },
                    ]}
                >
                    <ResuableText
                        text="Màu nền"
                        moreStyles={resuableStyle.textInput}
                    />
                    <Picker
                        style={{
                            width: "100%",
                        }}
                        selectedValue={note.color}
                        onValueChange={(color) =>
                            setNote({
                                ...note,
                                color: color,
                            })
                        }
                    >
                        <Picker.Item
                            enabled={false}
                            color="black"
                            label={"Chọn màu cho note"}
                            value={"Chọn màu cho note"}
                        />
                        {COLORS.map((item, i) => (
                            <Picker.Item
                                label={item}
                                value={item}
                                key={i}
                                color={item}
                            />
                        ))}
                    </Picker>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={note.isBookmarked}
                        onValueChange={(check) =>
                            setNote({ ...note, isBookmarked: check })
                        }
                        color={note.isBookmarked ? "#f66" : null}
                    />
                    <Text
                        style={[
                            styles.paragraph,
                            {
                                color: note.isBookmarked ? "#f66" : "#f66",
                            },
                        ]}
                    >
                        Quan trọng
                    </Text>
                </View>
                <View>
                    <View
                        style={[
                            resuableStyle.position,
                            {
                                borderWidth: 1,
                                borderRadius: 10,
                            },
                        ]}
                    >
                        <ResuableText
                            text={"Labels"}
                            moreStyles={resuableStyle.textInput}
                        />
                        <Picker
                            style={{
                                width: "100%",
                            }}
                            selectedValue={
                                note.labelIds[note.labelIds.length - 1]
                            }
                            onValueChange={(labelId) => {
                                const checked = note.labelIds.some(
                                    (label) => label === labelId
                                );
                                setNote({
                                    ...note,
                                    labelIds: checked
                                        ? [...note.labelIds]
                                        : [...note.labelIds, labelId],
                                });
                            }}
                        >
                            <Picker.Item
                                enabled={false}
                                label={"Chọn các labels"}
                                value={"Chọn các labels"}
                            />
                            {dataLabel.length ? (
                                dataLabel.map((item) => (
                                    <Picker.Item
                                        label={item.label}
                                        value={item.id}
                                        key={item.id}
                                    />
                                ))
                            ) : (
                                <Picker.Item
                                    label={"Chưa có label nào được tạo"}
                                    value={"Chưa có label nào được tạo"}
                                    enabled={false}
                                />
                            )}
                        </Picker>
                    </View>
                    {labelValues.length ? (
                        <View style={styles.labelWrapper}>
                            <ResuableText
                                text={"danh sách label đã chọn :"}
                                size={14}
                                fontWeight={600}
                                textAlign="left"
                            />
                            <View style={styles.labelValues}>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => (
                                        <View style={{ width: 10 }}></View>
                                    )}
                                    data={labelValues}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            style={styles.labelItem}
                                            onPress={() => {
                                                const updatedList =
                                                    note.labelIds.filter(
                                                        (item) =>
                                                            item !==
                                                            note.labelIds[index]
                                                    );
                                                setNote({
                                                    ...note,
                                                    labelIds: updatedList,
                                                });
                                            }}
                                        >
                                            <ResuableText
                                                text={item}
                                                size={12}
                                                fontWeight={600}
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
                                    keyExtractor={(_, index) =>
                                        index.toString()
                                    }
                                    horizontal={true}
                                />
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor:
                                note.content === "" || note.color === ""
                                    ? "#CCCCCC"
                                    : "#017CE9",
                            flex: 1,
                        },
                    ]}
                    disabled={
                        note.content === "" || note.color === "" ? true : false
                    }
                    onPress={handleSaveNote}
                >
                    <Feather name="save" size={29} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor: dataUpdate ? "#DF4843" : "#26CE69",
                            flex: 1,
                        },
                    ]}
                    onPress={handleDelateOrCancel}
                >
                    {dataUpdate ? (
                        <Feather name="trash-2" size={24} color="white" />
                    ) : (
                        <AntDesign name="close" size={24} color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </OverLayWrapper>
    );
};
export default ModalNote;
const styles = StyleSheet.create({
    section: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    checkbox: {
        width: 26,
        height: 26,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 600,
    },
    colorWrapper: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    labelWrapper: {
        gap: 4,
        marginLeft: 4,
        marginTop: 4,
    },
    labelValues: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
    },
    labelItem: {
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
    actionButton: {
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
});

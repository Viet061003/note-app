import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import RenderNotes from "../../components/RenderNotes/RenderNotes";
import ResuableText from "../../components/Reusable/ReusableText";
import resuableStyle from "../../components/Reusable/resuableStyle";
import Note from "../../models/Note";
import { getListNotes } from "../../utils/NoteUtils";
import { deleteAllTrash, restoreAllNotes } from "../../utils/trashUtils";

const Trash = ({ navigation }) => {
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                try {
                    const notes = await getListNotes("trashNotes");
                    if (notes && notes.length > 0) {
                        const formattedNotes = notes
                            .map(
                                (note) =>
                                    new Note(
                                        note.id,
                                        note.color || null,
                                        note.labelIds || [],
                                        note.content,
                                        note.updateAt,
                                        note.isBookmarked
                                    )
                            )
                            ?.reverse();
                        setData(formattedNotes);
                    } else {
                        setData([]);
                    }
                } catch (err) {
                    console.log(err);
                    Alert.alert("Error loading notes");
                }
            };

            getData();
        }, [])
    );

    const handleDeleteAllTrash = () => {
        deleteAllTrash(navigation);
    };
    const handleRestoreAllTrashes = () => {
        restoreAllNotes(navigation);
    };
    return (
        <SafeAreaView style={[resuableStyle.container]}>
            {data.length ? (
                <View style={resuableStyle.rowWithSpace}>
                    <ResuableText
                        text={`${data.length} note trong thùng rác`}
                        size={14}
                        fontWeight={"700"}
                        color={"black"}
                    />
                    <View style={{ flexDirection: "row", gap: 6 }}>
                        <TouchableOpacity
                            onPress={handleRestoreAllTrashes}
                            style={[
                                styles.btnWrapper,
                                { backgroundColor: "#017CE9" },
                            ]}
                        >
                            <ResuableText
                                text={`khôi phục`}
                                size={14}
                                fontWeight={"700"}
                                color={"white"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleDeleteAllTrash}
                            style={[
                                styles.btnWrapper,
                                { backgroundColor: "#DF4843" },
                            ]}
                        >
                            <ResuableText
                                text={`Xóa`}
                                size={14}
                                fontWeight={"700"}
                                color={"white"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
            <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <ResuableText
                        text={`Không có note nào trong thùng rác !`}
                        size={16}
                        fontWeight={"700"}
                        color={"black"}
                        textAlign="center"
                    />
                }
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <RenderNotes
                            item={item}
                            navigation={navigation}
                            type={2}
                        />
                    );
                }}
            />
        </SafeAreaView>
    );
};
export default Trash;
const styles = StyleSheet.create({
    btnWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#ddd",
    },
});

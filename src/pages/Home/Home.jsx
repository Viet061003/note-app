import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import ModalNote from "../../components/Modal/ModalNote";
import RenderNotes from "../../components/RenderNotes/RenderNotes";
import ResuableText from "../../components/Reusable/ReusableText";
import resuableStyle from "../../components/Reusable/resuableStyle";
import SearchBar from "../../components/SearchBar/SearchBar";
import Note from "../../models/Note";
import { getListNotes } from "../../utils/NoteUtils";
import HeightSpace from "../../components/Reusable/HeightSpace";

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [showModal, setShowModel] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                try {
                    const notes = await getListNotes();
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
                } catch (err) {
                    console.log(err);
                    Alert.alert("Error loading notes");
                }
            };

            getData();
        }, [showModal])
    );
    return (
        <SafeAreaView style={[resuableStyle.container]}>
            <SearchBar data={data} onChange={setData} />
            <HeightSpace height={4} />
            {data.length ? (
                <ResuableText
                    text={`Tổng : ${data.length} note`}
                    size={14}
                    fontWeight={"600"}
                    color={"black"}
                    textAlign="left"
                />
            ) : null}
            <HeightSpace height={4} />
            <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <ResuableText
                        text={"Chưa có ghi chú nào được tạo !"}
                        fontWeight={"600"}
                        size={16}
                    />
                }
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <RenderNotes
                            item={item}
                            navigation={navigation}
                            setDataUpdate={setDataUpdate}
                            setShowModal={setShowModel}
                        />
                    );
                }}
            />
            <TouchableOpacity
                style={resuableStyle.btnBottomRight}
                onPress={() => setShowModel(true)}
            >
                <AntDesign name="pluscircle" size={56} color={"#017CE9"} />
            </TouchableOpacity>
            {showModal ? (
                <ModalNote
                    setShowModal={setShowModel}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />
            ) : null}
        </SafeAreaView>
    );
}

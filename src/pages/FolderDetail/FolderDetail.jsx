import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import ModalOverlay from "../../components/Modal/ModalForder";
import ModalNote from "../../components/Modal/ModalNote";
import RenderNotes from "../../components/RenderNotes/RenderNotes";
import { getListFolder } from "../../utils/ForderUtils";

export default function Home({ route, navigation }) {
    const [data, setData] = useState(route.params?.forderData);
    const [showModalUpdate, setShowModelUpdate] = useState(false);
    const [showModal, setShowModel] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();
    useEffect(() => {
        const forders = async () => {
            const forders = await getListFolder();
            const newDataUpdate = forders.filter(
                (folder) => folder.id === route.params.forderData.id
            );

            setData(newDataUpdate[0]);
        };
        forders();
    }, [showModalUpdate, showModal]);
    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    marginLeft: Platform.OS === "android" ? 0 : 20,
                    marginRight: Platform.OS === "android" ? 0 : 20,
                },
            ]}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center" }}>
                        Không có note nào !
                    </Text>
                }
                data={data.listNote?.reverse()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <RenderNotes
                            item={item}
                            navigation={navigation}
                            setDataUpdate={setDataUpdate}
                            setShowModal={setShowModelUpdate}
                        />
                    );
                }}
            />
            <TouchableOpacity
                style={styles.newNoteButton}
                onPress={() => setShowModel(true)}
            >
                <AntDesign name="pluscircle" size={56} color={"#017CE9"} />
            </TouchableOpacity>
            {showModal ? (
                <ModalOverlay
                    setShowModel={setShowModel}
                    type="update"
                    itemUpdate={data}
                />
            ) : null}
            {showModalUpdate ? (
                <ModalNote
                    setShowModal={setShowModelUpdate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 20,
    },
    newNoteButton: {
        zIndex: 9,
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteList: {
        margin: 5,
    },
    txtTitle: {
        margin: 20,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
});

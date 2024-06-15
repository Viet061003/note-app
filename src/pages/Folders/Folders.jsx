import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import ModalOverlay from "../../components/Modal/ModalForder";
import HeightSpace from "../../components/Reusable/HeightSpace";
import ResuableText from "../../components/Reusable/ReusableText";
import resuableStyle from "../../components/Reusable/resuableStyle";
import { getListFolder } from "../../utils/ForderUtils";
import FolderItem from "./FolderItem";

const Folders = ({ navigation }) => {
    const [showModal, setShowModel] = useState(false);
    const [listForder, setListForder] = useState([]);
    useFocusEffect(
        useCallback(() => {
            const data = async () => {
                try {
                    const folders = await getListFolder();
                    setListForder(folders?.reverse());
                } catch (err) {
                    console.log(err);
                    alert("Error loading folders");
                }
            };
            data();
        }, [showModal])
    );
    return (
        <SafeAreaView style={[resuableStyle.container]}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <ResuableText
                        textAlign="center"
                        text={"chưa có mục nào được tạo !"}
                        size={18}
                        color={"black"}
                        fontWeight={"700"}
                    />
                }
                ItemSeparatorComponent={() => <HeightSpace height={10} />}
                data={listForder}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return <FolderItem item={item} navigation={navigation} />;
                }}
            />
            <TouchableOpacity
                style={resuableStyle.btnBottomRight}
                onPress={() => {
                    setShowModel(true);
                }}
            >
                <AntDesign name="pluscircle" size={56} color={"#017CE9"} />
            </TouchableOpacity>
            {showModal ? <ModalOverlay setShowModel={setShowModel} /> : null}
        </SafeAreaView>
    );
};
export default Folders;

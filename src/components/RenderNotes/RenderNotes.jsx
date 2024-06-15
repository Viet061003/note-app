import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import viLocale from "date-fns/locale/vi";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getLabelValues, getListLabel } from "../../utils/labelUtils";
import { handleTrashNoteAction } from "../../utils/trashUtils";
import ResuableText from "../Reusable/ReusableText";
import resuableStyle from "../Reusable/resuableStyle";
const RenderNotes = ({
    item,
    navigation,
    type = 1,
    setDataUpdate,
    setShowModal,
}) => {
    const [labelList, setLabelList] = useState([]);
    const [dataLabel, setDataLabel] = useState([]);

    useEffect(() => {
        if (item && item.labelIds && dataLabel.length) {
            const listLabel = getLabelValues(item, dataLabel);
            setLabelList([...listLabel]);
        }
    }, [item, dataLabel]);
    const timeAgo = formatDistanceToNow(Date(item.updateAt), {
        addSuffix: true,
        locale: viLocale,
    });
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
    return (
        <TouchableOpacity
            style={[styles.noteArea, { borderColor: item?.color }]}
            onPress={() => {
                if (type === 1) {
                    setDataUpdate(item);
                    setShowModal(true);
                }
                if (type === 2) {
                    handleTrashNoteAction(item, navigation);
                }
            }}
        >
            <View style={resuableStyle.rowWithSpace}>
                <View style={styles.timeWrapper}>
                    <View
                        style={[
                            styles.timeColor,
                            { backgroundColor: item?.color },
                        ]}
                    ></View>
                    <ResuableText text={timeAgo} size={12} />
                </View>
                {item?.isBookmarked ? (
                    <FontAwesome name="bookmark" size={26} color="lightcoral" />
                ) : null}
            </View>
            <View style={styles.labelWrapper}>
                {labelList?.map((label, index) => (
                    <ResuableText
                        key={index}
                        text={label}
                        size={12}
                        fontWeight={600}
                        color={"#444"}
                        moreStyles={{
                            paddingHorizontal: 6,
                            paddingVertical: 8,
                            backgroundColor: "rgba(77, 162, 237, .4)",
                            borderRadius: 4,
                        }}
                    />
                ))}
            </View>
            <ResuableText
                text={item?.content}
                fontWeight={500}
                color={"black"}
                size={16}
                textAlign="left"
            />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    noteArea: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        gap: 6,
        borderWidth: 2,
        borderStyle: "dashed",
    },
    timeWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    timeColor: {
        width: 14,
        height: 14,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.4)",
    },
    labelWrapper: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
});
export default RenderNotes;

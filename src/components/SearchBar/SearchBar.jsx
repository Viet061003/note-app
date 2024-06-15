import { Platform, TextInput, View } from "react-native";
import Note from "../../models/Note";
import { getListNotes } from "../../utils/NoteUtils";

const SearchBar = ({ data, onChange, type }) => {
    const search = async (text) => {
        if (text) {
            const newData = data.filter((item) => {
                const itemTitle = item.content
                    ? item.content.toUpperCase()
                    : "".toUpperCase();
                const titleSearch = text.toUpperCase();
                return itemTitle.indexOf(titleSearch) > -1;
            });
            onChange(newData);
        } else {
            const notes = type !== 2 ? await getListNotes() : null;
            if (notes && notes.length > 0) {
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
                onChange(formattedNotes);
            }
        }
    };

    return (
        <View
            style={[
                {
                    backgroundColor: "#d3d3d3",
                    borderRadius: 10,
                    marginBottom: 10,
                },
                { padding: Platform.OS === "android" ? 12 : 20 },
            ]}
        >
            <TextInput
                placeholder="Search Tasks..."
                maxLength={50}
                onChangeText={(text) => search(text)}
            />
        </View>
    );
};
export default SearchBar;

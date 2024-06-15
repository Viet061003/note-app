class Note {
    constructor(id, color, labelIds, content, updateAt, isBookmarked) {
        this.id = id;
        this.color = color;
        this.labelIds = labelIds;
        this.content = content;
        this.isBookmarked = isBookmarked;
        this.updateAt = updateAt;
    }
}
export default Note;

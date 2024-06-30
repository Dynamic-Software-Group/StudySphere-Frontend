export class Note {
    constructor(id, name, lastModified, created, owner, collaborators, content, category, deleted, favorited) {
        this.id = id;
        this.name = name;
        this.lastModified = lastModified;
        this.created = created;
        this.owner = owner;
        this.collaborators = collaborators;
        this.content = content;
        this.category = category;
        this.deleted = deleted;
        this.favorited = favorited;
    }

    static fromJson(json) {
        return new Note(
            json.id,
            json.name,
            json.lastModified,
            json.created,
            json.owner,
            json.collaborators,
            json.content,
            json.category,
            json.deleted,
            false
        );
    }
}
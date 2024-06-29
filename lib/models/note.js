export class Note {
    constructor(id, name, lastModified, created, owner, collaborators, content, category, deleted) {
        this.id = id;
        this.name = name;
        this.lastModified = lastModified;
        this.created = created;
        this.owner = owner;
        this.collaborators = collaborators;
        this.content = content;
        this.category = category;
        this.deleted = deleted
    }
}
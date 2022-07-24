module.exports = class Command{
    constructor(client, name , options = {}){
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || "no desc.";
        this.category = options.category || "multi";
        this.usage = options.usage || "not prov.";
    }

    async run(message, args){
        throw new Error(`Command ${this.name} doesn't provide a run method`)
    }
}
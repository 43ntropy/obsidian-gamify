import Gamify from "main";

export class GamifyData {

    private instance: Gamify;
    
    public readonly version: number = 1;

    private constructor(instance: Gamify, data: any) {
        this.instance = instance;
        if (data.version) this.version = data.version;
    }

    static async load(plugin: Gamify): Promise<GamifyData> {
        const data = await plugin.loadData();
        return new GamifyData(plugin, data);
    }

    async save(): Promise<void> {
        await this.instance.saveData({
            version: this.version,
        });
    }

}
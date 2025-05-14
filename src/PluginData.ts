import Gamify from "main";

export class GamifyData {

    private instance: Gamify;

    readonly version: number = 1;
    tokenIcon: string = `⭐`;

    userPoints: number = 0;

    rewards: GamifyDataReward[] = [];

    private constructor(instance: Gamify, data: GamifyDataFile) {
        this.instance = instance;
        if (data?.version) this.version = data.version;
        if (data?.tokenIcon) this.tokenIcon = data.tokenIcon;
        if (data?.rewards) this.rewards = data.rewards;
        if (data?.userPoints) this.userPoints = data.userPoints;
    }

    static async load(plugin: Gamify): Promise<GamifyData> {
        const data = await plugin.loadData();
        return new GamifyData(plugin, data);
    }

    async save(): Promise<void> {
        const data: GamifyDataFile = {
            version: this.version,
            tokenIcon: this.tokenIcon,
            rewards: this.rewards,
            userPoints: this.userPoints
        }
        await this.instance.saveData(data);
    }

}

export interface GamifyDataReward {
    name: string;
    description: string;
    points: number;
    last_usage: Date
}

/**
 * This rappresents the data structure used to store the plugin data.
 */
interface GamifyDataFile {
    version: number;
    tokenIcon: string;
    rewards: GamifyDataReward[];
    userPoints: number;
}
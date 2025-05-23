import Gamify from "main";
import { Model } from "./model/Model";
import { Reward } from "./model/Reward";
import { RewardFolder } from "./model/RewardFolder";

export class GamifyData {

    readonly version: number = 1;
    tokenIcon: string = `⭐`;
    private idSequence: number = 0;
    userPoints: number = 0;

    rewards: (Reward | RewardFolder)[] = [];

    private constructor(data: GamifyDataFile) {
        if (data?.version) this.version = data.version;
        if (data?.tokenIcon) this.tokenIcon = data.tokenIcon;
        if (data?.rewards) this.rewards = data.rewards.map((r) => Model.rewardFactory(r));
        if (data?.userPoints) this.userPoints = data.userPoints;
        if (data?.idSequence) this.idSequence = data.idSequence;
    }

    static async load(): Promise<GamifyData> {
        const data = await Gamify.INSTANCE.loadData();
        return new GamifyData(data);
    }

    async save(): Promise<void> {
        const data: GamifyDataFile = {
            version: this.version,
            tokenIcon: this.tokenIcon,
            rewards: this.rewards.map((r) => r.export()),
            userPoints: this.userPoints,
            idSequence: this.idSequence,
        }
        await Gamify.INSTANCE.saveData(data);
    }

    get nextId(): number { return this.idSequence++; }

}

interface GamifyDataReward {
    id: number;
    name: string;
    icon: string | undefined;
    last_usage: string;
}

export interface GamifyDataRewardFolder extends GamifyDataReward {
    contents: GamifyDataRewardObject[];
}

export interface GamifyDataRewardObject extends GamifyDataReward {
    description: string;
    points: number;
}

/**
 * This rappresents the data structure used to store the plugin data.
 */
export interface GamifyDataFile {
    version: number;
    tokenIcon: string;
    rewards: (GamifyDataRewardFolder | GamifyDataRewardObject)[];
    userPoints: number;
    idSequence: number;
}
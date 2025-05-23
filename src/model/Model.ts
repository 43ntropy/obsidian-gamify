import { GamifyDataRewardFolder, GamifyDataRewardObject } from "src/PluginData";
import { Reward } from "./Reward";
import { RewardFolder } from "./RewardFolder";

export abstract class Model<T> {

    static rewardFactory(obj: any): Reward | RewardFolder {
        if ((obj as GamifyDataRewardFolder).contents !== undefined)
            return RewardFolder.import(obj as GamifyDataRewardFolder);
        else if ((obj as GamifyDataRewardObject).points !== undefined)
            return Reward.import(obj as GamifyDataRewardObject);
        else
            throw new Error("Invalid object type");
    }

    abstract export(): T;

}
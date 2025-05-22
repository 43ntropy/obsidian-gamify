import { GamifyDataRewardFolder } from "src/PluginData";
import { Model } from "./Model";

export class RewardFolder extends Model<GamifyDataRewardFolder> {

    private constructor() {
        super();
    }

    import(obj: GamifyDataRewardFolder): RewardFolder {
        return new RewardFolder();
    }

    export(): GamifyDataRewardFolder {
        throw new Error("Method not implemented.");
    }
    
}
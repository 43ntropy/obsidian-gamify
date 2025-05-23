import { GamifyDataRewardFolder } from "src/PluginData";
import { Model } from "./Model";
import { Reward } from "./Reward";

export class RewardFolder implements Model<GamifyDataRewardFolder> {

    private object: GamifyDataRewardFolder;

    private constructor(obj: GamifyDataRewardFolder) {
        this.object = obj;
    }

    static import(obj: GamifyDataRewardFolder): RewardFolder {
        return new RewardFolder(obj);
    }

    export(): GamifyDataRewardFolder {
        return {
            id: this.object.id,
            name: this.object.name,
            icon: this.object.icon,
            contents: this.object.contents,
            last_usage: this.object.last_usage,
        }
    }

    get id(): number { return this.object.id; }

    get name(): string { return this.object.name; }
    set name(name: string) { this.object.name = name; }

    get icon(): string | null { return this.object.icon || null; }
    set icon(icon: string | null) { this.object.icon = icon ? icon.charAt(0) : ""; }

    get last_usage(): Date { return new Date(this.object.last_usage); }
    set last_usage(date: Date) { this.object.last_usage = date.toJSON(); }

    get contents(): Reward[] { return this.object.contents.map((reward) => Reward.import(reward)); }

    getContent(id: number): Reward | undefined {
        const reward = this.object.contents.find((reward) => reward.id === id);
        if (reward) Reward.import(reward);
        return undefined;
    }

    addContent(reward: Reward): void {
        this.object.contents.push(reward.export());
    }

    delContent(id: number): void {
        this.object.contents = this.object.contents.filter((reward) => reward.id !== id);
    }

}
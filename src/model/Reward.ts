import { GamifyDataRewardObject } from "src/PluginData";
import { Model } from "./Model";
import Gamify from "main";

export class Reward implements Model<GamifyDataRewardObject> {

    private object: GamifyDataRewardObject;

    private constructor(obj: GamifyDataRewardObject) {
        this.object = obj;
    }

    static import(obj: GamifyDataRewardObject): Reward {
        return new Reward(obj);
    }

    static create(
        name: string,
        icon: string | null,
        description: string,
        points: number
    ): Reward {
        return new Reward({
            id: Gamify.DATA.nextId,
            name: name,
            icon: icon ? icon.charAt(0) : "",
            description: description,
            points: points,
            last_usage: new Date(Date.now()).toJSON(),
        });
    }

    export(): GamifyDataRewardObject {
        return {
            id: this.object.id,
            name: this.object.name,
            icon: this.object.icon,
            description: this.object.description,
            points: this.object.points,
            last_usage: this.object.last_usage,
        }
    }

    get id(): number { return this.object.id; }

    get name(): string { return this.object.name; }
    set name(name: string) { this.object.name = name; }

    get icon(): string | null { return this.object.icon || null; }
    set icon(icon: string | null) { this.object.icon = icon ? icon.charAt(0) : ""; }

    get description(): string { return this.object.description; }
    set description(description: string) { this.object.description = description; }

    get points(): number { return this.object.points; }
    set points(points: number) { this.object.points = points; }

    get last_usage(): Date { return new Date(this.object.last_usage); }
    set last_usage(date: Date) { this.object.last_usage = date.toJSON(); }

}
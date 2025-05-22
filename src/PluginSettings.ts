import Gamify from "main";
import { PluginSettingTab, Setting } from "obsidian";

export class GamifySettings extends PluginSettingTab {

    constructor() {
        super(Gamify.APP, Gamify.INSTANCE);
    }

    display(): void {
        new Setting(this.containerEl)
            .setName(`Token Icon`)
            .setDesc(`Icon to use for tokens`)
            .addText((text) => {
                text.setValue(Gamify.DATA.tokenIcon);
                text.onChange((value) => {
                    if (value.length == 0) return;
                    else if (value.length == 1) Gamify.DATA.tokenIcon = value;
                    else text.setValue(value[0]);
                })
            })
    }

    async hide(): Promise<void> {
        this.containerEl.empty();
        await Gamify.DATA.save();
    }

}
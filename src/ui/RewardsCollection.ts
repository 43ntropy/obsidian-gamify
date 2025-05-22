import Gamify from "main";
import { Modal, Setting } from "obsidian";
import { GamifyDataReward } from "../PluginData";

export class ViewConfigurationRewards extends Modal {
    constructor(cb: {

    }) {
        super(Gamify.APP);
        this.setTitle(`Gamify Rewards`);

        new Setting(this.contentEl)
            .addButton((btn) => {
                btn.setButtonText(`Create new reward`);
                btn.setCta();
                btn.onClick(() => {
                })
            })
            .addSearch((search) => {
                search.setPlaceholder(`Search for a reward...`);
            })

        for (const reward of Gamify.DATA.rewards) {
            new Setting(this.contentEl)
                .setName(reward.name)
                .addButton((btn) => {
                    btn.setIcon(`pencil`);
                    btn.setTooltip(`Edit`);
                })
                .addButton((btn) => {
                    btn.setIcon(`trash`);
                    btn.setTooltip(`Delete`);
                    btn.setWarning();
                })
        }

        this.open();
    }
}
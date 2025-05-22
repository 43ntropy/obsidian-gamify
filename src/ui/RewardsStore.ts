import Gamify from "main";
import { Modal, Setting, SettingTab } from "obsidian";
import { UiDashboard } from "./Dashboard";

export class UiRewardsStore extends Modal {

    private entries: Setting[] = [];

    constructor() {
        super(Gamify.APP);

        this.setTitle("🏆 Rewards Store");

        new Setting(this.contentEl)
            .setName(`You have: ${Gamify.DATA.userPoints} ${Gamify.DATA.tokenIcon} (+0 today)`)
            .setDesc(`Buy rewards with your earned points`)
            .addButton((btn) => {
                btn.setIcon(`square-chevron-left`);
                btn.setTooltip("Return to dashboard");
                btn.onClick(async () => {
                    new UiDashboard();
                    this.close();
                })
            })
            .addButton((btn) => {
                btn.setIcon(`folder-plus`);
                btn.setCta();
                btn.setTooltip("Create folder");
            })
            .addButton((btn) => {
                btn.setIcon("package-plus");
                btn.setCta();
                btn.setTooltip("Create reward");
            })

        this.open();
    }

    private pushEntries() {
        for (const entry of Gamify.DATA.rewards) {
            if (entry)
        }
    }

}
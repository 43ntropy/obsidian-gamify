import Gamify from "main";
import { Modal, Setting } from "obsidian";
import { GuiRewardsStore } from "./RewardsStore";

export class GuiDashboard extends Modal {

    constructor() {
        super(Gamify.APP);

        this.setTitle("👾 Gamify");

        new Setting(this.contentEl)
            .setName(`Recommended Tasks`)
            .setDesc(`for active day: TODO`)
            .addButton((btn) => {
                // * Next Day
                btn.setIcon(`calendar-fold`);
                btn.setTooltip(`Go to current day`)
            })
            .addButton((btn) => {
                // * Scheduling Section
                btn.setIcon(`calendar-cog`);
                btn.setTooltip(`Open scheduling section`);
                btn.setCta();
            })
            .addButton((btn) => {
                // * Rewards Section
                btn.setIcon(`store`);
                btn.setCta();
                btn.setTooltip(`Open rewards store`);
                btn.onClick(async () => {
                    new GuiRewardsStore();
                    this.close();
                });
            })  
        
        new Setting(this.contentEl)

        this.open();
    } 

}
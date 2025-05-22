import Gamify from "main";
import { Modal, Setting } from "obsidian";

export class UiConfiguration extends Modal {
    constructor(cb: {
        onQuit: () => void,
        onApply: () => void,
        onClickManageRewards: () => void,
    }) {
        super(Gamify.APP);

        this.onClose = cb.onQuit;

        this.setTitle("Gamify Configuration");

        new Setting(this.contentEl)
            .setName(`Manage Rewards`)
            .addButton((btn) => {
                btn.setIcon("arrow-right");
                btn.onClick(() => {
                    this.onClose = () => {}
                    cb.onClickManageRewards();
                    this.close();
                })
            })

        new Setting(this.contentEl)
            .addButton((btn) => {
                btn.setIcon("checkmark");
                btn.setCta();
                btn.onClick(() => {
                    this.onClose = () => {}
                    cb.onApply();
                    this.close();   
                })
            })
            .settingEl.style.borderTop = "none";


        this.open(); 
    } 

}
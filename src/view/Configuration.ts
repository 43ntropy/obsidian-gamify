import Gamify from "main";
import { Modal, Setting } from "obsidian";

export class ViewConfiguration extends Modal {
    constructor(cb: {
        onQuit: () => void,
        onApply: () => void,
        onClickManageRewards: () => void,
    }) {
        super(Gamify.APP);
        this.onClose = cb.onQuit;

        this.setTitle("Gamify Configuration");

        new Setting(this.contentEl)
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

        this.open(); 
    } 
}
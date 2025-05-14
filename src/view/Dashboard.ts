import Gamify from "main";
import { Modal, Setting } from "obsidian";

export class ViewDashboard extends Modal {

    constructor(cb: {
        onClickConfigure: () => void,
        onQuit: () => void,
    }) {
        super(Gamify.APP);
        this.onClose = cb.onQuit;

        this.setTitle("Gamify Dashboard");

        new Setting(this.contentEl)
            .setName(`Today: ${new Date().toLocaleDateString()}`)
            .setDesc(`Current active day`)

        new Setting(this.contentEl)
            .setName(`Configuration`)
            .setDesc(`Configure activity, rewards, days and more`)
            .addButton((btn) => {
                btn.setIcon("cog");
                btn.setCta();
                btn.onClick(() => {
                    this.onClose = () => {}
                    cb.onClickConfigure(); 
                    this.close();
                });
            })

        this.open();
    } 

}
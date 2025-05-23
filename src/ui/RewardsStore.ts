import Gamify from "main";
import { ButtonComponent, Modal, Setting } from "obsidian";
import { Reward } from "src/model/Reward";
import { RewardFolder } from "src/model/RewardFolder";
import { GuiDashboard } from "./Dashboard";

export class GuiRewardsStore extends Modal {

    private header: Setting | null = null;
    private entries: Setting[] = [];

    constructor() {
        super(Gamify.APP);
        this.setTitle("🏆 Rewards Store");
        this.renderFull({}, {});
        this.open();
    }

    private renderFull(header: {}, entries: {folder?: RewardFolder}): void {
        this.renderHeader();
        this.renderEntries(entries.folder);
    }

    private renderHeader(): void {
        if (this.header) {
            this.header.settingEl.remove();
            this.header = null;
        }
        this.header = new Setting(this.contentEl)
            .setHeading()
            .setName(`You have: ${Gamify.DATA.userPoints} ${Gamify.DATA.tokenIcon} (+0 today)`)
            .setDesc(`Buy rewards with your earned points`)
            .addButton((btn) => {
                btn.setIcon(`square-chevron-left`);
                btn.setTooltip("Return to dashboard");
                btn.onClick(async () => {
                    new GuiDashboard();
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
    }

    private renderEntries(folder?: RewardFolder): void {
        const rewards = Gamify.DATA.rewards.sort(
            (a, b) => a.last_usage.getTime() - b.last_usage.getTime())

        this.entries.forEach((entry) => entry.settingEl.remove());
        this.entries = [];

        rewards.forEach((entry, index) => {
            if (entry instanceof Reward) {

                // - Reward Entry

                this.entries.push(
                    new Setting(this.contentEl)
                        .setName(`${entry.icon || "🏆"} ${entry.name}`)
                        .setDesc(`${entry.description}`)
                        .addButton((buyButton: ButtonComponent) => {
                            buyButton.setButtonText(`${Gamify.DATA.tokenIcon} ${entry.points}`)

                            buyButton.setDisabled(Gamify.DATA.userPoints < entry.points);

                            buyButton.onClick(async () => {

                                buyButton.buttonEl.remove();

                                this.entries[index]
                                    .addButton((cancelButton) => {
                                        cancelButton.setWarning();
                                        cancelButton.setIcon(`package-x`);
                                        cancelButton.onClick(async () => {
                                            this.renderEntries(folder);
                                        });
                                    })
                                    .addButton((confirmButton) => {
                                        confirmButton.setCta();
                                        confirmButton.setIcon(`package-check`)
                                        confirmButton.onClick(async () => {
                                            // * Reward Buy Implementation
                                            // TODO: Incomplete implementation
                                            Gamify.DATA.userPoints -= entry.points;
                                            Gamify.DATA.save();
                                            this.renderFull({}, {folder});
                                        });
                                    })

                            })
                        })
                )

            }
            else if (entry instanceof RewardFolder)
                this.entries.push(
                    new Setting(this.contentEl)
                        .setName(entry.name)
                        .addButton((btn) => {
                            btn.setIcon("folder-open");
                            btn.setTooltip("Open folder");
                            btn.onClick(async () => {
                                new GuiRewardsStore();
                                this.close();
                            })
                        })
                )
            else throw new Error("Unknown entry type");
            if (index != 0) this.entries[index].settingEl.style.borderTop = "none";
        });
    }

}
import Gamify from "main";
import { Modal, Setting } from "obsidian";
import { GamifyDataReward } from "../PluginData";

// filepath: /home/v4lio/Documents/Development/Obsidian Gamify/.obsidian/plugins/obsidian-gamify/src/view/ConfigurationRewards.ts

export class ViewConfigurationRewards extends Modal {
    private cb: {
        onBack: () => void;
        onClickCreateReward: () => void;
        onClickEditReward: (reward: GamifyDataReward) => void;
    };

    constructor(cb: {
        onBack: () => void;
        onClickCreateReward: () => void;
        onClickEditReward: (reward: GamifyDataReward) => void;
    }) {
        super(Gamify.APP);
        this.cb = cb;
    }

    onOpen() {
        this.contentEl.empty();
        this.titleEl.setText("Manage Rewards");

        this.buildUI();

        // Set the default close action (e.g., pressing Esc or clicking outside)
        // to be the onBack callback.
        this.onClose = () => {
            this.cb.onBack();
        };
    }

    private buildUI(): void {
        this.contentEl.empty(); // Clear previous content before rebuilding
        this.displayRewards();
        this.addControls();
    }

    private displayRewards(): void {
        const { contentEl } = this;

        if (Gamify.DATA.rewards.length === 0) {
            contentEl.createEl("p", { text: "No rewards configured yet." });
        }

        Gamify.DATA.rewards.forEach((reward, index) => {
            new Setting(contentEl)
                .setName(reward.name)
                .setDesc(`${reward.description} - Points: ${reward.points}`)
                .addButton((button) => {
                    button
                        .setIcon("pencil")
                        .setTooltip("Edit reward")
                        .onClick(() => {
                            // Prevent the default onClose (cb.onBack) from firing
                            // as we are transitioning to a different view/modal.
                            this.onClose = () => {};
                            this.cb.onClickEditReward(reward);
                            this.close();
                        });
                })
                .addButton((button) => {
                    button
                        .setIcon("trash")
                        .setTooltip("Delete reward")
                        .onClick(async () => {
                            // Optional: Add a confirmation dialog here
                            // Example: if (!confirm(`Are you sure you want to delete "${reward.name}"?`)) return;
                            Gamify.DATA.rewards.splice(index, 1); // Remove the reward by its index
                            await Gamify.DATA.save();
                            this.buildUI(); // Refresh the list in the modal
                        });
                });
        });
    }

    private addControls(): void {
        const { contentEl } = this;

        new Setting(contentEl)
            .setName("Create New Reward")
            .addButton((button) => {
                button
                    .setIcon("plus")
                    .setCta()
                    .setTooltip("Create a new reward")
                    .onClick(() => {
                        // Prevent the default onClose (cb.onBack) from firing.
                        this.onClose = () => {};
                        this.cb.onClickCreateReward();
                        this.close();
                    });
            });

        if (Gamify.DATA.rewards.length > 0) {
            new Setting(contentEl)
                .setName("Delete All Rewards")
                .setDesc("This action cannot be undone.")
                .addButton((button) => {
                    button
                        .setIcon("trash") // Using trash icon for consistency
                        .setWarning() // Indicates a potentially destructive action
                        .setTooltip("Delete all rewards")
                        .onClick(async () => {
                            // Optional: Add a confirmation dialog here
                            // Example: if (!confirm("Are you sure you want to delete ALL rewards? This action cannot be undone.")) return;
                            Gamify.DATA.rewards = [];
                            await Gamify.DATA.save();
                            this.buildUI(); // Refresh the list
                        });
                });
        }

        new Setting(contentEl)
            .addButton((btn) => {
                btn.setButtonText("Back")
                   .onClick(() => {
                       // this.onClose is already set to call cb.onBack by onOpen()
                       this.close();
                   });
            });
    }
}
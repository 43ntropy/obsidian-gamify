import { Plugin, App } from "obsidian";
import { Reward } from "src/model/Reward";
import { GamifyData } from "src/PluginData";
import { GamifySettings } from "src/PluginSettings";
import { GuiDashboard } from "src/ui/Dashboard";
import { GuiRewardsStore } from "src/ui/RewardsStore";

export default class Gamify extends Plugin {

	static INSTANCE: Gamify;
	static APP: App;
	static DATA: GamifyData;

	async onload() {

		Gamify.INSTANCE = this;
		Gamify.APP = this.app;
		Gamify.DATA = await GamifyData.load();
		
		this.addRibbonIcon('dice', 'Gamify', () => {
			new GuiRewardsStore();
		});

		this.addSettingTab(new GamifySettings());
		
		/*Gamify.DATA.rewards.push(Reward.create("Test", "🦐", "Test", 10));
		Gamify.DATA.rewards.push(Reward.create("Test2", "🦐", "Test2", 20));
		Gamify.DATA.rewards.push(Reward.create("Test3", "🦐", "Test3", 30));
		Gamify.DATA.rewards.push(Reward.create("Test4", "🦐", "Test4", 40));
		Gamify.DATA.rewards.push(Reward.create("Test5", "🦐", "Test5", 50));
		Gamify.DATA.save();*/
	}

}
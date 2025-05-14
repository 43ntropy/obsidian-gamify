import { App, Plugin } from 'obsidian';
import { GamifyController } from 'src/PluginController';
import { GamifyData } from 'src/PluginData';
import { ViewConfigurationRewards } from 'src/view/ConfigurationRewards';
import { ViewDashboard } from 'src/view/Dashboard';


export default class Gamify extends Plugin {

	static APP: App;
	static DATA: GamifyData;

	async onload() {

		Gamify.APP = this.app;
		Gamify.DATA = await GamifyData.load(this);
		
		this.addRibbonIcon('dice', 'Gamify', () => {
			GamifyController.openUi(); 

			const modal = new ViewConfigurationRewards({
				onBack: () => {},
				onClickCreateReward: () => {},
				onClickEditReward: (reward) => {}
			}).open();
		});

	}

}
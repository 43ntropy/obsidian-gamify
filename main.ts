import { App, Plugin } from 'obsidian';
import { GamifyController } from 'src/PluginController';
import { ViewDashboard } from 'src/view/Dashboard';


export default class Gamify extends Plugin {

	static APP: App;

	async onload() {

		Gamify.APP = this.app;
		
		this.addRibbonIcon('dice', 'Gamify', () => {
			GamifyController.openUi();
		});

	}

}
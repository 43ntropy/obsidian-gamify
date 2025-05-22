import { App, Plugin } from 'obsidian';
import { GamifyData } from 'src/PluginData';
import { GamifySettings } from 'src/PluginSettings';
import { UiDashboard } from 'src/ui/Dashboard';


export default class Gamify extends Plugin {

	static INSTANCE: Gamify;
	static APP: App;
	static DATA: GamifyData;

	async onload() {

		Gamify.INSTANCE = this;
		Gamify.APP = this.app;
		Gamify.DATA = await GamifyData.load(this);
		
		this.addRibbonIcon('dice', 'Gamify', () => {
			new UiDashboard();
		});

		this.addSettingTab(new GamifySettings());

	}

}
import { App, PluginSettingTab, Setting } from 'obsidian';
import PlotlyPlugin  from 'main';

export interface PlotlyPluginSettings {
	pluginSetting: string;
}

export const DEFAULT_SETTINGS: PlotlyPluginSettings = {
	pluginSetting: 'default'
}

export default class PlotlyPluginSettingTab extends PluginSettingTab {
	plugin: PlotlyPlugin;
	settings: PlotlyPluginSettings;

	constructor(app: App, plugin: PlotlyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.settings.pluginSetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.settings.pluginSetting = value;
					await this.saveSettings();
				}
			)
		);
	}

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.plugin.loadData());
        console.log("Settings loaded");
	}

	async saveSettings() {
		await this.plugin.saveData(this.settings);
        console.log("Settings saved");
	}
}

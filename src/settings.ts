import { App, PluginSettingTab, Setting } from 'obsidian';

import PlotlyPlugin  from './main';

export interface PlotlyPluginSettings {
	defaultLayout: string;
	defaultConfig: string;
}

export const DEFAULT_SETTINGS: PlotlyPluginSettings = {
	defaultLayout: '{}',
	defaultConfig: '{}'
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

		containerEl.createEl('h2', {text: 'Set default values for all charts.'});

		new Setting(containerEl)
			.setName('Default layout:')
			.setDesc('yaml')
			.addText(text => text
				.setPlaceholder('{}')
				.setValue(this.settings.defaultLayout)
				.onChange(async (value) => {
					this.settings.defaultLayout = value;
					await this.saveSettings();
				}
			)
		);

        new Setting(containerEl)
			.setName('Default config:')
			.setDesc('yaml')
			.addText(text => text
				.setPlaceholder('{}')
				.setValue(this.settings.defaultLayout)
				.onChange(async (value) => {
					this.settings.defaultLayout = value;
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
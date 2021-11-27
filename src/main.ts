import * as Plotly from 'plotly.js-dist-min';

import { preprocessor, renderPlotly } from './preprocessor';

import PlotlyPluginSettingTab from './settings'
import { Plugin } from 'obsidian';
import newDataviewjsPlotlyChart from './command/newDataviewjsPlotlyChart'
import newPlotlyChart from './command/newPlotlyChart'

export default class PlotlyPlugin extends Plugin {
	Plotly: object
	settingsTab: PlotlyPluginSettingTab;

	async onload() {
		//@ts-ignore
		window.renderPlotly = renderPlotly;
		
		console.log('loading Plotly plugin');
		this.Plotly = Plotly;

		this.settingsTab = new PlotlyPluginSettingTab(this.app, this)
		await this.settingsTab.loadSettings();
		this.addSettingTab(this.settingsTab);

		this.registerMarkdownCodeBlockProcessor('plotly', preprocessor);

		this.addCommand(newPlotlyChart);

		this.addCommand(newDataviewjsPlotlyChart);
	}

	onunload() {
		console.log('unloading Plotly plugin');
	}
}

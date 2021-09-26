import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, Editor, MarkdownView } from 'obsidian';
import { addIcons, PLOTLY_LOGO } from "./ui/icons";
import { preprocessor } from './preprocessor';
import PlotlyModal from './ui/modal';
import PlotlyPluginSettingTab from './ui/settingsTab'
import './show-hint'

export default class PlotlyPlugin extends Plugin {
	settingsTab: PlotlyPluginSettingTab;

	async onload() {
		console.log('loading plugin');
		
		this.settingsTab = new PlotlyPluginSettingTab(this.app, this)
		await this.settingsTab.loadSettings();
		// this.addSettingTab(this.settingsTab);

		addIcons();

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		this.registerMarkdownCodeBlockProcessor('plotly', preprocessor);

		//@ts-ignore
		this.registerEvent(this.app.workspace.on('editor-menu',
		(menu: Menu, editor: Editor, view: MarkdownView) => {
			if (view) {
				menu.addItem((item) => {
					item.setTitle("New Plotly Chart")
						.setIcon(PLOTLY_LOGO)
						.onClick((_) => {
							let doc = editor.getDoc();
							let cursor = doc.getCursor();
							doc.replaceRange("```plotly\ndata:\n\t- x: [0,1,2]\n\t  y: [0,1,0]\n```\n", cursor);
						});
				});
			}
		}));
	}

	onunload() {
		console.log('unloading plugin');
	}
}

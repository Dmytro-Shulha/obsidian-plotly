import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, parseYaml, MarkdownPostProcessorContext, Menu, Editor, MarkdownView } from 'obsidian';
import { addIcons, PLOTLY_LOGO } from "./icons";

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	preprocessor = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext)=>{
		let json;
		try{
			json = await JSON.parse(content);
		} catch (error) {
			el.innerHTML = "Couldn't render Chart:<br><pre><code style=\"color:crimson\">" + error + "</code></pre>";
		}
	}

	async onload() {
		console.log('loading plugin');

		await this.loadSettings();

		addIcons();

		this.addRibbonIcon(PLOTLY_LOGO, 'New plot', () => {
			new Notice('This should add new plot to a note. To be implemented...');
		});

		this.addStatusBarItem().setText('Status Bar Text');

		this.addCommand({
			id: 'plotly-new-plot',
			name: 'New plot',
			callback: () => {
				console.log('This should create new plot.');
			},
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new SampleModal(this.app).open();
					}
					return true;
				}
				return false;
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});


		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		this.registerMarkdownCodeBlockProcessor('plotly', this.preprocessor);

		//@ts-ignore
		this.registerEvent(this.app.workspace.on('editor-menu',
		(menu: Menu, editor: Editor, view: MarkdownView) => {
			if (view) {
				menu.addItem((item) => {
					item.setTitle("New Plotly Chart")
						.setIcon(PLOTLY_LOGO)
						.onClick((_) => {
							console.log("New Plotly Chart clicked.");
						});
				});
			}
		}));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
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
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

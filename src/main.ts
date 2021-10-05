import { Editor, MarkdownView, Plugin } from 'obsidian';

import { preprocessor } from './preprocessor';

const basicPlotlyChart = [
	'```plotly',
	'data:',
	'\t- x: [0,1,2]',
	'\t  y: [0,1,0]',
	'```\n'
].join('\n')

const NEW_PLOTLY_CHART_NAME = "New Plotly Chart";
const newPlotlyChart = (editor: Editor)=>{
	let doc = editor.getDoc();
	let cursor = doc.getCursor();
	doc.replaceRange(basicPlotlyChart, cursor);
}

export default class PlotlyPlugin extends Plugin {

	async onload() {
		console.log('loading Plotly plugin');
		
		this.registerMarkdownCodeBlockProcessor('plotly', preprocessor);

		this.addCommand({
			id: "add-plotly-example",
			name: NEW_PLOTLY_CHART_NAME,
			editorCallback: (editor: Editor, view: MarkdownView)=>newPlotlyChart(editor)
		});
	}

	onunload() {
		console.log('unloading Plotly plugin');
	}
}

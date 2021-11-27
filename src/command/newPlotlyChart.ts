import { Editor, MarkdownView } from 'obsidian';

const basicPlotlyChart = [
	'```plotly',
	'data:',
	'\t- x: [0,1,2]',
	'\t  y: [0,1,0]',
	'```\n'
].join('\n');

const NEW_PLOTLY_CHART_NAME = "New Plotly Chart";

const newPlotlyChart = (editor: Editor)=>{
	let doc = editor.getDoc();
	let cursor = doc.getCursor();
	doc.replaceRange(basicPlotlyChart, cursor);
}

export default {
    id: "add-plotly-example",
	name: NEW_PLOTLY_CHART_NAME,
	editorCallback: (editor: Editor, view: MarkdownView)=>newPlotlyChart(editor)
}
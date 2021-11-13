import * as Plotly from 'plotly.js-dist-min';

import { MarkdownPostProcessorContext, parseYaml } from "obsidian";

export const preprocessor = (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext)=>{
    let json;
    try{
        json = parseYaml(content);
        validate(json, el)
        render(json, el)
    } catch (error) {
        let errorDiv = document.createElement('div');
        errorDiv.textContent = "Couldn't render plot:" + error;
        el.appendChild(errorDiv);
    }
}

const allowValues = ["data", "layout", "config"];

const validate = (json: any, el: HTMLElement) => {
    if(!json){
        throw "There should be a valid JSON in this block."
    }

    Object.keys(json).forEach(key=>{
        if(!allowValues.contains(key)){
            throw "The only valid keys are data, layout and config."
        }
    })
}

const render = (json: any, el: HTMLElement) => {
    renderPlotly(el, json.data, json.layout, json.config)
}

export const renderPlotly = (el: HTMLElement, data: Object[], layout: Object, config: Object) => {
    const destination = document.createElement('div');

    if(el.firstElementChild!=null){
        Plotly.update(destination, data as any, layout, config as any);        
        el.replaceChild(destination, el.firstElementChild);
    } else {
        Plotly.newPlot(destination, data, layout, config);        
        el.appendChild(destination);
    }
}

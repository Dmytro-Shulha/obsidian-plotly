import * as Plotly from 'plotly.js-dist-min';

import { MarkdownPostProcessorContext, parseYaml } from "obsidian";

export const preprocessor = (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext)=>{
    let json;
    try{
        json = parseYaml(content);

        validate(json, el)

        const destination = document.createElement('div');

        if(el.firstElementChild!=null){
            Plotly.update(destination, json.data, json.layout, json.config);        
            el.replaceChild(destination, el.firstElementChild);
        } else {
            Plotly.newPlot(destination, json.data, json.layout, json.config);        
            el.appendChild(destination);
        }  
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

import { addIcon } from 'obsidian';
import plotly_logo_svg from '../svg/plotly-logo.svg';

export const PLOTLY_LOGO = "plotly_logo";

export const icons : Record<string, string> = {
	plotly_logo : plotly_logo_svg
};

export const addIcons = (): void => {
    Object.keys(icons).forEach((key)=>{
        addIcon(key, icons[key])
    })
}

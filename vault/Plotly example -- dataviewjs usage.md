```dataviewjs
//Some plotly examples require d3 library to work.
//Since it's large and used by few examples,
//I propose a workaround to import d3;
//You need to download dependency from https://d3js.org/d3.v7.min.js
//and place it in your vault.
let path = app.vault.adapter.basePath;//absolute path to your vault
var d3 = require(path+"\\utils\\d3.v7.min.js");

//Here you can paste example from plotly.com
//NOTE: `Plotly.newPlot` won't work here, use `window.renderPlotly` instead
var data = [
{x:[0,1,2,3,4,5,6,7,8,9],y:[4,4,2,2,3,3,2,2,4,4]},
{x:[0,1,2,3,4,5,6,7,8,9],y:[3,3,1,1,2,2,1,1,3,3]}
];
var layout = {};
var config = {}

window.renderPlotly(this.container, data, layout, config)
```

```dataviewjs
var xData = ['Carmelo<br>Anthony', 'Dwyane<br>Wade', 'Deron<br>Williams', 'Brook<br>Lopez', 'Damian<br>Lillard', 'David<br>West', 'Blake<br>Griffin', 'David<br>Lee', 'Demar<br>Derozan']; function getrandom(num , mul) { var value = [ ]; for ( i = 0; i <= num; i++ ) { var rand = Math.random() * mul; value.push(rand); } return value; } var yData = [ getrandom(30 ,10), getrandom(30, 20), getrandom(30, 25), getrandom(30, 40), getrandom(30, 45), getrandom(30, 30), getrandom(30, 20), getrandom(30, 15), getrandom(30, 43), ]; var colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(44, 160, 101, 0.5)', 'rgba(255, 65, 54, 0.5)', 'rgba(207, 114, 255, 0.5)', 'rgba(127, 96, 0, 0.5)', 'rgba(255, 140, 184, 0.5)', 'rgba(79, 90, 117, 0.5)', 'rgba(222, 223, 0, 0.5)']; var data = []; for ( var i = 0; i < xData.length; i ++ ) { var result = { type: 'box', y: yData[i], name: xData[i], boxpoints: 'all', jitter: 0.5, whiskerwidth: 0.2, fillcolor: 'cls', marker: { size: 2 }, line: { width: 1 } }; data.push(result); }; var layout = { title: 'Points Scored by the Top 9 Scoring NBA Players in 2012', yaxis: { autorange: true, showgrid: true, zeroline: true, dtick: 5, gridcolor: 'rgb(255, 255, 255)', gridwidth: 1, zerolinecolor: 'rgb(255, 255, 255)', zerolinewidth: 2 }, margin: { l: 40, r: 30, b: 80, t: 100 }, paper_bgcolor: 'rgb(243, 243, 243)', plot_bgcolor: 'rgb(243, 243, 243)', showlegend: false };
window.renderPlotly(this.container, data, layout)
console.log(this)
```

```dataviewjs
let path = app.vault.adapter.basePath + "\\utils"
var d3 = require(path+"\\d3.v7.min.js");
console.log(d3)

function linspace(a,b,n) { return d3.range(n).map(function(i){return a+i*(b-a)/(n-1);}); } var boxNumber = 30; var boxColor = []; var allColors = linspace(0, 360, boxNumber); var data = []; var yValues = []; 

for( var i = 0; i < boxNumber; i++ ){ var result = 'hsl('+ allColors[i] +',50%'+',50%)'; boxColor.push(result); } function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }; 

for( var i = 0; i < boxNumber; i++ ){ var ySingleArray = []; for( var j = 0; j < 10; j++ ){ var randomNum = getRandomArbitrary(0, 1); var yIndValue = 3.5*Math.sin(Math.PI * i/boxNumber) + i/boxNumber+(1.5+0.5*Math.cos(Math.PI*i/boxNumber))*randomNum; ySingleArray.push(yIndValue); } yValues.push(ySingleArray); } 

for( var i = 0; i < boxNumber; i++ ){ var result = { y: yValues[i], type:'box', marker:{ color: boxColor[i] } }; data.push(result); }; 

var layout = { xaxis: { showgrid: false, zeroline: false, tickangle: 60, showticklabels: false }, yaxis: { zeroline: false, gridcolor: 'white' }, paper_bgcolor: 'rgb(233,233,233)', plot_bgcolor: 'rgb(233,233,233)', showlegend:false };

window.renderPlotly(this.container, data)
```

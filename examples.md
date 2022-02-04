---
dataX: [0,2,3,4,6,8,9,10,13,14]
dataY: [0,10, 20, 30, 40, 50, 60, 70, 80, 90]

pievalues: [12, 20, 50, 30]
---

# Welcome to some examples
By Damon-Lee Pointon
Throw this file into your vault (by downloading the examples.md file as Raw) of choice and make sure you have atleast Dataview and of course this obsidian-plotly plugin installed and running.

Dependant on your system you may have to change the back slash with a forward slash. I'm using a Mac so backslashes are the norm.

When combining the obsidian-plotly plugin with dataviewjs and yaml. You will need you include: `let pg = dv.current()` and then if your yaml field is `dataX` then you need to use `pg.dataX.values` when you want to refer to it inside the dataviewjs code block. This will be seen as an example in the below Line Plot and Pie Chart sections.

Please note that my `d3.v7.min.js` is in the main vault not the utils folder... mainly because I can't find it.

# Line Plot
Found [here](https://plotly.com/javascript/line-charts/#basic-line-plot)
```dataviewjs
let pg = dv.current()
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
console.log(d3)

var data = [
 {x: pg.dataX.values,y: pg.dataY.values}
];
var layout = {title:"Example in DataViewJS"};
var config = {displaylogo:false};

window.renderPlotly(this.container, data, layout, config)
```

# Scatter Plot
Found [here](https://plotly.com/javascript/line-and-scatter/#line-and-scatter-plot)
```dataviewjs
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");

var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: 'markers',
  type: 'scatter'
};

var trace2 = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 9],
  mode: 'lines',
  type: 'scatter'
};

var trace3 = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: 'lines+markers',
  type: 'scatter'
};

var data = [trace1, trace2, trace3];

var layout = {
  xaxis: {range: [ 0, 5 ]},
  yaxis: {range: [0, 20]},
  title:'Data Labels Hover'
};

window.renderPlotly(this.container, data, layout)

```

# Pie Chart
Found [here](https://plotly.com/javascript/pie-charts/#basic-pie-chart).
```dataviewjs
let pg = dv.current()
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
console.log(d3)

var data = [{
 values: pg.pievalues.values,
 labels: ['Pizza', 'Quark', 'Vegatables', 'Fruit'],
 type: 'pie'
 }];
var layout = {title:"Food this week"};
var config = {displaylogo:false};

window.renderPlotly(this.container, data, layout, config)
```

# Heatmap
Found [here](https://plotly.com/javascript/heatmaps/#basic-heatmap).
```dataviewjs
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
console.log(d3)

var data = [
 {
    z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap',
    hoverongaps: false
  }
];

var layout = {title:"Example Heatmap w/ DataViewJS"};
var config = {displaylogo:false};

window.renderPlotly(this.container, data, layout, config)
```

# Annotated Heatmap
Found [here](https://plotly.com/javascript/heatmaps/#annotated-heatmap).
```dataviewjs
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
console.log(d3)

var xValues = ['A', 'B', 'C', 'D', 'E'];

var yValues = ['W', 'X', 'Y', 'Z'];

var zValues = [
  [0.00, 0.00, 0.75, 0.75, 0.00],
  [0.00, 0.00, 0.75, 0.75, 0.00],
  [0.75, 0.75, 0.75, 0.75, 0.75],
  [0.00, 0.00, 0.00, 0.75, 0.00]
];

var colorscaleValue = [
  [0, '#3D9970'],
  [1, '#001f3f']
];

var data = [{
  x: xValues,
  y: yValues,
  z: zValues,
  type: 'heatmap',
  colorscale: colorscaleValue,
  showscale: false
}];

var layout = {
  title: 'Annotated Heatmap',
  annotations: [],
  xaxis: {
    ticks: '',
    side: 'top'
  },
  yaxis: {
    ticks: '',
    ticksuffix: ' ',
    width: 700,
    height: 700,
    autosize: false
  }
};

for ( var i = 0; i < yValues.length; i++ ) {
  for ( var j = 0; j < xValues.length; j++ ) {
    var currentValue = zValues[i][j];
    if (currentValue != 0.0) {
      var textColor = 'white';
    }else{
      var textColor = 'black';
    }
    var result = {
      xref: 'x1',
      yref: 'y1',
      x: xValues[j],
      y: yValues[i],
      text: zValues[i][j],
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(50, 171, 96)'
      },
      showarrow: false,
      font: {
        color: textColor
      }
    };
    layout.annotations.push(result);
  }
}

window.renderPlotly(this.container, data, layout)
```


# Waterfall
Found [here](https://plotly.com/javascript/waterfall-charts/#basic-waterfall-chart).
```dataviewjs

let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
console.log(d3)

var data = [
        {name: "2018",
         type: "waterfall",
         orientation: "v",
         measure: ["relative","relative",
                "total","relative",
                "relative","total"],
         x: ["Sales","Consulting","Net revenue",
		     "Purchases","Other expenses","Profit before tax"],
         textposition: "outside",
         text: ["+60","+80","","-40","-20","Total"],          
         y: [60,80,0,-40,-20,0],
         connector: {
		     line: {color: "rgb(63, 63, 63)"}
             },
         }
    ];
	
var layout = {
        title: {text: "Profit and loss statement 2018"},
        xaxis: {type: "category"},
        yaxis: {type: "linear"},
        autosize: true,
        showlegend: true
    };

window.renderPlotly(this.container, data, layout)

```

# Funnel Plot
Found [here](https://plotly.com/javascript/funnel-charts/#basic-funnel-plot).
This example contains `var gd = document.getElementById('myDiv');` something which we simply do not need as the graph is being rendered by `this.container`

```dataviewjs

let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
console.log(d3)

var data = [{type: 'funnel', y: ["Website visit", "Downloads", "Potential customers", "Invoice sent", "Closed delas"], x: [13873, 10533, 5443, 2703, 908], hoverinfo: 'x+percent previous+percent initial'}];

var layout = {margin: {l: 150}, width:600, height: 500}

window.renderPlotly(this.container, data, layout)

```

In essence the [Plotly.js website](https://plotly.com/javascript/) examples just need to be pre-pended with:
```
// If not using yaml values
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
```
or
```
// If using yaml values
let pg = dv.current()
let path = app.vault.adapter.basePath;
var d3 = require(path+"//d3.v7.min.js");
```

And then `Plotly.newPlot(div, data, layout)` replaced with `window.renderPlotly(this.container, data, layout)`.

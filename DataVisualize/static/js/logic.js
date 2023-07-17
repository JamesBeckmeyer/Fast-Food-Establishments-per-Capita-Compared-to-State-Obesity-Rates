// Load the data from the JSON files
let metaDataURL = "http://127.0.0.1:5000/api/v1.0/metadata";
let ffobDataURL = "http://127.0.0.1:5000/api/v1.0/aff_ob";

Promise.all([
  d3.json(metaDataURL),
  d3.json(ffobDataURL),
]).then(function([metaData, chartData]) {
  // Log the data to the console
  console.log(metaData);
  console.log(chartData);

let state = chartData.map(item=>item.State)
let fastfoodrate = chartData.map(item=>item["All fast food restaurants"])
let obesity = chartData.map(item=>item.Prevalence)


//bar chart
var trace1 = {
  x: state,
  y: fastfoodrate,
  type: 'bar',
  name:"fast food establishments per capita"
};

var trace2 = {
  x: state,
  y: obesity,
  type: 'scatter',
  name:"obesity rates"
};

var data = [trace1,trace2];

Plotly.newPlot('bar', data);

//plotly test
var trace3 = {
  x: fastfoodrate,
  y: obesity,
  mode: 'markers+text',
  type: 'scatter',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 12 }
};
var layout = {
  title:'fast food establishments per capita vs obesity ',
  xaxis: {range: [ 60,  100],
    title: 'fast food establishments per capita'},
  yaxis: {range: [ 0,  60],title: 'obesity rates'}
};
var data3=[trace3]

Plotly.newPlot('plot', data3, layout);
//

});

let geoDataURL = "http://127.0.0.1:5000/api/v1.0/geojson";
d3.json(geoDataURL).then(function(data){
  console.log(data);

  let myMap = L.map('map',{
    center:[37.8, -96],
    zoom:4,
  });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

  var layer1 = L.choropleth(data, {
    valueProperty: 'obesity',
    scale: ["#ffffb2", "#b10026"], 
    steps: 10,
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
    layer.bindPopup("<strong>" + feature.properties.name + "</strong><br />obesity<br /> " +
      feature.properties.obesity );
    }
  });
  
  var layer2 = L.choropleth(data, {
    valueProperty: 'fast_food',
    scale: ["#e0f3f8", "#084081"], 
    steps: 10,
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.name + "</strong><br />fast food establishments per capita<br /> " +
        feature.properties.fast_food );
    }
  });
  //base map
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   })
  let baseMaps ={
    "street":street
  }
  //overlay map
  let overlayMaps ={
    "Obesity Layer": layer1,
    "Fast Food Layer": layer2
  }
  
   //layer control
  L.control.layers(baseMaps,overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});


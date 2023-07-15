let geoDataURL = "static/data/us-states-obesity.geojson";
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

// Load the data from the JSON files
let metaDataURL = "static/data/meta_data.json";
let mapDataURL = "static/data/fastfood_prevalence.json";

Promise.all([
  d3.json(metaDataURL),
  d3.json(mapDataURL)
]).then(function([metaData, mapData]) {
  // Log the data to the console
  console.log(metaData);
  console.log(mapData);

  let fastfoodrate = Object.values(mapData["All fast food restaurants"])
let state = Object.values(mapData.State)
let obesity = Object.values(mapData.Prevalence)
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
});


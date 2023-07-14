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

//build the dropdown menu for metadata
let dropdownContainer = d3.selectAll("#selDataset")
let statelist =Object.values(metaData.State)
  /// Call optionChanged() when a change takes place to the DOM

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  // Retrieve the selected value from the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  let state = dropdownMenu.property("value");
  // Perform necessary actions based on the selected value

  let index = metadata.findIndex(obj => obj.State===state)

  let metadata = function getData(index){            
    let id = samples_data[index].id
    let meta_index = meta_data.findIndex(obj => obj.id===Number(id))
    let data3 = meta_data[meta_index]
    return data3
  };
  let metadataContainer = d3.select("#obesity-metadata");
  metadataContainer.selectAll("p").remove();

   Object.entries(data3).forEach(([key, value]) => {
        let row = metadataContainer.append("p");
        row.text(`${key}: ${value}`);
     });}

// bar chart
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


// Create the Leaflet map
  var map = L.map('map').setView([37.8, -96], 4);

  var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  L.geoJson(statesData).addTo(map);
  
  function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  }
  
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  
  L.geoJson(statesData, {style: style}).addTo(map);

});
// This chart will not plot for 'ALL' but will plot a single point when the dropdown is selected

function createSinglePointMap(value){
  logging ? console.log('createSinglePointMap: ', value) : null ;
  
  // Remove current map. This is needed for selecting new Station ID's
  spMap.remove();

  spMap = L.map("sp-map", {
      center: [lat, lon],
      zoom: zoom
    });

  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(spMap);

  if(value != 'ALL'){
    const s = stations.find(o => o.properties.id == value);
    const lat = s.geometry.coordinates[1];
    const lng = s.geometry.coordinates[0];
    
    //Center map and zoom in
    spMap.setView(new L.LatLng(lat, lng), zoom+6);

    L.geoJSON(s).addTo(spMap).bindTooltip(s.properties.station_name,{direction:'top'}).openTooltip();  

  }
  
  return;
}

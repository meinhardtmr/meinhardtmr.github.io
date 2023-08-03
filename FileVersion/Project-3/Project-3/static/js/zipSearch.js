//Create map of stations within zip code with layers for each type of fuel('Elec', 'E85', 'LPG', 'CNG', 'LNG')
function zipSearch(value){
  logging ? console.log('zipSearch: ', value) : null ;
  
  if (!value){
    createClusterMap('ALL');    
  } 
  else if(value != 'ALL'){
    // Remove current map. This is needed for selecting new Station ID's
    map.remove();

    map = L.map("myMap", {
        center: [lat, lon],
        zoom: zoom
      });

    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    
    //Marker Cluster
    const markers = new L.markerClusterGroup({maxClusterRadius:40});
    const markers2 = new L.markerClusterGroup({maxClusterRadius:40});
    const markers3 = new L.markerClusterGroup({maxClusterRadius:40});
    const markers4 = new L.markerClusterGroup({maxClusterRadius:40});
    const markers5 = new L.markerClusterGroup({maxClusterRadius:40});
    
    function pointToLayer(feature, latlng){
      let marker = L.marker(latlng); 
          marker.on('click', function(e){
            ele.innerHTML = ele.innerHTML + '<option value="' + feature.properties.id + '">' + feature.properties.id + '</option>';
            ele.value = feature.properties.id;
            ele.onchange();
          })
          if (feature.properties.fuel_type_code === 'ELEC'){
            return markers.addLayer(marker);
          }
          else if (feature.properties.fuel_type_code === 'E85'){
            return markers2.addLayer(marker);              
          }
          else if (feature.properties.fuel_type_code === 'LPG'){
            return markers3.addLayer(marker);              
          }
          else if (feature.properties.fuel_type_code === 'CNG'){
            return markers4.addLayer(marker);              
          }
          else{
            return markers5.addLayer(marker);              
          }
    };
    
    //Create map layers
    const s = stations.filter(o => o.properties.zip === value);    
    const e85Layer = L.geoJSON(s.filter(o => o.properties.fuel_type_code === 'E85'), {pointToLayer: pointToLayer}).addTo(map);
    const lpgLayer = L.geoJSON(s.filter(o => o.properties.fuel_type_code === 'LPG'), {pointToLayer: pointToLayer}).addTo(map);
    const cngLayer = L.geoJSON(s.filter(o => o.properties.fuel_type_code === 'CNG'), {pointToLayer: pointToLayer}).addTo(map);
    const lngLayer = L.geoJSON(s.filter(o => o.properties.fuel_type_code === 'LNG'), {pointToLayer: pointToLayer}).addTo(map);
    const eleLayer = L.geoJSON(s.filter(o => o.properties.fuel_type_code === 'ELEC'), {pointToLayer: pointToLayer}).addTo(map);   
    
    // Create a control for the overlays
    layerControl = L.control.layers(null, null, {collapsed:false}).addTo(map);
    layerControl.addOverlay(eleLayer, 'Electric');
    layerControl.addOverlay(e85Layer, 'E85');
    layerControl.addOverlay(lpgLayer, 'LPG');
    layerControl.addOverlay(cngLayer, 'CNG');
    layerControl.addOverlay(lngLayer, 'LNG');
    
    //myMap.addLayer(markers);
  }
  
  return;
}

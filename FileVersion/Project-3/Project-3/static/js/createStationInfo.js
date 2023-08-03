// Populate Station Info when value is not 'ALL', and remove Info when value is 'ALL'

function createStationInfo(value){
  if (value == 'ALL'){
    logging ? console.log('createStationInfo: ALL') : null;
    document.getElementById("stations-metadata").innerHTML = '<pclass="p1">&ltClick map marker for station info&gt</p>'; 
  } else{    
    logging ? console.log('createStationInfo: ', value, stations.find(o => o.properties.id == value).properties.id) : null;
    
    const s = stations.find(o => o.properties.id == value);
    
    let str = `<p class="p1"><b>Station Number:</b> ${s.properties.id}</p>
               <p class="p1"><b>Facility Type:</b>`
               if(s.properties.facility_desc){
                 str = str + ` ${s.properties.facility_desc}</p>`;
               }
        str = str + `<p class="p1"><b>Station Name:</b> ${s.properties.station_name}</p>
                     <p class="p1"><b>Street Address:</b> ${s.properties.street_address}</p>
                     <p class="p1"><b>City:</b> ${s.properties.city}</p>
                     <p class="p1"><b>State:</b> ${s.properties.state}</p>
                     <p class="p1"><b>Zip Code:</b> ${s.properties.zip}</p>
                     <p class="p1"><b>Phone Number:</b> ${s.properties.station_phone}</p>
                     <p class="p1"><b>Fuel Type:</b> ${s.properties.fuel_type_code}</p>`;
    let str2 = "";   
    let fuel_type_code = s.properties.fuel_type_code;
    if (fuel_type_code === 'ELEC'){
      str2 = '<p class="p1"><b>EV Connector Types:</b> ' + s.properties.ev_connector_types + '</p>';
      str2 = str2 + '<p class="p1"><b>Number of Chargers:</b> ' + (s.properties.ev_dc_fast_num + 
                                                                   s.properties.ev_level1_evse_num + 
                                                                   s.properties.ev_level2_evse_num) + '</p>';
    }
    else if (fuel_type_code === 'CNG'){
        str2 = '<p class="p1"><b>Number of Dispensers:</b> ' + (s.properties.cng_dispenser_num) + '</p>';
      }
    else{
        str2 = '<p class="p1"><b>Number of Dispensers:</b>Unknown</p>';
      }
    
    document.getElementById("stations-metadata").innerHTML = str + str2; 
  }
  return;
}

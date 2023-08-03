function createClusterMap(value){
    console.log('createClusterMap');
    
// Place url in a constant variable
let url = "https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=DEMO_KEY&&state=FL&&access=public";

map.remove();

let validZipCodes = [];

// Function to create the cluster map
function createMap(data) {
    // Create an object to hold the created marker cluster groups
    let clusterGroups = {};
    let allFuelTypesGroup = L.markerClusterGroup(); // Create a marker cluster group for all fuel types

    // Loop through the data
    for (let i = 0; i < data.features.length; i++) {
        // Set the data coordinates and fuel type properties to variables
        let location = data.features[i].geometry.coordinates;
        let fuelType = data.features[i].properties.fuel_type_code;
        let stationNumber = data.features[i].properties.id;
        let zipCode = data.features[i].properties.zip;
        let address = data.features[i].properties.street_address;

        // Check for the feature property
        if (location) {
            // Add a new marker to the corresponding fuel type cluster group and bind a popup
            let marker = L.marker([location[1], location[0]]);
            let popupContent = `
                Station Number: ${stationNumber}<br>
                Zip Code: ${zipCode}<br>
                Fuel type: ${fuelType}<br>
                Address: ${address}
            `;

            marker.bindPopup(popupContent); // Bind the popup to the marker
            marker.on('click', function(e){
               ele.innerHTML = ele.innerHTML + '<option value="' + data.features[i].properties.id + '">' + data.features[i].properties.id + '</option>';
               ele.value = data.features[i].properties.id;
               ele.onchange();});

            // Add the marker to the fuel type cluster group
            if (clusterGroups[fuelType]) {
                clusterGroups[fuelType].addLayer(marker);
            } else {
                clusterGroups[fuelType] = L.markerClusterGroup().addLayer(marker);
            }

            // Add the marker to the all fuel types group
            allFuelTypesGroup.addLayer(marker);
        }
    }

    // Create the base tile layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create the overlay maps for individual fuel types
    let overlayMaps = {};
    overlayMaps["All Fuel Types"] = allFuelTypesGroup;

    for (let fuelType in clusterGroups) {
        overlayMaps[fuelType] = clusterGroups[fuelType];
    }

    // Create a baseMaps object to contain the street map
    let baseMaps = {
        "Street Map": street
    };

    // Modify the map so that it has the street map and the "All Fuel Types" layer
    map = L.map("myMap", {
        center: [27.794402, -83.70254],
        zoom: zoom,
        layers: [street, allFuelTypesGroup] // Initially display all fuel types
    });

    // Create a layer control that contains the baseMaps and "All Fuel Types" overlay, and add it to the map
    let layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false, sortLayers: true }).addTo(map);

    // Call the getValidZipCodes function to retrieve the valid zip codes
    getValidZipCodes(data);
    
    //map.addLayer(allFuelTypesGroup);
}

// Function to zoom into the map
function zoomMap(features) {
    // Calculate the bounding box for the selected features
    let bounds = L.geoJSON(features).getBounds();

    // Set the desired zoom level
    let zoomLevel = 15; // Adjust this value as needed

    // Zoom and pan to the bounding box
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: zoomLevel });
}

// Function to get the valid zip codes
function getValidZipCodes(data) {
    validZipCodes = data.features
        .map(feature => feature.properties.zip)
        .filter(zip => zip !== null)
        .sort((a, b) => a - b);
}   

// Function that populates zip code info 
function createZipData(zipCode) {
    // Use D3 to retrieve all of the data
    d3.json(url).then(data => {
        // Filter based on the selected zip code
        let filteredZipCode = data.features.filter(
            feature => feature.properties.zip === zipCode 
        );

        // Extract the station IDs and coordinates from the filtered features
        let stationData = filteredZipCode.map(feature => ({
            id: feature.properties.id,
            coordinates: feature.geometry.coordinates,
        }));

        // Log the array of station IDs
        console.log(stationData);

        // Clear out existing station info
        d3.select("#zipStations").html("");

        // Display the station IDs as clickable links in the panel
        let stationLinks = d3
            .select("#zipStations")
            .selectAll("h5")
            .data(stationData)
            .enter()
            .append("h5");

        stationLinks
            .append("a")
            .text(station => `Station ID: ${station.id}`)
            .attr("href", "#")
            .on("click", station => {
            
            // Zoom into the selected station on the map
            let coordinates = station.coordinates;
            map.setView([coordinates[1], coordinates[0]], 17); // Adjust the zoom level as needed
            });

        // Zoom into the map based on the selected zip code coordinates
        zoomMap(filteredZipCode);
    });
}

// Function to take zip code search bar input
function searchByZipCode() {
    let zipCode = document.getElementById("zipCodeInput").value;
    let errorMessage = d3.select("#errorMessage");

    d3.select("#zipStations").html(""); // Clear the station info
    errorMessage.text(""); // Clear any previous error message

    if (zipCode !== "") {
        if (validZipCodes.includes(zipCode)){
            createZipData(zipCode);
        } else {
            errorMessage.text("Invalid input. Zip code not found."); // Display the error message
        }
    } else {
        // Reset the map to its initial state when no zip code is entered
        map.setView([27.794402, -83.70254], 7.00); // Adjust the coordinates and zoom level as needed
        errorMessage.text(""); // Clear the error message
    }
}

// Function to reset zip code search bar
function resetSearch () {
    document.getElementById("zipCodeInput").value = "";
    d3.select("#zipStations").html(""); // Clear the zip code
    map.setView([27.794402, -83.70254], 7.00); // Adjust the coordinates and zoom level as needed
    d3.select("#errorMessage").text(""); // Clear the error message
}

// Function that updates dashboard when zip code is changed
function optionChanged(zipCode) {
    if (zipCode !== "") {
        createZipData(zipCode);
    } else {
        // Reset the map to its initial state when "Select" is chosen
        map.setView([27.794402, -83.70254], 7.00); // Adjust the coordinates and zoom level as needed
    }
}

// Function to initialize the application
async function init() {
    let data = await d3.json(url); // Fetch the JSON data and wait for it to be retrieved
    console.log('data', data)
    createMap(data); // Create the cluster map
}    
// Call the initialize function
init();
}
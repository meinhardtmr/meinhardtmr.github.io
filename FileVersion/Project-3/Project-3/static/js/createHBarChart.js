function createHBarChart(value){
  logging ? console.log('createHBarChart: ', value) : null ;

  // Set default x values to 0
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  let e = 0;

  // Begin IF statement to check whether value selected in dropdown is equal to ALL
  if (value == 'ALL') {

    // Loop through the array of stations to sum each fuel type
    for (let i = 0; i < stations.length; i++) {

      // Store the station at index `i` for evaluation
      row = stations[i].properties;

      // Compare 'fuel type code' to each fuel type and add 1 to variable if it matches
      if (row.fuel_type_code == 'ELEC'){
        a += 1;
      }
      else if (row.fuel_type_code == 'E85'){
        b += 1;
      }
      else if (row.fuel_type_code == 'LPG'){
        c += 1;
      }
      else if (row.fuel_type_code == 'CNG'){
        d += 1;
      }
      else if (row.fuel_type_code == 'LNG'){
        e += 1;
      }
      
    };

  }

  // Continue IF statement to check whether value selected in dropdown is not equal to ALL
  else if (value != 'ALL') {

    // If a specific station is selected, save fuel_type_code of the selected station to a variable
    let fuel_type = stations.find(o => o.properties.id == value).properties.fuel_type_code;

    // Compare the fuel_type_code to each fuel type and set x value equal to one if it matches
    if (fuel_type == 'ELEC'){
      a = 1;
    }
    else if (fuel_type == 'E85'){
      b = 1;
    }
    else if (fuel_type == 'LPG'){
      c = 1;
    }
    else if (fuel_type == 'CNG'){
      d = 1;
    }
    else if (fuel_type == 'LNG'){
      e = 1;
    };

  };

  // Save the resulting x values to a list
  let x_values = [a, b, c, d, e];

  // Set bar chart specifications
  let trace1 = {
    x: x_values,
    y: ['ELEC','E85','LPG','CNG','LNG'],
    type: 'bar',
    orientation: 'h',
    text: ['Electric','Ethanol','Propane','Compressed Natural Gas','Liquefied Natural Gas']
  };

  // Set bar chart title
  let layout = {
    title: '<b>Fuel Type</b>'
  };  

  // Plot bar chart
  Plotly.newPlot("bar", [trace1], layout);

  return;

  } 

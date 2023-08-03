function createGauge(value){
  logging ? console.log('createGaugeChart: ', value) : null;
  const s = stations.find(o => o.properties.id == value);
  let title = '<b>Number of Dispensers</b>';
  let num = 0;
  let label = "9";

  if (value !== 'ALL'){
    if (s.properties.fuel_type_code == 'ELEC'){
      title = '<b>Number of Chargers</b>';
      num = (s.properties.ev_dc_fast_num + s.properties.ev_level1_evse_num + s.properties.ev_level2_evse_num);
      if (num > 9){
          num = 10;
          label = "9+";
      }
    }
    else if (s.properties.fuel_type_code == 'CNG'){
      num = (s.properties.cng_dispenser_num);
      if (num > 9){
          num = 10;
          label = "9+";
      }
    }
  }
  
  let trace1 = {
    type: 'pie',
    showlegend: false,
    rotation: 90,
    hole: 0.5,
    values: [100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100 ],
    text: ["1", "2", "3", "4", "5", "6", "7", "8", label, ""],
    direction: "clockwise",
    textinfo: "text",
    textposition: "inside",
    hoverinfo: "none",
    marker: {colors:["rgba(225,223,181,0.3", 
                     "rgba(225,223,181,0.5)", 
                     "rgba(225,223,181,0.7)", 
                     "rgba(196,209,120,0.5)", 
                     "rgba(196,232,113,0.5)", 
                     "rgba(149,168,74,0.6)", 
                     "rgba(74,151,23,0.5)", 
                     "rgba(74,151,23,0.7)", 
                     "rgba(74,151,23,0.8)", 
                     "rgba(255,255,255,0"]}
  };
  
  //radius is the length of the dial
  let radius = .25;
   
  //theta is the angle in radians where 3.14159 is the equivalent of 180' 
  //as n approaches 9 theta approaches 0
  let theta = 3.14159 - (3.14159 * (num/10));

  let layout = {
    title: title,
    shapes: [{type: "line",
              x0: .5,
              y0: .5,
              x1: .5 + (radius * Math.cos(theta)),
              y1: .5 + (radius * Math.sin(theta)),
              line: {color: "red",
                      width: 3}
            }]                           
  }
  Plotly.newPlot("gauge", [trace1], layout);

  return;
}



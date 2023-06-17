const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let samples = [];
let metadata = [];
//let logging = false;
let logging = true;

function populateDemoInfo(id){
  logging ? console.log('populateDemoInfo: ', id, metadata.find(o => o.id == id).id) : null ;
  
  let str = `<p>id:        ${metadata.find(o => o.id == id).id}        </p>
             <p>ethnicity: ${metadata.find(o => o.id == id).ethnicity} </p>
             <p>gender:    ${metadata.find(o => o.id == id).gender}    </p>
             <p>age:       ${metadata.find(o => o.id == id).age}       </p>
             <p>location:  ${metadata.find(o => o.id == id).location}  </p>
             <p>bbtype:    ${metadata.find(o => o.id == id).bbtype}    </p>
             <p>wfreq:     ${metadata.find(o => o.id == id).wfreq}     </p>`;
   
  document.getElementById("sample-metadata").innerHTML = str 
  return;
}

function createHBarChart(id){
  logging ? console.log('createHBarChart: ', id, samples.find(o => o.id == id).id) : null ;
  
  let trace1 = {
    x: samples.find(o => o.id == id).sample_values.slice(0,10).reverse(),
    y: samples.find(o => o.id == id).otu_ids.slice(0,10).map(n => `OTU ${n}`).reverse(),
    type: 'bar',
    orientation: 'h',
    text: samples.find(o => o.id == id).otu_labels.slice(0,10).reverse()
  };

  Plotly.newPlot("bar", [trace1]);

  return;
}

function createBubbleChart(id){
  logging ? console.log('createBubbleChart: ', id, samples.find(o => o.id == id).id) : null ;
  
  let trace1 = {
    x: samples.find(o => o.id == id).otu_ids,
    y: samples.find(o => o.id == id).sample_values,
    mode: 'markers',
    text: samples.find(o => o.id == id).otu_labels,
    marker: {color: samples.find(o => o.id == id).otu_ids,
             size: samples.find(o => o.id == id).sample_values}
  };

  let layout = {xaxis: 
                 {title:
                    {text: 'OTU ID'}
                 }
               };

  Plotly.newPlot("bubble", [trace1], layout);

  return;
}

async function optionChanged(value){
  logging ? console.log('optionChanged', value, samples.find(o => o.id == value).id, metadata.find(o => o.id == value).id) : null;
  
  //Create objects in parallel
  await Promise.all([populateDemoInfo(value),
                     createHBarChart(value),
                     createBubbleChart(value)]);

  logging ? console.log('optionChanged Complete', value, samples.find(o => o.id == value).id, metadata.find(o => o.id == value).id) : null;

  return;
}
 
// Promise Pending
const dataPromise = d3.json(url);
logging ? console.log("Data Promise: ", dataPromise) : null;

// Fetch the JSON data  
d3.json(url).then(function(data) {
  logging ? console.log('Data: ', data) : null;
  
  //Initialize web page
  samples.push(data.samples[0]);
  metadata.push(data.metadata[0]); 
  optionChanged(data.samples[0].id);

  //Populate select element with json.
  let ele = document.getElementById('selDataset');
  for (i in data.metadata) { 
    ele.innerHTML = ele.innerHTML + '<option value="' + data.samples[i].id + '">' + data.samples[i].id + '</option>';
    
    //Store JSON in an array
    if (i > 0){
      samples.push(data.samples[i]);
      metadata.push(data.metadata[i]);
    } 
  }
});


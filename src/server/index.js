const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const projectData = [];
const app = express();

const port = 8081;


app.listen(port, function () {
    console.log('Example app listening on port 8081!')
})

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('dist'));

app.get('/', (req, res)=>{
    res.sendFile('dist/index.html')
})


app.post('/geoname', (req, res)=>{
    try{

    incomingData = req.body.cityGeo;
    console.log(incomingData);
    cityInfo = {
        lat:incomingData[0],
        lon:incomingData[1],
        cityname:incomingData[2],
        country:incomingData[3],
        temp:'',
        img:''
    }

    

    projectData.push(cityInfo);
    console.log(projectData);
    res.send(projectData);
}
catch(error){
    console.log(error);
    
}
})


app.get('/weatherbit', async(req, res)=>{
    
 
    const lat = projectData[projectData.length-1].lat;
    
    const lon = projectData[projectData.length-1].lon;
    


    const weatherbitURL = `https://api.weatherbit.io/v2.0/current?`+`lat=${lat}&lon=${lon}&key=4840b6c226784ef4a3cfff214b7c7c17`;
 

    try{
        const response = await fetch(weatherbitURL);
        const weatherData = await response.json();
        projectData[projectData.length-1].temp = weatherData.data[0].temp;

        console.log(projectData[projectData.length-1]);

        res.send(projectData);
    }
    catch(error){
        console.log(error)
    }


})



app.get('/pixabay', async(req,res)=>{
    const cityname = projectData[projectData.length-1].cityname;
    console.log(cityname);
    const pixabayURL = `https://pixabay.com/api/?key=17986335-f2af7fcafd6a3f2fb5e0660e3&q=${cityname}&image_type=photo`;
    try{
    const response = await fetch(pixabayURL);

    const data = await response.json();

    console.log(data);

    projectData[projectData.length-1].img = data.hits[0].webformatURL;
    res.send(projectData);
    }
    catch(error){
        console.log(error);
    }
})

module.exports = app
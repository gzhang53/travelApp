
const submit = document.getElementById("submit").addEventListener("click", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();

    let dateNow = new Date();

    const oneDay = 24 * 60 * 60 * 1000;

    const weatherbitKey = "4840b6c226784ef4a3cfff214b7c7c17";   
    
    // check what text was put into the form field
    let travelDay = new Date(document.getElementById('travelDay').value+"T00:00");
    let backDay = new Date(document.getElementById('backDay').value+"T00:00");
    let tripDuration =  (backDay - travelDay)/oneDay;

    let cityName = document.getElementById('cityName').value;

    let daysRemain = Math.floor((travelDay - dateNow)/oneDay);

    const geoNameURL = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=10&username=gzhang53`;

    if (!(cityName==undefined)){
        //get destination coordinates
        Client.getCoordinates(geoNameURL)
        //post city geo information to server
        .then(async(res)=>{
        
        res.push(daysRemain);
        
        await fetch('http://localhost:8081/geoname',{
            method:'POST',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({cityGeo:res})
        })

        })
        .then(async ()=>{
            await fetch('http://localhost:8081/weatherbit')
        }

        )
        .then(async ()=>{

            const pixabayRes = await fetch('http://localhost:8081/pixabay');

            
            try{
                const data = await pixabayRes.json()
               
                document.getElementById('img').src = `${data[data.length-1].img}`;

                document.getElementById('weather').innerHTML = `${daysRemain} days until your trip to ${data[data.length-1].cityname}, ${data[data.length-1].country}
                <br> The temperature is ${data[data.length-1].temp} C degrees, the duration of this trip is ${tripDuration} days`;
            
            }
            catch(error){
                console.log(error)
            }
        })
      
    }
    else{
        alert('please enter a valid city');
    }

}

export{submit}




// let dateNow = new Date();

// const oneDay = 24 * 60 * 60 * 1000;

// const weatherbitKey = "4840b6c226784ef4a3cfff214b7c7c17";


// document.getElementById("submit").addEventListener("click", handleSubmit)

export function handleSubmit(event) {
    event.preventDefault()

    let dateNow = new Date();

    const oneDay = 24 * 60 * 60 * 1000;

    const weatherbitKey = "4840b6c226784ef4a3cfff214b7c7c17";   
    
    // check what text was put into the form field
    let travelDay = new Date(document.getElementById('travelDay').value+"T00:00");
    let cityName = document.getElementById('cityName').value;

    let daysRemain = Math.floor((travelDay - dateNow)/oneDay);

    const geoNameURL = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=10&username=gzhang53`;

    if (!(cityName==undefined)){
        //get destination coordinates
        Client.getCoordinates(geoNameURL)
        //post city geo information to server
        .then(async(res)=>{
        

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

            // const data = pixabayRes.json()

            // console.log(data[0]);

            try{
                const data = await pixabayRes.json()
               
                document.getElementById('img').src = `${data[data.length-1].img}`;

                document.getElementById('weather').innerHTML = `${daysRemain} days until your trip to ${data[data.length-1].cityname}, ${data[data.length-1].country}
                <br> The temperature is ${data[data.length-1].temp} C degrees`;
            }
            catch(error){
                console.log(error)
            }
            


        })
      
    }

}

// export const getCoordinates = async (url) =>{

//     const res = await fetch (url);

//     try{
//         const data = await res.json();

//         const lat = data.geonames[0].lat;

//         const lng = data.geonames[0].lng;

//         const city = data.geonames[0].name;

//         const country = data.geonames[0].countryName;
        
//         const geoArray = [lat, lng, city, country];

//         console.log(data);

//         return geoArray;
//     }
//     catch(error){
//         alert("Error from Geoname");

//         return '';
//     }
// }




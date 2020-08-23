async function getCoordinates(url){

    const res = await fetch (url);

    try{
        const data = await res.json();

        const lat = data.geonames[0].lat;

        const lng = data.geonames[0].lng;

        const city = data.geonames[0].name;

        const country = data.geonames[0].countryName;
        
        const geoArray = [lat, lng, city, country];

        console.log(data);

        return geoArray;
    }
    catch(error){
        alert("Error from Geoname",error);

        
    }
}

export{getCoordinates}
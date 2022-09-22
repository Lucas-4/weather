function validateInput(){
    if(document.querySelector('#city').value.trim().length == 0 || document.querySelector('#state').value.trim().length == 0){
        document.querySelector(".result").innerHTML = "";
        document.querySelector("#info").innerHTML = "XºC";
        document.querySelector('.alert').innerText = "Por favor, preencha todos os campos!"
        return false;
    }else {
        document.querySelector('.alert').innerText = "";
        return true
    }
}


async function getLocation(){
    if(validateInput()){
        let city = document.querySelector("#city").value;
        let state = document.querySelector("#state").value;
        let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + 
        ",BR&limit=1&appid=e90cbf3e3c1c947ae8bf290da980f6db";
        
        const response = await fetch(url)

        const data = await response.json();
        console.log(data);

        if(data.length == 0){
            throw new Error('Location not found');
        }

        return {
            lat: data[0].lat,
            lon: data[0].lon,
            name: data[0].name
        }
    }
}

async function getWeather(){
    try{
        const coords = await getLocation();
        console.log(coords);
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + "&units=metric&appid=e90cbf3e3c1c947ae8bf290da980f6db";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        document.querySelector("#info").innerHTML =  data.main.temp +" ºC";
        document.querySelector(".result").innerHTML = "Mostrando resultado para: " + coords.name + ".";
        
    }catch(e){
        document.querySelector("#info").innerHTML =  "";
        document.querySelector(".result").innerHTML = e;
    }
}

document.querySelector("#submit").addEventListener("click", getWeather);

var lat;
var lon;
document.querySelector("#submit").addEventListener("click", getlocation);

function getlocation(){
    if(document.querySelector('#city').value=="" || document.querySelector('#state').value==""){
        document.querySelector(".result").innerHTML = "";

        document.querySelector("#info").innerHTML = "XºC";
        document.querySelector('.alert').innerText = "Por favor, preencha todos os campos!"
    } else{
        document.querySelector('.alert').innerText = ""
        var city = document.querySelector("#city").value;
        var state = document.querySelector("#state").value;
        var xhr = new XMLHttpRequest();
        var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + ",BR&limit=1&appid=e90cbf3e3c1c947ae8bf290da980f6db";
        xhr.onreadystatechange = function (){
            if(xhr.readyState==4 && xhr.status==200){
                var str = xhr.responseText;
                var obj = JSON.parse(str);
                console.log(obj);
                try{
                    lat = obj[0].lat;
                    lon = obj[0].lon;
                } catch{
                    lat = "x";
                    lon = "x";
                }
                if(lat!="x"){
                    getTemp();
                } else{
                    document.querySelector(".result").innerHTML = "Local não encontrado.";
                    document.querySelector("#info").innerHTML = "XºC";
                }
                
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }
}

function getTemp(){
    var xhr = new XMLHttpRequest();
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=e90cbf3e3c1c947ae8bf290da980f6db";
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4 && xhr.status==200){
            var str = xhr.responseText;
            var obj = JSON.parse(str);
            console.log(obj);
            console.log(lat);
            document.querySelector(".result").innerHTML = "Mostrando resultado para: " + obj.name + ".";
            document.querySelector("#info").innerHTML = obj.main.temp +"ºC";
        }
    }
    xhr.open("GET", url);
    xhr.send();
}
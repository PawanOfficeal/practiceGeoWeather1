//get geoLocation
let showDataPara = document.getElementById("showDataPara")
let failureMsgPara = document.getElementById("failureMsgPara")
let positionPara = document.getElementById("positionPara")
let showData = document.getElementById("showData")
let mainClass = document.getElementById("mainClass")
window.addEventListener("DOMContentLoaded",geoLocationFunction)

function geoLocationFunction(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, failure)
    }
    else{
        failureMsgPara.innerHTML = `could not get location`
    }
}

function success(position){

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    
    positionPara.innerHTML = `${latitude} ${longitude}`
    positionPara.style.backgroundColor = 'lightpink'
    getWeather(latitude, longitude);
}

function failure(err){
    switch(err.code){
        case err.PERMISSION_DENIED: 
        errMsg.innerHTML = `permission denied`
        break 

        case err.TIMED_OUT: 
        errMsg.innerHTML = `time out`
        break

        case err.POSITION_UNAVAILABLE: 
        errMsg.innerHTML = `position is not available`
        break



    }
}

//get weather info
   

 // window.addEventListener("DOMContentLoaded",getWeather)

  function getWeather(latitude,longitude){
    const URL= 
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`
    fetch(URL)
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .then(data =>{
        console.log(data)

        //for main div to display in header:
        let showInBigDiv = document.getElementById("showInBigDiv")
        let bigDiv = document.createElement("div")
        bigDiv.innerHTML = `
                                 <p class="mainDiv"> ${data.city.name}</p>
                                 <p class="mainDiv"> ${(data.list[0].main.temp_max-273).toFixed(0)} &deg;C</p>
                                  `
                                  showInBigDiv.appendChild(bigDiv)
        
        for(let i = 0; i < data.list.length;i= i+8){
                
            console.log(data.list[i])
            
                let time = new Date(data.list[i].dt*1000)
                console.log(time)
                let day = time.toString().split("")[0]
                
                console.log(day)
            
              let showData = document.getElementById("showData")
              let div = document.createElement("div")
              div.innerHTML = `
                       
                        <p> ${day}</p>
                        <p class="max-temp tempPara">Max-Temp:${(data.list[i].main.temp_max-273).toFixed(0)} &deg;C</p>
                                
              `
              showData.appendChild(div)
              

            
            
        }
        
    })
    .catch(err=>{
        console.log(err)
    })
}
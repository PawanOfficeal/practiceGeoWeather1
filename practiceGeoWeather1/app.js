//get geoLocation
let failureMsgPara = document.getElementById("failureMsgPara")
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
    const longitude = position.coords.longitude
    const latitude = position.coords.latitude
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

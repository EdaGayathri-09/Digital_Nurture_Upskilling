// Console message
console.log("Welcome to the Community Portal");

//Registration success message
function showMessage(event){
    event.preventDefault();
    let name=document.getElementById("name").value;
    let eventType=document.getElementById("eventType").value;
    document.getElementById("outputMessage").innerHTML="Thank you "+name+"! You have successfully registered for "+eventType+".";
}
//onblur event
function validatePhone(){
    let phone=document.getElementById("phone").value;
    if(phone.length!=10 || isNaN(phone)){
        alert("Please enter a valid 10-digit phone number");
    }
}
//onchange event
function showFee(){
    let fee="";
    let eventType=document.getElementById("eventType").value;
    if(eventType==="Clean Up Drive"){
        fee=300;
    }else if(eventType==="Tree Plantation"){
        fee=400;
    }else if(eventType==="Health Camp"){
        fee=500;
    }
    document.getElementById("feeDisplay").innerHTML="Event Fee: &#8377;"+ fee;
}
//onclick event
function showConfirmation(){
    alert("Your registration has been submitted!");
}
//ondblclick event
function enlargeImage(image){
    image.style.width="500px";
}
//keyboard event
function countCharacters(){
    let text=document.getElementById("feedbackMessage").value;
    document.getElementById("charCount").innerHTML=text.length;
}
//oncanplay event
function videoReady(){
    document.getElementById("videoMessage").innerHTML="Video ready to play!";
}
//onbeforeunload event
window.onbeforeunload=function(){
    return "You have unsaved changes";
}
//save selected event type
function savePreference(){
    let selectedEvent=document.getElementById("eventType").value;
    localStorage.setItem("preferredEvent",selectedEvent);
}
//load saved preference when page loads
window.onload = function(){
    alert("Page fully loaded!")
    let savedEvent=localStorage.getItem("preferredEvent");
    if(savedEvent){
        document.getElementById("eventType").value=savedEvent;
        showFee();
    }
}
//clear localStorage and sessionStorage
function clearPreferences(){
    localStorage.clear();
    sessionStorage.clear();
    alert("Preferences cleared!");
    location.reload();
}
//Geolocation function
function findLocation(){
    let options={
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    };
    //check browser support
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError,
            options
        );
    }else{
        document.getElementById("locationResult").innerHTML="Geolocation is not supported.";
    }
}
//success function
function showPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    document.getElementById("locationResult").innerHTML="Latitude:"+latitude+"<br>Longitude:"+longitude;
}
//Error handling function
function showError(error){
    if(error.code==1){
        alert("Permission denied by user.");
    }else if(error.code==2){
        alert("Location information unavailable.");
    }else if(error.code==3){
        alert("Request timed out");
    }else{
        alert("Unknown error occured.");
    }
}
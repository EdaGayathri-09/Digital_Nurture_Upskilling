// Console message
console.log("Welcome to the Community Portal");
//ondblclick event
function enlargeImage(image){
    image.style.width="500px";
}
//oncanplay event
function videoReady(){
    document.getElementById("videoMessage").innerHTML="Video ready to play!";
}
//onbeforeunload event
window.onbeforeunload=function(){
    return "You have unsaved changes";
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

//Form related exercises
//Registration success message

//Event data
const events={
    "Clean Up Drive":{date: "2026-05-16",seats:50,fee:300},
    "Tree Plantation":{date: "2026-06-20",seats:40,fee:400},
    "Health Camp":{date:"2026-06-25",seats:30,fee:500}
};

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
//onclick event
function showConfirmation(){
   try{
        let selectedEvent=document.getElementById("eventType").value;
        if(selectedEvent===""){
            throw new Error("Please select an event!");
        }
        let event=events[selectedEvent];
        if(event.seats<=0){
            throw new Error("No seats available!");
        }
        event.seats--;
        alert("Your registration has been submitted!");
        showEventDetails();
   }catch(error){
        alert(error.message);
   }
}
//keyboard event
function countCharacters(){
    let text=document.getElementById("feedbackMessage").value;
    document.getElementById("charCount").innerHTML=text.length;
}
//save selected event type
function savePreference(){
    let selectedEvent=document.getElementById("eventType").value;
    localStorage.setItem("preferredEvent",selectedEvent);
}
//load saved preference when page loads
window.onload = function(){
    alert("Page fully loaded!");
    loadValidEvents();
    let savedEvent=localStorage.getItem("preferredEvent");
    if(savedEvent && events[savedEvent]){
        let eventDate=new Date(events[savedEvent].date);
        let today=new Date();
        if(eventDate>today && events[savedEvent].seats>0){
            document.getElementById("eventType").value=savedEvent;
            showEventDetails();
        }
    }
}
//clear localStorage and sessionStorage
function clearPreferences(){
    localStorage.clear();
    sessionStorage.clear();
    alert("Preferences cleared!");
    location.reload();
}
//show event details
function showEventDetails(){
    let selectedEvent=document.getElementById("eventType").value;
    if(selectedEvent!==""){
        let event=events[selectedEvent];
        document.getElementById("eventInfo").innerHTML=`Event:${selectedEvent}<br> Date:${event.date}<br> Available seats:${event.seats}<br> Fee:${event.fee}`;
    }
}
//show only valid events
function loadValidEvents(){
    let dropdown=document.getElementById("eventType");
    dropdown.innerHTML='<option value="">Select Event Type</option>';
    let today=new Date();
    Object.entries(events).forEach(([name,event])=>{
        let eventDate=new Date(event.date);
        if(eventDate>today && event.seats>0){
            dropdown.innerHTML+=`<option value="${name}"> ${name}</option>`;
        }
    });
}
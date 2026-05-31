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
    "Clean Up Drive":{date: "2026-05-16",seats:50,fee:300,category:"Environment"},
    "Tree Plantation":{date: "2026-06-20",seats:40,fee:400,category:"Environment"},
    "Health Camp":{date:"2026-06-25",seats:30,fee:500,category:"Health"}
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
        if(registerUser(selectedEvent)){
            alert("Your registration has been submitted!");
            showEventDetails();
            displayEvents();
        }else{
            throw new Error("No seats available");
        }
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
    displayEvents();
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

//JavaScript Exercise:4 
//They do not reflect to frontend
//Adding event
function addEvent(name,date,seats,fee,category){
    events[name]={date,seats,fee,category};
    console.log(name+" added successfully");
}
addEvent("Blood Donation Camp","2026-07-10",100,200,"Health");
//Register user
function registerUser(eventName){
    let event=events[eventName];
    if(event.seats>0){
        event.seats--;
        return true;
    }
    return false;
}
//filter events by category
/*function filterEventsByCategory(category){
    return Object.entries(events).filter(
        ([name,event])=>event.category===category
    );
}
console.log(filterEventsByCategory("Health"));*/
//closure for registration tracking
function createRegistrationTracker(){
    let totalRegistrations=0;
    return function(){
        totalRegistrations++;
        return totalRegistrations;
    };
}
const registrationTracker=createRegistrationTracker();
console.log(registrationTracker());
console.log(registrationTracker());
console.log(registrationTracker());

//filter events by category using callback
function filterEventsByCategory(
    category,
    callback
){
    let filteredEvents=
        Object.entries(events).filter(
            ([name,event])=>event.category === category
        );
    callback(filteredEvents);
}
//create callback
function displayFilteredEvents(result){
    console.log(result);
}
//call
filterEventsByCategory("Environment",displayFilteredEvents);

//Exercise 5:Objects and Prototype
class Event{
    constructor(name,date,seats,fee,category){
        this.name=name;
        this.date=date;
        this.seats=seats;
        this.fee=fee;
        this.category=category;
    }
}
Event.prototype.checkAvailability=function(){
    if(this.seats>0) return "Seats Available";
    return "No Seats Available";
};
const demoEvent=new Event(
    "Community Meeting",
    "2026-07-10",
    25,
    100,
    "Social"
);
console.log(demoEvent.checkAvailability());
Object.entries(demoEvent).forEach(([Key,value])=>{
    console.log(key+":"+value);
});

//Exercise 6:Arrays and Methods
let communityEvents=[
    {
        name:"Music Night",
        category:"Music"
    },
    {
        name:"Workshop on Baking",
        category:"Workshop"
    },
    {
        name:"Music Festival",
        category:"Music"
    }
];
communityEvents.push({
    name:"Guitar Concert",
    category:"Music"
});
console.log("After push:");
console.log(communityEvents);

let musicEvents=communityEvents.filter(
    event=>event.category==="Music"
);
console.log("Music Events:");
console.log(musicEvents);

let displayCards=communityEvents.map(
    event=>`Event:${event.name}`
);
console.log("Display Cards:");
console.log(displayCards);

//Exercise 7:DOM Manipulation
function displayEvents(){
    const container=document.querySelector("#eventContainer");
    container.innerHTML="";
    Object.entries(events).forEach(([name,event])=>{
        const card=document.createElement("div");
        card.innerHTML=`
            <h3>${name}</h3>
            <p>Date: ${event.date}</p>
            <p>Seats: ${event.seats}</p>
            <p>Fee: ₹${event.fee}</p>
        `;
        card.style.border = "1px solid black";
        card.style.padding = "10px";
        card.style.margin = "10px";
        container.appendChild(card);
    })
}
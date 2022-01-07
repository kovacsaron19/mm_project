
const DaysEnums = { 0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday" }

var cDate = new Date();

var allEvents = []

var globalCurrentDate = {
    month:cDate.getMonth() + 1,
    year:cDate.getFullYear()
}

function displayDate(cDate) {
    document.getElementById("Date").innerHTML = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate(); //cDate.toString(); 
    document.getElementById("navbarText").innerHTML = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate();
}

function calculateFirstDay(date) {
    // var day = cDate2.getDate();
    // console.log(day);
    // var month = cDate2.getMonth() + 1;
    // if(month <= 2) {
    //     month = month + 10;
    // } else {
    //     month = month - 2;
    // }
    // console.log(month);
    // var century = Math.floor(cDate2.getFullYear() / 100);
    // console.log(century);
    // var year = cDate2.getFullYear() % 100;    
    // if(month === 11 || month === 12){
    //     year = year-1;
    // }
    // console.log(year);
    // var weekday = (day + Math.floor(2.6*month - 0.2) - 2*century + year + Math.floor(year/4) + Math.floor(century/4)) % 7

    // console.log(weekday);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay = firstDay.getDay();
    if (firstDay == 0) {
        firstDay = 6;
    }
    else {
        firstDay -= 1;
    }
    return firstDay;
}

function setCurrent(date) {
    var dayOfWeek = date.getDay();

    if (dayOfWeek == 0) {
        dayOfWeek = 6;
    }
    else {
        dayOfWeek -= 1;
    }

    let pasts = document.getElementsByClassName("current");
    // console.log(pasts);
    if (pasts[0]) {
        pasts[0].classList.remove("current");
    }

    let children = document.getElementsByClassName(DaysEnums[dayOfWeek]);
    for (var i = 0; i < children.length; i++) {
        const innerHtml = children[i].innerHTML;
        //console.log(i + " " + innerHtml + " " + date.getDate());
        if (children[i].innerHTML == date.getDate()) {
            children[i].classList.add("current");
            // console.log(children[i].classList);
        }

    }
}

function displayCalendar(date) {
    // console.log("here")
    displayDate(date);
    let cellDate = 1;
    var firstWeekday = calculateFirstDay(date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var lastDate = new Date(year, month + 1, 0).getDate();

    let children = document.getElementsByClassName("cell");
    // console.log(children)
    for (i = 0; i < children.length; i++) {
        children[i].innerHTML = "";
    }

    let child = children[0];
    let count = 1;
    let ok = true;
    // console.log(child)
    // console.log(child.classList)

    let specificEvents = allEvents.filter((event) => {return event.date.includes(`${globalCurrentDate.year}-${globalCurrentDate.month}`)})
    // console.log(specificEvents)
    // console.log(`${globalCurrentDate.year}-${globalCurrentDate.month}`)

    while (ok) {
        // console.log(child);
        // console.log(firstWeekday)
        if (child.classList.contains(DaysEnums[firstWeekday])) {
            child.innerHTML = cellDate;
            cellDate += 1;
            child = children[count];
            count += 1;
            ok = false;
        }
        else {
            child = children[count];
            count += 1;
        }
    }
    while (cellDate <= lastDate) {
        let dayEvent = specificEvents.filter((event) => {return event.date.includes(`${globalCurrentDate.year}-${globalCurrentDate.month}-${cellDate}`)})
        let divEl = document.createElement('div');
        if(dayEvent.length !== 0){
            console.log(dayEvent[0])
            console.log(divEl)
            console.log(child)
            console.log(children[count-1])
            divEl.classList.add('event');
            divEl.innerHTML = dayEvent[0].name;
            console.log(child.appendChild(divEl))
            child.appendChild(divEl)
        }
        child.innerHTML = cellDate;
        cellDate += 1;
        child = children[count];
        count += 1;
    }

    setCurrent(date);

    var grid = document.getElementById("mygrid2");

    grid.addEventListener("click", function (event) {
        // console.log("click ", event.target);
        if (event.target != null) {
            document.getElementById("Date").innerHTML= globalCurrentDate.year + '-' + globalCurrentDate.month + '-' + event.target.innerHTML;
            var past = document.getElementsByClassName("current");
            // console.log(document.getElementsByClassName("current"));
            // console.log(document.querySelector(".current"));
            // console.log(document.getElementsByClassName("current").nextSibling);
            // console.log(document.querySelector(".current").nextElementSibling);
            past[0].classList.remove("current");
        }
        event.target.classList.add("current");

        let dayOfMonth = event.target.innerHTML;

        // displayDate(date.getFullYear(), date.getMonth(), dayOfMonth);
    })

    document.addEventListener('keyup', (event) => {
        if(event.key === 'ArrowRight'){
            var past = document.querySelector(".current");
            // console.log(past.nextElementSibling)
            // console.log(past.nextElementSibling)
            past.classList.remove("current");
            var next = past.nextElementSibling
            next.classList.add("current")
            // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
            // past.nextElementSibling.classList.add("current");
        }
        // Alert the key name and key code on keydown
        
      }, false);
  
    let eventStart = null;

    grid.addEventListener("mousedown", function (event) {
        console.log("mousedown ", event.target);
        eventStart = event.target;
    })

    grid.addEventListener('mouseup', function (event) {
        console.log("mouseup ", event.target);
        if (eventStart != event.target) {
            let divEl = document.createElement('div');
            divEl.classList.add('event');
            divEl.innerHTML = "Event";
            // divEl.setAttribute("padding-right", "1000px");
            // add style for divEl
            divEl.style.paddingRight = '100px';
            eventStart.appendChild(divEl);
        }
    })

    grid.addEventListener('dblclick', function (event) {
        console.log("dblclick", event.target);
        let divEl = document.createElement('div');
        divEl.classList.add('event');
        divEl.innerHTML = "Event";
        event.target.appendChild(divEl);

    })

    let box = document.getElementsByClassName("container")
    box[0].removeAttribute('id')
    console.log(globalCurrentDate.month)
    if(globalCurrentDate.month == 1 || globalCurrentDate.month == 2 || globalCurrentDate.month == 12){
        box[0].id = 'scheme1'
    }
    if(globalCurrentDate.month == 3 || globalCurrentDate.month == 4 || globalCurrentDate.month == 5){
        box[0].id = 'scheme2'
    }
    if(globalCurrentDate.month == 6 || globalCurrentDate.month == 7 || globalCurrentDate.month == 8){
        box[0].id = 'scheme3'
    }
    if(globalCurrentDate.month == 9 || globalCurrentDate.month == 10 || globalCurrentDate.month == 11){
        box[0].id = 'scheme4'
    }

    // speechRec();

    // var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    // var recognition = new SpeechRecognition();
    // recognition.lang = 'en-US';

    // var speechBtn = document.getElementById("listen")
    // speechBtn.addEventListener('click', function(event){
    //     console.log('hi mom')
    //     recognition.start();
    // })

    // // recognition.onspeechend = () => {
    // //     recognition.stop();
    // // }

    // recognition.onresult = (event) => {
    //     console.log(event.results)
        
    // }  

}

function getEventData(){
    let nameField = document.getElementById("eventname").value
    let descriptionField = document.getElementById("eventdescription").value
    let newEvent = {
        name:nameField,
        description:descriptionField,
        date:document.getElementById("Date").innerHTML
    }
    allEvents.push(newEvent)
    let divEl = document.createElement('div');
    divEl.classList.add('event');
    divEl.innerHTML = newEvent.name;
    var cell = document.querySelector(".current");
    cell.appendChild(divEl)
    document.getElementById("eventname").value = ""
    document.getElementById("eventdescription").value = ""

}

function changeMonthMinus() {
    var newDate = new Date(document.getElementById("Date").innerHTML)
    newDate.setMonth(newDate.getMonth() - 1);
    document.getElementById("Date").innerHTML = newDate;
    document.getElementById("navbarText").innerHTML = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    globalCurrentDate.month = newDate.getMonth()+1;
    globalCurrentDate.year = newDate.getFullYear();
    displayCalendar(newDate);
}

function changeMonthPlus() {
    var newDate = new Date(document.getElementById("Date").innerHTML)
    newDate.setMonth(newDate.getMonth() + 1);
    document.getElementById("Date").innerHTML = newDate;
    document.getElementById("navbarText").innerHTML = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    globalCurrentDate.month = newDate.getMonth()+1;
    globalCurrentDate.year = newDate.getFullYear();
    displayCalendar(newDate);
}

// function speechRec(){
    
// }




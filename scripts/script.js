
const DaysEnums = { 0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday" }

function displayDate(cDate){
    document.getElementById("Date").innerHTML = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate(); //cDate.toString(); 
    document.getElementById("navbarText").innerHTML = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();
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

function setCurrent (date) {
    var dayOfWeek = date.getDay();
    
    if(dayOfWeek == 0){
        dayOfWeek = 6;
    }
    else {
        dayOfWeek -=1;
    }

    let pasts = document.getElementsByClassName("current");
    // console.log(pasts);
    if(pasts[0]){
        pasts[0].classList.remove("current");
    }

    let children = document.getElementsByClassName(DaysEnums[dayOfWeek]);
    for(var i = 0; i < children.length; i++){
        const innerHtml = children[i].innerHTML;
        //console.log(i + " " + innerHtml + " " + date.getDate());
        if(children[i].innerHTML == date.getDate()){
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
    var lastDate = new Date(year, month+1, 0).getDate();

    let children = document.getElementsByClassName("cell");
    // console.log(children)
    for(i = 0; i < children.length; i++){
        children[i].innerHTML = "";
    }

    let child = children[0];
    let count = 1;
    let ok = true;
    // console.log(child)
    // console.log(child.classList)

    while (ok) {
        // console.log(child);
        // console.log(firstWeekday)
        if (child.classList.contains(DaysEnums[firstWeekday])) {
            child.innerHTML = cellDate;
            cellDate+=1;
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
        child.innerHTML = cellDate;
        cellDate += 1;
        child = children[count];
        count += 1;
    }

    setCurrent(date);

    var grid = document.getElementById("mygrid2");

    grid.addEventListener("click", function(event){
        // console.log(event.target);
        if(event.target != null){
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
}

function changeMonthMinus(){
    var newDate = new Date(document.getElementById("Date").innerHTML)
    newDate.setMonth(newDate.getMonth() - 1);
    document.getElementById("Date").innerHTML = newDate;
    document.getElementById("navbarText").innerHTML = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();
    displayCalendar(newDate);
}

function changeMonthPlus(){
    var newDate = new Date(document.getElementById("Date").innerHTML)
    newDate.setMonth(newDate.getMonth() + 1);
    document.getElementById("Date").innerHTML = newDate;
    document.getElementById("navbarText").innerHTML = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();
    displayCalendar(newDate);
}




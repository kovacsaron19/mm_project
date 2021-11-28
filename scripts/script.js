
const DaysEnums = { 0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday" }

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
        firstDay = 7;
    }
    else {
        firstDay -= 1;
    }
    return firstDay;
}

function displayCalendar(date) {
    let cellDate = 1;
    var firstWeekday = calculateFirstDay(date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var lastDate = new Date(year, month+1, 0).getDate();

    let children = document.getElementsByClassName("cell");
    let child = children[0];
    let count = 1;
    let ok = true;

    while (ok) {
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

    // for (let i = 0; i < 6; i++) {
    //     let j = 0;
    //     if(i===0){
    //         j = firstWeekday;
    //     }
    //     for (j; j <= 7; j++) {
    //         console.log(grid)
    //         console.log(grid.rows[0].cells[0])
    //         var cell = grid.
    //         cell.innerHtml = "a";
    //     }
    // }
}

function changeMonthMinus(){
    var newDate = new Date(document.getElementById("Date").innerHTML)
    console.log(newDate);
    newDate.setMonth(newDate.getMonth() - 1);
    document.getElementById("Date").innerHTML = newDate;
    displayCalendar(newDate);
}




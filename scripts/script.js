function calculateFirstDay(){
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
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
}

function displayCalendar(date){
    var firstWeekday = calculateFirstDay();
    var grid = document.getElementById("mygrid2");
    var year = date.getFullYear();
    var month = date.getMonth();

    for (let i = 1; i < 6; i++) {
        let j = 1;
        if(i===1){
            j = j + firstWeekday;
        }
        for (j; j <= 7; j++) {
            console.log(grid)
            console.log(grid.rows[0].cells[0])
            var cell = grid.rows[i].cells[j].elements[0];
            var text = document.createTextNode(i*j);
            cell.appendChild(text);
        }
    }
}





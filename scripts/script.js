var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

function displayCurrentDate(){
    var sidebar = document.getElementById('sidebar');
    sidebar.innerHtml = date;
}


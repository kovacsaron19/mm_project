var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

sidebar = document.getElementById('sidebar');
sidebar.innerHtml = date;
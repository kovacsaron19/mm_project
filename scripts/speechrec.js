$(document).ready(function () {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    $("#listen").click(() => {
        recognition.start();
        $("#listen").html("I'm listening...");
        
    });

    recognition.onspeechend = () => {
        $("#listen").html("Press to listen");
        recognition.stop();
        console.log('idk')
    }

    recognition.onresult = (event) => {
        console.log(event.results)
        console.log(event.results[0][0].transcript);
        $("#eventdescription").value = event.results[0][0].transcript;
        document.getElementById("eventdescription").value = event.results[0][0].transcript;
    }  

    recognition.onerror = function(event) {
        console.log(event.error);
    };
});
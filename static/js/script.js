// function startRecording() {
//     document.querySelector('.recording-field').value = "Recording...";
// }

// function stopRecording() {
//     document.querySelector('.recording-field').value = "Recording stopped.";
// }
let recognition;
        
        function startRecording() {
            if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
                alert("Your browser does not support Speech Recognition. Try using Google Chrome.");
                return;
            }

            // Initialize Speech Recognition
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            // Log when recognition starts
            recognition.onstart = function () {
                console.log("Speech recognition started...");
            };

            // Capture results
            recognition.onresult = function (event) {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript + " ";
                }
                document.getElementById("output").value = transcript.trim();
            };

            // Handle errors
            recognition.onerror = function (event) {
                console.error("Speech recognition error:", event.error);
                alert("Error: " + event.error);
            };

            // Restart recognition if it stops unexpectedly
            recognition.onend = function () {
                console.log("Speech recognition ended.");
            };

            // Start recognition
            recognition.start();
        }

        function stopRecording() {
            if (recognition) {
                recognition.stop();
                console.log("Speech recognition stopped.");
            }
        }

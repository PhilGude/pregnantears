(function() {
    var context, 
        soundSource, 
        soundBuffer,
        url = 'breathe.mp3';

    // Step 1 - Initialise the Audio Context
    // There can be only one!
    function init() {
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
             alert("Webkit");
             //unlock();
        } else {
            alert('To play music here you will need to browse with a modern browser');
        }
    }

    // Step 2: Load our Sound using XHR
    function startSound() {
        // Note: this loads asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        // Our asynchronous callback
        request.onload = function() {
            var audioData = request.response;

            audioGraph(audioData);


        };

        request.send();
    }

    // Finally: tell the source when to start
    function playSound() {
        // play the source now
        alert(context.currentTime);
        unlock();
        soundSource.noteOn(context.currentTime);
    }

    function stopSound() {
        // stop the source now
         alert(context.currentTime);
        soundSource.noteOff(context.currentTime);
    }


    // This is the code we are interested in
    function audioGraph(audioData) {
        // create a sound source
        soundSource = context.createBufferSource();

        // The Audio Context handles creating source buffers from raw binary
        soundBuffer = context.createBuffer(audioData, true/* make mono */);
      
        // Add the buffered data to our object
        soundSource.buffer = soundBuffer;

        // Plug the cable from one thing to the other
        soundSource.connect(context.destination);

        // Finally
        playSound(soundSource);
    }


    window.onload = function() {
        init();
        // Events for the play/stop bottons
        document.querySelector('.play').addEventListener('click', startSound);
        document.querySelector('.stop').addEventListener('click', stopSound);
        window.addEventListener('touchstart', function() {

            // create empty buffer
            var buffer = myContext.createBuffer(1, 1, 22050);
            var source = myContext.createBufferSource();
            source.buffer = buffer;

            // connect to output (your speakers)
            source.connect(myContext.destination);

            // play the file
            source.noteOn(0);

            }, false);
    }   

    //http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
    var isUnlocked = false;
    function unlock() {
            
        if(isIOS || this.unlocked)
            return;

        // create empty buffer and play it
        var buffer = myContext.createBuffer(1, 1, 22050);
        var source = myContext.createBufferSource();
        source.buffer = buffer;
        source.connect(myContext.destination);
        source.noteOn(0);

        // by checking the play state after some time, we know if we're really unlocked
        setTimeout(function() {
            if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
                isUnlocked = true;
                alert('unlocked');
            }
        }, 0);

}


}());
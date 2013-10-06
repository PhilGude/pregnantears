function loadSound(url, ctx, onSuccess, onError) {
    // init request
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer'; // <= here secret sauce!

    // function called once data is loaded
    request.onload = function(){
        // request.response === encoded... so decode it now
        ctx.decodeAudioData(request.response, function(buffer) {
            onSuccess && onSuccess(buffer);
	}, function(){
            onError && onError();
        });
    }

    request.send();	// Start the request
}
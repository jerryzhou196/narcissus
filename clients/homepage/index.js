function createVideoStream(stream){
    video = document.createElement("video");
    video.id = "video";
    video.srcObject = stream;

    video.addEventListener("loadedmetadata", () =>{
        video.play();
        document.getElementById("novideo").style.display = "None";
        document.getElementById("video-container").append(video); 
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("load", () => {
    
    navigator.mediaDevices
    .getUserMedia({
        video: true,
    })
    .then((stream) => {
        createVideoStream(stream);
    })
    const call_button = document.getElementById("callbutton");

    call_button.addEventListener("click", () => {
        document.getElementById("video").style.display = "none";
        document.getElementById("callbutton").style.visibility = "Hidden";
        document.getElementById("tip").style.visibility = "Hidden";
        
        document.getElementById("loading").style.display = "initial";
        sleep(400).then(() =>{
            document.getElementById("loading").style.display = "None";
            location.href = 'call_page';
        })

 

    });

});








    


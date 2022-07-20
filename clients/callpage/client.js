const peer = new Peer();
const socket = io("http://localhost:3030/");
const room_id = window.location.pathname.split("/")[1];

count = 0; 

function createVideoStream(stream){
    
    video = document.createElement("video");
    video.id = `video ${count++}`;
    video.srcObject = stream;
    document.getElementById("video-container").append(video); 
    document.getElementById("novideo").style.display = "None";
    video.addEventListener("loadedmetadata", () =>{
        console.log("metadata loaded!");
        video.play();
    })
    console.log(video);
    sleep(1)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// no new connections. 
// once the peer connects to the server
// it notifies the server
peer.on('open', (id) => {  
    console.log(id);
    socket.emit("userjoined", room_id, id);
});


function toggleSelected(element){
    if (element.value == "selected"){
        element.value = "";
        element.style.backgroundColor = "#636669";
    } else {
        element.value = "selected";
        element.style.backgroundColor = "whitesmoke";
    }
}


window.addEventListener("load", () => {
    
    navigator.mediaDevices
    .getUserMedia({
        video: true,
    })
    .then((stream) => {
        document.getElementById("videocontrols").style.display = "Block";
        document.getElementById("novideo").style.display = "Block";
 
        //if our socket says a user connected, we create the peer connection to that userID
        //WARNING: this is emitted to everyone except the person who just joined
        socket.on("userconnected", (id) => {
            console.log("someone answered our link! calling them.")
            const answer = peer.call(id, stream);
            answer.on("stream", (client_stream) =>{
                console.log(client_stream);
                createVideoStream(client_stream);
            });
        });

        socket.on("fuck-off", ()=>{
            console.log("someone left");
        })

        peer.on("call", (call)=>{ //no new connections - just says that if there is a call, we answer it and give the job to createVideoStream
            call.answer(stream);
            console.log("getting called!");
            call.on("stream", (client_stream) => {
                console.log(client_stream);
                createVideoStream(client_stream);
            });
        });

    })


});








    


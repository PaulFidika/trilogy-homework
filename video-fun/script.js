localVideo = document.querySelector("#video1");
remoteVideo = document.querySelector("#video2");

async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });

    //Preview this stream on the <video> element
    localVideo.srcObject = stream;

    const pc1 = new RTCPeerConnection();
    const pc2 = new RTCPeerConnection();

    pc1.addEventListener("icecandidate", ({ candidate }) => pc2.addIceCandidate(candidate));
    pc2.addEventListener("icecandidate", ({ candidate }) => pc1.addIceCandidate(candidate));

    stream.getTracks().forEach(track => pc1.addTrack(track, stream));

    pc2.addEventListener('track', ({ streams: [stream] }) => {
        remoteVideo.srcObject = stream;
    });

    const offer = await pc1.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    });

    await pc1.setLocalDescription(offer);
    await pc2.setRemoteDescription(offer);

    const answer = await pc2.createAnswer();

    await pc2.setLocalDescription(offer);
    await pc1.setRemoteDescription(offer);
}

start();
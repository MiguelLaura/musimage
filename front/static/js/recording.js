class Recording {
    constructor() {
        if  (!'mediaDevices' in navigator || !'getUserMedia' in navigator.mediaDevices) {
            throw new Error('MediaDevices not available for this navigator')
        }

        this.constraints = {
            audio: true
        };
    }

    start() {
        navigator.mediaDevices.getUserMedia(this.constraints)
        .then((stream) => {
            this.stream = stream;
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.addEventListener('ondataavailable', (e) => {
                this.audioChunks.push(e.data);
            });

            this.mediaRecorder.start();
        })
        .catch((err) => {
            console.error(`The following error occurred: ${err}`);
        });
    }

    stop() {
        return new Promise(resolve => {
            //save audio type to pass to set the Blob type
            let mimeType = this.mediaRecorder.mimeType;

            //listen to the stop event in order to create & return a single Blob object
            this.mediaRecorder.addEventListener('stop', () => {
                console.log('data available after MediaRecorder.stop() called.');
                //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
                this.audioBlob = new Blob(this.audioChunks, { type: mimeType });
                this.audioChunks = [];
                const audioURL = window.URL.createObjectURL(this.audioBlob);
                audioRecorded.src = audioURL;
            });

            this.mediaRecorder.stop();
        })
    }
}

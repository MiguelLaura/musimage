let recorder;

recordingButton.addEventListener('click', () => {
    if (recordingButton.textContent == 'Start recording') {
        recorder = new Recording();
        recorder.start();
        recordingButton.textContent = 'Finish recording';
    } else {
        recorder.stop()
        recordingButton.textContent = 'Start recording';
    }
});

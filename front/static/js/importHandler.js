// Import audio file
audioFile.addEventListener('change', () => {
    const selectedFile = audioFile.files[0];
    audioName.textContent = selectedFile.name;
    audioLoad.disabled = false;
});

audioLoad.addEventListener('click', () => {
    const selectedFile = audioFile.files[0];
    const url = URL.createObjectURL(selectedFile);
    audioTrack.src = url;
    audioTrack.style.display = 'inline';
    audioTrack.title = selectedFile.name;
    audioLoad.disabled = true;
});

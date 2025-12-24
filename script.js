function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

item.addEventListener("click", () => {
  modalImg.src = photo.src;
  modalImg.alt = photo.alt;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
});

// ===== 音乐播放器 =====
const musicPlayer = document.getElementById('music-player');
const audioElement = document.getElementById('audio-element');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume-control');
const currentTrackEl = document.getElementById('current-track');

// 假设 /musics/ 下有这些歌曲（你可以按需修改）
const musicList = [
  { name: "回忆", file: "memory.mp3" },
  { name: "星夜", file: "starry-night.mp3" },
  { name: "微光", file: "glimmer.mp3" },
  { name: "风语", file: "whisper.mp3" }
];

let currentTrackIndex = 0;

function loadTrack(index) {
  const track = musicList[index];
  if (!track) return;
  audioElement.src = `/musics/${track.file}`;
  currentTrackEl.textContent = track.name;
  audioElement.load();
}

function togglePlay() {
  if (audioElement.paused) {
    audioElement.play().catch(e => console.warn("自动播放被阻止:", e));
    playPauseBtn.textContent = '⏸';
  } else {
    audioElement.pause();
    playPauseBtn.textContent = '▶';
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
  loadTrack(currentTrackIndex);
  audioElement.play().catch(e => console.warn("自动播放被阻止:", e));
  playPauseBtn.textContent = '⏸';
}

// 初始化
loadTrack(currentTrackIndex);
audioElement.volume = volumeControl.value;

// 事件绑定
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
volumeControl.addEventListener('input', () => {
  audioElement.volume = volumeControl.value;
});

// 自动切歌
audioElement.addEventListener('ended', nextTrack);

// 可选：页面可见时才播放（避免后台耗电）
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !audioElement.paused) {
    // 可选：暂停，或保持播放（这里保持播放）
  }
});
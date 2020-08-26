const playButton = document.getElementById('play-button');
playButton.addEventListener('click', play);
const fadeoutButton = document.getElementById('fadeout-button');
fadeoutButton.addEventListener('click', fadeout);

const context = new AudioContext();

let audio;
let source;
let gainNode;

function init() {
  fetch('./audio.mp3')
    .then((data) => data.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
      audio = decodedAudio; // audio 변수에 mp3 파일을 불러온다.
    });
}
init();

function play() {
  source = context.createBufferSource();

  source.buffer = audio; // 불러온 오디오를 버퍼에 넣는다.

  gainNode = context.createGain(); // gainNode를 생성한다.
  gainNode.gain.setValueAtTime(0.5, context.currentTime); // 초기 볼륨을 설정한다.

  source.connect(gainNode); // 오디오 소스를 gainNode에 연결
  gainNode.connect(context.destination); // gainNode를 최종 아웃풋에 연결
  source.start(context.currentTime); // 재생
}

function fadeout() {
  gainNode.gain.setValueAtTime(0.5, context.currentTime); // 초기 볼륨과 맞춰놓고 페이드아웃에 넘어간다.
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 2); // 2초 동안 페이드아웃이 된다.
  source.stop(context.currentTime + 2 + 0.1); // 페이드아웃이 끝나고 0.1초 후에 재생을 종료한다.
}

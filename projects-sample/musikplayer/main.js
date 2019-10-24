class Musikplayer {
    constructor() {
        this.filedata = [
            {
                src: 'files/barradeen-emotional.mp3',
                cover: 'https://images.unsplash.com/photo-1454721738233-1bda0441023a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
                name: 'Emotional',
                artist: 'Barradeen'
            },
            {
                src: 'files/barradeen-the-girl-i-havent-met.mp3',
                cover: 'https://images.unsplash.com/photo-1554182826-33748d38d8b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
                name: 'The girl I haven\'t met',
                artist: 'Barradeen'
            },
            {
                src: 'files/friendzoned-antidepresseur.mp3',
                cover: 'https://images.unsplash.com/photo-1544595965-cb6a3413f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
                name: 'Antidepresseur',
                artist: 'Barradeen'
            },
            {
                src: 'files/le-gang-i-gave-you-a-flower.mp3',
                cover: 'https://images.unsplash.com/photo-1567566181187-d8bb6870d70b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
                name: 'I gave you a flower',
                artist: 'Le GANG'
            },
            {
                src: 'files/open-space.mp3',
                cover: 'https://images.unsplash.com/photo-1506634064465-7dab4de896ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
                name: 'Open Space',
                artist: 'FSM Team feat. < e s c p >'
            }
        ];
        this.audio = new Audio();
        this.playState = false;
        this.currentSong = 2;
        this.nextButton = document.getElementById('next');
        this.prevButton = document.getElementById('previous');
        this.playPauseButton = document.getElementById('play-pause');
        this.songdata = document.getElementById('song-data');
        this.timeplayed = document.getElementById('time-played');
        this.timelength = document.getElementById('time-length');
        this.range = document.getElementById('range');
        this.playinterval = null;
    }
    init() {
        this.addListener();
        this.loadSong(this.currentSong);
    }
    loadSong(id) {
        this.audio.src = this.filedata[id].src;
        this.songdata.innerHTML = this.renderSongInfo(id);
        if(this.playState) this.audio.play();
        this.audio.onloadedmetadata = () => {
            new AudioVisualizer(this.audio).getBuffer();
            this.playing(true);
        }
    }
    renderSongInfo(id) {
        let markup = `<div class="text"><p><span class="title">${this.filedata[id].name}</span><span class="artist">${this.filedata[id].artist}</span></p></div><div class="vinyl"><img class="cover" src="${this.filedata[id].cover}" alt="${this.filedata[id].name} – ${this.filedata[id].artist}"></div>`;
        return markup;
    }
    addListener() {
        this.playPauseButton.addEventListener('click', this.playPause.bind(this));
        this.nextButton.addEventListener('click', () => {
            this.currentSong = (this.currentSong === this.filedata.length - 1) ? 0 : this.currentSong + 1;
            this.loadSong(this.currentSong);  
        })
        this.prevButton.addEventListener('click', () => {
            this.currentSong = (this.currentSong === 0) ? this.filedata.length - 1 : this.currentSong - 1;
          this.loadSong(this.currentSong);  
        })
    }
    playPause() {
        if (this.playState) {
            this.playState = false;
            this.playPauseButton.innerHTML = '<svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="#0AB4A9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 20L40 30L25 40V20Z" stroke="#0AB4A9" fill="#0AB4A9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            this.songdata.className = 'paused';
            this.audioFadeOut();
            this.playing(false);
        } else {
            this.playState = true;
            this.playPauseButton.innerHTML = '<svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="#0AB4A9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /> <path d="M25 37.5V22.5" stroke="#0AB4A9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /><path d="M35 37.5V22.5" stroke="#0AB4A9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
            this.songdata.className = 'playing';
            this.audioFadeIn();
            this.playing(true);
        }
    }
    playing(status) {
        let maxmin = Math.floor(this.audio.duration / 60),
            maxsec = Math.floor(this.audio.duration - maxmin * 60);
        this.timelength.innerHTML = leadingZero(maxmin) + ':' + leadingZero(maxsec);

        if (status) this.playinterval = setInterval(this.updatePlaying.bind(this), 100);
        else clearInterval(this.playinterval);
    }
    updatePlaying() {
        let min = Math.floor(this.audio.currentTime / 60),
            sec = parseInt(this.audio.currentTime - min * 60),
            controller = document.querySelector('#controller path');
        
        controller.parentElement.style.width = ((this.audio.currentTime / this.audio.duration) * 100) + '%';
        this.timeplayed.innerHTML = leadingZero(min) + ':' + leadingZero(sec);
    }
    audioFadeIn() {
        this.audio.play();
        let audio = this.audio;
        audio.playbackRate = 0;
        let fadeAudio = setInterval(function () {
            console.log(audio.playbackRate)
            if (audio.playbackRate >= 1) {
                audio.playbackRate = 1;
                clearInterval(fadeAudio);
            } else {
                audio.playbackRate = Math.round((audio.playbackRate + .1) * 100) / 100;
            }
        }, 100);
    }
    audioFadeOut() {
        let audio = this.audio;
        let fadeAudio = setInterval(function () {
            console.log(audio.playbackRate)
            if (audio.playbackRate <= 0.0) {
                audio.playbackRate = 0;
                clearInterval(fadeAudio);
                audio.pause();
            } else {
                audio.playbackRate = Math.round((audio.playbackRate - .1) * 100) / 100;
            }
        }, 100);
    }
}

class AudioVisualizer {
    constructor(audio) {
        this.audio = audio;
        this.ctx = new AudioContext();
        this.source = this.ctx.createBufferSource();
        this.analyzer = this.ctx.createAnalyser();
        this.analyzer.fftSize = 2048;
        this.req = new XMLHttpRequest();
        this.currentBuffer = null,
        this.svgPath = document.getElementById('waveform');
        this.controller = document.querySelector('#controller path');
    }
    getBuffer() {
        this.req.open('GET', this.audio.src, true);
        this.req.responseType = "arraybuffer";
        this.req.onreadystatechange = (e) => {
            if(this.req.readyState === 4 && this.req.status === 200)
            this.ctx.decodeAudioData(this.req.response, (buffer) => {
                this.currentBuffer = buffer;
                
                this.draw(buffer);
            })
        }
        this.req.send();
    }
    draw(buffer) {
        let lines = 180,
            channelData = buffer.getChannelData(0),
            total = channelData.length,
            block = Math.floor(total / lines),
            lineGap = (800 / lines),
            path = '';

        for(let i = 2; i <= lines; i++) {
            let audioBuffer = Math.floor(block * i),
                x = i * lineGap,
                y = Math.abs(channelData[audioBuffer]) * 60;
            path += `M${parseFloat(x)},2L${parseFloat(x)},${parseFloat(y + 4)}`;
        }

        this.svgPath.setAttribute('d', path);
        this.controller.setAttribute('d', path);
    }
}

window.onload = () => {
    let player = new Musikplayer();
    player.init();
}

function leadingZero(input) {
    return (input > 9) ? input : '0' + input;
}

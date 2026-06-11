import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Music {
    id: number;
    title: string;
    artist: string;
    cover: string;
    audioUrl: string;
    color: string;
    lyrics: Array<{original: string, translation: string}>;
    description: string;
    quote: string;
}

@Component({
    selector: 'app-music-player',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './music-player.html',
    styleUrls: ['./music-player.css']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
    songs: Music[] = [
        {
            id: 1,
            title: "Dracula",
            artist: "Tame Impala",
            cover: "assets/covers/dracula.jpg",
            audioUrl: "assets/musics/dracula.mp3",
            color: "#8B0000",
            lyrics: [
                { original: "I just wanna be right where you are", translation: "Eu só quero estar exatamente onde você está" },
                { original: "Oh, my love", translation: "Oh, meu amor" },
                { original: "In the end I hope it's you and me", translation: "No final, espero que seja você e eu" },
                { original: "In the darkness I would never leave", translation: "Na escuridão eu nunca iria embora" },
                { original: "We both saw this moment coming from afar, now here we are", translation: "Nós dois vimos esse momento chegando de longe, agora aqui estamos" },
                { original: "Run from the sunlight Dracula", translation: "Corra da luz do sol, Drácula" },
                { original: "Run from the sunlight Dracula", translation: "Corra da luz do sol, Drácula" },
                { original: "Run from the sunlight Dracula", translation: "Corra da luz do sol, Drácula" },
                { original: "Isn't the view spectacular", translation: "A vista não é espetacular" }
            ],
            description: "A primeira música que falamos sobre na nossa primeira conversa. Quantas vezes já não nos pegamos cantando em call ou em áudios? Dá pra dizer que é a nossa música.",
            quote: "Eu só quero estar exatamente onde você está. No final, espero que seja você e eu."
        },
        {
            id: 2,
            title: "Video Games",
            artist: "Lana Del Rey",
            cover: "assets/covers/videogames.jpg",
            audioUrl: "assets/musics/videogames.mp3",
            color: "#ac7e02",
            lyrics: [
                { original: "It's you, it's you, it's all for you, everything I do", translation: "É você, é você, é tudo para você, tudo o que eu faço" },
                { original: "I tell you all the time, Heaven is a place on Earth with you", translation: "Eu te digo o tempo todo, o céu é um lugar na terra com você" },
                { original: "Tell me all the things you wanna do", translation: "Me diga todas as coisas que você quer fazer" },
                { original: "I heard that you like the bad girls, honey, is that true?", translation: "Ouvi dizer que você gosta de garotas más, querido, isso é verdade?" },
                { original: "It's better than I ever even knew", translation: "É melhor do que eu jamais imaginei" },
                { original: "They say that the world was built for two", translation: "Dizem que o mundo foi construído para dois" },
                { original: "Only worth living if somebody is loving you", translation: "Só vale a pena viver se alguém está te amando" },
                { original: "And, baby, now you do", translation: "E, amor, agora você ama" }
            ],
            description: "Uma música que ganhou um significado completamente diferente desde que você apareceu. Antes eu gostava dela, mas agora ela sempre me leva até você. Toda vez que escuto, lembro das nossas conversas, dos nossos momentos e da forma como você faz tudo parecer mais leve. De alguma forma, você acabou ficando guardado nessa música. E acho que é por isso que ela nunca mais vai soar igual para mim. Porque, no fim das contas...",
            quote: "Heaven is a place on Earth with you"
        }
    ];

    currentSongIndex = 0;
    isPlaying = false;
    showLyrics = false;
    showDescription = false;
    isTransitioning = false;
    currentBackground = this.songs[0].color;
    
    private audio: HTMLAudioElement | null = null;

    constructor(public router: Router) {}

    ngOnInit() {
        this.initAudio();
        this.currentBackground = this.getCurrentSong().color;
    }

    ngOnDestroy() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
    }

    initAudio() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        
        this.audio = new Audio(this.songs[this.currentSongIndex].audioUrl);
        this.audio.load();
    }

    togglePlay() {
        if (!this.audio) return;
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
    }

    prevSong() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
        
        let newIndex = this.currentSongIndex - 1;
        if (newIndex < 0) {
            newIndex = this.songs.length - 1;
        }
        
        this.currentBackground = this.songs[newIndex].color;
        this.currentSongIndex = newIndex;
        this.showLyrics = false;
        this.showDescription = false;
        this.initAudio();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    nextSong() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
        
        let newIndex = this.currentSongIndex + 1;
        if (newIndex >= this.songs.length) {
            this.router.navigate(['/carta']);
            return;
        }
        
        this.currentBackground = this.songs[newIndex].color;
        this.currentSongIndex = newIndex;
        this.showLyrics = false;
        this.showDescription = false;
        this.initAudio();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    getCurrentSong() {
        return this.songs[this.currentSongIndex];
    }

    getCurrentDescription() {
        return this.getCurrentSong().description;
    }

    getCurrentQuote() {
        return this.getCurrentSong().quote;
    }

    getDynamicGradient(): string {
        const baseColor = this.currentBackground;
        return `radial-gradient(circle at 50% 50%, ${baseColor} 15%, #000000 100%)`;
    }

    goBack() {
        this.router.navigate(['/']);
    }

    toggleLyrics() {
        this.showLyrics = !this.showLyrics;
    }

    closeLyrics() {
        this.showLyrics = false;
    }

    toggleDescription() {
        this.showDescription = !this.showDescription;
    }

    closeDescription() {
        this.showDescription = false;
    }
}
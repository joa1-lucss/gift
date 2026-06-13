import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-love-letter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './love-letter.html',
    styleUrls: ['./love-letter.css']
})
export class LoveLetterComponent implements OnInit {
    currentPhotoIndex = 0;
    imagesPreloaded: boolean[] = [];
    
    photos = [
        { src: "assets/photos/momento1.jpg", alt: "Momento 1", preloaded: false },
        { src: "assets/photos/momento2.jpg", alt: "Momento 2", preloaded: false },
        { src: "assets/photos/momento3.jpg", alt: "Momento 3", preloaded: false },
        { src: "assets/photos/momento4.jpg", alt: "Momento 4", preloaded: false },
        { src: "assets/photos/momento5.jpg", alt: "Momento 5", preloaded: false },
        { src: "assets/photos/momento6.jpg", alt: "Momento 6", preloaded: false }
    ];

    constructor(private router: Router) {}
    
    ngOnInit() {
        // Pré-carrega todas as imagens ao iniciar a página
        this.preloadAllImages();
    }
    
    preloadAllImages() {
        this.photos.forEach((photo, index) => {
            const img = new Image();
            img.onload = () => {
                this.photos[index].preloaded = true;
                console.log(`Imagem ${index + 1} pré-carregada`);
            };
            img.src = photo.src;
        });
    }
    
    goBack() {
        this.router.navigate(['/player']);
    }

    nextPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    }

    prevPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
    }

    goToPhoto(index: number) {
        this.currentPhotoIndex = index;
    }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-love-letter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './love-letter.html',
    styleUrls: ['./love-letter.css']
})
export class LoveLetterComponent {
    currentPhotoIndex = 0;
    
    photos = [
        { src: "assets/photos/momento1.jpg", alt: "Momento 1" },
        { src: "assets/photos/momento2.jpg", alt: "Momento 2" },
        { src: "assets/photos/momento3.jpg", alt: "Momento 3" },
        { src: "assets/photos/momento4.jpg", alt: "Momento 4" },
        { src: "assets/photos/momento5.jpg", alt: "Momento 5" },
        { src: "assets/photos/momento6.jpg", alt: "Momento 6" }
    ];

    constructor(private router: Router) {}
    
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
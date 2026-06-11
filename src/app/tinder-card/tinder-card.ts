import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tinder-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tinder-card.html',
    styleUrls: ['./tinder-card.css']
})
export class TinderCardComponent {
    isAnimating = false;

    constructor(private router: Router) {}

    goToPlayer() {
        this.isAnimating = true;
        
        setTimeout(() => {
            this.router.navigate(['/player']);
        }, 600);
    }
}
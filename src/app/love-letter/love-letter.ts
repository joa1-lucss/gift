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
    constructor(private router: Router) {}
    
    goBack() {
        this.router.navigate(['/player']);
    }
}
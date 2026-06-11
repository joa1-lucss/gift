import { Routes } from '@angular/router';
import { TinderCardComponent } from './tinder-card/tinder-card';
import { MusicPlayerComponent } from './music-player/music-player';
import { LoveLetterComponent } from './love-letter/love-letter';

export const routes: Routes = [
    { path: '', component: TinderCardComponent },
    { path: 'player', component: MusicPlayerComponent },
    { path: 'carta', component: LoveLetterComponent },
    { path: '**', redirectTo: '' }
];
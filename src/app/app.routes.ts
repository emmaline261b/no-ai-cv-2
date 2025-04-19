import { Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {AboutComponent} from './pages/about/about.component';
import {CreditsComponent} from './pages/credits/credits.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'home',
        component: MainComponent
    },
    {
        path: 'o-programie',
        component: AboutComponent
    },
    {
        path: 'o-autorkach',
        component: CreditsComponent,
    }
];


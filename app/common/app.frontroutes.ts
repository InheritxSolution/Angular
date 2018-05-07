import { Routes, 
    RouterModule, 
    ROUTER_CONFIGURATION } from '@angular/router';

import { HomeComponent } from '../home/home.component';


//Front Route Configuration
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    },
    { path: '**', redirectTo: '' }
]
export const routing = RouterModule.forRoot(appRoutes);

import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/components/home/home').then(m => m.HomeComponent) 
  },
  { 
    path: 'persona', 
    loadComponent: () => import('./features/persona/components/persona/persona').then(m => m.PersonaComponent) 
  },
  { 
    path: 'automovil', 
    loadComponent: () => import('./features/automovil/components/automovil/automovil').then(m => m.AutomovilComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/main.module').then((mod) => mod.MainModule),
  },
];

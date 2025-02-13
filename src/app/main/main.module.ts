import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { CharacterComponent } from './character/character.component';
import { AuthGuard } from '../core/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'character',
        component: CharacterComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainComponent,
    UserComponent,
    CharacterComponent,
    RouterModule.forChild(routes),
  ],
})
export class MainModule {}

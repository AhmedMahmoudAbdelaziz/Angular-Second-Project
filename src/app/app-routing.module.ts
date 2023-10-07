import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {path: '', component: NavBarComponent},
  {path: 'users-list', component: UsersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

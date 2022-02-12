import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ----------------- COMPONENTS
import { HomeComponent } from './pages/crud/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'crud', component: HomeComponent},
  {path: 'edit-data/:id', component: HomeComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

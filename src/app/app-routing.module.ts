import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent} from './home/home.component'
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  { path:'',component:HomeComponent },
  { path:'user',component:UserComponent,canActivate: [AuthGuard] },
  { path:'admin',component:AdminComponent ,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

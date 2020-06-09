import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService} from './services/auth-guard.service'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
},
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inputs',
    loadChildren: () => import('./inputs/inputs.module').then( m => m.InputsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'photo-gallery',
    loadChildren: () => import('./photo-gallery/photo-gallery.module').then( m => m.PhotoGalleryPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'photo-detail',
    loadChildren: () => import('./photo-detail/photo-detail.module').then( m => m.PhotoDetailPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'ionic-speaking',
    loadChildren: () => import('./ionic-speaking/ionic-speaking.module').then( m => m.IonicSpeakingPageModule),
    canActivate: [AuthGuardService],
    
  },
  {
    path: 'points-of-interest',
    loadChildren: () => import('./points-of-interest/points-of-interest.module').then( m => m.PointsOfInterestPageModule),
    canActivate: [AuthGuardService],
    
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

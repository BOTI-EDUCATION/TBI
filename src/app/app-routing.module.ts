import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./views/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'compte',
    loadChildren: () => import('./views/compte/compte.module').then((m) => m.ComptePageModule),
  },
  {
    path: 'update',
    loadChildren: () => import('./views/update/update.module').then((m) => m.UpdatePageModule),
  },
  {
    path: 'password',
    loadChildren: () => import('./views/password/password.module').then((m) => m.PasswordPageModule),
  },
  {
    path: 'presence',
    loadChildren: () => import('./views/presence/presence.module').then((m) => m.PresencePageModule),
  },
  {
    path: 'retard',
    loadChildren: () => import('./views/retard/retard.module').then((m) => m.RetardPageModule),
  },
  {
    path: 'discipline',
    loadChildren: () => import('./views/discipline/discipline.module').then((m) => m.DisciplinePageModule),
  },
  {
    path: 'ressources',
    loadChildren: () => import('./views/ressources/ressources.module').then((m) => m.RessourcesPageModule),
  },
  {
    path: 'ressource',
    loadChildren: () => import('./views/ressource/ressource.module').then((m) => m.RessourcePageModule),
  },
  {
    path: 'courses/:id',
    loadChildren: () => import('./views/courses/courses.module').then((m) => m.CoursesPageModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./views/courses/courses.module').then((m) => m.CoursesPageModule),
  },
  {
    path: 'course-detail/:id',
    loadChildren: () =>
      import('./views/course-detail/course-detail/course-detail.module').then((m) => m.CourseDetailPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupergroupsComponent } from './supergroups/supergroups.component';
import { SupergroupShowComponent } from './supergroups/show/supergroup-show.component';
import { HeroesComponent }      from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/supergroups', pathMatch: 'full' },
  { path: 'supergroups',  component: SupergroupsComponent },
  { path: 'supergroup/:id',  component: SupergroupShowComponent },
  { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
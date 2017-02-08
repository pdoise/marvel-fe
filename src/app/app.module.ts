import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApolloModule } from 'apollo-angular';
import { provideClient }   from './apollo';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroShowComponent } from './heroes/show/hero-show.component';
import { SupergroupsComponent } from './supergroups/supergroups.component';
import { SupergroupShowComponent } from './supergroups/show/supergroup-show.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroShowComponent,
    SupergroupsComponent,
    SupergroupShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

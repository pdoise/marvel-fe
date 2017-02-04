import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApolloModule }    from 'angular2-apollo'
import { provideClient }   from './apollo';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { AppRoutingModule } from './app-routing.module';
import { SupergroupsComponent } from './supergroups/supergroups.component';
import { SupergroupShowComponent } from './supergroups/show/supergroup-show.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    SupergroupsComponent,
    SupergroupShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ApolloModule.withClient(provideClient)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'

import { Hero } from '../heroes/hero';
import { heroes } from '../heroes/hero.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  heroes :any;
  loading  :boolean = true
  private sub: Subscription

  constructor(private apollo: Angular2Apollo) { }

  ngOnInit() {
    this.sub = this.apollo.watchQuery(
      {
        query: heroes,
      }
    ).subscribe(({data, loading}) => {
      this.heroes = data["superheros"].slice(0, 4)
      this.loading = loading
    })
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

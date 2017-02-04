import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'

import { hero } from '../hero.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-show',
  templateUrl: './hero-show.component.html',
  styleUrls: ['./hero-show.component.css']
})

export class HeroShowComponent {
  hero :any;
  loading  :boolean = true
  private sub :Subscription
  private id :number

  constructor(
    private route: ActivatedRoute,
    private apollo: Angular2Apollo,
    private location: Location
  ) {}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.apollo.watchQuery(
      {
        query: hero,
        variables: {
          id: this.id
        }
      }
    ).subscribe(({data, loading}) => {
      this.hero = data["superhero"]
      this.loading = loading
    })
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'

import { hero, updateHero } from '../hero.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-show',
  templateUrl: './hero-show.component.html',
  styleUrls: ['./hero-show.component.css']
})

export class HeroShowComponent {
  hero :any = {};
  private loading  :boolean = true
  private sub :Subscription
  private id :number
  private heroForm :FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apollo: Angular2Apollo,
    private location: Location,
    private __fb: FormBuilder) {
      this.heroForm = __fb.group({
        'name' : [null, Validators.required],
        'alias': [null, Validators.required]
      }) 
  }

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
      this.hero = data["hero"]
      this.loading = loading
    })
  }

  updateHero(name: string, alias: string) {
    console.log(this.hero)
    this.apollo.mutate({
      mutation: updateHero,
      variables: {
        id: this.hero.id,
        name: name,
        alias: alias,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.ngOnInit() //<!-- lazy hack
    }),
      error => {
      console.log('there was an error sending the query', error);
    }; 
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
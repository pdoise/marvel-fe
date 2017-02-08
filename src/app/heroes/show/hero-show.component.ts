import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Subscription }      from 'rxjs/Subscription'
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import { hero, updateHero } from '../hero.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-show',
  templateUrl: './hero-show.component.html',
  styleUrls: ['./hero-show.component.css']
})

export class HeroShowComponent implements OnInit, OnDestroy {
  public hero :any = {};
  public loading  :boolean = true
  private heroSub: Subscription;
  private routeSub: Subscription;
  private heroObs: ApolloQueryObservable<any>;
  private id :number
  private heroForm :FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private location: Location,
    private __fb: FormBuilder) {
      this.heroForm = __fb.group({
        'name' : [null, Validators.required],
        'alias': [null, Validators.required]
      }) 
  }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    // Fetch
    this.heroObs = this.apollo.watchQuery({
      query: hero,
      variables: {
        id: this.id
      },
      forceFetch: true,
    });

    // Subscribe
    this.heroSub = this.heroObs.subscribe(({data, loading}) => {
      this.hero = data["hero"];
      this.loading = loading;
    });
  }

  updateHero(name: string, alias: string) {
    this.apollo.mutate({
      mutation: updateHero,
      variables: {
        id: this.hero.id,
        name: name,
        alias: alias,
      },
    }).subscribe(({ data }) => {
      console.log(data)
      this.refetch()
    }),
      error => {
      console.log('there was an error sending the query', error);
    }; 
  }

  public refetch(): void {
    this.heroObs.refetch();
  }

  public ngOnDestroy(): void {
    this.heroSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
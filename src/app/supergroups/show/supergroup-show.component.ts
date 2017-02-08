import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription }      from 'rxjs/Subscription'
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import { supergroup, createHero } from '../supergroups.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-supergroup-show',
  templateUrl: './supergroup-show.component.html',
  styleUrls: ['./supergroup-show.component.css']
})

export class SupergroupShowComponent {
  supergroup :any;
  hero :any = {};
  loading  :boolean = true
  private id :number
  private heroForm : FormGroup;
  private superGroupSub: Subscription;
  private superGroupObs: ApolloQueryObservable<any>;
  private routeSub :Subscription

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
    this.superGroupObs = this.apollo.watchQuery(
      {
        query: supergroup,
        variables: {
          id: this.id
        },
        forceFetch: true,
      }
    );

    // Subscribe
    this.superGroupSub = this.superGroupObs.subscribe(({data, loading}) => {
      this.supergroup = data["supergroup"]
      this.loading = loading
    });
  }

  createHero() {
    this.apollo.mutate({
      mutation: createHero,
      variables: {
        name: this.hero.name,
        alias: this.hero.alias,
        supergroup_id: this.id,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.refetch()
    }),
      error => {
      console.log('there was an error sending the query', error);
    }; 
  }

  public refetch(): void {
    this.superGroupObs.refetch();
  }

  public ngOnDestroy(): void {
    this.superGroupSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
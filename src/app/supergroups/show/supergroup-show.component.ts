import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'

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
  private sub :Subscription
  private id :number
  private heroForm : FormGroup;

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
        query: supergroup,
        variables: {
          id: this.id
        }
      }
    ).subscribe(({data, loading}) => {
      this.supergroup = data["supergroup"]
      this.loading = loading
    })
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
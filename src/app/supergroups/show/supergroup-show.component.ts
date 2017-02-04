import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'

import { supergroup } from '../supergroups.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-supergroup-show',
  templateUrl: './supergroup-show.component.html',
  styleUrls: ['./supergroup-show.component.css']
})

export class SupergroupShowComponent {
  supergroup :any;
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

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
import { Component, OnInit } from '@angular/core';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'

import { supergroups } from './supergroups.model';

@Component({
  selector: 'app-supergroups',
  templateUrl: './supergroups.component.html',
  styleUrls: ['./supergroups.component.css']
})
export class SupergroupsComponent implements OnInit {

  supergroups :any;
  loading  :boolean = true
  private sub: Subscription

  constructor(private apollo: Angular2Apollo) { }

  ngOnInit() {
    this.sub = this.apollo.watchQuery(
      {
        query: supergroups,
      }
    ).subscribe(({data, loading}) => {
      this.supergroups = data["supergroups"]
      this.loading = loading
    })
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

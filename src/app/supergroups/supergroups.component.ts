import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }      from 'rxjs/Subscription'
import { Apollo, ApolloQueryObservable }    from 'apollo-angular';

import { supergroups } from './supergroups.model';

@Component({
  selector: 'app-supergroups',
  templateUrl: './supergroups.component.html',
  styleUrls: ['./supergroups.component.css']
})
export class SupergroupsComponent implements OnInit, OnDestroy {

  public supergroups :any;
  public loading  :boolean = true
  private superGroupSub: Subscription;
  private superGroupObs: ApolloQueryObservable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    
    // Fetch
    this.superGroupObs = this.apollo.watchQuery({
      query: supergroups,
      forceFetch: true,
    });

    // Subscribe
    this.superGroupSub = this.superGroupObs.subscribe(({data, loading}) => {
      this.supergroups = data["supergroups"]
      this.loading = loading
    });
  }

  public ngOnDestroy(): void {
    this.superGroupSub.unsubscribe();
  }

}

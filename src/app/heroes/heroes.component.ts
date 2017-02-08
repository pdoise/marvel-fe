import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }      from 'rxjs/Subscription'
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Router } from '@angular/router';

import { heroes, deleteHero } from './hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit, OnDestroy {
  public heroes: any;
  public loading: boolean = true;
  private itemsPerPage: number = 10;
  private heroSub: Subscription;
  private heroObs: ApolloQueryObservable<any>;

  constructor(
    private apollo: Apollo,
  	private router: Router) { }

  public ngOnInit(): void {
    // Fetch
    this.heroObs = this.apollo.watchQuery({
      query: heroes,
      variables: {
        limit: this.itemsPerPage
      },
      forceFetch: true,
    });

    // Subscribe
    this.heroSub = this.heroObs.subscribe(({data, loading}) => {
      this.heroes = data["heros"];
      this.loading = loading;
    });
  }

  delete(hero: any) {
    this.apollo.mutate({
      mutation: deleteHero,
      variables: {
        id: hero.id,
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.refetch();
    }),
      error => {
      console.log('there was an error sending the query', error);
    }; 
  }

  gotoDetail(hero: any): void {
    this.router.navigate(['/hero', hero.id]);
  }

  public refetch(): void {
    this.heroObs.refetch();
  }

  public ngOnDestroy(): void {
    this.heroSub.unsubscribe();
  }
}

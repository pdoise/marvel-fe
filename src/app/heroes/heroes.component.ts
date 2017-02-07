import { Component, OnInit } from '@angular/core';
import { Subscription }      from 'rxjs/Subscription'
import { Angular2Apollo }    from 'angular2-apollo'
import { heroes, deleteHero } from './hero.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes :any;
  loading  :boolean = true
  private sub: Subscription

  constructor(
    private apollo: Angular2Apollo,
  	private router: Router) { }

  ngOnInit() {
    this.sub = this.apollo.watchQuery(
      {
        query: heroes,
      },
    ).subscribe(({data, loading}) => {
      this.heroes = data["heros"]
      this.loading = loading
    })
  }

  gotoDetail(hero: any): void {
    this.router.navigate(['/hero', hero.id]);
  }

  delete(hero: any) {
    this.apollo.mutate({
      mutation: deleteHero,
      variables: {
        id: hero.id,
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
}

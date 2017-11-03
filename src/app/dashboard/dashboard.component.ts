import { Subscription } from 'rxjs/Subscription';
import { HeroService } from './../services/hero.service';
import { Hero } from './../models/hero.class';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  heroes: Hero[] = [];
  private heroeSubscription$: Subscription;

  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
    this._heroService.getHeroes().then(
      (heroes: Hero[]) => this.heroes = heroes.slice(1, 5)
    );
  }

  ngOnDestroy(): void { }

}

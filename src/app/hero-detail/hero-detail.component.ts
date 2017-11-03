import { Subscription } from 'rxjs/Subscription';
import { Hero } from './../models/hero.class';
import { HeroService } from './../services/hero.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  @Input() hero: Hero;
  private heroSubscription$: Subscription;

  constructor(
    private _heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this._heroService.getHero(+params.get('id')))
      .subscribe((hero: Hero) => this.hero = hero);
  }

  save(): void {
    this._heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void { }

}

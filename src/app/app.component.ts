import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from './models/state';
import { User } from './models/user';
import { signOut } from '../app/actions/user';

interface NavLink {
  name: string;
  endpoint: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'polling-app';
  links: NavLink[] = [
    {
      name: 'Home',
      endpoint: '/',
    },
    {
      name: 'Add Question',
      endpoint: '/add',
    },
    {
      name: 'Leaderboard',
      endpoint: '/leaderboard',
    },
    {
      name: 'Questions',
      endpoint: '/questions',
    },
  ];
  @ViewChild(MatDrawer) drawer: MatDrawer;
  isSmallScreen$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {
    this.isSmallScreen$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));
  }

  ngOnInit() {
    this.user$ = this.store.select('user');
  }

  route(endpoint: string): void {
    this.router.navigateByUrl(endpoint.slice(1));
  }

  toggleSidenav() {
    this.drawer.toggle();
  }

  onSignIn() {
    this.router.navigateByUrl('login');
  }

  onSignOut() {
    this.store.dispatch(signOut());
  }
}

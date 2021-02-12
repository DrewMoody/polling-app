import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface NavLink {
  name: string;
  endpoint: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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

  constructor(private router: Router, breakpointObserver: BreakpointObserver) {
    this.isSmallScreen$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map(({ matches }) => matches));
  }

  route(endpoint: string): void {
    this.router.navigateByUrl(endpoint.slice(1));
  }

  toggleSidenav() {
    this.drawer.toggle();
  }
}

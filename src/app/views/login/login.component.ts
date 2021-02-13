import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/state';
import { User } from 'src/app/models/user';
import { USERS } from 'src/app/constants/data';
import { signIn } from '../../actions/user';

// TODO: Login needs to REDIRECT to the route post sign in -- convert to dialog??
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  users: User[] = Object.values(USERS);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {}

  onUserClick(user: User) {
    this.store.dispatch(signIn({ user }));
    this.router.navigateByUrl('');
  }
}

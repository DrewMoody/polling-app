import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/models/state';
import { User } from 'src/app/models/user';

interface LeaderboardEntry {
  name: string;
  avatarURL: string;
  questions: number;
  answers: number;
  total: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  columns: string[] = ['name', 'questions', 'answers', 'total'];
  dataSource: MatTableDataSource<LeaderboardEntry> = new MatTableDataSource([]);
  usersSub: Subscription;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private store: Store<AppState>) {
    this.usersSub = this.store
      .select('users')
      .pipe(map(this.convertToLeaderboardEntries))
      .subscribe((users) => {
        this.dataSource.data = users;
      });
  }

  convertToLeaderboardEntries(users: Record<string, User>): LeaderboardEntry[] {
    return Object.values(users).map((user) => {
      const { name, avatarURL } = user;
      const questions = Object.values(user.questions).length;
      const answers = Object.values(user.answers).length;
      return {
        name,
        avatarURL,
        questions,
        answers,
        total: questions + answers,
      };
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}

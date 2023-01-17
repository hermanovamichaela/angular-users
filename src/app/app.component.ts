import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data_json.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public users: any[] = [];
  public visibleInputs: boolean = false;
  public createdUser = false;
  public editExistingUser: boolean = false;

  public newOneUser = {
    userId: null,
    id: null,
    title: '',
    completed: '',
  };

  resultData$: Observable<any>;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {
    this.resultData$ = dataService.resolveData();
    this.resultData$.subscribe((data) => {
      this.users = data;
      this.getData();
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: any) => {});
  }

  public getData() {
    // Změna userID na 'admin', 'tester' a 'neznamy uzivatel'
    for (let l = 0; l < this.users.length; l++) {
      if (this.users[l].userId === 1) {
        this.users[l].userId = 'admin';
      } else if (this.users[l].userId === 2) {
        this.users[l].userId = 'tester';
      } else if (this.users[l].userId !== 1 && this.users[l].userId !== 2) {
        this.users[l].userId = 'neznamy uzivatel';
      }
    }
  }

  public deleteUser(id) {
    // Vymazání daného usera
    for (let l = 0; l < this.users.length; l++) {
      if (this.users.find((user) => user.id === id)) {
        this.users[l].userId = '';
        this.users[l].id = null;
        this.users[l].title = '';
        this.users[l].completed = '';
      }
    }
  }

  public editUser(id) {
    // Změna parametrů daného usera
    this.editExistingUser = true;
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].userId === 
    }
  }

  public newUser() {
    // Vytvoření nového usera
    this.visibleInputs = true;
    this.newOneUser.userId = null;
    this.newOneUser.id = null;
    this.newOneUser.title = '';
    this.newOneUser.completed = '';
  }

  public deleteAll() {
    // Vymazání všech dat
    this.users = [];
    this.visibleInputs = false;
  }

  public saveUser() {
    // Uložení nového usera
    this.createdUser = true;
    this.users.push(this.newOneUser);
    this.getData();
    this.visibleInputs = false;
    this.newOneUser.userId = null;
    this.newOneUser.id = null;
    this.newOneUser.title = '';
    this.newOneUser.completed = '';
  }
}

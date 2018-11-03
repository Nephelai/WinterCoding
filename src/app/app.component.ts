import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonService } from './common.service';

import {Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private errorMessage: string;
  public edited = false;
  public todaydate: Date = new Date();
  constructor(private newService: CommonService ) {   }
  Repdata;
  valbutton = 'Save';

  ngOnInit() {
    let date_val;
    let today_date = '';
    today_date += this.todaydate.getFullYear();
    today_date += '-';
    if (this.todaydate.getMonth() < 9) { today_date += '0'; }
    today_date += this.todaydate.getMonth() + 1;
    today_date += '-';
    if (this.todaydate.getDate() < 10) { today_date += '0'; }
    today_date += this.todaydate.getDate();

    this.newService.GetTodo().subscribe(data => { this.Repdata = data;
      for (let i = 0; i < this.Repdata.length; i++) {
        date_val = this.Repdata[i].retiredate.substr(0, 10);
        if (date_val < today_date) {
          // console.log(this.Repdata[i].done);
          if (!this.Repdata[i].done) { alert('Please Check this Todo : ' + this.Repdata[i].title); }
        } else {
          // console.log('Not Yet!!');
        }
      }
    });
  }

  cancel = function () {
    this.importance = null;
    this.title = null;
    this.content = null;
    this.retiredate = this.todaydate;
    this.valbutton = 'Save';
    this.edited = false;
  };

  done = function(idx) {
    if (idx.done) {
      this.newService.revertTodo(idx, false)
        .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error );
    } else {
      this.newService.revertTodo(idx, true)
        .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error );
    }
  };

  onSave = function(todo, isValid: boolean) {
    todo.mode = this.valbutton;
    console.log(todo.retiredate);
    this.newService.saveTodo(todo)
      .subscribe(data =>  {
          alert(data.data);
          this.ngOnInit();
        }
        , error => this.errorMessage = error );

    this.importance = null;
    this.title = null;
    this.content = null;
    this.retiredate = this.todaydate;
    this.edited = false;
    this.valbutton = 'Save';
  };

  edit = function(idx) {
    this.importance = idx.importance;
    this.id = idx._id;
    this.title = idx.title;
    this.content = idx.content;
    this.retiredate = idx.retiredate.substr(0, 10);
    this.valbutton = 'Update';
    this.edited = true;
  };

  delete = function(id) {
    this.newService.deleteTodo(id)
      .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error );
  };

}

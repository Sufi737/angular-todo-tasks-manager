import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NewTaskDTO } from './NewTaskDTO.dto';
import { Task } from './Task';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  newTaskDto = new NewTaskDTO(); // in the constructor default values are set so no need to provide initial values here
  
  ngOnInit(): void {
    this.newTaskDto.date = new Date(this.route.snapshot.params['date']);
  }

  tasks: Task[] = [
    new Task("Vist Ann"),
    new Task("Call dad"),
    new Task("Go to gym"),
    new Task("Wash the dishes"),
    new Task("Shop for the party")
  ];

  addTask(taskNgForm: NgForm) {

    if (taskNgForm.touched == false) {
      return;
    }

    if (taskNgForm.valid == false) {
      return;
    }

    this.tasks.push(new Task(this.newTaskDto.title));
    taskNgForm.reset({date: this.newTaskDto.date});
  }

  removeTask(existingTask: Task) {
    var confirmed = confirm("Are you sure?");
    if (confirmed) {
      this.tasks = this.tasks.filter(task => task != existingTask);
    }
  }
}



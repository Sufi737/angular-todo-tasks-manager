import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NewTaskDTO } from './NewTaskDTO.dto';
import { Task } from './Task';
import { TaskService } from './task.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  newTaskDto = new NewTaskDTO(); // in the constructor default values are set so no need to provide initial values here
  tasks  = this.taskService.getAllTasks();
  
  ngOnInit(): void {
    this.newTaskDto.date = new Date(this.route.snapshot.params['date']);
  }

  

  addTask(taskNgForm: NgForm) {

    if (taskNgForm.touched == false) {
      return;
    }

    if (taskNgForm.valid == false) {
      return;
    }

    this.taskService.addTask(this.newTaskDto);
    taskNgForm.reset({date: this.newTaskDto.date});
  }

  removeTask(existingTask: Task) {
    var confirmed = confirm("Are you sure?");
    if (confirmed) {
      this.taskService.removeTask(existingTask);
    }
  }
}



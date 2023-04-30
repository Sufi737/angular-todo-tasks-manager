import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { NewTaskDTO } from './NewTaskDTO.dto';
import { Task } from './Task';
import { HttpClient } from '@angular/common/http';

const resourceURL = 'http://localhost:3001/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: BehaviorSubject<Task[]> = new BehaviorSubject(<Task[]>[]);

  constructor(private httpClient: HttpClient) { }

  public static mapTasks(tasks: {title: string, isDone: boolean}[]) {
    return tasks.map(task => new Task(task.title, task.isDone));
  }

  getAllTasks(): Observable<Task[]> {
    this.httpClient.get<Task[]>(resourceURL)
      .pipe(map(TaskService.mapTasks))
      .subscribe(task => this.tasks.next(task));

    return this.tasks;
  }

  addTask(task: NewTaskDTO) {
    var updatedTasks = this.tasks.value.concat(new Task(task.title, false));
    this.httpClient.post(resourceURL, task).subscribe(() => this.tasks.next(updatedTasks));
  }

  removeTask(existingTask: Task) {
    //this operation is tricky, the component may refer to the old array in memory where there is no filter applied
    var updatedTasks = this.tasks.value.filter(task => task != existingTask);
    this.httpClient.delete(`${resourceURL}/${existingTask.title}`).subscribe(() => this.tasks.next(updatedTasks));
  }
  
}

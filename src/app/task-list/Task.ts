export class Task {

  title: string;
  isDone: boolean = false;

  constructor(public taskTitle: string, public done: boolean) {
    this.title = taskTitle;
    this.isDone = done;
  }

  toggleDone() {
    this.isDone = !this.isDone;
  }
}

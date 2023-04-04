export class Task {

  title: string;
  isDone = false;

  constructor(public taskTitle: string) {
    this.title = taskTitle;
  }

  toggleDone() {
    this.isDone = !this.isDone;
  }
}

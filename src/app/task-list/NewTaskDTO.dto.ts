export class NewTaskDTO {
  constructor(public title: string = "", public date: Date = new Date()) {
  }
}

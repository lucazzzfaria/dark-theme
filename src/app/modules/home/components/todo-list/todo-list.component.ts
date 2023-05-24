import { first, last } from 'rxjs';
import { Component, DoCheck } from '@angular/core';
//Inteface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") ||'[]')

  ngDoCheck() {
    this.SetLocalStorage();
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm(
        'Esta tarefa esta vazia, deseja deletar ela?'
      );
      if (confirm) {
        this.DeleteItemClassList(index);
      }
    }
  }
  public DeleteItemClassList(event: number) {
    this.taskList.splice(event, 1);
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }
  public DeleteAllTaskList() {
    const confirm = window.confirm('Voce deseja realmente fazer isso?');
    if (confirm) {
      this.taskList = [];
    }
  }

  public SetLocalStorage(){
    if(this.taskList){
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked));
        localStorage.setItem("list", JSON.stringify(this.taskList))
      ;

  }
}
}

import angular from "angular";
import {TodoListComponent} from "./todoList.component";

export default angular.module('app.todoList', [])
    .component('todoList', new TodoListComponent())
    .name;

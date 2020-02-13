import angular from "angular";
import todoCreator from './todoCreator/todoCreator.module';
import todoList from './todo-list/todoList.module';

angular.module('app', [
    todoCreator,
    todoList
]);

angular.bootstrap(document.body, ['app']);

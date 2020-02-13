import {TodoListController} from "./todoList.controller";

export class TodoListComponent implements ng.IComponentOptions {
    template = require('./todoList.html');
    controller = TodoListController;
    bindings = {};

    constructor() {
        console.log("fuck");
    }
}

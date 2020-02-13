import {RootStore} from "../stores/RootStore";

export class TodoCreatorController implements ng.IController {

    private todoText: string;

    static $inject: string[] = ['$rootScope'];

    constructor(private $rootscope: ng.IRootScopeService) {
    }

    $onInit(): void {
        console.log("hello from TodoCreatorController");
    }

    addTodo(): void {
        RootStore.todos.next(this.todoText);
    }
}

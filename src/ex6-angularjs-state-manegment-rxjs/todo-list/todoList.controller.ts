import {RootStore} from "../stores/RootStore";
import {filter} from "rxjs/operators";

export class TodoListController implements ng.IController {

    private readonly todos: string[];

    static $inject: string[] = ['$rootScope'];

    constructor(private $rootscope: ng.IRootScopeService) {
        this.todos = [];
        console.log("hello from TodoListController");
    }

    $postLink(): void {
        RootStore.todos.pipe(filter(t => !!t))
            .subscribe((todo) => {
                this.todos.push(todo);
            });
    }
}

export class TodoListController implements ng.IController {

    private readonly todos: string[];

    static $inject: string[] = ['$rootScope'];

    constructor(private $rootscope: ng.IRootScopeService) {
        this.todos = [];
        console.log("hello from TodoListController");
    }

    $postLink(): void {
        this.$rootscope.$on('new_todo', (event, text: string) => {
            this.todos.push(text);
        });
    }
}

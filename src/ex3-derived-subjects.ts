import {Observable, Subject} from "rxjs";
import faker from "faker";
import {dontCloseMe} from "./helpers/dont-close";
import {multiPartition, toSubject} from "./helpers/utils";

const TASK_STATUSES = ["DONE", "OPEN", "PLANNED"];

type Task = { id: number, status: string };

const tasks: Observable<Task> = new Observable<Task>((subscriber) => {
    const ITEMS = 50;

    for (let i = 0; i < ITEMS; i++) {
        setTimeout(() => {
            subscriber.next({
                id: faker.random.number(),
                status: TASK_STATUSES[faker.random.number({min: 0, max: 2})]
            });

            if (ITEMS === i + 1) {
                subscriber.complete();
                console.log("complete!")
            }

        }, i * 200);
    }
});


class TasksStore {
    all: Subject<Task>;
    done: Subject<Task>;
    open: Subject<Task>;
    planned: Subject<Task>;

    constructor(tasks: Observable<Task>) {
        this.all = toSubject<Task>(tasks);

        const [done, open, planned] = multiPartition<Task, string>(this.all, t => t?.status, TASK_STATUSES);

        this.done = toSubject(done);
        this.open = toSubject(open);
        this.planned = toSubject(planned);
    }
}



const store = new TasksStore(tasks);

store.all.subscribe((task: Task) => console.log("all - ", "id:", task?.id, "status:", task?.status));
store.done.subscribe((task: Task) => console.log("done - ", "id:", task?.id, "status:", task?.status));
store.open.subscribe((task: Task) => console.log("open - ", "id:", task?.id, "status:", task?.status));
store.planned.subscribe((task: Task) => console.log("planned - ", "id:", task?.id, "status:", task?.status));


dontCloseMe();





















//
// class TaskStore {
//     @observable
//     list: TaskModel[];
//
//     constructor() {
//         this.list = fromStream(SDK.Tasks.all.pipe(map(t => new TaskModel(t))))
//     }
//
//     SDK.tasks.onAllUpdate = (task) => {}
//
// }
//
// class TaskModel {
//     //...
// }
//
// const component = () => {
//     return useObserver(() => {
//         const list = TaskStore.list;
//
//         list.forEach(t =>
//             doSomthing(t)
//         );
//     })
// };

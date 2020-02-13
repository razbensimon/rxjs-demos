import {BehaviorSubject, Observable, Subject} from "rxjs";
import faker from "faker";
import {scan} from "rxjs/operators";
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

    doneState: BehaviorSubject<Task[]>;

    constructor(tasks: Observable<Task>) {
        this.all = toSubject<Task>(tasks);

        const [done, open, planned] = multiPartition<Task, string>(this.all, t => t?.status, TASK_STATUSES);

        this.done = toSubject(done);
        this.open = toSubject(open);
        this.planned = toSubject(planned);

        this.doneState = new BehaviorSubject([]);
        this.done.pipe(
            scan((currentState: Task[], doneTask) => {
                currentState.push(doneTask);
                return currentState;
            }, [])
        ).subscribe(this.doneState);
    }
}


const store = new TasksStore(tasks);


store.done.subscribe((task: Task) => console.log("done - ", "id:", task?.id, "status:", task?.status));
store.doneState.subscribe((tasks: Task[]) => console.log("done count:", tasks.length));


setTimeout(() => {
    console.log(store.doneState.getValue())
}, 4000);











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

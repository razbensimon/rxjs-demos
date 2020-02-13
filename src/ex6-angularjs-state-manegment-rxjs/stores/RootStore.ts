import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class RootStore {
    public static todos = new BehaviorSubject<string>(null);
}

import {ObservableInput} from "rxjs/src/internal/types";
import {Observable, Subject} from "rxjs";
import {filter} from "rxjs/operators";
import {subscribeTo} from "rxjs/internal-compatibility";

export function multiPartition<T, S>(source: ObservableInput<T>,
                              selector: (item: T, index: number) => S,
                              values: S[],
                              thisArg?: any): Observable<T>[] {
    return [
        ...values.map(
            value =>
                filter((val: T, i) => selector(val, i) === value, thisArg)(new Observable<T>(subscribeTo(source)))
        )
    ];
}

export function toSubject<T>(observable: Observable<T>): Subject<T> {
    const subject = new Subject<T>();
    observable.subscribe(subject);
    return subject;
}

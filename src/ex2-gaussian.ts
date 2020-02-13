import {interval} from "rxjs";
import {map, take} from "rxjs/operators";
import {dontCloseMe} from "./helpers/dont-close";

export const TICK = 100;
export const LENGTH = 25;


export function gaussian(i: number) {
    const variance = 0.6;
    const shift = 2;
    const x = shift * 2 * i / (LENGTH - 1) - shift;
    return (
        Math.exp(-Math.pow(x, 2) / (2 * variance)) /
        Math.sqrt(2 * Math.PI * variance)
    );
}


interval(TICK)
    .pipe(
        map(gaussian),
        map(num => "•".repeat(Math.floor(num * 65))),
        take(LENGTH)
    ).subscribe(count => console.log(count));

dontCloseMe();

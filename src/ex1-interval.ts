import {interval} from "rxjs";
import {filter, scan, take, throttleTime} from "rxjs/operators";


const stream = interval(100)
    .pipe(
        throttleTime(500),
        filter(num => num % 2 === 0),
        scan((count, num) => count + num, 0),
        take(5)
    );



// observer 1,2,3
stream.subscribe(count => console.log("Observer 1:", count));

stream.subscribe(count => console.log("Observer 2:", count));

setTimeout(()=> {
    stream.subscribe(count => console.log("Observer 3:", count));
},2000);














//stream.subscribe(count => console.log("Observer 2:", count));


// setTimeout(() => {
//     stream.subscribe({
//         next: count => console.log("Observer 3:", count)
//     });
// }, 2000);
//
// setTimeout(() => {
//
//     stream.subscribe({
//         next: count => console.log("Observer 4:", count)
//     });
// }, 3000);


/// unsubscribe:

import angular from "angular";
import {TodoCreatorComponent} from "./todoCreator.component";

export default angular.module('app.todoCreator', [])
    .component('todoCreator', new TodoCreatorComponent())
    .name;

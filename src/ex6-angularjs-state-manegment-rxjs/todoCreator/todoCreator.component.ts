import {TodoCreatorController} from "./todoCreator.controller";

export class TodoCreatorComponent implements ng.IComponentOptions {
    template = require('./todoCreator.html');
    controller = TodoCreatorController;
    bindings = {};
}

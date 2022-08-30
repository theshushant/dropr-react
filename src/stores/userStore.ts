import {observable} from "mobx";

export class UserStore {
    private static _instance: UserStore;

    @observable name:string;

    constructor() {
        this.name = "Sushant"
    }


    static getInstance(): UserStore {
        if (!this._instance) {
            this._instance = new UserStore();
        }

        return this._instance;
    }
}
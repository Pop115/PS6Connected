import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {IncidentModel} from "../models/Incident";
import {URL_SERVER} from "../constants/urls";
import {Observable} from "rxjs/Observable";
import {tap, catchError} from "rxjs/operators";
import {UserModel} from "../models/User";

@Injectable()
export class UserService {

    public userList: BehaviorSubject<UserModel[]>;

    private routeVue = "/chooseUser";


    constructor(private http: HttpClient) {
        this.userList = new BehaviorSubject([]);
    }

    getUsers() {
        this.http.get<UserModel[]>(URL_SERVER + this.routeVue).subscribe((users) => this.userList.next(users));
        console.log(this.userList);
    }


}

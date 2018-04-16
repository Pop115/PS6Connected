import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {UserModel} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {URL_SERVER} from "../constants/urls";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class UserService {

    public userList: Observable<UserModel[]>;
    public user: Observable<UserModel>;


    private routeVue = "/chooseUser";
    private usersUrl: "localhost:3000/getUserById";


    constructor(private http: HttpClient) {
        this.userList = new Observable<UserModel[]>();
        this.user = new Observable<UserModel>();

    }

    getUsers(): Observable<UserModel[]> {
        console.log(this.userList);
        return this.http.get<UserModel[]>(URL_SERVER + this.routeVue)
            .pipe(
                tap(users => console.log(users)),
                catchError(this.handleError("getUsers", []))
            );
    }

    getUserById(idpersonne: number): Observable<UserModel> {
        const method = "GET";
        let postData = {};
        postData["idincident"] = idpersonne;
        console.log(postData);
        postData = JSON.stringify(postData);

        const shouldBeAsync = true;

        const request = new XMLHttpRequest();
        request.onload = function () {
            const status = request.status;
            const data = request.responseText;
        };
        request.open(method, this.usersUrl, shouldBeAsync);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(postData);

        return this.http.get<UserModel>(this.usersUrl).pipe(
            tap(_ => console.log(`fetched user idpersonne=${idpersonne}`)),
            catchError(this.handleError<UserModel>(`getHero idpersonne=${idpersonne}`))
        );

    }


    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

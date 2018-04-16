import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/services/user.service";
import {UserModel} from "../shared/models/User";

@Component({
    selector: "app-chooseUser",
    templateUrl: "./chooseUser.component.html",
    styleUrls: ["./chooseUser.component.css"]
})
export class ChooseUserComponent implements OnInit {

    public userList: UserModel[] = [];

    static chooseUser(userid: number) {
        localStorage.setItem("idpersonne", userid.toString());
    }

    constructor(private userService: UserService) {

        this.userService.getUsers().subscribe(
            (userList) => this.userList = userList
        );

    }

    chooseUser(userid:number){
        localStorage.setItem('idpersonne', userid.toString());
    }
    
    ngOnInit() {
    }

}

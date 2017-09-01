/**
 * Created by Code1912 on 2016/10/1.
 */
import {Component, OnInit, ViewChild, Input, AfterContentInit, ElementRef} from '@angular/core';
import {LoadingService, AlertService, AuthService, UserInfo} from "evekit/core"
import {MenuComponent} from "../../components/menu/menu.component";

@Component({
    selector: 'div[eve]',
    templateUrl: 'eve.component.html'
})
export class EveComponent implements OnInit, AfterContentInit {

    @ViewChild(MenuComponent)
    menuComponent: MenuComponent;

    @Input()
    searchText: string;

    userInfo: UserInfo = new UserInfo();

    //  @ViewChildren(TodoComponent) todoComponents: QueryList<TodoComponent>;
    constructor(private ele: ElementRef,
                private  loadingService: LoadingService,
                private alertService: AlertService,
                private  authService: AuthService) {
        this.ele.nativeElement.className = "wrapper";
    }

    ngAfterContentInit() {
        $.AdminLTE.load();
    }

    ngOnInit() {
        this.loadingService.hideLoading();
        this.userInfo = this.authService.userInfo;
    }

    doSearch() {
        this.menuComponent.search(this.searchText);
    }

    doLogout() {
        this.alertService.confirm("是否退出？", null,() => {
            this.authService.logOut();

        },);
    }

}
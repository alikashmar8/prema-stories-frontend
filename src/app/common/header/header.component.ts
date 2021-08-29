import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null;
  isAdmin: boolean= false;
  isHome: boolean = false;
  marginTop : number = 0;
  isShowSidebar: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = authService.currentUser;
    router.events.subscribe((val) => {
      this.isShowSidebar = false
  });

   }

   ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    // if(this.isAdmin) this.marginTop = -50;
  }

  isCurrentRoute(param: string) {
    return param == this.router.url;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authService.currentUserSubject.next(null);
    this.router.navigate(['/']).then(() => window.location.reload());
  }

  sidebarToggle(){
    this.isShowSidebar = !this.isShowSidebar;
}

}

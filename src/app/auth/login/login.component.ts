import {Component, OnInit} from '@angular/core'
import {loadingGifUrl} from '../../../constants'
import {HttpClient} from '@angular/common/http'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = ''
  public password: string = ''
  isLoadingLogin: boolean = false
  loadingGif: string = loadingGifUrl

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private alertService: ToastrService
  ) {
  }

  ngOnInit(): void {
    // if (this.authService.currentUser) {
    //   this.authService.isAdmin() ?
    //     this.router.navigate(['/admin/home']) :
    //     this.router.navigate(['/'])
    // }
  }

  submit(): any {
    this.isLoadingLogin = true
    const data = {
      email: this.email,
      password: this.password,
    }

    this.authService.login(data).subscribe(
      (res) => {
        this.isLoadingLogin = false
        console.log(res)
        this.router.navigate(['/admin/products']).then(() => window.location.reload())
      },
      (error) => {
        Array.isArray(error.error.message) ?
          this.alertService.error(error.error.message[0]) :
          this.alertService.error(error.error.message)
        this.isLoadingLogin = false
      }
    )
  }

}

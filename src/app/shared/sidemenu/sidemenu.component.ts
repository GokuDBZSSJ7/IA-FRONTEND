import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  user: any;

  constructor(private authService: AuthService) { 
    this.user = this.authService.getUser();
    console.log(this.user);
    
  }

  logout(): void {
    this.authService.logout();
  }
}

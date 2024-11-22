// layout.component.ts
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent {
  isSidebarOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic se propague al div envolvente
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const sidebarElement = document.getElementById('default-sidebar');
    if (sidebarElement && !sidebarElement.contains(event.target as Node) && this.isSidebarOpen) {
      this.closeSidebar();
    }
  }

  handleClickOutside(event: MouseEvent): void {
    const sidebarElement = document.getElementById('default-sidebar');
    if (sidebarElement && !sidebarElement.contains(event.target as Node) && this.isSidebarOpen) {
      this.closeSidebar();
    }
  }
}

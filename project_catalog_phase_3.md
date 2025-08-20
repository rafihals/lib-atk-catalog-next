# ATK Catalog Phase 3: Frontend Angular Implementation

## Unified Business Process & Architecture
Berdasarkan gabungan kedua dokumen perencanaan, kita akan mengimplementasikan sistem katalog ATK yang komprehensif dengan proses bisnis yang konsisten:

**Core Business Flow:**
1. Public User → Landing → Catalog (Browse/Search/Filter) → Product Detail
2. Admin → Login → Dashboard → Product Management → Stock Management
3. System → Real-time Stock Updates → Low Stock Alerts → Audit Trail

---

## PHASE 3: Complete Angular Frontend Implementation

### Prompt 3.1: Layout Components & Shared Components

```
@filesystem @memory

TASK: Implementasi layout components dan shared components

1. **Header Component** (src/app/layout/header/header.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AuthUser } from '../../core/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<AuthUser | null>;
  isMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
```

**header.component.html**:
```html
<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <a routerLink="/" class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">A</span>
          </div>
          <span class="text-xl font-bold text-gray-900">ATK Catalog</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          <a routerLink="/" routerLinkActive="text-primary-600" 
             class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
            Home
          </a>
          <a routerLink="/catalog" routerLinkActive="text-primary-600"
             class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
            Catalog
          </a>
        </div>
      </div>

      <!-- User Menu -->
      <div class="hidden md:flex items-center space-x-4">
        <ng-container *ngIf="currentUser$ | async as user; else loginButton">
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-700">{{ user.profile.full_name }}</span>
            <div class="relative">
              <button (click)="toggleMenu()" 
                      class="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-medium text-sm">
                    {{ user.profile.full_name?.charAt(0)?.toUpperCase() }}
                  </span>
                </div>
              </button>
              
              <!-- Dropdown Menu -->
              <div *ngIf="isMenuOpen" 
                   class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                <a *ngIf="user.profile.role === 'admin'" 
                   (click)="navigateToAdmin()" 
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Admin Dashboard
                </a>
                <a (click)="onLogout()" 
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </ng-container>
        
        <ng-template #loginButton>
          <a routerLink="/auth/login" class="btn-primary">Login</a>
        </ng-template>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button (click)="toggleMenu()" 
                class="text-gray-600 hover:text-primary-600 focus:outline-none focus:text-primary-600">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div *ngIf="isMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
        <a routerLink="/" class="block text-gray-600 hover:text-primary-600 px-3 py-2 text-base font-medium">
          Home
        </a>
        <a routerLink="/catalog" class="block text-gray-600 hover:text-primary-600 px-3 py-2 text-base font-medium">
          Catalog
        </a>
        <ng-container *ngIf="currentUser$ | async as user; else mobileLogin">
          <div class="border-t border-gray-200 pt-3 mt-3">
            <div class="px-3 py-2">
              <span class="text-sm font-medium text-gray-900">{{ user.profile.full_name }}</span>
            </div>
            <a *ngIf="user.profile.role === 'admin'" 
               (click)="navigateToAdmin()" 
               class="block text-gray-600 hover:text-primary-600 px-3 py-2 text-base font-medium cursor-pointer">
              Admin Dashboard
            </a>
            <a (click)="onLogout()" 
               class="block text-gray-600 hover:text-primary-600 px-3 py-2 text-base font-medium cursor-pointer">
              Logout
            </a>
          </div>
        </ng-container>
        
        <ng-template #mobileLogin>
          <div class="border-t border-gray-200 pt-3 mt-3">
            <a routerLink="/auth/login" class="block text-gray-600 hover:text-primary-600 px-3 py-2 text-base font-medium">
              Login
            </a>
          </div>
        </ng-template>
      </div>
    </div>
  </nav>
</header>
```

2. **Footer Component** (src/app/layout/footer/footer.component.html):
```html
<footer class="bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Company Info -->
      <div class="col-span-2">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">A</span>
          </div>
          <span class="text-xl font-bold">ATK Catalog</span>
        </div>
        <p class="text-gray-300 text-sm leading-6 mb-4">
          Solusi lengkap kebutuhan alat tulis kantor Anda. Kami menyediakan berbagai macam 
          produk ATK berkualitas tinggi dengan harga yang kompetitif.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd"/>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.017 14.154L17 9.17a.5.5 0 00-.707-.707l-4.276 4.276L7.741 8.463a.5.5 0 00-.707.707l4.983 4.984z" clip-rule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><a routerLink="/" class="text-gray-300 hover:text-white transition-colors text-sm">Home</a></li>
          <li><a routerLink="/catalog" class="text-gray-300 hover:text-white transition-colors text-sm">Catalog</a></li>
          <li><a href="#" class="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
          <li><a href="#" class="text-gray-300 hover:text-white transition-colors text-sm">Contact</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">Contact Info</h3>
        <ul class="space-y-2 text-sm text-gray-300">
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <span>Jakarta, Indonesia</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span>+62 21 1234 5678</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>info@atkcatalog.com</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 pt-8 border-t border-gray-800">
      <p class="text-center text-gray-400 text-sm">
        &copy; 2024 ATK Catalog. All rights reserved. Built with Angular & Supabase.
      </p>
    </div>
  </div>
</footer>
```

3. **Sidebar Component** (src/app/layout/sidebar/sidebar.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  
  menuItems: MenuItem[] = [
    { title: 'Dashboard', route: '/admin', icon: 'dashboard' },
    { title: 'Products', route: '/admin/products', icon: 'inventory' },
    { title: 'Categories', route: '/admin/categories', icon: 'category' },
    { title: 'Stock Management', route: '/admin/stock', icon: 'storage' },
    { title: 'Reports', route: '/admin/reports', icon: 'analytics' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
```

4. **Loading Component** (src/app/shared/components/loading/loading.component.html):
```html
<div class="flex items-center justify-center p-8">
  <div class="loading-spinner"></div>
  <span class="ml-2 text-gray-600">{{ message || 'Loading...' }}</span>
</div>
```

5. **Confirmation Modal Component** (src/app/shared/components/confirmation-modal/confirmation-modal.component.ts):
```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() isDangerous = false;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
```

**confirmation-modal.component.html**:
```html
<div *ngIf="isOpen" class="modal-backdrop" (click)="onBackdropClick($event)">
  <div class="modal-content">
    <div class="p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      
      <div class="flex justify-end space-x-3">
        <button (click)="onCancel()" class="btn-secondary">
          {{ cancelText }}
        </button>
        <button (click)="onConfirm()" 
                [class]="isDangerous ? 'btn-danger' : 'btn-primary'">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</div>
```

6. **Notification Component** (src/app/shared/components/notification/notification.component.ts):
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'x-circle';
      case 'warning': return 'exclamation-triangle';
      case 'info': return 'information-circle';
      default: return 'information-circle';
    }
  }

  getColorClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  }
}
```

Simpan semua komponen layout dan shared components ini dan konfirmasi implementasi berhasil.
```

### Prompt 3.2: Landing Page & Public Catalog

```
@filesystem @memory

TASK: Implementasi Landing Page dan Public Catalog yang modern dan menarik

1. **Landing Page Component** (src/app/features/public/components/landing/landing.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Product } from '../../../../core/models/product.interface';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  featuredProducts$: Observable<Product[]> = new Observable();
  categories$: Observable<Category[]> = new Observable();
  
  heroStats = [
    { value: '500+', label: 'Products Available' },
    { value: '50+', label: 'Trusted Brands' },
    { value: '99%', label: 'Customer Satisfaction' },
    { value: '24/7', label: 'Support Available' }
  ];

  features = [
    {
      icon: 'inventory',
      title: 'Wide Product Range',
      description: 'From basic pens to professional office equipment, we have everything you need.'
    },
    {
      icon: 'verified',
      title: 'Quality Guaranteed',
      description: 'All products are sourced from trusted manufacturers and thoroughly tested.'
    },
    {
      icon: 'speed',
      title: 'Real-time Stock',
      description: 'Always know what is available with our real-time inventory system.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Our customer service team is always ready to help you find what you need.'
    }
  ];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts(): void {
    this.featuredProducts$ = this.productService.getAllProducts();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  navigateToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/catalog'], { queryParams: { category: categoryId } });
  }

  viewProductDetail(productId: string): void {
    this.router.navigate(['/catalog', productId]);
  }
}
```

**landing.component.html**:
```html
<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
  <div class="absolute inset-0 bg-black opacity-10"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div class="text-center lg:text-left">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Solusi Lengkap
          <span class="text-primary-200">Kebutuhan ATK</span>
          Anda
        </h1>
        <p class="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
          Dari pulpen hingga peralatan kantor profesional. Temukan semua yang Anda butuhkan 
          dengan kualitas terjamin dan harga kompetitif.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button (click)="navigateToCatalog()" 
                  class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Lihat Katalog Produk
          </button>
          <a href="#features" 
             class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>

      <!-- Right Content - Stats -->
      <div class="grid grid-cols-2 gap-6">
        <div *ngFor="let stat of heroStats" 
             class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
          <div class="text-3xl md:text-4xl font-bold mb-2">{{ stat.value }}</div>
          <div class="text-primary-200 text-sm md:text-base">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating elements for visual appeal -->
  <div class="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
  <div class="absolute bottom-20 right-10 w-32 h-32 bg-primary-400 bg-opacity-20 rounded-full blur-2xl"></div>
</section>

<!-- Features Section -->
<section id="features" class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Mengapa Memilih ATK Catalog?
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Kami berkomitmen memberikan pelayanan terbaik dengan produk berkualitas tinggi
        untuk memenuhi semua kebutuhan ATK Anda.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div *ngFor="let feature of features" 
           class="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <mat-icon class="text-primary-600 text-3xl">{{ feature.icon }}</mat-icon>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
        <p class="text-gray-600">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</section>

<!-- Categories Section -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Kategori Produk
      </h2>
      <p class="text-xl text-gray-600">
        Jelajahi berbagai kategori produk ATK yang kami sediakan
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4" *ngIf="categories$ | async as categories">
      <div *ngFor="let category of categories; trackBy: trackByCategory" 
           (click)="navigateToCategory(category.id)"
           class="group cursor-pointer">
        <div class="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 hover:shadow-md transition-all duration-200 group-hover:scale-105">
          <mat-icon class="text-gray-600 group-hover:text-primary-600 text-4xl mb-3">
            {{ category.icon_name }}
          </mat-icon>
          <h3 class="text-sm font-medium text-gray-900 group-hover:text-primary-600">
            {{ category.name }}
          </h3>
          <p class="text-xs text-gray-500 mt-1" *ngIf="category.product_count">
            {{ category.product_count }} produk
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Featured Products Section -->
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Produk Unggulan
      </h2>
      <p class="text-xl text-gray-600">
        Pilihan terbaik dari koleksi ATK kami yang paling diminati
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
         *ngIf="featuredProducts$ | async as products">
      <div *ngFor="let product of products | slice:0:8; trackBy: trackByProduct" 
           (click)="viewProductDetail(product.id)"
           class="card group cursor-pointer">
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img [src]="product.image_url || '/assets/images/placeholder-product.jpg'" 
               [alt]="product.name"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200">
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ product.brand }}</p>
          <div class="flex justify-between items-center mb-2">
            <span class="text-lg font-bold text-primary-600">
              {{ product.price | currency:'IDR':'symbol':'1.0-0' }}
            </span>
            <span [ngClass]="getStockBadgeClass(product.stock_status)">
              {{ getStockLabel(product.stock_quantity, product.stock_status) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <button (click)="navigateToCatalog()" 
              class="btn-primary">
        Lihat Semua Produk
      </button>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section class="py-20 bg-primary-600 text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">
      Siap Melengkapi Kebutuhan ATK Anda?
    </h2>
    <p class="text-xl text-primary-100 mb-8">
      Jelajahi katalog lengkap kami dan temukan semua yang Anda butuhkan untuk produktivitas maksimal.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button (click)="navigateToCatalog()" 
              class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors">
        Mulai Belanja Sekarang
      </button>
      <a href="#" 
         class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors">
        Hubungi Kami
      </a>
    </div>
  </div>
</section>
```

**landing.component.ts methods (tambahkan)**:
```typescript
trackByCategory(index: number, category: Category): string {
  return category.id;
}

trackByProduct(index: number, product: Product): string {
  return product.id;
}

getStockBadgeClass(status: string): string {
  switch (status) {
    case 'in_stock':
      return 'badge-success';
    case 'low_stock':
      return 'badge-warning';
    case 'out_of_stock':
      return 'badge-error';
    default:
      return 'badge-success';
  }
}

getStockLabel(quantity: number, status: string): string {
  if (status === 'out_of_stock') return 'Stok Habis';
  if (status === 'low_stock') return `Stok: ${quantity} (Terbatas)`;
  return `Stok: ${quantity}`;
}
```

2. **Catalog Page Component** (src/app/features/public/components/catalog/catalog.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Product } from '../../../../core/models/product.interface';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  categories$: Observable<Category[]> = new Observable();
  filteredProducts$: Observable<Product[]> = new Observable();
  
  searchControl = new FormControl('');
  selectedCategory$ = new BehaviorSubject<string>('');
  selectedPriceRange$ = new BehaviorSubject<string>('');
  selectedStockStatus$ = new BehaviorSubject<string>('');
  
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;
  
  sortOptions = [
    { value: 'name_asc', label: 'Nama A-Z' },
    { value: 'name_desc', label: 'Nama Z-A' },
    { value: 'price_asc', label: 'Harga Terendah' },
    { value: 'price_desc', label: 'Harga Tertinggi' },
    { value: 'stock_desc', label: 'Stok Terbanyak' }
  ];
  
  priceRanges = [
    { value: '', label: 'Semua Harga' },
    { value: '0-10000', label: 'Di bawah Rp 10.000' },
    { value: '10000-50000', label: 'Rp 10.000 - Rp 50.000' },
    { value: '50000-100000', label: 'Rp 50.000 - Rp 100.000' },
    { value: '100000-999999999', label: 'Di atas Rp 100.000' }
  ];
  
  stockStatuses = [
    { value: '', label: 'Semua Status' },
    { value: 'in_stock', label: 'Tersedia' },
    { value: 'low_stock', label: 'Stok Terbatas' },
    { value: 'out_of_stock', label: 'Stok Habis' }
  ];
  
  selectedSort = 'name_asc';
  isFilterOpen = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.setupFiltering();
    this.handleRouteParams();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.products$ = this.productService.getAllProducts();
    this.isLoading = false;
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  setupFiltering(): void {
    const searchTerm$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith('')
    );

    this.filteredProducts$ = combineLatest([
      this.products$,
      searchTerm$,
      this.selectedCategory$,
      this.selectedPriceRange$,
      this.selectedStockStatus$
    ]).pipe(
      map(([products, searchTerm, category, priceRange, stockStatus]) => {
        return this.filterProducts(products, searchTerm || '', category, priceRange, stockStatus);
      })
    );
  }

  private filterProducts(
    products: Product[], 
    searchTerm: string, 
    category: string, 
    priceRange: string, 
    stockStatus: string
  ): Product[] {
    return products.filter(product => {
      // Search filter
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = !category || product.category_id === category;

      // Price range filter
      const matchesPriceRange = this.matchesPriceRange(product.price, priceRange);

      // Stock status filter
      const matchesStockStatus = !stockStatus || product.stock_status === stockStatus;

      return matchesSearch && matchesCategory && matchesPriceRange && matchesStockStatus;
    }).sort(this.getSortFunction(this.selectedSort));
  }

  private matchesPriceRange(price: number, range: string): boolean {
    if (!range) return true;
    
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
  }

  private getSortFunction(sortBy: string): (a: Product, b: Product) => number {
    switch (sortBy) {
      case 'name_asc':
        return (a, b) => a.name.localeCompare(b.name);
      case 'name_desc':
        return (a, b) => b.name.localeCompare(a.name);
      case 'price_asc':
        return (a, b) => a.price - b.price;
      case 'price_desc':
        return (a, b) => b.price - a.price;
      case 'stock_desc':
        return (a, b) => (b.stock_quantity || 0) - (a.stock_quantity || 0);
      default:
        return (a, b) => a.name.localeCompare(b.name);
    }
  }

  handleRouteParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory$.next(params['category']);
      }
      if (params['search']) {
        this.searchControl.setValue(params['search']);
      }
    });
  }

  onCategoryChange(categoryId: string): void {
    this.selectedCategory$.next(categoryId);
    this.updateUrl();
  }

  onPriceRangeChange(range: string): void {
    this.selectedPriceRange$.next(range);
  }

  onStockStatusChange(status: string): void {
    this.selectedStockStatus$.next(status);
  }

  onSortChange(sort: string): void {
    this.selectedSort = sort;
    this.setupFiltering(); // Refresh filtering with new sort
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.selectedCategory$.next('');
    this.selectedPriceRange$.next('');
    this.selectedStockStatus$.next('');
    this.selectedSort = 'name_asc';
    this.router.navigate(['/catalog']);
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  viewProductDetail(productId: string): void {
    this.router.navigate(['/catalog', productId]);
  }

  private updateUrl(): void {
    const queryParams: any = {};
    
    if (this.selectedCategory$.value) {
      queryParams.category = this.selectedCategory$.value;
    }
    
    if (this.searchControl.value) {
      queryParams.search = this.searchControl.value;
    }

    this.router.navigate(['/catalog'], { queryParams });
  }

  trackByProduct(index: number, product: Product): string {
    return product.id;
  }

  getStockBadgeClass(status: string): string {
    switch (status) {
      case 'in_stock': return 'badge-success';
      case 'low_stock': return 'badge-warning';
      case 'out_of_stock': return 'badge-error';
      default: return 'badge-success';
    }
  }

  getStockLabel(quantity: number, status: string): string {
    if (status === 'out_of_stock') return 'Stok Habis';
    if (status === 'low_stock') return `Stok: ${quantity} (Terbatas)`;
    return `Stok: ${quantity}`;
  }
}
```

3. **Product Detail Component** (src/app/features/public/components/product-detail/product-detail.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.interface';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> = new Observable();
  relatedProducts$: Observable<Product[]> = new Observable();
  isLoading = false;
  selectedImageIndex = 0;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadProduct(params['id']);
      }
    });
  }

  loadProduct(id: string): void {
    this.isLoading = true;
    this.product$ = this.productService.getProductById(id);
    
    this.product$.subscribe(product => {
      this.isLoading = false;
      if (product.category_id) {
        this.loadRelatedProducts(product.category_id, product.id);
      }
    });
  }

  loadRelatedProducts(categoryId: string, excludeId: string): void {
    this.relatedProducts$ = this.productService.getProductsByCategory(categoryId);
  }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: Product): void {
    // Future implementation for cart functionality
    this.notificationService.showInfo(
      'Coming Soon',
      'Cart functionality will be available in the next update!'
    );
  }

  getStockBadgeClass(status: string): string {
    switch (status) {
      case 'in_stock': return 'badge-success';
      case 'low_stock': return 'badge-warning';
      case 'out_of_stock': return 'badge-error';
      default: return 'badge-success';
    }
  }

  getStockLabel(quantity: number, status: string): string {
    if (status === 'out_of_stock') return 'Stok Habis';
    if (status === 'low_stock') return `Stok: ${quantity} (Terbatas)`;
    return `Stok: ${quantity}`;
  }

  isOutOfStock(status: string): boolean {
    return status === 'out_of_stock';
  }

  trackByProduct(index: number, product: Product): string {
    return product.id;
  }

  viewRelatedProduct(productId: string): void {
    this.router.navigate(['/catalog', productId]);
  }
}
```

Generate semua komponen ini dan konfirmasi implementasi berhasil.
```

### Prompt 3.3: Authentication System

```
@filesystem @memory

TASK: Implementasi sistem autentikasi yang lengkap dan secure

1. **Login Component** (src/app/features/auth/components/login/login.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  returnUrl = '/';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  get f() { return this.loginForm.controls; }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;

    try {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      const result = await this.authService.signIn(credentials);

      if (result.success) {
        this.notificationService.showSuccess(
          'Login Berhasil',
          'Selamat datang kembali!'
        );

        // Check user role and redirect accordingly
        const user = this.authService.getCurrentUser();
        if (user?.profile?.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
      } else {
        this.notificationService.showError(
          'Login Gagal',
          result.error || 'Email atau password tidak valid'
        );
      }
    } catch (error: any) {
      this.notificationService.showError(
        'Login Gagal',
        error.message || 'Terjadi kesalahan saat login'
      );
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register'], { 
      queryParams: { returnUrl: this.returnUrl } 
    });
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'Email' : 'Password'} wajib diisi`;
      }
      if (field.errors['email']) {
        return 'Format email tidak valid';
      }
      if (field.errors['minlength']) {
        return 'Password minimal 6 karakter';
      }
    }
    return '';
  }
}
```

**login.component.html**:
```html
<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <!-- Logo -->
    <div class="flex justify-center">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-2xl">A</span>
        </div>
        <span class="text-2xl font-bold text-gray-900">ATK Catalog</span>
      </div>
    </div>
    <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
      Masuk ke akun Anda
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Atau
      <button (click)="navigateToRegister()" 
              class="font-medium text-primary-600 hover:text-primary-500">
        buat akun baru
      </button>
    </p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1 relative">
            <input
              id="email"
              name="email"
              type="email"
              formControlName="email"
              autocomplete="email"
              class="input-field"
              [class.border-red-500]="f['email'].touched && f['email'].errors"
              placeholder="nama@email.com">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <mat-icon class="h-5 w-5 text-gray-400">email</mat-icon>
            </div>
          </div>
          <p *ngIf="getFieldError('email')" class="mt-1 text-sm text-red-600">
            {{ getFieldError('email') }}
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1 relative">
            <input
              id="password"
              name="password"
              [type]="showPassword ? 'text' : 'password'"
              formControlName="password"
              autocomplete="current-password"
              class="input-field pr-10"
              [class.border-red-500]="f['password'].touched && f['password'].errors"
              placeholder="Masukkan password">
            <button
              type="button"
              (click)="togglePasswordVisibility()"
              class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <mat-icon class="h-5 w-5 text-gray-400">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </mat-icon>
            </button>
          </div>
          <p *ngIf="getFieldError('password')" class="mt-1 text-sm text-red-600">
            {{ getFieldError('password') }}
          </p>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              formControlName="rememberMe"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Ingat saya
            </label>
          </div>

          <div class="text-sm">
            <button
              type="button"
              (click)="navigateToForgotPassword()"
              class="font-medium text-primary-600 hover:text-primary-500">
              Lupa password?
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <div *ngIf="isLoading" class="flex items-center">
              <div class="loading-spinner w-4 h-4 mr-2"></div>
              Masuk...
            </div>
            <span *ngIf="!isLoading">Masuk</span>
          </button>
        </div>
      </form>

      <!-- Social Login (Future Implementation) -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Atau masuk dengan</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="button"
            disabled
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

2. **Register Component** (src/app/features/auth/components/register/register.component.ts):
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  returnUrl = '/';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/
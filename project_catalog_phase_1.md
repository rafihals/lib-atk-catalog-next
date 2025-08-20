# Unified ATK Catalog Project - Complete Cursor AI Implementation Guide

## Project Overview
Website katalog ATK (Alat Tulis Kantor) dengan sistem manajemen stok yang komprehensif, menggunakan Angular modular + Supabase + MCP Servers untuk development yang optimal.

## Color Palette & Design System (Konsisten di Seluruh Aplikasi)

```css
/* Primary Colors */
--primary-blue: #2563eb;
--primary-dark: #1d4ed8;
--primary-light: #3b82f6;

/* Secondary Colors */
--secondary-gray: #6b7280;
--secondary-light: #f3f4f6;
--secondary-dark: #374151;

/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #06b6d4;

/* Background & Text */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--text-primary: #111827;
--text-secondary: #6b7280;
```

---

 ## PHASE 1: Backend Setup dengan MCP Supabase

### Prompt 1.1: Inisialisasi Backend & Database Schema

```
@supabase @memory @filesystem

Saya akan membuat website katalog ATK dengan sistem manajemen stok. Gunakan MCP Supabase untuk setup backend yang komprehensif.

TASK: Setup database schema dan konfigurasi backend

1. **Database Schema Setup**:
   Buat tabel-tabel berikut dengan relasi yang proper:

```sql
-- Categories Table (Master Data)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50), -- untuk icon UI
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products Table 
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  brand VARCHAR(100),
  price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  sku VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Stock Table (Separated for better performance)
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  min_stock_threshold INTEGER DEFAULT 5,
  max_stock_threshold INTEGER DEFAULT 1000,
  last_updated TIMESTAMP DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- User Profiles (Extends Supabase auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'manager')),
  full_name VARCHAR(150),
  phone VARCHAR(20),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Stock History (Audit Trail)
CREATE TABLE stock_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  old_quantity INTEGER,
  new_quantity INTEGER,
  change_type VARCHAR(50), -- 'manual_update', 'sale', 'restock', 'adjustment'
  change_reason TEXT,
  changed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

2. **Indexes untuk Performance**:
```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_stock_product ON stock(product_id);
CREATE INDEX idx_stock_quantity ON stock(quantity);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_stock_history_product ON stock_history(product_id);
CREATE INDEX idx_stock_history_created ON stock_history(created_at);
```

3. **Row Level Security (RLS) Policies**:
```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_history ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and products
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view stock" ON stock
  FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin full access categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin full access stock" ON stock
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

4. **Seed Data**:
Masukkan data sampel untuk kategori dan produk ATK:

```sql
-- Categories
INSERT INTO categories (name, description, icon_name) VALUES
('Pulpen & Pensil', 'Alat tulis dasar untuk menulis', 'pen'),
('Spidol & Marker', 'Spidol untuk whiteboard dan permanent', 'marker'),
('Penghapus & Korektor', 'Alat untuk menghapus dan mengoreksi', 'eraser'),
('Kertas & Buku', 'Berbagai jenis kertas dan buku tulis', 'book'),
('Alat Potong', 'Gunting, cutter, dan pisau', 'scissors'),
('Perekat & Lem', 'Lem, selotip, dan perekat lainnya', 'tape'),
('Organizer', 'Alat untuk mengorganisir dokumen', 'folder'),
('Alat Ukur', 'Penggaris, busur, dan alat ukur', 'ruler');

-- Sample Products (20+ items)
INSERT INTO products (category_id, name, description, brand, price, sku, image_url) VALUES
-- Pulpen & Pensil
((SELECT id FROM categories WHERE name = 'Pulpen & Pensil'), 'Pulpen Gel Pilot G2', 'Pulpen gel premium dengan tinta halus', 'Pilot', 15000, 'PEN-PILOT-G2-001', '/images/pilot-g2.jpg'),
((SELECT id FROM categories WHERE name = 'Pulpen & Pensil'), 'Pensil 2B Faber Castell', 'Pensil graphite kualitas tinggi', 'Faber Castell', 8000, 'PENCIL-FC-2B-001', '/images/fc-pencil.jpg'),
((SELECT id FROM categories WHERE name = 'Pulpen & Pensil'), 'Pulpen Biru Standard', 'Pulpen ballpoint standar warna biru', 'Standard', 5000, 'PEN-STD-BLUE-001', '/images/pen-blue.jpg'),

-- Spidol & Marker
((SELECT id FROM categories WHERE name = 'Spidol & Marker'), 'Spidol Whiteboard Snowman', 'Spidol untuk papan tulis putih', 'Snowman', 12000, 'MARKER-SW-WB-001', '/images/snowman-wb.jpg'),
((SELECT id FROM categories WHERE name = 'Spidol & Marker'), 'Spidol Permanent Hitam', 'Spidol permanent anti luntur', 'Snowman', 10000, 'MARKER-SW-PM-001', '/images/permanent-black.jpg'),
((SELECT id FROM categories WHERE name = 'Spidol & Marker'), 'Highlighter Kuning Stabilo', 'Stabilo warna kuning untuk highlighting', 'Stabilo', 18000, 'HIGH-STAB-YEL-001', '/images/stabilo-yellow.jpg'),

-- Penghapus & Korektor
((SELECT id FROM categories WHERE name = 'Penghapus & Korektor'), 'Penghapus Faber Castell', 'Penghapus karet berkualitas tinggi', 'Faber Castell', 6000, 'ERASER-FC-001', '/images/fc-eraser.jpg'),
((SELECT id FROM categories WHERE name = 'Penghapus & Korektor'), 'Tip Ex Correction Tape', 'Korektor pita untuk menutupi kesalahan', 'Tip Ex', 25000, 'CORR-TIPEX-001', '/images/tipex.jpg'),

-- Kertas & Buku
((SELECT id FROM categories WHERE name = 'Kertas & Buku'), 'Buku Tulis 58 Lembar', 'Buku tulis garis dengan 58 lembar', 'Sinar Dunia', 8000, 'BOOK-SD-58-001', '/images/book-58.jpg'),
((SELECT id FROM categories WHERE name = 'Kertas & Buku'), 'Kertas A4 80gsm', 'Kertas HVS A4 80gsm per rim', 'Paperline', 45000, 'PAPER-PL-A4-001', '/images/paper-a4.jpg'),
((SELECT id FROM categories WHERE name = 'Kertas & Buku'), 'Post It Notes', 'Sticky notes warna warni', 'Post It', 15000, 'STICKY-PI-001', '/images/postit.jpg'),

-- Alat Potong  
((SELECT id FROM categories WHERE name = 'Alat Potong'), 'Gunting Stainless Steel', 'Gunting tajam stainless steel', 'Joyko', 35000, 'SCISSOR-JK-SS-001', '/images/scissors-ss.jpg'),
((SELECT id FROM categories WHERE name = 'Alat Potong'), 'Cutter Kenko', 'Cutter dengan mata pisau tajam', 'Kenko', 12000, 'CUTTER-KK-001', '/images/cutter-kenko.jpg'),

-- Perekat & Lem
((SELECT id FROM categories WHERE name = 'Perekat & Lem'), 'Double Tape 3M', 'Double tape berkualitas tinggi', '3M', 28000, 'TAPE-3M-DBL-001', '/images/3m-double.jpg'),
((SELECT id FROM categories WHERE name = 'Perekat & Lem'), 'Lem Stick UHU', 'Lem batang mudah digunakan', 'UHU', 22000, 'GLUE-UHU-001', '/images/uhu-glue.jpg'),

-- Organizer
((SELECT id FROM categories WHERE name = 'Organizer'), 'Map Plastik A4', 'Map plastik transparan A4', 'Bantex', 8000, 'FOLDER-BX-A4-001', '/images/plastic-folder.jpg'),
((SELECT id FROM categories WHERE name = 'Organizer'), 'Ordner Lever Arch', 'Ordner dengan sistem pengait', 'Bantex', 45000, 'ORDNER-BX-001', '/images/lever-arch.jpg'),

-- Alat Ukur
((SELECT id FROM categories WHERE name = 'Alat Ukur'), 'Penggaris 30cm', 'Penggaris plastik transparan 30cm', 'Butterfly', 8000, 'RULER-BF-30-001', '/images/ruler-30.jpg'),
((SELECT id FROM categories WHERE name = 'Alat Ukur'), 'Jangka Kompas', 'Jangka untuk menggambar lingkaran', 'Rotring', 85000, 'COMPASS-RT-001', '/images/compass.jpg');

-- Stock data untuk semua produk
INSERT INTO stock (product_id, quantity, min_stock_threshold) 
SELECT id, 
       FLOOR(RANDOM() * 100 + 10)::INTEGER, -- Random stock 10-110
       5 -- Min threshold
FROM products;
```

5. **Supabase Storage Bucket**:
Buat bucket untuk gambar produk:
```sql
-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policy untuk public read
CREATE POLICY "Public can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Storage policy untuk admin upload
CREATE POLICY "Admin can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

Simpan semua konfigurasi ini ke memory dan konfirmasi setup berhasil.
```

### Prompt 1.2: Database Functions & Triggers

```
@supabase @memory

TASK: Buat database functions dan triggers untuk otomatisasi

1. **Function untuk Update Stock History**:
```sql
CREATE OR REPLACE FUNCTION update_stock_history()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.quantity != NEW.quantity THEN
    INSERT INTO stock_history (
      product_id, 
      old_quantity, 
      new_quantity, 
      change_type, 
      change_reason, 
      changed_by
    ) VALUES (
      NEW.product_id,
      OLD.quantity,
      NEW.quantity,
      'manual_update',
      'Stock updated via admin panel',
      NEW.updated_by
    );
    
    NEW.last_updated = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER stock_history_trigger
  BEFORE UPDATE ON stock
  FOR EACH ROW
  EXECUTE FUNCTION update_stock_history();
```

2. **Function untuk Product dengan Stock Info**:
```sql
CREATE OR REPLACE FUNCTION get_products_with_stock()
RETURNS TABLE (
  product_id UUID,
  name VARCHAR,
  description TEXT,
  brand VARCHAR,
  price DECIMAL,
  image_url TEXT,
  sku VARCHAR,
  category_name VARCHAR,
  category_id UUID,
  stock_quantity INTEGER,
  stock_status TEXT,
  is_low_stock BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.description,
    p.brand,
    p.price,
    p.image_url,
    p.sku,
    c.name,
    p.category_id,
    s.quantity,
    CASE 
      WHEN s.quantity = 0 THEN 'out_of_stock'
      WHEN s.quantity <= s.min_stock_threshold THEN 'low_stock'
      ELSE 'in_stock'
    END,
    s.quantity <= s.min_stock_threshold
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  LEFT JOIN stock s ON p.id = s.product_id
  WHERE p.is_active = true
  ORDER BY p.name;
END;
$$ LANGUAGE plpgsql;
```

3. **Function untuk Dashboard Statistics**:
```sql
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_products', (SELECT COUNT(*) FROM products WHERE is_active = true),
    'total_categories', (SELECT COUNT(*) FROM categories WHERE is_active = true),
    'low_stock_items', (
      SELECT COUNT(*) FROM stock s 
      JOIN products p ON s.product_id = p.id 
      WHERE s.quantity <= s.min_stock_threshold AND p.is_active = true
    ),
    'out_of_stock_items', (
      SELECT COUNT(*) FROM stock s 
      JOIN products p ON s.product_id = p.id 
      WHERE s.quantity = 0 AND p.is_active = true
    ),
    'total_stock_value', (
      SELECT COALESCE(SUM(p.price * s.quantity), 0)
      FROM products p 
      JOIN stock s ON p.id = s.product_id 
      WHERE p.is_active = true
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
```

4. **Auto-update timestamps trigger**:
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

Konfirmasi semua functions dan triggers berhasil dibuat dan simpan ke memory.
```

---

## PHASE 2: Frontend Angular Setup

### Prompt 2.1: Inisialisasi Angular Project

```
@filesystem @memory

TASK: Setup Angular project dengan arsitektur modular yang clean

1. **Create Angular Project**:
```bash
ng new atk-catalog --routing --style=scss --skip-git --standalone=false
cd atk-catalog
ng add @angular/material --theme=custom --typography=yes --animations=yes
npm install @supabase/supabase-js @angular/forms @angular/common
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure Tailwind CSS** (tailwind.config.js):
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

3. **Setup Global Styles** (src/styles.scss):
```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

// Custom CSS Variables (Consistent Color Palette)
:root {
  --primary-blue: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #3b82f6;
  --secondary-gray: #6b7280;
  --secondary-light: #f3f4f6;
  --secondary-dark: #374151;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #06b6d4;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
}

// Global Base Styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

// Custom Component Classes
.btn-primary {
  @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}

.btn-danger {
  @apply bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2;
}

.card {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200;
}

.input-field {
  @apply w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors duration-200;
}

.badge-success {
  @apply bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full;
}

.badge-warning {
  @apply bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full;
}

.badge-error {
  @apply bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full;
}

// Loading animations
.loading-spinner {
  @apply animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600;
}

// Sidebar navigation styles
.nav-link {
  @apply flex items-center px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 group;
}

.nav-link.active {
  @apply text-primary-600 bg-primary-50 font-medium;
}

// Table styles
.table-container {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden;
}

.table-header {
  @apply bg-gray-50 px-6 py-4 border-b border-gray-200;
}

.table-row {
  @apply px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150;
}

// Modal styles
.modal-backdrop {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50;
}

.modal-content {
  @apply bg-white rounded-xl shadow-xl max-w-lg w-full max-h-screen overflow-y-auto;
}
```

4. **Project Structure**:
```
src/app/
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── admin.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── supabase.service.ts
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   ├── stock.service.ts
│   │   └── notification.service.ts
│   └── models/
│       ├── product.interface.ts
│       ├── category.interface.ts
│       ├── user.interface.ts
│       └── stock.interface.ts
├── shared/
│   ├── components/
│   │   ├── loading/
│   │   ├── confirmation-modal/
│   │   ├── notification/
│   │   └── pagination/
│   ├── pipes/
│   │   └── currency-format.pipe.ts
│   └── directives/
│       └── lazy-load.directive.ts
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── auth-routing.module.ts
│   │   └── auth.module.ts
│   ├── public/
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   ├── catalog/
│   │   │   └── product-detail/
│   │   ├── public-routing.module.ts
│   │   └── public.module.ts
│   └── admin/
│       ├── components/
│       │   ├── dashboard/
│       │   ├── product-management/
│       │   ├── category-management/
│       │   └── stock-management/
│       ├── admin-routing.module.ts
│       └── admin.module.ts
├── layout/
│   ├── header/
│   ├── footer/
│   ├── sidebar/
│   └── layout.component.ts
├── app-routing.module.ts
└── app.module.ts
```

Generate seluruh struktur folder dan file dasar ini.
```

### Prompt 2.2: Core Services & Models

```
@filesystem @memory

TASK: Implementasi core services dan TypeScript interfaces

1. **Core Models** (src/app/core/models/):

**product.interface.ts**:
```typescript
export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  image_url: string;
  sku: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Joined data
  category_name?: string;
  stock_quantity?: number;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  is_low_stock?: boolean;
}

export interface CreateProductDTO {
  category_id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  sku: string;
  image_file?: File;
  initial_stock?: number;
}

export interface UpdateProductDTO {
  category_id?: string;
  name?: string;
  description?: string;
  brand?: string;
  price?: number;
  sku?: string;
  is_active?: boolean;
  image_file?: File;
}
```

**category.interface.ts**:
```typescript
export interface Category {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Calculated fields
  product_count?: number;
}

export interface CreateCategoryDTO {
  name: string;
  description: string;
  icon_name: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  icon_name?: string;
  is_active?: boolean;
}
```

**user.interface.ts**:
```typescript
export interface UserProfile {
  id: string;
  role: 'admin' | 'user' | 'manager';
  full_name: string;
  phone: string;
  avatar_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface AuthUser {
  user: any; // Supabase User object
  profile: UserProfile;
}
```

**stock.interface.ts**:
```typescript
export interface Stock {
  id: string;
  product_id: string;
  quantity: number;
  min_stock_threshold: number;
  max_stock_threshold: number;
  last_updated: string;
  updated_by: string;
}

export interface StockHistory {
  id: string;
  product_id: string;
  old_quantity: number;
  new_quantity: number;
  change_type: string;
  change_reason: string;
  changed_by: string;
  created_at: string;
}

export interface UpdateStockDTO {
  quantity: number;
  change_reason?: string;
}

export interface DashboardStats {
  total_products: number;
  total_categories: number;
  low_stock_items: number;
  out_of_stock_items: number;
  total_stock_value: number;
}
```
Proyek Katalog ATK - Prompt Tahap 4: Finalisasi Frontend
Berdasarkan semua fase sebelumnya, backend Supabase kita sudah siap. Sekarang, kita akan menyelesaikan implementasi frontend Angular secara menyeluruh, dengan fokus pada fungsionalitas admin dan pengalaman pengguna publik.

Konteks: Proyek ini menggunakan Angular (modular, bukan standalone), arsitektur bersih dengan service terpisah, dan Tailwind CSS untuk styling. Palet warna dan desain harus konsisten seperti yang didefinisikan di Tahap 1 untuk menciptakan tampilan yang profesional, modern, dan simpel.

Prompt 4.1: Implementasi Penuh Manajemen Produk di Dashboard Admin
@filesystem @memory @supabase

TASK: Selesaikan fungsionalitas CRUD untuk Manajemen Produk di Dashboard Admin.

Buka modul `admin.module.ts` dan komponen-komponen terkait di dalam folder `src/app/features/admin`.

1.  **Tabel Manajemen Produk (`product-list.component.ts` & .html):**
    * Gunakan `ProductService` yang telah dibuat untuk memanggil fungsi `getAllProducts()`.
    * Tampilkan data produk dalam tabel yang sudah di-style dengan Tailwind CSS. Kolom yang harus ada: `Gambar`, `Nama Produk`, `Kategori`, `Harga`, `Stok`, dan `Aksi`.
    * Pada kolom `Aksi`, tambahkan tombol ikon untuk "Ubah" dan "Hapus".
    * Implementasikan pagination, sorting, dan filter sederhana di sisi client untuk tabel ini.
    * Tambahkan state `isLoading` untuk menampilkan skeleton loader saat data sedang diambil.

2.  **Form Tambah/Ubah Produk (buat komponen baru `product-form.component.ts`):**
    * Buat form menggunakan **Angular Reactive Forms** dengan validasi yang ketat untuk semua field:
        * `name`: `string`, required
        * `description`: `string`, required
        * `price`: `number`, required, min 0
        * `stock_quantity`: `number`, required, integer, min 0
        * `category_id`: `dropdown (select)`, required. Ambil data kategori menggunakan `CategoryService`.
        * `image`: `file input`, optional.
    * Komponen ini harus bisa berfungsi untuk mode "Tambah" dan "Ubah". Gunakan route parameter (misal: `/admin/products/edit/:id`) untuk membedakannya. Jika dalam mode "Ubah", isi form dengan data produk yang ada.
    * **Image Upload**: Saat form di-submit, jika ada file gambar, upload terlebih dahulu ke Supabase Storage, dapatkan URL-nya, baru kemudian simpan URL tersebut bersama data produk lainnya ke tabel `products`.
    * Gunakan `NotificationService` untuk menampilkan pesan sukses ("Produk berhasil ditambahkan/diubah") atau pesan error.
    * Setelah berhasil, navigasikan pengguna kembali ke halaman daftar produk.

3.  **Fungsionalitas Hapus Produk:**
    * Ketika tombol "Hapus" di klik, tampilkan modal konfirmasi (gunakan komponen modal dari shared module) untuk mencegah kesalahan.
    * Jika dikonfirmasi, panggil method `deleteProduct()` dari `ProductService`.
    * Hapus juga gambar terkait dari Supabase Storage.
    * Tampilkan notifikasi sukses atau error dan refresh data tabel.

Prompt 4.2: Membangun Halaman Katalog Publik
@filesystem @memory @supabase

TASK: Buat halaman katalog publik yang fungsional dan responsif.

Buka modul `catalog.module.ts` dan komponen-komponen terkait di dalam folder `src/app/features/catalog`.

1.  **Layout Halaman Katalog (`catalog-page.component.ts` & .html):**
    * Buat layout 2 kolom untuk desktop: sidebar kiri untuk filter dan area konten utama di kanan untuk menampilkan produk. Di mobile, sidebar filter harus menjadi collapsible atau dropdown.
    * Di atas area konten, tambahkan **Search Bar**.

2.  **Filter Kategori:**
    * Di sidebar, panggil `CategoryService` untuk mendapatkan semua kategori.
    * Tampilkan sebagai daftar link atau checkbox.
    * Saat sebuah kategori dipilih, panggil kembali data produk yang sudah difilter berdasarkan `category_id` tersebut. Tambahkan opsi "Semua Kategori" untuk mereset filter.

3.  **Grid Produk & Kartu Produk (buat komponen `product-card.component.ts`):**
    * Di area konten utama, tampilkan produk dalam format grid yang responsif (misal: 4 kolom di desktop, 2 di tablet, 1 di mobile).
    * Buat komponen `product-card` yang menerima data `Product` sebagai `@Input`.
    * Setiap kartu harus menampilkan:
        * Gambar produk.
        * Nama produk.
        * Harga (format sebagai mata uang).
        * Label Stok: Buat label ini dinamis.
            * Jika `stock > 10`: Latar hijau, teks "Tersedia".
            * Jika `1 < stock <= 10`: Latar kuning, teks "Stok Terbatas".
            * Jika `stock === 0`: Latar merah, teks "Stok Habis".
    * Tambahkan efek hover yang halus pada kartu produk.

4.  **Implementasi Pencarian & Filter:**
    * Hubungkan search bar dan filter kategori.
    * Buat sebuah method di `ProductService` atau di dalam komponen yang bisa menerima parameter pencarian (string) dan filter (category_id).
    * Setiap kali pengguna mengetik di search bar atau memilih kategori, panggil method ini untuk memperbarui grid produk secara real-time (gunakan RxJS `debounceTime` pada input pencarian untuk performa yang lebih baik).

5.  **Halaman Detail Produk (buat komponen `product-detail.component.ts`):**
    * Saat sebuah kartu produk di klik, navigasikan pengguna ke halaman detail produk (misal: `/catalog/product/:id`).
    * Di halaman ini, tampilkan semua informasi produk dengan lebih besar dan detail: gambar yang lebih besar, deskripsi lengkap, harga, dan status stok yang jelas.
// 1. Mengambil semua komponen halaman dari HTML
const halamanAwal = document.getElementById('halamanAwal');
const halamanForm = document.getElementById('halamanForm');
const halamanSelesai = document.getElementById('halamanSelesai');

const btnMulai = document.getElementById('btnMulai');
const btnSimpanBaru = document.getElementById('btnSimpanBaru');
const btnSelesai = document.getElementById('btnSelesai');
const btnKembali = document.getElementById('btnKembali');
const formPendaftaran = document.getElementById('formPendaftaran');

// --- ALUR 1: KLIK MASUK SISTEM ---
btnMulai.addEventListener('click', function() {
    alert("Selamat Datang! Silahkan ikuti petunjuk berikutnya!");
    halamanAwal.classList.add('hidden');
    halamanForm.classList.remove('hidden');
});

// --- FUNGSI UTAMA: MENYIMPAN DATA KE LOCALSTORAGE ---
function simpanDataKeDatabase() {
    const nama = document.getElementById('namaLengkap').value;
    const email = document.getElementById('emailUser').value;
    const hp = document.getElementById('nomorHp').value;
    
    // Validasi dasar agar form tidak kosong
    if (nama === "" || email === "" || hp === "") {
        alert("Peringatan: Semua kolom data personal wajib diisi!");
        return false;
    }

    // 1. Mengambil database lama yang sudah ada di LocalStorage (jika ada)
    // Jika belum ada data sama sekali, kita buat array kosong []
    let databaseLama = JSON.parse(localStorage.getItem('databaseProyekAde')) || [];

    // 2. Membuat objek data personal yang baru dimasukkan
    const dataBaru = {
        namaLengkap: nama,
        emailUser: email,
        nomorHp: hp,
        waktuInput: new Date().toLocaleString('id-ID') // Mencatat tanggal & jam input secara otomatis
    };

    // 3. Memasukkan data baru ke dalam daftar database lama
    databaseLama.push(dataBaru);

    // 4. Mengunci dan menyimpan kembali database utuh ke LocalStorage browser
    localStorage.setItem('databaseProyekAde', JSON.stringify(databaseLama));

    // Menampilkan log di konsol untuk pembuktian (bisa dilihat via Inspect Element)
    console.log("Database Saat Ini:", databaseLama);
    
    return true;
}

// --- ALUR 2: KLIK SAVE & ISIAN BARU ---
btnSimpanBaru.addEventListener('click', function() {
    // Jalankan fungsi simpan, jika sukses lakukan pengosongan form
    if (simpanDataKeDatabase()) {
        alert("Data Berhasil Tersimpan di Browser! Silakan isi data baru selanjutnya.");
        formPendaftaran.reset();
    }
});

// --- ALUR 3: KLIK SELESAI ---
btnSelesai.addEventListener('click', function() {
    // Jalankan fungsi simpan, jika sukses pindah ke halaman terima kasih
    if (simpanDataKeDatabase()) {
        halamanForm.classList.add('hidden');
        halamanSelesai.classList.remove('hidden');
        formPendaftaran.reset();
    }
});

// --- ALUR KEMBALI KE AWAL ---
btnKembali.addEventListener('click', function() {
    halamanSelesai.classList.add('hidden');
    halamanAwal.classList.remove('hidden');
});
// --- JALUR EKSPOR DATA KE EXCEL (.CSV) ---
const btnDownloadExcel = document.getElementById('btnDownloadExcel');

btnDownloadExcel.addEventListener('click', function() {
    // 1. Ambil data dari LocalStorage
    let databaseLama = JSON.parse(localStorage.getItem('databaseProyekAde')) || [];

    if (databaseLama.length === 0) {
        alert("Belum ada data yang tersimpan untuk diekspor!");
        return;
    }

    // 2. Membuat baris judul kolom Excel (Header)
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nama Lengkap,Alamat Email,Nomor HP,Waktu Input\n";

    // 3. Memasukkan setiap data personil ke dalam baris-baris Excel
    databaseLama.forEach(function(row) {
        let baris = `"${row.namaLengkap}","${row.emailUser}","${row.nomorHp}","${row.waktuInput}"\n`;
        csvContent += baris;
    });

    // 4. Proses download otomatis file Excel oleh browser
    const encodedUri = encodeURI(csvContent);
    const linkDownload = document.createElement("a");
    linkDownload.setAttribute("href", encodedUri);
    linkDownload.setAttribute("download", "Laporan_Database_Proyek_Ade.csv");
    document.body.appendChild(linkDownload);
    
    linkDownload.click(); // Membuat simulasi klik download otomatis
    document.body.removeChild(linkDownload);
});

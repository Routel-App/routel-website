import type { LegalTranslationCopy } from "./types";
import { CONTACT_EMAIL, ENTITY, PRIVACY_EMAIL } from "./terms";

/**
 * The terms of use in Bahasa Indonesia (Indonesian law expects Indonesian
 * for agreements with Indonesian parties). A faithful translation of the
 * English text in terms.ts: keep the two in step.
 */
export const termsId: LegalTranslationCopy = {
  metaTitle: "Ketentuan Penggunaan",
  metaDescription: "Ketentuan yang mendasari ROUTEL dalam menyediakan situs web, versi gratis, uji coba gratis, dan paket berbayarnya.",
  eyebrow: "Hukum",
  title: "Ketentuan Penggunaan",
  lead: "Ketentuan ini mengatur penggunaan ROUTEL oleh Anda: situs web, versi gratis, uji coba gratis, dan paket berbayar. Dengan membuat akun atau menggunakan layanan, Anda menyetujui ketentuan ini.",
  updated: "Terakhir diperbarui",
  entity: `Layanan ini disediakan oleh ${ENTITY} (“ROUTEL”, “kami”).`,
  prevails:
    "Ketentuan ini merupakan terjemahan dari versi bahasa Inggris. Apabila terdapat perbedaan antara versi-versi tersebut, versi bahasa Inggris yang berlaku, kecuali apabila peraturan perundang-undangan mewajibkan versi bahasa Indonesia yang berlaku.",
  sections: [
    {
      title: "1. Layanan",
      body: [
        "ROUTEL adalah sistem operasi yang di-hosting untuk perusahaan pelayaran dan logistik: pemesanan, penawaran harga, Bill of Lading, faktur, penagihan, akuntansi, dokumen, asisten AI, dan modul yang tercantum di halaman harga. Apa yang termasuk dalam setiap paket, beserta harganya, tercantum di halaman harga dan merupakan bagian dari ketentuan ini.",
        "Layanan ini ditujukan untuk penggunaan bisnis oleh perusahaan dan staf mereka yang berwenang. Layanan ini tidak ditawarkan kepada konsumen atau kepada siapa pun yang berusia di bawah 18 tahun.",
      ],
    },
    {
      title: "2. Akun Anda",
      body: [
        "Anda membuat akun atas nama sebuah perusahaan dan menyatakan bahwa Anda berwenang untuk mengikat perusahaan tersebut. Anda wajib menjaga kerahasiaan data masuk (sign-in) Anda, dan Anda bertanggung jawab atas segala hal yang dilakukan melalui akun perusahaan Anda. Segera beri tahu kami jika Anda menduga adanya penggunaan tanpa izin.",
        "Satu langganan mencakup satu perusahaan (satu pendaftaran usaha). Cabang dan grup usaha dicakup oleh paket Enterprise.",
        "Informasi yang Anda berikan kepada kami tentang perusahaan Anda harus akurat dan selalu diperbarui.",
      ],
    },
    {
      title: "3. Uji coba gratis dan versi gratis",
      body: [
        "Setiap akun baru dimulai dengan uji coba 14 hari paket Growth, termasuk pembacaan dokumen dengan AI untuk 30 dokumen. Ketika uji coba berakhir, akun beralih ke versi gratis kecuali Anda berlangganan paket berbayar.",
        "Versi gratis mencakup satu kegiatan usaha, 5 pemesanan per bulan, satu pengguna, asisten penyiapan perusahaan, dan faktur pendahuluan. Hasil cetak dari versi gratis memuat tanda “Made with Routel”. Dukungan pada versi gratis berupa panduan pengguna.",
        "Pada versi gratis, dan selama uji coba sejak hari pertamanya, ROUTEL hanya menerbitkan “faktur pendahuluan”. Faktur ini tidak berjudul “faktur pajak” dan bukan faktur resmi. Penerbitan faktur pajak dari sistem penagihan yang disetujui merupakan tanggung jawab perusahaan Anda; Anda dapat mengaitkan faktur tersebut dengan pemesanan melalui nomornya atau dengan mengunggah berkasnya. Faktur tetap berjenis sesuai saat diterbitkan: faktur pendahuluan tetap menjadi faktur pendahuluan setelah Anda berlangganan.",
        "Kami dapat mengubah batasan versi gratis. Kami akan menampilkan perubahan tersebut di dalam layanan atau di halaman harga sebelum berlaku.",
      ],
    },
    {
      title: "4. Paket berbayar",
      body: [
        "Paket berbayar adalah langganan, ditagih bulanan atau tahunan sesuai harga di halaman harga. Setiap paket berbayar memiliki pengguna tanpa batas dan tanpa biaya implementasi.",
        "Pada paket berbayar, apabila negara Anda mengenakan PPN atau pajak penjualan, faktur pajak diterbitkan di dalam ROUTEL. Bagi perusahaan di Arab Saudi, faktur tersebut sesuai dengan ketentuan faktur elektronik Otoritas Zakat, Pajak, dan Kepabeanan (ZATCA). Anda tetap bertanggung jawab atas data perpajakan yang dimasukkan perusahaan Anda dan atas faktur yang diterbitkannya.",
        "Biaya yang kami teruskan kepada Anda, seperti biaya pemerintah untuk koneksi ke sistem pemerintah, Bill of Lading elektronik, atau pemberitahuan pabean, ditampilkan secara terpisah sebelum Anda menanggungnya.",
        "Kami dapat mengubah harga suatu paket dengan pemberitahuan paling lambat 30 hari sebelumnya; harga baru berlaku mulai periode penagihan Anda berikutnya. Harga pelanggan perintis dikunci selama jangka waktu yang disebutkan dalam penawaran.",
        "Anda dapat membatalkan kapan saja dari akun Anda atau dengan menulis kepada kami. Pembatalan berlaku pada akhir periode penagihan berjalan, dan biaya yang telah dibayar tidak dikembalikan kecuali diwajibkan oleh hukum. Ketika paket berbayar berakhir atau tidak diperpanjang, akun beralih ke versi gratis; tidak ada yang dihapus.",
        "Jika suatu pembayaran terlambat, kami dapat menangguhkan akses ke fitur berbayar setelah memberi tahu Anda dan memberikan waktu untuk membayar. Data Anda tetap disimpan, tidak dihapus, selama akses ditangguhkan.",
      ],
    },
    {
      title: "5. Data Anda",
      body: [
        "Segala yang Anda masukkan ke dalam ROUTEL, termasuk mitra bisnis, pengiriman, dokumen, faktur, dan pembukuan Anda, adalah milik Anda. Kami memprosesnya hanya untuk menyediakan layanan, sebagaimana dijelaskan dalam kebijakan privasi, dan kami tidak menjualnya.",
        "Anda bertanggung jawab atas data yang Anda masukkan, termasuk data pribadi pelanggan, pemasok, dan staf Anda, serta atas hak Anda untuk memasukkannya. Apabila ROUTEL memproses data pribadi atas nama Anda, kami bertindak sebagai Prosesor Data Pribadi dan Anda sebagai Pengendali Data Pribadi.",
        "Anda dapat mengekspor data Anda kapan saja selama akun Anda ada. Beralih ke versi gratis bukan merupakan penutupan akun. Ketika Anda menutup akun, kami mengekspor data Anda atas permintaan dalam jangka waktu 30 hari, lalu menghapusnya dari layanan aktif dalam jangka waktu 90 hari, kecuali catatan yang wajib kami simpan menurut hukum. Cadangan dibuat setiap 24 jam dan tidak dihapus berdasarkan jadwal: data yang dihapus dari layanan tetap ada di cadangan sebelumnya sampai cadangan tersebut dihapus, dan atas permintaan terverifikasi kami menghapusnya dari cadangan tersebut atau membuatnya tidak dapat digunakan, sebagaimana disyaratkan hukum yang berlaku.",
      ],
    },
    {
      title: "6. Pemrosesan data",
      body: [
        "Apabila ROUTEL memproses data pribadi atas nama Anda, komitmen berikut berlaku:",
        "- kami memprosesnya hanya berdasarkan instruksi Anda yang terdokumentasi, yaitu layanan sebagaimana Anda konfigurasi dan gunakan;\n- staf dan kontraktor kami yang dapat mengaksesnya terikat kewajiban kerahasiaan;\n- kami menggunakan subprosesor yang tercantum dalam kebijakan privasi, dan kami memberikan pemberitahuan paling lambat 30 hari sebelumnya tentang subprosesor baru di situs web atau melalui email, agar Anda dapat mengajukan keberatan;\n- kami membantu Anda menanggapi permintaan dari pemilik data;\n- kami memberi tahu Anda tentang kegagalan pelindungan data pribadi yang memengaruhi data Anda tanpa penundaan yang tidak semestinya, dan dalam hal apa pun paling lambat 48 jam setelah memastikannya;\n- ketika akun Anda ditutup, kami mengembalikan data Anda atas permintaan lalu menghapusnya, sebagaimana diatur di bagian 5;\n- atas permintaan, kami memberikan informasi yang secara wajar diperlukan untuk menunjukkan bahwa kami memenuhi komitmen ini.",
      ],
    },
    {
      title: "7. Asisten AI",
      body: [
        "Asisten AI membaca dokumen, menyiapkan draf catatan, dan menjawab pertanyaan. Segala yang diusulkannya untuk disimpan menunggu konfirmasi seseorang, dan setiap tindakan yang dilakukannya dicatat.",
        "Hasil asisten dapat keliru. Kode HS yang diusulkannya, angka yang dibacanya dari dokumen, dan jawaban yang diberikannya merupakan usulan untuk diperiksa seseorang; Anda tetap bertanggung jawab atas apa yang dikonfirmasi, diterbitkan, dan diajukan perusahaan Anda.",
        "Dokumen dan pesan yang Anda minta untuk dibaca asisten diproses oleh penyedia AI pihak ketiga, sebagaimana dijelaskan dalam kebijakan privasi.",
      ],
    },
    {
      title: "8. Penggunaan yang diperbolehkan",
      body: [
        "Anda setuju untuk tidak:",
        "- menggunakan layanan untuk hal yang melanggar hukum, atau memasukkan data yang tidak berhak Anda masukkan;\n- mencoba memperoleh akses ke data perusahaan lain, atau ke sistem layanan di luar akun Anda sendiri;\n- menjual kembali layanan, atau menggunakannya untuk membangun produk pesaing;\n- mengganggu operasional layanan, atau membebaninya melebihi penggunaan bisnis yang wajar.",
        "Kami dapat menangguhkan akun yang melanggar ketentuan ini, setelah memberi tahu Anda, kecuali risiko terhadap layanan atau pelanggan lain mengharuskan kami bertindak terlebih dahulu.",
      ],
    },
    {
      title: "9. Layanan pihak ketiga",
      body: [
        "Proses masuk (sign-in), hosting, penyimpanan berkas, sinkronisasi email (ketika Anda menghubungkan kotak surat Microsoft 365 atau Zoho), dan pemrosesan AI disediakan melalui layanan pihak ketiga yang disebutkan dalam kebijakan privasi. Penggunaan kotak surat yang Anda hubungkan juga tunduk pada ketentuan penyedia tersebut.",
      ],
    },
    {
      title: "10. Ketersediaan dan dukungan",
      body: [
        "Kami berupaya menjaga ketersediaan layanan, dengan pemeliharaan diumumkan terlebih dahulu bila memungkinkan. Dukungan sesuai dengan yang tercantum untuk paket Anda di halaman harga. Perjanjian tingkat layanan (SLA) hanya merupakan bagian dari paket Enterprise.",
        "Apabila kami menghentikan layanan ini, kami akan memberi tahu Anda terlebih dahulu, melalui email dan di dalam layanan, dan Anda dapat mengekspor data Anda sebelum layanan berakhir.",
      ],
    },
    {
      title: "11. Kekayaan intelektual",
      body: [
        "ROUTEL, perangkat lunak, desain, dokumentasi, dan namanya adalah milik kami atau pemberi lisensi kami. Ketentuan ini memberi Anda hak untuk menggunakan layanan bagi kegiatan usaha perusahaan Anda selama akun Anda aktif, dan tidak lebih dari itu.",
      ],
    },
    {
      title: "12. Penafian dan batasan tanggung jawab",
      body: [
        "Versi gratis dan uji coba disediakan sebagaimana adanya, tanpa jaminan. Untuk paket berbayar, kami menyediakan layanan dengan keahlian dan kehati-hatian yang wajar, dan kami tidak menjamin bahwa layanan akan bebas gangguan atau bebas kesalahan.",
        "Sejauh diizinkan oleh hukum, total tanggung jawab kami kepada Anda atas seluruh klaim dibatasi pada jumlah yang lebih besar antara biaya yang Anda bayarkan kepada kami dalam 12 bulan sebelum klaim dan USD 100. Kami tidak bertanggung jawab atas kerugian tidak langsung atau kehilangan keuntungan, atas kehilangan data akibat kelalaian Anda menyimpan atau mengekspor salinannya padahal Anda secara wajar dapat melakukannya, atau atas sanksi regulasi yang timbul dari dokumen yang dikonfirmasi, diterbitkan, atau diajukan perusahaan Anda.",
        "Batasan ini tidak berlaku terhadap tanggung jawab atas penipuan, kesalahan yang disengaja, atau kelalaian berat, atau atas pelanggaran kewajiban kerahasiaan atau pelindungan data kami, dan tidak ada ketentuan dalam ketentuan ini yang membatasi tanggung jawab yang tidak dapat dibatasi menurut hukum.",
      ],
    },
    {
      title: "13. Perubahan ketentuan ini",
      body: [
        "Kami dapat memperbarui ketentuan ini. Apabila perubahannya penting, kami akan memberi tahu Anda di dalam layanan atau melalui email paling lambat 30 hari sebelum berlaku. Penggunaan layanan setelah tanggal tersebut berarti Anda menerima ketentuan yang diperbarui.",
      ],
    },
    {
      title: "14. Hukum yang berlaku dan penyelesaian sengketa",
      body: [
        "Setiap langganan diperuntukkan bagi satu perusahaan di satu negara, yaitu negara tempat penerapan ROUTEL perusahaan tersebut. Ketentuan ini diatur oleh hukum negara tempat perusahaan Anda terdaftar.",
        "Setiap sengketa yang timbul dari atau sehubungan dengan ketentuan ini yang tidak dapat diselesaikan secara musyawarah akan diselesaikan secara final melalui arbitrase dengan tempat kedudukan di negara tersebut, berdasarkan peraturan lembaga arbitrase utamanya: di Arab Saudi, Saudi Center for Commercial Arbitration (SCCA); di Qatar, Qatar International Center for Conciliation and Arbitration (QICCA); di Malaysia, Asian International Arbitration Centre (AIAC); di Indonesia, Badan Arbitrase Nasional Indonesia (BANI). Arbitrase akan dilaksanakan dalam bahasa Inggris atau bahasa Arab, sesuai kesepakatan para pihak, atau dalam bahasa resmi negara tempat kedudukan arbitrase apabila diwajibkan oleh hukum (misalnya, bahasa Indonesia di Indonesia). Masing-masing pihak dapat memohon tindakan sementara yang mendesak kepada pengadilan yang berwenang.",
      ],
    },
    {
      title: "15. Kontak",
      body: [`Pertanyaan tentang ketentuan ini: ${CONTACT_EMAIL}. Segala hal terkait data pribadi: ${PRIVACY_EMAIL}.`],
    },
  ],
};

A1. 
Perhatikan kode berikut:
function Profil({ sudahLogin }) {
 if (sudahLogin) {
 const [nama, setNama] = useState("");
 }
 // ...
}
Mengapa penulisan ini melanggar aturan Hooks? Jelaskan bagaimana React mencocokkan sebuah state dengan
Hook yang memanggilnya, lalu tuliskan perbaikannya.

JAWABAN=  karena Hooks harus 
dipanggil pada level atas dari komponen fungsional dan gaboleh dipanggil 
di dalam kondisi atau kondisi if. `useState` dipanggil 
di dalam blok if,  jika `sudahLogin` bernilai false, 
maka `useState` tidak akan dipanggil. Hal ini menyebabkan React gabisa 
mencocokkan state dengan Hook yang manggil, karna urutan pemanggilan Hooks 
harus konsisten pada setiap render. 
PERBAIKAN: 

function Profil({ sudahLogin }) {
 const [nama, setNama] = useState("");
 if (sudahLogin) {
 // ...
 }
}


A2. 
Seorang mahasiswa menulis kode berikut dan heran karena layar tidak berubah, padahal console.log(items)
menunjukkan datanya sudah bertambah.
const tambah = (baru) => {
 items.push(baru);
 setItems(items);
};
Jelaskan penyebabnya, lalu tuliskan perbaikannya.

JAWABAN=  Penyebabnya : karena React tidak mendeteksi perubahan pada 
state `items` ketika kita memodifikasi array secara langsung menggunakan `push`. 
React hanya mendeteksi perubahan jika kita membuat referensi baru untuk state tersebut. 
Dengan memodifikasi array yang sama, React menganggap state tidak berubah dan tidak 
melakukan re-render / render ulang.

Perbaikan: 
const tambah = (baru) => {
 setItems([...items, baru]); // disini buat array baru dengan tambah item baru 

};


A3. 
Jelaskan perbedaan perilaku ketiga bentuk berikut, dan sebutkan dua kesempatan ketika cleanup function
dijalankan.
useEffect(() => { ... }); // (a)
useEffect(() => { ... }, []); // (b)
useEffect(() => { ... }, [kota]); // (c)

JAWABAN=
Perbedaan perilaku ketiga bentuk useEffect adalah sebagai berikut:
(a) useEffect(() => { ... }); // (a) akan dijalankan setiap kali komponen di render, mau saat pertama kali atau setiap kali ada perubahan state atau props.
(b) useEffect(() => { ... }, []); // (b) hanya akan dijalankan sekali, yaitu saat komponen pertama kali dirender. 
(c) useEffect(() => { ... }, [kota]); // (c) akan dijalankan setiap kali nilai `kota` berubah. bisa dipakai untuk melakukan efek samping 
yang bergantung pada perubahan nilai tertentu.


A4.
Sebuah aplikasi punya komponen FilterBar dan DaftarMenu yang bersaudara. Keduanya membutuhkan kata
kunci pencarian yang sama. Di komponen mana state keyword sebaiknya disimpan, dan mengapa? Jelaskan pula
apa yang “naik” dari FilterBar ke induknya: data, atau sesuatu yang lain?

JAWABAN= menurut saya sebaiknya disimpan di komponen induk dari FilterBar dan DaftarMenu, contoh di komponen App atau komponen yang 
membungkus kedua komponen tsb. karena ketika pengguna mengetikkan kata kunci di Filter Bar, komponen tsb akan
mengirimkan data keyword ke induknya melalui fungsi callback (props). 



A5. 
Apa yang dimaksud controlled component? Jelaskan pula mengapa satu fungsi handleChange dapat menangani
sepuluh input sekaligus, dengan menyebut dua hal yang membuatnya bekerja.

JAWABAN= Controlled component adalah komponen input form yang nilai dan perilakunya di kontrol oleh state React.
nilai input diatur oleh state, dan setiap perubahan pada input akan meiccu event handler (handleChange) untuk memperbarui state.
Satu fungsi handleChange dapat menangani sepuluh input sekaligus karena :
1. Setiap input memiliki atribut `name` yang unik, hingga handleChange dapat mengidentifikasi input mana yang sedang diubah.
2. Fungsi handleChange menggunakan event.target.name untuk menentukan state mana yang harus diperbarui



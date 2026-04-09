document.addEventListener("DOMContentLoaded", function () {

    let buku = JSON.parse(localStorage.getItem('buku')) || [
        {
            id:1,
            judul:"Clean Code",
            kategori:"Teknologi",
            img:"img/clean-code.jpg",
            link:"https://www.google.com/search?q=clean+code+ebook+buy"
        },
        {
            id:2,
            judul:"JavaScript: The Good Parts",
            kategori:"Teknologi",
            img:"img/javascript-the-good-parts.jpg",
            link:"https://www.google.com/search?q=javascript+the+good+parts+ebook+buy"
        },
        {
            id:3,
            judul:"Strategi Belajar Efektif",
            kategori:"Pendidikan",
            img:"img/strategi-belajar-efektif.jpg",
            link:"https://www.google.com/search?q=buku+strategi+belajar+efektif+ebook"
        },
        {
            id:4,
            judul:"Bumi (Tere Liye)",
            kategori:"Novel",
            img:"img/bumi-tere-liye.jpg",
            link:"https://www.google.com/search?q=bumi+tere+liye+ebook+gramedia"
        },
        {
            id:5,
            judul:"Kumpulan Cerita Nusantara",
            kategori:"Dongeng",
            img:"img/kumpulan-cerita-nusantara.jpg",
            link:"https://www.google.com/search?q=cerita+rakyat+nusantara+ebook"
        }
    ];

    function save() {
        localStorage.setItem('buku', JSON.stringify(buku));
    }

    function render() {
        const list = document.getElementById('list');
        const search = document.getElementById('search').value.toLowerCase();
        const filter = document.getElementById('filter').value;

        list.innerHTML = '';

        buku
        .filter(b => b.judul.toLowerCase().includes(search))
        .filter(b => filter === '' || b.kategori === filter)
        .forEach(item => {

            const div = document.createElement('div');
            div.className = 'card';

            div.innerHTML = `
                <h3>${item.judul}</h3>

                <!-- ✅ GAMBAR -->
                <img src="${item.img}" class="cover">

                <!-- ✅ KATEGORI -->
                <span class="badge">${item.kategori}</span>

                <!-- ✅ LINK BUKU -->
                <a href="${item.link}" target="_blank" class="link-buku">
                    📖 Baca Buku
                </a>

                <div class="actions">
                    <button class="edit" data-id="${item.id}">Edit</button>
                    <button class="delete" data-id="${item.id}">Hapus</button>
                </div>
            `;

            list.appendChild(div);
        });
    }

    function tambahBuku() {
        const judul = document.getElementById('judul').value;
        const kategori = document.getElementById('kategori').value;

        if (!judul || !kategori) return alert('Isi semua!');

        // auto generate nama gambar
        const namaFile = judul.toLowerCase().replace(/ /g, "-");

        buku.push({
            id: Date.now(),
            judul,
            kategori,
            img: `img/${namaFile}.jpg`,
            link: "#"
        });

        save();
        render();

        document.getElementById('judul').value = "";
        document.getElementById('kategori').value = "";
    }

    function hapusBuku(id) {
        buku = buku.filter(b => b.id != id);
        save();
        render();
    }

    function editBuku(id) {
        const item = buku.find(b => b.id == id);

        const judulBaru = prompt('Edit judul:', item.judul);
        const kategoriBaru = prompt('Edit kategori:', item.kategori);

        if (judulBaru && kategoriBaru) {

            const namaFile = judulBaru.toLowerCase().replace(/ /g, "-");

            item.judul = judulBaru;
            item.kategori = kategoriBaru;
            item.img = `img/${namaFile}.jpg`;

            save();
            render();
        }
    }

    // EVENT BUTTON
    document.getElementById('list').addEventListener('click', function(e){
        if(e.target.classList.contains('delete')){
            hapusBuku(e.target.dataset.id);
        }
        if(e.target.classList.contains('edit')){
            editBuku(e.target.dataset.id);
        }
    });

    document.getElementById('btnTambah').addEventListener('click', tambahBuku);
    document.getElementById('search').addEventListener('input', render);
    document.getElementById('filter').addEventListener('change', render);

    // 🌙 DARK MODE
    const btn = document.getElementById("toggleMode");

    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark");
        btn.textContent = "☀️";
    }

    btn.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("mode", "dark");
            btn.textContent = "☀️";
        } else {
            localStorage.setItem("mode", "light");
            btn.textContent = "🌙";
        }
    });

    // VALIDASI FORM
    document.getElementById("pinjamForm").addEventListener("submit", function(e){

        e.preventDefault();
        let valid = true;

        const nama = document.getElementById("nama");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const nohp = document.getElementById("nohp");
        const jenis = document.getElementById("jenis");

        document.getElementById("errNama").textContent = "";
        document.getElementById("errEmail").textContent = "";
        document.getElementById("errPass").textContent = "";
        document.getElementById("errHp").textContent = "";
        document.getElementById("errJenis").textContent = "";

        if(nama.value.trim() === ""){
            document.getElementById("errNama").textContent = "Nama wajib diisi";
            valid = false;
        }

        if(!email.value.includes("@")){
            document.getElementById("errEmail").textContent = "Email tidak valid";
            valid = false;
        }

        if(!/\d/.test(password.value)){
            document.getElementById("errPass").textContent = "Password harus ada angka";
            valid = false;
        }

        if(nohp.value.trim() === ""){
            document.getElementById("errHp").textContent = "No HP wajib diisi";
            valid = false;
        }

        if(jenis.value === ""){
            document.getElementById("errJenis").textContent = "Pilih jenis buku";
            valid = false;
        }

        if(valid){
            alert("Peminjaman berhasil!");
            this.reset();
        }

    });

    render();

});
const QTYinput = document.querySelectorAll('.Quantity');


function defaultValue() {
if(this.value == 0){
  this.value = '1';
}

if(QTYinput.value >= 100){
    this.value = '100'
}
}
function MaxValue() {
  if(this.value >= 100){
  this.value = '100';
}
}
for (const QTY of QTYinput) {
          QTY.addEventListener('blur', defaultValue);
          QTY.addEventListener('input', MaxValue)
        }


// Script Menghitung total
document.addEventListener('DOMContentLoaded', () => {
    const totalDiv = document.querySelector('.total');
    const products = document.querySelectorAll('.card');

    function updateTotal() {
        let totalHarga = 0;
        let totalItemsHTML = '';

        products.forEach(product => {
            const checkbox = product.querySelector('.product-checkbox');
            const qtyInput = product.querySelector('input[type="number"]');
            const productName = product.querySelector('h3').textContent;
            const price = parseInt(product.dataset.price);

            if (checkbox.checked) {
                const qty = parseInt(qtyInput.value) || 0;
                if (qty > 0) {
                    const itemTotal = price * qty;
                    totalHarga += itemTotal;
                    totalItemsHTML += `<p>${productName}: ${qty} x Rp${price.toLocaleString('id-ID')} = Rp${itemTotal.toLocaleString('id-ID')}</p>`;
                }
            }
        });

        if (totalItemsHTML === '') {
            totalDiv.innerHTML = '<p>Pilih produk untuk melihat total harga</p>';
        } else {
            totalDiv.innerHTML = totalItemsHTML;
            totalDiv.innerHTML += `<h3>Total: Rp${totalHarga.toLocaleString('id-ID')}</h3>`;
        }
    }

    // Tambahkan Script ke setiap produk
    products.forEach(product => {
        const checkbox = product.querySelector('.product-checkbox');
        const qtyInput = product.querySelector('input[type="number"]');
        const plusBtn = product.querySelector('.plusbtn');
        const minBtn = product.querySelector('.minbtn');

        // Script untuk checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked && (parseInt(qtyInput.value) === 0 || isNaN(parseInt(qtyInput.value)))) {
                qtyInput.value = 1;
            } else if (!checkbox.checked) {
                qtyInput.value = 0;
            }
            updateTotal();
        });

        // Script untuk quantity
        qtyInput.addEventListener('input', () => {
            if (parseInt(qtyInput.value) > 0) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            updateTotal();
        });

        // Script untuk tombol +/-
        plusBtn.addEventListener('click', () => {
            setTimeout(() => {
                if (parseInt(qtyInput.value) > 0) {
                    checkbox.checked = true;
                }
                updateTotal();
            }, 50);
        });

        minBtn.addEventListener('click', () => {
            setTimeout(() => {
                if (parseInt(qtyInput.value) === 0) {
                    checkbox.checked = false;
                }
                updateTotal();
            }, 50);
        });
    });

    updateTotal();
});

const orderbtn = document.getElementById('order');
const verifikasiNode = document.querySelector('.verifikasi');
let isClicked = false;
orderbtn.addEventListener('click', () => {
  // verifikasiNode.classList.toggle('clickedOrder');
  verifikasiNode.style.display = 'inline-block'
  isClicked = true;
  if(isClicked = true){
    orderbtn.disabled = true; 
  }
})

const cancelbtn = document.querySelector('.cancel');
cancelbtn.addEventListener('click', () => {
  verifikasiNode.style.display = 'none'
  isClicked = false;
  orderbtn.disabled = false; 
  
})

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// Server //////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const yesBtn = document.querySelector('.yes');

yesBtn.addEventListener('click', () => {
    const nama = document.querySelector('.inputNama').value.trim();
    const alamat = document.querySelector('.inputAlamat').value.trim();
    const products = document.querySelectorAll('.card');

    if (!nama || !alamat) {
        alert('Nama dan alamat wajib diisi!');
        verifikasiNode.style.display = 'none';
        orderbtn.disabled = false;
        return;
    }

    let daftarProduk = '';
    let totalHarga = 0;

    products.forEach(product => {
        const checkbox = product.querySelector('.product-checkbox');
        const qtyInput = product.querySelector('input[type="number"]');
        const productName = product.querySelector('h3').textContent;
        const price = parseInt(product.dataset.price);
        const qty = parseInt(qtyInput.value) || 0;

        if (checkbox.checked && qty > 0) {
            const subtotal = price * qty;
            totalHarga += subtotal;
            daftarProduk += `${productName} (${qty} x Rp${price.toLocaleString('id-ID')}) = Rp${subtotal.toLocaleString('id-ID')}\n`;
        }
    });

    if (!daftarProduk) {
        alert("Silakan pilih produk terlebih dahulu.");
        verifikasiNode.style.display = 'none';
        orderbtn.disabled = false;
        return;
    }

    const data = {
        nama: nama,
        alamat: alamat,
        daftarProduk: daftarProduk,
        totalHarga: `Rp${totalHarga.toLocaleString('id-ID')}`
    };

    // Ganti URL di bawah dengan URL Google Apps Script kamu
    fetch("https://script.google.com/macros/s/AKfycbwIAoyQ11OIWEhCLkt4go2qkWV6OTtevb3YI4EuBUVf02q2EI0qucQ7WXYtA-VMhdA-/exec", {
        method: "POST",
        mode: "no-cors", // SEMENTARA
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
.then(res => {
    console.log("Response from Apps Script:", res);
    if (res.result === "success") {
        alert("Pesanan berhasil dikirim!");
        location.reload();
    } else {
        alert("Gagal mengirim pesanan: " + (res.message || "Tanpa pesan error"));
    }
})
.catch(err => {
    console.error("Fetch error:", err);
    alert("Terjadi kesalahan saat mengirim data.");
});

    verifikasiNode.style.display = 'none';
});




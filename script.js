const QTYinput = document.querySelectorAll('.Quantity');
const dataPemesananDiv = document.querySelector('.dataPemesanan');
const containerDiv = document.querySelector('.container');
const TotalContainerDiv = document.querySelector('.TotalContainer');
const textMengirimH3 = document.querySelector('.textMengirim');
const progressContainerDiv = document.querySelector('.progress-container');
const selesaiDiv = document.querySelector('.selesai');
const ErrorMessageDiv = document.querySelector('.errorMessage');
const ErrorMessage = document.getElementById('Message');

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
    const totalPembayaranDiv = document.querySelector('.TotalPembayaran')
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
                    totalItemsHTML += `<p>${productName} (${qty} x Rp${price.toLocaleString('id-ID')}) : Rp${itemTotal.toLocaleString('id-ID')}</p>`;
                }
            }
        });

        if (totalItemsHTML === '') {
            totalDiv.innerHTML = '<p>Pilih produk untuk melihat total harga</p>';
        } else {
            totalDiv.innerHTML = totalItemsHTML;
            
        }
        if (totalHarga === ''){
            totalPembayaranDiv.innerHTML = `<h3>Rp${totalHarga.toLocaleString('id-ID')}</h3>`;
        } else {
            totalPembayaranDiv.innerHTML = `<h3>Rp${totalHarga.toLocaleString('id-ID')}</h3>`;
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
    PrevBTN.disabled = true;
  }
})

const cancelbtn = document.querySelector('.cancel');
cancelbtn.addEventListener('click', () => {
  verifikasiNode.style.display = 'none'
  isClicked = false;
  orderbtn.disabled = false; 
  PrevBTN.disabled = false;
  
})


// Next & Prev
const NextBTN = document.getElementById('Next');
const PrevBTN = document.getElementById('Prev');
PrevBTN.disabled = true;
PrevBTN.style.opacity = 0.5;

let NoHalaman = 1;

NextBTN.addEventListener('click', () => {
    NoHalaman++
    if(NoHalaman == 1){
        // console.log('Halaman 1');

        dataPemesananDiv.style.display = 'block'
        containerDiv.style.display = 'none'
        TotalContainerDiv.style.display = 'none'

    } else if(NoHalaman == 2){
        // console.log('Halaman 2');
        PrevBTN.disabled = false;
        PrevBTN.style.opacity = 1;

        dataPemesananDiv.style.display = 'none'
        containerDiv.style.display = 'block'
        TotalContainerDiv.style.display = 'none'

    } else if(NoHalaman == 3){
        // console.log('Halaman 3');

        NextBTN.disabled = true;
        NextBTN.style.opacity = 0.5;

        dataPemesananDiv.style.display = 'none'
        containerDiv.style.display = 'none'
        TotalContainerDiv.style.display = 'block'

    }
});

PrevBTN.addEventListener('click', () => {
    NoHalaman--
    if(NoHalaman == 1){
        // console.log('Halaman 1');

        PrevBTN.disabled = true;
        PrevBTN.style.opacity = 0.5;


        dataPemesananDiv.style.display = 'block'
        containerDiv.style.display = 'none'
        TotalContainerDiv.style.display = 'none'

    } else if(NoHalaman == 2){
        // console.log('Halaman 2');

        NextBTN.disabled = false;
        NextBTN.style.opacity = 1;

        dataPemesananDiv.style.display = 'none'
        containerDiv.style.display = 'block'
        TotalContainerDiv.style.display = 'none'

    } else if(NoHalaman == 3){
        // console.log('Halaman 3');

        dataPemesananDiv.style.display = 'none'
        containerDiv.style.display = 'none'
        TotalContainerDiv.style.display = 'block'

    }
})
// .style.animation = '.5s FadeOut forwards';
// .style.animation = '.5s FadeIn forwards';
// if(NoHalaman == 1){
//     dataPemesananDiv.style.display = 'block'
//     containerDiv.style.display = 'none'
//     TotalContainerDiv.style.display = 'none'
// } else if (NoHalaman == 2){
//     dataPemesananDiv.style.display = 'none'
//     containerDiv.style.display = 'block'
//     TotalContainerDiv.style.display = 'none'
// } else if (NoHalaman == 3){
//     dataPemesananDiv.style.display = 'none'
//     containerDiv.style.display = 'none'
//     TotalContainerDiv.style.display = 'block'
// }



///////////////////////////////////////////////////////////////////////////
///////////////////////////////// Server //////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const yesBtn = document.querySelector('.yes');

yesBtn.addEventListener('click', () => {
    const nama = document.querySelector('.inputNama').value.trim();
    const alamat = document.querySelector('.inputAlamat').value.trim();
    const products = document.querySelectorAll('.card');
    const progressBar = document.querySelector('.progress-bar');
    const loadingContainer = document.querySelector('.loading');

    if (!nama || !alamat) {
        ErrorMessageDiv.style.display = 'flex';
        ErrorMessage.textContent = 'Nama dan alamat wajib diisi!';
        ErrorMessageDiv.style.animation = 'FadeInTop .3s forwards'

        setTimeout(() => {
            ErrorMessageDiv.style.animation = 'FadeOutTop .3s forwards'
            setTimeout(() => {
                ErrorMessageDiv.style.display = 'none';
                ErrorMessage.textContent = '';
            }, 300);
        }, 4000);

        orderbtn.disabled = false; 
        PrevBTN.disabled = false;

        verifikasiNode.style.display = 'none';
        loadingContainer.style.display = 'none'
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
            // daftarProduk += `${productName} (${qty}) Rp${price.toLocaleString('id-ID')} = Rp${subtotal.toLocaleString('id-ID')}\n`;
            
            // daftarProduk += `${productName} (${qty}) = Rp${subtotal.toLocaleString('id-ID')}`;
            daftarProduk += (daftarProduk.length > 0 ? '\n' : '') + `${productName} (${qty}) = Rp${subtotal.toLocaleString('id-ID')}`;
        }
    });

    if (!daftarProduk) {
        ErrorMessageDiv.style.display = 'flex';
        ErrorMessage.textContent = 'Silakan pilih produk terlebih dahulu.';
        ErrorMessageDiv.style.animation = 'FadeInTop .3s forwards'

        setTimeout(() => {
            ErrorMessageDiv.style.animation = 'FadeOutTop .3s forwards'
            setTimeout(() => {
                ErrorMessageDiv.style.display = 'none';
                ErrorMessage.textContent = '';
            }, 300);
        }, 4000);

        orderbtn.disabled = false; 
        PrevBTN.disabled = false;

        verifikasiNode.style.display = 'none';
        loadingContainer.style.display = 'none'
        orderbtn.disabled = false;
        return;
    }

    loadingContainer.style.display = 'inline-block';
    loadingContainer.style.animation = '.5s FadeIn forwards';
    let ProgressValue = 0;
    let ProgressInterval = setInterval(() => {
        ProgressValue += 25; 
        progressBar.style.width = `${ProgressValue}%`

        if(ProgressValue == 100){
            clearInterval(ProgressInterval);
            
            setTimeout(() => {
                
                setTimeout(() => {
                    setTimeout(() => {
                        textMengirimH3.style.animation = '.5s FadeOut forwards';
                        progressContainerDiv.style.animation = '.5s FadeOut forwards';

                        setTimeout(() => {
                            textMengirimH3.style.display = 'none';
                            progressContainerDiv.style.display = 'none';
                        }, 500);
                        
                        selesaiDiv.style.animation = '.5s FadeIn forwards';
                        selesaiDiv.style.animationDelay = '.5s';
                        selesaiDiv.style.display = 'block'
                    setTimeout(() => {
                        loadingContainer.style.animation = '.5s FadeOut forwards';
                    }, 2000);
                    
                    setTimeout(() => {
                loadingContainer.style.display = 'none';
                // window.location.reload();
            }, 2000);
            }, 100);
                }, 500);
                
            }, 300);
            
        }
    }, 1000);

    


    const data = {
        nama: nama,
        alamat: alamat,
        daftarProduk: daftarProduk,
        totalHarga: `Rp${totalHarga.toLocaleString('id-ID')}`
    };

    // Ganti URL di bawah dengan URL Google Apps Script kamu
    
// fetch("https://script.google.com/macros/s/AKfycbxD043F1FOvCWL8JWmqRrRcEzhGHkzV-bA7Iu0Ieu3nTbbh9uWKmq05khv3OzLoZlSnJA/exec", {
//   method: "POST",
//   mode: "no-cors", 
//   headers: {
//     "Content-Type": "text/plain;charset=utf-8"
//   },
//   body: JSON.stringify({
//     nama: nama,
//     alamat: alamat,
//     daftarProduk: daftarProduk,
//     totalHarga: `Rp${totalHarga.toLocaleString('id-ID')}`
//   })
// })
// .then(res => res.text())
// .then(text => {
//   console.log("Response text:", text);
// })
// .catch(err => {
//   console.error("Fetch error:", err);
// });
//     verifikasiNode.style.display = 'none';

    

// const fetch = require('node-fetch');

// Variabel yang ingin Anda kirim

// URL Apps Script yang Anda dapatkan di langkah sebelumnya
const sheetAppUrl = 'https://script.google.com/macros/s/AKfycbwOQsm4Xlyh7NKIo80TjQkCMqVNXnx7rReJpUi-SvU8luxAnUBzg96OpU97uNGqZZfIug/exec'; 

async function sendDataToGoogleSheet() {
    try {
        const response = await fetch(sheetAppUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();
        console.log('Respons dari Google Apps Script:', result);

        // Beri tahu pengguna bahwa data berhasil dikirim
        alert('Data berhasil dikirim ke spreadsheet!');

    } catch (error) {
        console.error('Gagal mengirim data:', error);
        alert('Gagal mengirim data.');
    }
}

sendDataToGoogleSheet();







});


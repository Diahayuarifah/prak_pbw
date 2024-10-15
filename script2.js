// Simulasi nilai tukar mata uang (seharusnya menggunakan API nyata untuk mendapatkan nilai tukar terkini)
const exchangeRates = {
    BHD: {
        USD: 2.65,
        EUR: 2.37,
        JPY: 385.97,
        IDR: 39933.67
    },
    USD: {
        BHD: 0.38,
        EUR: 0.89,
        JPY: 145.67,
        IDR: 15103.75
    },
    EUR: {
        BHD: 0.42,
        USD: 1.12,
        JPY: 164.37,
        IDR: 17000.55
    },
    JPY: {
        BHD: 0.0026,
        USD: 0.0069,
        EUR: 0.0061,
        IDR: 116.62
    },
    IDR: {
        BHD: 0.000025,
        USD: 0.000066,
        EUR: 0.000059,
        JPY: 0.0086
    }
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);  // Mengambil dan mengonversi jumlah ke float
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Validasi input jumlah
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerText = 'Masukkan jumlah yang valid.';
        return;
    }

    // Cek apakah mata uang yang sama dipilih
    if (fromCurrency === toCurrency) {
        document.getElementById('result').innerText = `Tidak perlu konversi, hasilnya sama: ${amount.toFixed(2)} ${fromCurrency}`;
        return;
    }

    // Cek apakah nilai tukar tersedia
    const rate = exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency];
    if (!rate) {
        document.getElementById('result').innerText = 'Nilai tukar tidak tersedia untuk mata uang yang dipilih.';
        return;
    }

    // Hitung konversi
    const result = amount * rate;

    // Tampilkan hasil konversi
    document.getElementById('result').innerText = `Hasil: ${amount.toFixed(2)} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function StudentHousingForm() {
  const [periode, setPeriode] = useState("");
  const [dormOptions, setDormOptions] = useState([
    "Limo",
    "Kebon Nanas",
    "An Nur",
    "Haji Soleh 1",
    "Sasak 2",
    "Sasak 3",
  ]);
  const [selectedDorm, setSelectedDorm] = useState("");
  const [newDorm, setNewDorm] = useState("");
  const [showAddDorm, setShowAddDorm] = useState(false);

  const handlePeriodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const [year, month] = value.split("-");
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    const formatted = `${monthNames[parseInt(month) - 1]} ${year}`;
    setPeriode(formatted);
  };

  const handleDormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "add-new") {
      setShowAddDorm(true);
    } else {
      setSelectedDorm(value);
    }
  };

  const handleAddDorm = () => {
    if (newDorm.trim() === "") return;
    setDormOptions([...dormOptions, newDorm]);
    setSelectedDorm(newDorm);
    setNewDorm("");
    setShowAddDorm(false);
  };

  // 🟢 Tambahkan state baru untuk modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // contoh state untuk validasi (nanti bisa ganti sesuai input kamu)
  const [kWh, setKWh] = useState("");
  const [bill, setBill] = useState("");

  // 🔘 Klik tombol simpan → buka modal konfirmasi
  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  // ✅ Jika user klik “Ya” di konfirmasi
  const handleConfirmYes = () => {
    try {
      setShowConfirm(false);

    // validasi data kosong
    if (!periode || !selectedDorm || !kWh || !bill) {
      setShowError(true);
      return;
    }

    // kalau data lengkap
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000)

    } catch (error) {
      setShowConfirm(false);
      setShowError(true);
    }
    
  };

  return (
    <main className="min-h-screen w-full bg-[#f2ecf9] flex flex-col">
      {/* Navbar */}
      <div className="bg-white shadow-sm w-full py-4 px-6 flex justify-between items-center pl-[150px]">
        <Image
          src="https://super.universitaspertamina.ac.id/wp-content/uploads/2025/07/logo_sc.png"
          alt="Universitas Pertamina Sustainability Center"
          width={180}
          height={40}
          priority
        />

        <nav className="flex gap-6 text-gray-700 font-medium text-sm md:text-base pr-[100px]">
          <Link
            href="#"
            className="text-black font-semibold px-4 py-1 rounded-md border-2 border-black flex items-center gap-2"
          >
            <span>📃</span> Asrama Beasiswa
          </Link>
        </nav>
      </div>

      {/* Form Section - FULL SCREEN */}
      <section className="flex-1 flex flex-col justify-center items-center w-full px-6 sm:px-8 py-8 bg-white shadow-inner pb-[150px]">
        <div className="w-full max-w-6xl">
          <h1 className="text-5xl font-bold text-center mb-8 mt-0 text-black">
            Pendataan Asrama Mahasiswa
          </h1>

          <form className="space-y-6">
            {/* Periode */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-full md:w-80 text-black font-semibold text-xl">
                Periode
              </label>
              <div className="relative flex-1 w-full">
                <input
                  type="month"
                  onChange={handlePeriodeChange}
                  className="w-full border border-gray-300 rounded-md p-2 pl-3 pr-10 bg-white text-gray-700 placeholder-gray-400 focus:ring-3 focus:ring-green-300 apx`pearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Nama Asrama */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-full md:w-80 text-black font-semibold text-xl">
                Nama Asrama
              </label>
              <select
                className="flex-1 border bg-white border-gray-300 rounded-md p-2 text-gray-600 focus:ring-2 focus:ring-green-300 w-full"
                value={selectedDorm}
                onChange={handleDormChange}
              >
                <option value="">Pilih Nama Asrama</option>
                {dormOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
                <option value="add-new">+ Tambahkan Nama Asrama</option>
              </select>
            </div>

            {/* Tambah Asrama Baru */}
            {showAddDorm && (
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 animate-fadeIn">
                <label className="w-full md:w-80 text-black font-semibold text-xl"></label>
                <div className="flex-1 flex gap-2 w-full">
                  <input
                    type="text"
                    value={newDorm}
                    onChange={(e) => setNewDorm(e.target.value)}
                    placeholder="Masukkan nama asrama baru"
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    type="button"
                    onClick={handleAddDorm}
                    className="bg-green-600 text-white px-4 rounded-md hover:bg-green-700 transition"
                  >
                    Tambah
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDorm(false)}
                    className="bg-gray-300 text-gray-700 px-4 rounded-md hover:bg-gray-400 transition"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* Total Konsumsi Listrik */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-full md:w-80 text-black font-semibold text-xl">
                Total Konsumsi Listrik (kWh)
              </label>
              <div className="flex-1 relative w-full">
                <input
                  type="number"
                  min="0"
                  placeholder="Masukkan Jumlah kWh"
                  value={kWh}
                  onChange={(e) => setKWh(e.target.value)}
                  className="w-full border left-2 border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-3 focus:ring-green-300"
                />
              </div>
            </div>

            {/* Tagihan Listrik */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-full md:w-80 text-black font-semibold text-xl">
                Tagihan Listrik (Rp/Bulan)
              </label>
              <div className="flex-1 relative w-full">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                  Rp.
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="Masukkan jumlah tagihan"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700 focus:ring-3 focus:ring-green-300"
                />
              </div>
            </div>

            {/* Tombol Simpan */}
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={handleSaveClick}
                className="bg-black hover:bg-green-800 text-white font-semibold w-full md:w-auto px-70 py-2 rounded-md transition duration-200"
              >
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </section>

      
      {/* MODAL KONFIRMASI */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] text-center shadow-xl relative border border-gray-100 animate-pop-in">
            <button
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirm(false)}
            >
              ✕
            </button>
            <p className="text-lg font-semibold text-gray-800 mb-6">
              Apa anda yakin ingin menyimpannya?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmYes}
                className="border border-black px-6 py-2 bg-white hover:bg-gray-300 rounded-md font-medium text-black"
              >
                Ya
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="border border-black px-6 py-2 bg-white hover:bg-gray-300 rounded-md font-medium text-black"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BERHASIL */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] text-center shadow-xl relative border border-green-100 animate-pop-in">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-800">
              Data berhasil disimpan!
            </p>
          </div>
        </div>
      )}

      {/* MODAL GAGAL */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] text-center shadow-lg relative">
            <button
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowError(false)}
            >
              ✕
            </button>
            <XCircle className="text-red-500 w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-800">
              Data tidak lengkap!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Silakan cek kembali data yang anda inputkan.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

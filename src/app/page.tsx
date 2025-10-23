"use client";

import Image from "next/image";
import Link from "next/link";

export default function StudentHousingForm() {
  return (
    <main className="min-h-screen bg-[#f2ecf9] py-8">
      {/* Navbar */}
      <div className="bg-white shadow-sm max-w-7xl mx-auto rounded-tl-xl rounded-tr-xl mb-0">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image
              src="https://super.universitaspertamina.ac.id/wp-content/uploads/2025/07/logo_sc.png"
              alt="Universitas Pertamina Sustainability Center"
              width={200}
              height={40}
              priority
            />
          </div>

          {/* Menu */}
          <nav className="flex gap-6 text-gray-700 font-medium">
            <Link href="#" className="hover:text-green-700 flex items-center gap-2">
              <span>📊</span> Dashboard
            </Link>
            <Link href="#" className="hover:text-green-700 flex items-center gap-2">
              <span>📃</span> Tagihan Listrik
            </Link>
            <Link
              href="#"
              className="bg-green-100 text-green-700 px-4 py-1 rounded-md border border-green-300 flex items-center gap-2"
            >
              <span>📋</span> Asrama Beasiswa
            </Link>
          </nav>
        </div>
      </div>

      {/* Form Section */}
      <section className="bg-white p-10 rounded-bl-xl rounded-br-xl shadow-md max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          Pendataan Asrama Mahasiswa
        </h1>

        <form className="space-y-5">
          {/* Tahun */}
          <div className="flex items-center gap-4">
            <label className="w-60 bg-white text-black font-semibold py-2 px-3 rounded-md text-left">
              Tahun
            </label>
            <select className="flex-1 border bg-white border-gray-300 rounded-md p-2 text-gray-700">
              <option>Pilih Tahun</option>
              {[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(
                (year) => (
                  <option key={year}>{year}</option>
                )
              )}
            </select>
          </div>

          {/* Bulan */}
          <div className="flex items-center gap-4">
            <label className="w-60 bg-white text-black font-semibold py-2 px-3 rounded-md text-left">
              Bulan
            </label>
            <select className="flex-1 border bg-white border-gray-300 rounded-md p-2 text-gray-700">
              <option>Pilih Bulan</option>
              {[
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ].map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>

          {/* Nama Asrama */}
          <div className="flex items-center gap-4">
            <label className="w-60 bg-white text-black font-semibold py-2 px-3 rounded-md text-left">
              Nama Asrama
            </label>
            <select className="flex-1 border bg-white border-gray-300 rounded-md p-2 text-gray-700">
              <option>Pilih Nama Asrama</option>
              {["Limo", "Kebon Nanas", "An Nur", "Haji Soleh 1", "Sasak 2", "Sasak 3"].map(
                (name) => (
                  <option key={name}>{name}</option>
                )
              )}
            </select>
          </div>

          {/* Jumlah Penghuni */}
          {/* <div className="flex items-center gap-4">
            <label className="w-60 bg-[#a8c989] text-black font-semibold py-2 px-3 rounded-md text-center">
              Jumlah Penghuni
            </label>
            <input
              type="number"
              placeholder="Jumlah Penghuni Asrama"
              className="flex-1 border border-gray-300 bg-white text-gray-700 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="L/P"
              className="w-24 border bg-white text-gray-700 border-gray-300 rounded-md p-2 text-center"
            />
          </div> */}

          {/* Tagihan Listrik */}
          <div className="flex items-center gap-4">
            <label className="w-60 bg-white text-black font-semibold py-2 px-3 rounded-md text-left">
              Tagihan Listrik (Rp/Bulan)
            </label>

            <div className="flex-1 relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                Rp.
              </span>
              <input
                type="number"
                placeholder="Masukkan jumlah tagihan"
                className="w-full border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700"
              />
            </div>
          </div>

          {/* Grid Bawah
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-[#a8c989] rounded-md p-4 text-center">
              <img src="/image/ikon1.png" alt="rumah-kwh" className="mx-auto mb-2" />
              <p className="font-semibold text-black mb-2">Daya yang Terpasang</p>
              <input
                type="number"
                placeholder="VA"
                className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-700"
              />
            </div> */}

            {/* <div className="bg-[#a8c989] rounded-md p-4 text-center">
              <img src="/image/ikon2.png" alt="ikon2" className="mx-auto mb-2" />
              <p className="font-semibold text-black mb-2">
                Konsumsi Listrik (kWh/Bulan)
              </p>
              <input
                type="number"
                placeholder="kWh/Bulan"
                className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-700"
              />
            </div>

            <div className="bg-[#a8c989] rounded-md p-4 text-center">
              <img src="/image/ikon3.png" alt="ikon3" className="mx-auto mb-2" />
              <p className="font-semibold text-black mb-2">
                Total Emisi (Ton CO₂/Tahun)
              </p>
              <input
                type="number"
                placeholder="Ton CO₂/Tahun"
                className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-700"
              />
            </div>
          </div> */}

          <div className="pt-5 text-center">
            <button
              type="button"
              className="bg-black hover:bg-green-700 text-white w-150 font-semibold px-2 py-2 rounded-md transition"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

"use client";

<<<<<<< HEAD
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Housing Emission Form
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="asrama"
              className="block font-medium text-gray-700 mb-1"
            >
              Dormitory Name
            </label>
            <select
              id="asrama"
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Dormitory --</option>
              <option value="Limo">Limo</option>
              <option value="Kebon Nanas">Kebon Nanas</option>
              <option value="An Nur">An Nur</option>
              <option value="Haji Soleh 1">Haji Soleh 1</option>
              <option value="Sasak 2">Sasak 2</option>
              <option value="Sasak 3">Sasak 3</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="num-students"
              className="block font-medium text-gray-700 mb-1"
            >
              Number of Students
            </label>
            <input
              type="number"
              id="num-students"
              placeholder="Enter total students"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="energy-type"
              className="block font-medium text-gray-700 mb-1"
            >
              Energy Type
            </label>
            <select
              id="energy-type"
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Energy Type --</option>
              <option value="electricity">Electricity</option>
              <option value="gas">Gas</option>
              <option value="solar">Solar</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="energy-usage"
              className="block font-medium text-gray-700 mb-1"
            >
              Monthly Energy Usage (kWh)
            </label>
            <input
              type="number"
              id="energy-usage"
              placeholder="Enter total energy usage"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="water-usage"
              className="block font-medium text-gray-700 mb-1"
            >
              Monthly Water Usage (Liters)
            </label>
            <input
              type="number"
              id="water-usage"
              placeholder="Enter total water usage"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="waste-amount"
              className="block font-medium text-gray-700 mb-1"
            >
              Monthly Waste (kg)
            </label>
            <input
              type="number"
              id="waste-amount"
              placeholder="Enter total waste generated"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Submit
          </button>
        </form>
      </div>
=======
import Link from "next/link";
import Image from "next/image";

export default function StudentHousingForm() {
  return (
    <main className="min-h-screen bg-[#f2ecf9] py-8">
      {/* Navbar (gabung di page) */}
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
              <span>🏠</span> Home
            </Link>
            <Link href="#" className="hover:text-green-700 flex items-center gap-2">
              ⚡ Electricity Bills
            </Link>
            <Link
              href="#"
              className="bg-green-100 text-green-700 px-4 py-1 rounded-md border border-green-300 flex items-center gap-2"
            >
              🏡 Student Housing
            </Link>
          </nav>
        </div>
      </div>

      {/* Form Section */}
      <section className="bg-[#eaf5e1] p-10 rounded-bl-xl rounded-br-xl shadow-md max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          Student Housing Input
        </h1>

        <form className="space-y-5">
          {/* Tahun */}
          <div className="flex items-center gap-4">
            <label className="w-60 bg-[#a8c989] text-black font-semibold py-2 px-3 rounded-md text-center">
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
            <label className="w-60 bg-[#a8c989] text-black font-semibold py-2 px-3 rounded-md text-center">
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
            <label className="w-60 bg-[#a8c989] text-black font-semibold py-2 px-3 rounded-md text-center">
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
          <div className="flex items-center gap-4">
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
          </div>

          {/* Tagihan Listrik */}
          <div className="flex items-center gap-4">
            <label className="w-60 bg-[#a8c989] text-black font-semibold py-2 px-3 rounded-md text-center">
              Tagihan Listrik (Rp/Bulan)
            </label>

          <div className="flex-1 relative">
            {/* Prefix Rp */}
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
              Rp.
            </span>

            {/* Input */}
            <input
              type="number"
              placeholder="Masukkan jumlah tagihan"
              className="w-full border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700"
            />
            </div>
          </div>


          {/* Grid Bawah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-[#a8c989] rounded-md p-4 text-center">
              <img src="/image/ikon1.png" alt="rumah-kwh" />
              <p className="font-semibold text-black mb-2">Daya yang Terpasang</p>
              <input
                type="number"
                placeholder="VA"
                className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-700"
              />
            </div>

            <div className="bg-[#a8c989] rounded-md p-4 text-center">
              <img src="/image/ikon2.png" alt="ikon2" />
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
              <img src="/image/ikon3.png" alt="ikon3" />
              <p className="font-semibold text-black mb-2">
                Total Emisi (Ton CO₂/Tahun)
              </p>
              <input
                type="number"
                placeholder="Ton CO₂/Tahun"
                className="w-full border border-gray-300 rounded-md p-2 text-center bg-white text-gray-700"
              />
            </div>
          </div>

          <div className="pt-0 text-right">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </section>
>>>>>>> 4b0d695 (commit)
    </main>
  );
}

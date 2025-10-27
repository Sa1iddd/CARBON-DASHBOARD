"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useState } from "react";

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
    const value = e.target.value; // format: YYYY-MM
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

  return (
    <main className="min-h-screen bg-[#f2ecf9] py-8 flex flex-col justify-center items-center">
      {/* Navbar */}
      <div className="bg-white shadow-sm w-full max-w-6xl mx-auto rounded-t-xl">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-4">
            <Image
              src="https://super.universitaspertamina.ac.id/wp-content/uploads/2025/07/logo_sc.png"
              alt="Universitas Pertamina Sustainability Center"
              width={200}
              height={40}
              priority
            />
          </div>

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
      <section className="border-t-1 bg-white p-10 rounded-b-xl shadow-md w-full max-w-6xl mt-0 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          Pendataan Asrama Mahasiswa
        </h1>

        <form className="space-y-6">
          {/* Periode */}
          <div className="flex items-center gap-4">
            <label className="w-60 text-black font-semibold py-2 px-3 text-left">
              Periode
            </label>
            <div className="relative flex-1">
              <input
                type="month"
                onChange={handlePeriodeChange}
                placeholder="Pilih Periode"
                className="w-full border border-gray-300 rounded-md p-2 pl-3 pr-10 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Nama Asrama */}
          <div className="flex items-center gap-4">
            <label className="w-60 text-black font-semibold py-2 px-3 text-left">
              Nama Asrama
            </label>
            <select
              className="flex-1 border bg-white border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-green-500"
              value={selectedDorm}
              onChange={handleDormChange}
            >
              <option value="">Pilih Nama Asrama</option>
              {dormOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="add-new" className="text-gray-700">
                + Tambahkan Nama Asrama
              </option>
            </select>
          </div>

          {/* Input Tambah Asrama Baru */}
          {showAddDorm && (
            <div className="flex items-center gap-4 animate-fadeIn">
              <label className="w-60"></label>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newDorm}
                  onChange={(e) => setNewDorm(e.target.value)}
                  placeholder="Masukkan nama asrama baru"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-green-500"
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

          {/* Tagihan Listrik */}
          <div className="flex items-center gap-4">
            <label className="w-60 text-black font-semibold py-2 px-3 text-left">
              Tagihan Listrik (Rp/Bulan)
            </label>
            <div className="flex-1 relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                Rp.
              </span>
              <input
                type="number"
                placeholder="Masukkan jumlah tagihan"
                className="w-full border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Periode terpilih */}
          {periode && (
            <p className="text-green-700 font-medium text-center pt-2">
              📅 Periode terpilih: <span className="font-semibold">{periode}</span>
            </p>
          )}

          {/* Tombol Simpan */}
          <div className="pt-6 text-center">
            <button
              type="button"
              className="bg-black hover:bg-green-700 text-white font-semibold w-150 px-8 py-2 rounded-md transition duration-200"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

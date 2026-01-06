"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

export default function StudentHousingForm() {

  type Dorm = {
  id: string;
  name: string;
  gender: string;
  capacity: number;
  powerCapacity: number;
  paymentType?: string;
};

  const [dormOptions, setDormOptions] = useState<Dorm[]>([]);
  const [selectedDormId, setSelectedDormId] = useState("");
  const [selectedDormDetail, setSelectedDormDetail] = useState<Dorm | null>(null);
  const [periode, setPeriode] = useState("");
  const [selectedDorm, setSelectedDorm] = useState("");
  const [newDorm, setNewDorm] = useState("");
  const [showAddDorm, setShowAddDorm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newGender, setNewGender] = useState("PUTRA");
  const [newCapacity, setNewCapacity] = useState("");
  const [newPower, setNewPower] = useState("");
  const selectedDormName =
  dormOptions.find(d => d.id === selectedDormId)?.name || "";


  // validasi 
  const [kWh, setKWh] = useState("");
  const [bill, setBill] = useState("");
  // ===== VALIDASI KONSUMSI LISTRIK =====
  const HOURS_PER_DAY = 24;
  const DAYS_PER_MONTH = 30;

// batas kWh berdasarkan daya asrama
const maxKwh =
  selectedDormDetail
    ? (selectedDormDetail.powerCapacity * HOURS_PER_DAY * DAYS_PER_MONTH) / 1000
    : null;

// validasi nilai kWh
const isKwhValid =
  kWh !== "" &&
  !isNaN(Number(kWh)) &&
  Number(kWh) > 0;

// cek apakah kWh melewati batas wajar
const isKwhOverLimit =
  isKwhValid &&
  maxKwh !== null &&
  Number(kWh) > maxKwh;


  useEffect(() => {
  async function fetchDorms() {
    try {
      const res = await fetch("/api/dorm");

      if (!res.ok) {
        console.error("Failed to fetch dorms");
        return;
      }

      const data = await res.json();

      setDormOptions(data)
    } catch (error) {
      console.error(error);
    }
  }

  fetchDorms();
}, []);

useEffect(() => {
  if (!selectedDormId || selectedDormId === "add-new") {
    setSelectedDormDetail(null);
    return;
  }

  async function fetchDormDetail() {
    try {
      const res = await fetch(`/api/dorm/${selectedDormId}`);
      if (!res.ok) return;

      const data = await res.json();
      setSelectedDormDetail(data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchDormDetail();
}, [selectedDormId]);



const handlePeriodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value; // "2025-09"
  setPeriode(`${value}-01`);    // "2025-09-01" ✅ VALID DATE
};


  const handleDormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "add-new") {
      setShowAddDorm(true);
    } else {
      setSelectedDorm(value);
    }
  };

  const handleAddDorm = async () => {
  if (!newDorm.trim() || !newGender || !newCapacity || !newPower) {
    alert("Semua field asrama wajib diisi!");
    return;
  }

  const payload = {
    name: newDorm.trim(),
    gender: newGender,
    capacity: Number(newCapacity),
    powerCapacity: Number(newPower)
  };

  try {
    const res = await fetch("/api/dorm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("Failed to add dorm");
      return;
    }

    const created = await res.json();

    // Update dropdown
    setDormOptions(prev => [...prev, created.name]);
    setSelectedDorm(created.name);

    // Reset state
    setNewDorm("");
    setNewGender("PUTRA");
    setNewCapacity("");
    setNewPower("");

    setShowAddDorm(false);

  } catch (err) {
    console.error("Add dorm error:", err);
  }
};

const EMISSION_FACTOR = 0.85;

const hasValidEnergyInput =
  kWh !== "" &&
  bill !== "" &&
  !isNaN(Number(kWh)) &&
  !isNaN(Number(bill)) &&
  Number(kWh) > 0 &&
  Number(bill) > 0;

const emission = hasValidEnergyInput
  ? Number(kWh) * EMISSION_FACTOR
  : 0;


  // 🔘 Klik tombol simpan → buka modal konfirmasi
  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = async () => {
  try {
    setShowConfirm(false);

    const dormName =
      dormOptions.find(d => d.id === selectedDormId)?.name;

    if (!periode || !dormName || !kWh || !bill) {
      setShowError(true);
      return;
    }

    const payload = {
      period: periode,                 // "YYYY-MM-01"
      dormName: dormName,              // STRING
      totalKwh: Number(kWh),           // NUMBER
      billAmount: Number(bill),        // NUMBER
    };

    console.log("PAYLOAD KE BACKEND:", payload);

    const res = await fetch("/api/dorm-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setShowError(true);
      return;
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

  } catch (error) {
    console.error(error);
    setShowError(true);
  }
};


  return (
    <main className="min-h-screen w-full bg-[#f2ecf9] flex flex-col">
          {/* Navbar */}
<div className="bg-white shadow-sm w-full">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
    
    {/* Logo */}
    <div className="flex items-center gap-3">
      <Image
        src="https://super.universitaspertamina.ac.id/wp-content/uploads/2025/07/logo_sc.png"
        alt="Universitas Pertamina Sustainability Center"
        width={160}
        height={40}
        priority
        className="w-[130px] sm:w-[150px] md:w-[170px]"
      />
    </div>

    {/* Desktop Menu */}
    <nav className="hidden md:flex gap-6 text-gray-700 font-medium text-sm md:text-base">
      <Link
        href="#"
        className="text-black font-semibold px-4 py-2 rounded-md border-2 border-black flex items-center gap-2 hover:bg-black hover:text-white transition"
      >
        <span>📃</span> Asrama Beasiswa
      </Link>
    </nav>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <button
        onClick={() => alert("Menu Mobile")}
        className="text-black border border-black px-4 py-2 rounded-md text-sm"
      >
        ☰ Menu
      </button>
    </div>

  </div>
</div>


      {/* Form Section - FULL SCREEN */}
      <section className="flex-1 flex flex-col justify-center items-center w-full px-6 sm:px-8 py-8 bg-white shadow-inner pb-[150px]">
        <div className="w-full max-w-6xl">
          
          {/* Icon Kembali */}
          <div className="relative mb-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full md:w-80 flex justify-start">
              <button
                onClick={() => alert("Kembali ke halaman sebelumnya (dummy)")}
                className="
                  w-10 h-10
                  rounded-full
                  flex items-center justify-center
                hover:bg-gray-200
                  transition
                "
              >
              <img
                src="https://cdn-icons-png.freepik.com/512/3114/3114883.png"
                alt="Back"
                className="w-6 h-6 object-contain"
              />
            </button>
          </div>

          {/* Judul */}
          <h1 className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold text-black
            text-center
          ">
            Pendataan Asrama Mahasiswa
          </h1>
        </div>

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
<div className="flex flex-col gap-4">
  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
    <label className="w-full md:w-80 text-black font-semibold text-xl">
      Nama Asrama
    </label>

    <select
      className="flex-1 border bg-white border-gray-300 rounded-md p-2 text-black focus:ring-2 focus:ring-green-300 w-full"
      value={selectedDormId}
      onChange={(e) => {
        const value = e.target.value;
        if (value === "add-new") {
          setShowAddDorm(true);
          setSelectedDormId("");
          setSelectedDormDetail(null);
        } else {
          setShowAddDorm(false);
          setSelectedDormId(value);
        }
      }}
    >
      <option value="">Pilih Nama Asrama</option>

      {dormOptions.map((dorm) => (
        <option key={dorm.id} value={dorm.id}>
          {dorm.name}
        </option>
      ))}

      <option value="add-new">+ Tambahkan Nama Asrama</option>
    </select>
  </div>

  {/* DETAIL DATA ASRAMA */}
{selectedDormDetail && (
  <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
    
    {/* Spacer kiri agar sejajar dengan field lain */}
    <div className="w-full md:w-80" />

    {/* Card kanan (sejajar input) */}
    <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-5">
      
      {/* Judul di dalam card */}
      <h3 className="text-lg font-semibold text-black mb-4">
        Detail Data Asrama
      </h3>

      {/* Isi detail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-black">
            Jumlah Penghuni
          </p>
          <p className="text-base font-semibold text-black">
            {selectedDormDetail.capacity} orang
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-black">
            Gender
          </p>
          <p className="text-base font-semibold text-black">
            {selectedDormDetail.gender}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-black">
            Daya Listrik
          </p>
          <p className="text-base font-semibold text-black">
            {selectedDormDetail.powerCapacity} VA
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-black">
            Tipe Pembayaran
          </p>
          <p className="text-base font-semibold text-black">
            {selectedDormDetail.paymentType ?? "Prabayar"}
          </p>
        </div>
      </div>

    </div>
  </div>
)}
</div>

          
            {/* Tambah Asrama Baru */}
            {showAddDorm && (
              <div className="flex flex-col gap-4 p-4 bg-gray-50 border rounded-md animate-fadeIn">

              {/* Nama Asrama */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <label className="w-full md:w-80 text-black font-semibold text-xl">
                    Nama Asrama Baru
                  </label>
                    <input
                      type="text"
                      value={newDorm}
                      onChange={(e) => setNewDorm(e.target.value)}
                      placeholder="Contoh: Asrama Baru"
                      className="flex-1 border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-green-300"
                    />
               </div>

            {/* Gender */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-full md:w-80 text-black font-semibold text-xl">
                  Gender Asrama
                </label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                  className="flex-1 border border-gray-300 bg-white rounded-md p-2 text-gray-600 focus:ring-2 focus:ring-green-300"
                  >
                  <option value="PUTRA">PUTRA</option>
                  <option value="PUTRI">PUTRI</option>
                </select>
              </div>

            {/* Kapasitas */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-full md:w-80 text-black font-semibold text-xl">
                  Kapasitas Penghuni
                </label>
                <input
                  type="number"
                  min="0"
                  value={newCapacity}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault(); // ❌ blok minus & e
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) >= 0) {
                      setNewCapacity(value);
                    }
                  }}
                  placeholder="Contoh: 24"
                  className="flex-1 border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-green-300"
                />
              </div>

            {/* Power Capacity */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-full md:w-80 text-black font-semibold text-xl">
                  Daya Listrik (VA)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newPower}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault(); // ❌ blok minus & e
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) >= 0) {
                      setNewPower(value);
                    }
                  }}
                  placeholder="Contoh: 2200"
                  className="flex-1 border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-green-300"
                />
              </div>

            {/* Tombol */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddDorm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={handleAddDorm}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Simpan
                </button>
              </div>

            </div>
          )}

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
                  type="text"
                  inputMode="numeric"
                  min="0"
                  placeholder="Masukkan jumlah tagihan"
                  value={
                    bill === ""
                    ? ""
                    : new Intl.NumberFormat("id-ID").format(Number(bill))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    setBill(rawValue); // ✅ HANYA setBill, TIDAK setKWh
                  }}
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700 focus:ring-3 focus:ring-green-300"
                />
              </div>
            </div>

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
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault(); // Blok tombol minus & e (scientific)
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) >= 0) {
                      setKWh(value);
                    }
                  }}
                  className="w-full border left-2 border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-3 focus:ring-green-300"
                />
                {isKwhOverLimit && (
  <p className="text-sm text-red-600 mt-1">
    Konsumsi listrik melebihi batas maksimum teoritis
    ({maxKwh?.toFixed(0)} kWh/bulan) berdasarkan daya asrama.
    Mohon periksa kembali input Anda.
  </p>
)}

              </div>
            </div>

            
            {/* EMISI KARBON */}
{/* EMISI KARBON */}
{hasValidEnergyInput && (
  <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
    
    {/* Spacer kiri (sejajar label form) */}
    <div className="w-full md:w-80" />

    {/* Card kanan (sejajar input field) */}
    <div className="flex-1 bg-green-50 border border-green-300 rounded-lg p-5">
      
      <h3 className="text-lg font-semibold text-black mb-2">
        Emisi Karbon (Otomatis)
      </h3>

      <p className="text-3xl font-bold text-green-800">
        {emission.toFixed(2)} kg CO₂e
      </p>

      <p className="text-sm text-green-700 mt-2">
        Faktor emisi: {EMISSION_FACTOR} kg CO₂e/kWh
      </p>
    </div>
  </div>
)}

            {/* Tombol Simpan */}
            <div className="pt-6 flex justify-center">
            <button
  type="button"
  onClick={handleSaveClick}
  disabled={isKwhOverLimit}
  className={`
    w-full sm:w-2/3 md:w-1/2 lg:w-1/3
    py-3 px-6 rounded-md font-semibold
    transition duration-200
    ${
      isKwhOverLimit
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-green-800 text-white"
    }
  `}
>
  Simpan Data
</button>

            </div>

          </form>
        </div>
      </section>

      
      MODAL KONFIRMASI
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

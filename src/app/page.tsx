"use client";

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
    </main>
  );
}

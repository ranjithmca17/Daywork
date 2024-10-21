import Graph from "../Graph/page";

export default function BoxwithGraph() {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Graph Container */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between items-center h-32 w-full md:w-60">
          <div className="flex items-center justify-center h-full w-full">
            <Graph />
          </div>
        </div>

        {/* Total Sales Container */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between items-center h-32 w-full md:w-60">
          <h1 className="font-bold">Total Sales</h1>
          <ul className="flex gap-6 text-center">
            <li className="text-white bg-blue-600 font-bold p-1 rounded-lg">1M</li>
            <li className="text-gray-500 bg-gray-200 font-bold p-1 rounded-lg">1Y</li>
          </ul>
          <div className="text-center">
            <h1 className="font-bold text-2xl">00</h1>
            <p>33% Increase from Month</p>
          </div>
        </div>

        {/* Total Products Container */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-center items-center h-32 w-full md:w-60">
          <h1 className="font-bold text-2xl">Total Products</h1>
          <h1 className="font-extrabold text-4xl text-blue-600">00</h1>
        </div>

        {/* Today's Total Sales Container */}
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-center items-center h-32 w-full md:w-60">
          <h1 className="font-bold text-2xl">Today's Total Sales</h1>
          <h1 className="font-extrabold text-4xl text-blue-600">00</h1>
        </div>
      </div>
    </div>
  );
}

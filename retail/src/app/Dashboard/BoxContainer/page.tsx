
'use client'
import { useAppContext } from "@/app/Context";


export default function Page() {
    const { totalAmount, totalQuantity,productStats}=useAppContext();

    console.log("productStats : ",productStats);
    console.log("totalAmount : ",totalAmount);
    
    return (
        <div className="flex flex-col bg-slate-100 w-full">
            <div className="pb-10">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center justify-center gap-x-10">
                <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between items-center h-40 w-64">
                    <h3 className="font-bold">Product Details</h3>
                    <ul className="flex flex-col gap-2 text-center">
                        <li className="text-red-500 font-bold">Low items: {productStats.outOfStock}</li>
                        <li className="text-orange-600 font-bold">Category: {productStats.totalCategories}</li>
                        <li className="text-green-600 font-bold">All items: {productStats.inStock+productStats.outOfStock}</li>
                    </ul>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between items-center h-40 w-64">
                    <h1 className="font-bold">Total Sales</h1>
                    <ul className="flex  gap-16 text-center">
                        <li className="text-white bg-blue-600 font-bold p-1 rounded-lg">1M</li>
                        <li className="text-gray-500 bg-gray-200 font-bold p-1 rounded-lg">1Y</li>
                    </ul>
                    <div className="text-center">
                        <h1 className="font-bold text-2xl">00</h1>
                        <p>33% Increase from Month</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-around items-center h-40 w-64">
                    <h1 className="font-bold text-2xl">Total Products</h1>
                    <h1 className="font-extrabold text-4xl text-blue-600">{productStats.inStock+productStats.outOfStock}</h1>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-around items-center h-40 w-64">
                    <h1 className="font-bold text-2xl text-center">Today's Total Sales</h1>
                    <h1 className="font-extrabold text-2xl text-blue-600">${totalAmount}</h1>
                </div>
            </div>
        </div>
    );
}

import Products from '@/app/Component/AllOrderProducts/page';
import Billcart from '@/app/Component/BillCart/page';
import CategoryFilter from '@/app/Component/CategoryFilter/page';
import React from 'react';

export default function BillingPage() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      {/* Category Filter */}
      <div className="bg-blue-600 text-white w-full md:w-1/6 p-4 md:p-6 overflow-y-auto rounded-lg shadow-lg">
        <CategoryFilter />
      </div>

      {/* Products Section */}
      <div className="bg-white w-full md:w-1/2 p-4 md:p-6 ml-0 md:ml-4 overflow-y-auto rounded-lg shadow-lg">
        <Products />
      </div>

      {/* Bill Cart */}
      <div className="bg-white w-full md:w-1/3 p-4 md:p-6 ml-0 md:ml-4 overflow-y-auto rounded-lg">
        <Billcart />
      </div>
    </div>
  );
}

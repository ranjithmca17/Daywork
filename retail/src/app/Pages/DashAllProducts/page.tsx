
import Products from "@/app/Components/AllProducts/page";
import Filter from "@/app/Dashboard/Filter/page";



export default function DashHome() {
  return (
    <div className="flex h-screen">
   
      <div className="w-1/5 p-3 bg-gray-100">
        <Filter />
      </div>
      
  
      <div className="flex flex-col w-4/5 p-4">
   
        <div className="mb-4">
        <Products/>
        </div>
        <div className="flex-1 mb-20">
      
        </div>
      </div>
    </div>
  );
}

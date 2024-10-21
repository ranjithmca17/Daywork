import Products from "@/app/Components/AllProducts/page";
import Filter from "@/app/subComponents/Filter/page";

export default function page() {
  return (
    <div>
      <div className="flex items-center justify-start">
      <div className="p-3 w-1/5">
      <Filter/>
      </div>
      <div className="p-4 w-4/5">
      <Products/>
     
      </div>
    </div>
    </div>
  )
}

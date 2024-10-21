import SubNav from "@/app/Components/subnav/page";
import BoxContainer from "@/app/Dashboard/BoxContainer/page";
import BoxwithGraph from "@/app/Dashboard/boxwithGraph/page";
import Filter from "@/app/Dashboard/Filter/page";
import Graph from "@/app/Dashboard/Graph/page";


export default function DashHome() {
  return (
    <div className="flex h-screen">
   
      <div className="w-1/5 p-3 bg-gray-100">
        <Filter />
      </div>
      
  
      <div className="flex flex-col w-4/5 p-4">
   
        <div className="mb-4">
        <SubNav/>
          <BoxContainer />
        </div>
        <div className="flex-1 mb-20">
         <Graph/>
        </div>
      </div>
    </div>
  );
}

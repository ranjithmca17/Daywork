
'use client';
import Link from 'next/link';
import { FaUserCog } from "react-icons/fa";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbCategoryFilled } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";
import { HiDesktopComputer } from "react-icons/hi";
import SubNav from "@/app/Components/subnav/page";
import BoxContainer from "@/app/Dashboard/BoxContainer/page";
import Graph from '../Graph/page';
import Products from '@/app/Components/AllProducts/page';
import Sales from '@/app/Components/Sales/page';
import CustomersDetail from '@/app/Components/CutomerDetails/page';

export default function Filter() {
    const [click, setClick] = useState('Home');

    const menuItems = [
        { name: 'Home', icon: <GoHomeFill /> },
        { name: 'User Management', icon: <FaUserCog /> },
        { name: 'Categories', icon: <TbCategoryFilled /> },
        { name: 'Products', icon: <FaBoxOpen /> },
        { name: 'Sales', icon: <BsBarChartFill /> },
        { name: 'Help Center', icon: <HiDesktopComputer />, path: '/pages/HelpCenter' },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar with fixed width of 40% */}
            <div className="bg-gray-100 p-3 w-1/4 md:w-1/4 lg:w-1/5">
                <ul className="font-bold flex gap-4 flex-col">
                    {menuItems.map(({ name, icon }) => (
                        <li
                            key={name}
                            className={`cursor-pointer p-2  rounded-lg transition-all flex items-center gap-2 ${
                                click === name ? 'bg-blue-500 text-white' : 'hover:bg-blue-600 hover:text-white'
                            }`}
                            onClick={() => setClick(name)}
                        >
                            {icon}
                            <span className="hidden sm:inline">{name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full p-4">
                {click === 'Home' && (
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <SubNav />
                            <BoxContainer />
                        </div>
                        <div className="flex-1 mb-20">
                            <Graph />
                        </div>
                    </div>
                )}
                  {click === 'User Management' && (
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                           <CustomersDetail/>
                        </div>
                    </div>
                )}
                {click === 'Products' && (
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <Products />
                        </div>
                    </div>
                )}
                 {click === 'Sales' && (
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                           <Sales/>
                        </div>
                    </div>
                )}
            
            </div>
        </div>
    );
}

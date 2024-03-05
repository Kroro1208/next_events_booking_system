'use client'
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


function Filters() {
    const router = useRouter();
    const [filters, setFilters] = useState({
        name: "",
        date: ""
    });

    useEffect(() => {
        setTimeout(() => {
            router.push(`/?name=${filters.name}&date=${filters.date}`);
        }, 400);
    }, [filters.name]);

    useEffect(() => {
        router.push(`/?name=${filters.name}&date=${filters.date}`);
    }, [filters.date]);

    return (
        <div className="bg-gradient-to-tr from-orange-300 to-red-400 p-5 rounded-lg shadow-md flex gap-5 items-end mb-5">
            <div className="w-full">
                <h1 className="text-sm text-gray-800 mb-2">イベント名で検索</h1>
                <input type="text" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    placeholder="イベント名を入力"
                    className="w-full p-2 rounded-lg border border-gray-200"
                />
            </div>
            <div className="w-full">
                <h1 className="text-sm text-gray-800 mb-2">日付で検索</h1>
                <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    placeholder=""
                    className="w-full p-2 rounded-lg border border-gray-200"
                />
            </div>
            <div className="w-60">
                <Button 
                onClick={()=> {
                    setFilters({
                        name:"",
                        date: ""
                    });
                }}
                className="bg-gradient-to-tr from-gray-800 to-gray-400 py-2 px-4 rounded-3xl shadow-lg text-white hover:bg-gray-700 hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
                    検索クリア</Button>
            </div>
        </div>
    )
}

export default Filters
'use client'
import { UserButton } from '@clerk/nextjs';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from "axios";
import toast from 'react-hot-toast';
import 'remixicon/fonts/remixicon.css'



function LayoutProvider({ children }: { children: React.ReactNode }) {

    const menusForAdmin = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "イベント",
            path: "/admin/events"
        },
        {
            title: "予約",
            path: "/admin/bookings"
        },
        {
            title: "ユーザー",
            path: "/admin/users"
        },
        {
            title: "レポート",
            path: "/admin/reports"
        },
    ]

    const menusForUser = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "予約",
            path: "/bookings"
        },
    ];

    const pathname = usePathname();
    const router = useRouter();
    const [menusToShow, setMenusToShow] = useState<any[]>([]);
    const isPrivateRoute = !['sign-in', 'sign-up'].includes(pathname);
    const getUserData = async () => {
        try {
            const response = await axios.get('/api/current-user');
            if (response.data.user.isAdmin) {
                setMenusToShow(menusForAdmin);
            } else {
                setMenusToShow(menusForUser);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (isPrivateRoute) {
            getUserData();
        }
    }, []);

    return (
        <div className='bg-gray-200 w-full lg:px-20 px-5'>
            {isPrivateRoute && (
                <div className='bg-white flex justify-between items-center shadow p-10 py-5 rounded-xl'>
                    <h1 className='text-gray-900 font-semibold text-2xl cursor-pointer'
                        onClick={() => router.push("/")}
                    >Next Events Book</h1>
                    <div className='flex gap-5 items-center'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="bg-gradient-to-tr from-gray-800 to-gray-400 py-2 px-4 rounded-3xl shadow-lg text-white hover:bg-gray-700 hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
                                    Profile</Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {menusToShow.map((menu) => (
                                    <DropdownItem
                                        key={menu.title}
                                        onClick={() => {
                                            router.push(menu.path);
                                        }}>{menu.title}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <UserButton
                            afterSignOutUrl="/" />
                    </div>
                </div>
            )
            }

            <div className='py-5'>{children}</div>
        </div >
    )
}

export default LayoutProvider
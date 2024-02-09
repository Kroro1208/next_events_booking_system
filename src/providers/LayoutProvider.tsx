'use client'
import { UserButton } from '@clerk/nextjs'
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react'
import React from 'react'

function LayoutProvider({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-gray-200 w-full h-screen'>
            <div className='bg-white flex justify-between items-center shadow p-3 rounded-2xl'>
                <h1 className='text-gray-600 font-semibold text-2xl'>Next Events Book</h1>
                <div className='flex gap-5 items-center'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered">Profile</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">Home</DropdownItem>
                            <DropdownItem key="copy">予約</DropdownItem>
                            <DropdownItem key="edit">売り上げ</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                ユーザー
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <UserButton
                        afterSignOutUrl="/" />
                </div>
            </div>

            <div className='p-3'>{children}</div>
        </div>
    )
}

export default LayoutProvider
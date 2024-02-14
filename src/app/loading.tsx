"use Client"
import { Spinner } from '@nextui-org/react';

import React from 'react'

function Loading() {
    return (
        <div className='flex h-screen fixed justify-center items-center inset-0'>
            <Spinner size="lg" />
        </div>
    )
}

export default Loading
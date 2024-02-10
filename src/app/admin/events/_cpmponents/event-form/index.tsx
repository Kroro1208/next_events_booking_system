'use client'
import { useState } from 'react'
import Steps from '@/src/components/Steps'
import React from 'react'
import General from './General'
import LocationAndDate from './LocationAndDate'
import Media from './Media'
import Tickets from './Tickets'

function EventForm() {
    const [activeStep = 0, setActiveStep] = useState(0);
    return (
        <div>
            <Steps stepNames={['General', 'Location & Date', 'Media', 'Tickets']}
                stepsContent={[<General />, <LocationAndDate />, <Media />, <Tickets />]}
                activeStep={activeStep}
            />
        </div>
    )
}

export default EventForm
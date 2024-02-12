'use client'
import { useState } from 'react'
import Steps from '@/src/components/Steps'
import React from 'react'
import General from './General'
import LocationAndDate from './LocationAndDate'
import Media from './Media'
import Tickets from './Tickets'
import { uploadImageToFirebaseAndGetUrls } from '@/src/helpers/image-upload'
import toast from 'react-hot-toast'

function EventForm() {
    const [activeStep = 0, setActiveStep] = useState<number>(0);
    const [newlySelectedImages = [], setNewlySelectedImages] = useState<any>([]);
    const [event, setEvent] = useState<any>(null);

    const handleFormSubmit = async () => {
        try {
            event.images = await uploadImageToFirebaseAndGetUrls(newlySelectedImages.map((image: any) => image.file));
            console.log(event);
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    const onSubmit = (e: any) => {
        e.preventDefault();
        handleFormSubmit();
    };

    const commonProps = {
        event,
        setEvent,
        activeStep,
        setActiveStep,
        newlySelectedImages,
        setNewlySelectedImages
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Steps stepNames={['General', 'Location & Date', 'Media', 'Tickets']}
                    stepsContent={[
                        <General {...commonProps} />,
                        <LocationAndDate {...commonProps} />,
                        <Media {...commonProps} />,
                        <Tickets {...commonProps} />]}
                    activeStep={activeStep}
                />
            </form>
        </div>
    )
}

export default EventForm
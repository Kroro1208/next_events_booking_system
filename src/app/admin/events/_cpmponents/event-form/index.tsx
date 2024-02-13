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
import axios from 'axios'
import { useRouter } from 'next/navigation'

function EventForm() {
    const [activeStep = 0, setActiveStep] = useState<number>(0);
    const [newlySelectedImages = [], setNewlySelectedImages] = useState<any>([]);
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            event.images = await uploadImageToFirebaseAndGetUrls(newlySelectedImages.map((image: any) => image.file));
            await axios.post("/api/admin/events", event);
            toast.success("イベントの作成に成功しました");
            router.refresh();
            router.push("/admin/events");
            // console.log(event);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

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
        setNewlySelectedImages,
        loading,
    };

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
'use client'
import { useEffect, useState } from 'react'
import Steps from '@/src/components/Steps'
import React from 'react'
import General from './General'
import LocationAndDate from './LocationAndDate'
import Media from './Media'
import Tickets from './Tickets'
import { uploadImageToFirebaseAndGetUrls } from '@/src/helpers/image-upload'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
    initialData?: any;
    type?: "edit" | "create";
}

function EventForm({ initialData, type = "create" }: Props) {
    const [previousImages, setPreviousImages] = useState<string[]>([]); // 画像はURLが配列内にstringで保存されている
    const [activeStep = 0, setActiveStep] = useState<number>(0);
    const [newlySelectedImages = [], setNewlySelectedImages] = useState<any>([]);
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            if (type === "create") {
                event.images = await uploadImageToFirebaseAndGetUrls(newlySelectedImages.map((image: any) => image.file));
                await axios.post("/api/admin/events", event);
                toast.success("イベントの作成に成功しました");
                router.refresh();
                router.push("/admin/events");
            } else { // editの場合、画像を追加してアップロード
                const newlyUploadedImageUrls = await uploadImageToFirebaseAndGetUrls(
                    newlySelectedImages.map((image: any) => image.file)
                );
                event.images = [...previousImages, ...newlyUploadedImageUrls];
                await axios.put(`/api/admin/events/${event._id}`, event);
                toast.success("イベントの更新に成功しました");
                router.refresh();
                router.push("/admin/events");
            }
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
        previousImages,
        setPreviousImages,
        loading
    };

    useEffect(() => {
        if (initialData) {
            setEvent(initialData);
            setPreviousImages(initialData.images);
        }
    }, [initialData]);

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
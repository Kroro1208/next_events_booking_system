import { useRef } from 'react'
import React from 'react'
import { EventFormStepProps } from './General'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'

function Media({ newlySelectedImages, setNewlySelectedImages, activeStep, setActiveStep, previousImages, setPreviousImages }: EventFormStepProps) {

    const uploadFileRef = useRef<HTMLInputElement>(null);
    const onFileSelect = (e: any) => {
        try {
            const files = e.target.files;
            const filesArray = Array.from(files);

            //  ユーザーが選択したファイルの一時的な表示用URLを生成してurlプロパティを持つオブジェクトを作成して保持
            // fileプロパティとして元のFileオブジェクトも保持
            const existingNewlySelectedImages = newlySelectedImages || [];
            const newImages = filesArray.map((file: any) => ({
                url: URL.createObjectURL(file),
                file
            }));
            setNewlySelectedImages([...existingNewlySelectedImages, ...newImages]);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const onNewImageRemove = (index: number) => {
        const tempImages: any = [...newlySelectedImages];
        tempImages.splice(index, 1);
        setNewlySelectedImages(tempImages);
    };

    const onPreviousImageRemove = (index: number) => {
        const tempImages: any = [...previousImages];
        tempImages.splice(index, 1);
        setPreviousImages(tempImages);
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-max'>
                <Button onClick={() => uploadFileRef.current?.click()}>
                    <input type="file"
                        ref={uploadFileRef}
                        hidden
                        onChange={onFileSelect} />
                    画像をアップロード
                </Button>
            </div>

            {/* 画像を選択した後に画面上に表示させる */}
            <div className='flex gap-5'>

                {previousImages?.map((image: any, index: number) => (
                    <div key={index} className="border-2 border-gray-300 flex flex-col gap-5 rounded-xl pb-5">
                        <img src={image} alt="newly selected"
                            className='w-40 h-40 object-cover rounded-xl'
                        />
                        <h1 className='text-center cursor-pointer text-sm underline'
                            onClick={() => onPreviousImageRemove(index)}
                        >削除</h1>
                    </div>
                ))}

                {newlySelectedImages?.map((image: any, index: number) => (
                    <div key={index} className="border-2 border-gray-300 flex flex-col gap-5 rounded-xl pb-5">
                        <img src={image.url} alt="newly selected"
                            className='w-40 h-40 object-cover rounded-xl'
                        />
                        <h1 className='text-center cursor-pointer text-sm underline'
                            onClick={() => onNewImageRemove(index)}
                        >削除</h1>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-5">
                <Button onClick={() => { setActiveStep(activeStep - 1) }} className='hover:bg-red-500 hover:text-white hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out'>戻る</Button>
                <Button onClick={() => setActiveStep(activeStep + 1)} color='primary'
                    className='hover:bg-indigo-600 hover:text-white hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out'
                >次の入力画面へ</Button>
            </div>
        </div>
    )
}

export default Media
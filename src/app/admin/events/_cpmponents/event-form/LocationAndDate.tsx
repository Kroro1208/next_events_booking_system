import React from 'react'
import { EventFormStepProps } from './General'
import { Input, Button } from '@nextui-org/react'

function LocationAndDate({ event, setEvent, activeStep, setActiveStep }: EventFormStepProps) {
    return (
        <div className='flex flex-col gap-5'>
            <Input
                placeholder='開催場所の詳細(住所や最寄り駅など)を入力してください'
                label='Location'
                labelPlacement='outside'
                value={event?.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
                isRequired
            />

            <div className='flex gap-5'>
                <Input
                    placeholder='Date'
                    label='Date'
                    labelPlacement='outside'
                    value={event?.Date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                    isRequired
                    type='date'
                />

                <Input
                    placeholder='Time'
                    label='Time'
                    labelPlacement='outside'
                    value={event?.Time}
                    onChange={(e) => setEvent({ ...event, time: e.target.value })}
                    isRequired
                    type='time'
                />
            </div>

            <div className="flex justify-center gap-5">
                <Button onClick={() => { setActiveStep(activeStep - 1) }}>戻る</Button>
                <Button onClick={() => setActiveStep(activeStep + 1)} color='primary'
                    isDisabled={!event?.location || !event?.date || !event?.time}
                >次の入力画面へ</Button>
            </div>
        </div>
    )
}

export default LocationAndDate
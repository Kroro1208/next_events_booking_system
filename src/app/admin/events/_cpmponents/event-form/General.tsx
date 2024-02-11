import React from 'react'
import { Input, Textarea } from '@nextui-org/react'

export interface EventFormStepProps {
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

function General({ event, setEvent, activeStep, setActiveStep }: EventFormStepProps) {
  const getCommonProps = (name: string) => {
    return {
      labelPlacement: 'outside',
      value: event?.[name],
      onChange: (e: any) => setEvent({ ...event, [name]: e.target.value })
    } as any;
  }
  return (
    <div className='flex flex-col gap-5'>
      <Input
        label="Event Name"
        placeholder='イベント名を入力してください'
        {...getCommonProps("name")} />

      <Input
        label="Organizer"
        placeholder='主催者を入力してください'
        {...getCommonProps("Organizer")} />

      <Textarea
        label="Description"
        placeholder='イベントの詳細を入力してください'
        {...getCommonProps("Description")} />

      

    </div>
  )
}

export default General
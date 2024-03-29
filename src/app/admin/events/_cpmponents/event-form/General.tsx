import React, { useState } from 'react'
import { Button, Input, Textarea, Chip } from '@nextui-org/react'

export interface EventFormStepProps {
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>;

  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;

  newlySelectedImages: any[];
  setNewlySelectedImages: React.Dispatch<React.SetStateAction<any[]>>;

  previousImages: string[];
  setPreviousImages: React.Dispatch<React.SetStateAction<any[]>>;

  loading: boolean;
}

export interface NewlySelectedImage {
  url: string;
  file: File;
}

function General({ event, setEvent, activeStep, setActiveStep }: EventFormStepProps) {
  const [guest, setGuest] = useState<string>('');
  const getCommonProps = (name: string) => {
    return {
      labelPlacement: 'outside',
      value: event?.[name],
      onChange: (e: any) => setEvent({ ...event, [name]: e.target.value }),
      isRequired: true
    } as any;
  };

  const onGuestAdd = () => {
    const newGuests = []
    const commonSeparatedGuests = guest.split(",");

    // ゲストが1人以上の入力された場合
    if (commonSeparatedGuests.length > 1) {
      newGuests.push(...commonSeparatedGuests);
    } else {
      newGuests.push(guest); // 1人の場合
    }

    // 既に入力されているゲストかどうかチェック
    if (event?.guests) {
      newGuests.push(...event.guests);
    }
    setEvent({ ...event, guests: newGuests });
    setGuest("");
  };

  const onGuestRemove = (guestToRemove: number) => {
    const newGuests = event?.guests?.filter((_: string, index: number) => index !== guestToRemove);

    setEvent({ ...event, guests: newGuests });
  };

  return (
    <div className='flex flex-col gap-5'>
      <Input
        label="Event Name"
        placeholder='イベント名を入力してください'
        {...getCommonProps("name")} />

      <Input
        label="Organizer"
        placeholder='主催者を入力してください'
        {...getCommonProps("organizer")} />

      <Textarea
        label="Description"
        placeholder='イベントの詳細を入力してください'
        {...getCommonProps("description")} />

      <div className='flex gap-5 items-end'>
        <Input
          label="Guest Name"
          labelPlacement='outside'
          value={guest}
          placeholder='ゲストを入力してください'
          onChange={(e) => setGuest(e.target.value)}
        />
        {/* <Button color="blue" onClick={onGuestAdd}>追加する</Button> */}
        <Button radius="full"
          onClick={onGuestAdd}
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out">
          追加する
        </Button>
      </div>

      <div className="flex flex-wrap gap-5">
        {event?.guests?.map((guest: string, index: number) => (
          <Chip key={index} onClose={() => onGuestRemove(index)}>
            {guest}
          </Chip>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => { }} className='hover:bg-red-500 hover:text-white hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out'>登録キャンセル</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)} color='primary' className='hover:bg-indigo-600 hover:text-white hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out'
          isDisabled={!event?.name || !event?.organizer || !event?.description}
        >次の入力画面へ</Button>
      </div>
    </div>
  );
}

export default General
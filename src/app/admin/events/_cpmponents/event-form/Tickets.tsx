import React from 'react'
import { EventFormStepProps } from './General'
import { Button, Input } from '@nextui-org/react'
import toast from 'react-hot-toast';


function Tickets({ event, setEvent, activeStep, setActiveStep }: EventFormStepProps) {
    const onAddTicketType = () => {
        try {
            const tempEvent = { ...event };
            if (tempEvent.ticketTypes) { // eventオブジェクトにticketTypesがあるならticketTypesオブジェクトに格納
                tempEvent.ticketTypes.push({
                    name: "",
                    price: 0,
                    quantity: 0,
                    limit: 0
                });
            } else {
                tempEvent.ticketTypes = [{ // eventオブジェクトにticketTypesがなければticketTypesオブジェクトを作成
                    name: "",
                    price: 0,
                    quantity: 0,
                    limit: 0
                }];
            }
            setEvent(tempEvent); // ここでもともとのeventオブジェクトを更新
        } catch (error: any) {
            toast.error(error.message);
        };
    }

    const onTicketPropertyChange = ({ index, property, value }: {
        index: number,
        property: string,
        value: any
    }) => {
        const tempEvent = { ...event };
        tempEvent.ticketTypes[index][property] = value;
        setEvent(tempEvent);
    }

    const onTicketTypeDelete = (index: number) => {
        const tempEvent = { ...event };
        tempEvent.ticketTypes.splice(index, 1);
        setEvent(tempEvent);

    }

    return (
        <div>
            {event.ticketTypes && event.ticketTypes.length > 0 && (
                <div className='flex flex-col gap-5'>
                    <div className=' grid grid-cols-4 rounded justify-between p-2'>
                        {["チケット名及び種類", "価格 /円", "枚数制限", ""].map((item, index) => (
                            <h1 key={index} className='font-semibold'>{item}</h1>
                        ))}
                    </div>
                    {event.ticketTypes.map((ticketTypes: any, index: number) => (
                        <div className="grid grid-cols-4 font-semibold gap-5 items-center" key={index}>
                            <Input placeholder='チケット名や種類(Premieなど)' onChange={(e) => onTicketPropertyChange({ index, property: "name", value: e.target.value })} value={ticketTypes.name} />
                            <Input placeholder='1枚当たりの価格' onChange={(e) => onTicketPropertyChange({ index, property: "price", value: Number(e.target.value) })} value={ticketTypes.price} />
                            <Input placeholder='枚数制限' onChange={(e) => onTicketPropertyChange({ index, property: "limit", value: Number(e.target.value) })} value={ticketTypes.limit} type='number' />
                            <Button className='bg-red-600 hover:bg-red-400 rounded-full text-white w-28' onClick={() => onTicketTypeDelete(index)}><i className="ri-delete-bin-6-line"></i>削除する</Button>
                        </div>
                    ))}
                </div>
            )}


            <Button className='mt-10 bg-blue-600 text-white'
                onClick={onAddTicketType}><i className="ri-coupon-3-line"></i>チケットの種類を追加する</Button>
            <div className="flex justify-center gap-5">
                <Button onClick={() => { setActiveStep(activeStep - 1) }}>戻る</Button>
                <Button type='submit' color='primary'
                    isDisabled={!event?.ticketTypes?.every((ticketType: any) =>
                        ticketType.name &&
                        ticketType.price > 0 &&
                        ticketType.limit > 0
                    )}>登録する</Button>
            </div>
        </div>
    )
}

export default Tickets;
import React from 'react'
import { EventFormStepProps } from './General'
import { Button, Input } from '@nextui-org/react'
import toast from 'react-hot-toast';


function Tickets({ event, setEvent, activeStep, setActiveStep }: EventFormStepProps) {
    const onAddTicketType = () => {
        try {
            const tempEvent = { ...event };
            if (event.ticketTypes) { // チケットのタイプで枚数制限を加える（例えばプレミアは稀少にする）
                tempEvent.ticketTypes.push({
                    name: "",
                    price: 0,
                    quantity: 0,
                    limit: 0
                });
            } else {
                tempEvent.ticketTypes = [{ // ノーマルチケットは枚数制限なし
                    name: "",
                    price: 0,
                    limit: 0
                }];
            }
            setEvent(tempEvent);
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
                        {["Name", "Price", "Limit", ""].map((item, index) => (
                            <h1 key={index} className='font-semibold'>{item}</h1>
                        ))}
                    </div>
                    {event.ticketTypes.map((ticketTypes: any, index: number) => (
                        <div className="grid grid-cols-4 font-semibold gap-5 items-center" key={index}>
                            <Input placeholder='チケットの種類(Premieなど)' onChange={(e) => onTicketPropertyChange({ index, property: "name", value: e.target.value })} value={ticketTypes.name} />
                            <Input placeholder='1枚当たりの価格' onChange={(e) => onTicketPropertyChange({ index, property: "price", value: e.target.value })} value={ticketTypes.price} />
                            <Input placeholder='枚数制限' onChange={(e) => onTicketPropertyChange({ index, property: "limit", value: e.target.value })} value={ticketTypes.limit} />
                            <Button className='bg-red-700 hover:bg-orange-500 rounded-full text-white w-28' onClick={() => onTicketTypeDelete(index)}><i className="ri-delete-bin-6-line"></i>削除する</Button>
                        </div>
                    ))}
                </div>
            )}


            <Button className='mt-10 bg-blue-600 text-white'
                onClick={onAddTicketType}><i className="ri-coupon-3-line"></i>チケットの種類を追加する</Button>
            <div className="flex justify-center gap-5">
                <Button onClick={() => { setActiveStep(activeStep - 1) }}>戻る</Button>
                <Button onClick={() => setActiveStep(activeStep + 1)} color='primary'
                >次の入力画面へ</Button>
            </div>
        </div>
    )
}

export default Tickets;
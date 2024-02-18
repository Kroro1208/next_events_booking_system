import React, { useState } from 'react'
import { Button, Modal, ModalContent } from '@nextui-org/react';
import { PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { EventType } from '@/src/interfaces/events';
import axios from 'axios';


interface PaymentModalProps {
    showPaymentModal: boolean;
    setShowPaymentModal: (show: boolean) => void;
    event: EventType;
    ticketType: string;
    ticketCount: number;
    totalAmount: number;
}

function PaymentModal({ showPaymentModal, setShowPaymentModal, event, ticketType, ticketCount, totalAmount }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setLoading(true);
            if (!stripe || !elements) {
                return;
            }
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_DOMAIN!}`,
                },
                redirect: "if_required"
            });
            setLoading(false);
            if (result.error) {
                toast.error(result.error.message!);
            } else {
                toast.success('お支払いが完了しました');

                const reqBody = {
                    event: event._id,
                    ticketType,
                    ticketCount,
                    totalAmount,
                    paymentId: result.paymentIntent?.id
                }
                await axios.post("/api/bookings", reqBody);
                toast.success("イベントの参加予約が完了しました");
                router.push("/bookings");
            }
        } catch (error: any) {
            toast.error("お支払いが完了できません。お間違いがないようでしたらお問い合わせください");
        } finally { setLoading(false) }
    };

    return (
        <Modal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            size='2xl'
        >
            <ModalContent>
                <form className='p-5' onSubmit={handleSubmit}>
                    <PaymentElement />
                    <AddressElement options={{
                        allowedCountries: ['JP'],
                        mode: 'shipping'
                    }} />
                    <div className='flex justify-end gap-5 mt-5'>
                        <Button type='button'>キャンセルする</Button>
                        <Button color='primary' type='submit' isLoading={loading}>購入する</Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default PaymentModal
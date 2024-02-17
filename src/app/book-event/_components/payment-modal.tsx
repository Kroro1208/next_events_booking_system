import React, { useState } from 'react'
import { Button, Modal, ModalContent } from '@nextui-org/react';
import { PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface PaymentModalProps {
    showPaymentModal: boolean;
    setShowPaymentModal: (show: boolean) => void;
}

function PaymentModal({ showPaymentModal, setShowPaymentModal }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            router.push("/bookings");
        }
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
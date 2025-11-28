"use client";

import React, { useState } from 'react';
import Modal from '../../../common/Modal';
import TextInput from '../../../inputs/Text';
import PhoneNumberInput from '../../../inputs/PhoneNumberInput';
import Button from '../../../inputs/Button';

interface JoinWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const JoinWaitlistModal: React.FC<JoinWaitlistModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+234');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 1000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl" isCenter>
            <div className="py-2 my-2 md:mx-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Join Waitlist</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        label="Full Name"
                        placeholder="Toluwalase Obasun"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <PhoneNumberInput
                        label="Phone Number"
                        countryCode={countryCode}
                        onCountryCodeChange={setCountryCode}
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="08146644455"
                        required
                    />

                    <TextInput
                        label="Email Address"
                        type="email"
                        placeholder="toluwalase.obasun@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full font-bold"
                            paddingY="py-4"
                            fontSize="text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Joining...' : 'Join Waitlist'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default JoinWaitlistModal;

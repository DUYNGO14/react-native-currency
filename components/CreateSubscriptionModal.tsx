import React, { useState } from 'react';
import {
    Modal,
    TextInput,
    View,
    Text,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { icons } from '@/constants/icons';

interface CreateSubscriptionModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (subscription: any) => void;
}

const CATEGORIES = [
    'Entertainment',
    'AI Tools',
    'Developer Tools',
    'Design',
    'Productivity',
    'Cloud',
    'Music',
    'Other',
];

const CATEGORY_COLORS: Record<string, string> = {
    'Entertainment': '#ff9b9b',
    'AI Tools': '#b8d4e3',
    'Developer Tools': '#e8def8',
    'Design': '#f5c542',
    'Productivity': '#b8e8d0',
    'Cloud': '#a2d2ff',
    'Music': '#d4a373',
    'Other': '#e0e0e0',
};

export default function CreateSubscriptionModal({
    visible,
    onClose,
    onAdd,
}: CreateSubscriptionModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [frequency, setFrequency] = useState<'Monthly' | 'Yearly'>('Monthly');
    const [category, setCategory] = useState('Entertainment');

    const handleClose = () => {
        setName('');
        setPrice('');
        setFrequency('Monthly');
        setCategory('Entertainment');
        onClose();
    };

    const isValid = name.trim().length > 0 && parseFloat(price) > 0;

    const handleSubmit = () => {
        if (!isValid) return;

        const newSubscription: any = {
            id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: name.trim(),
            price: parseFloat(price),
            currency: 'USD',
            billing: frequency,
            category,
            status: 'active',
            icon: icons.wallet,
            startDate: new Date().toISOString(),
            renewalDate: frequency === 'Monthly' 
                ? dayjs().add(1, 'month').format('YYYY-MM-DDTHH:mm:ss.000Z')
                : dayjs().add(1, 'year').format('YYYY-MM-DDTHH:mm:ss.000Z'),
            paymentMethod: 'Added via app',
            plan: `${frequency} Plan`,
            color: CATEGORY_COLORS[category] || '#e0e0e0',
        };

        onAdd(newSubscription);
        handleClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View className="modal-overlay">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 justify-end"
                >
                    <View className="modal-container">
                        <View className="modal-header">
                            <Text className="modal-title">New Subscription</Text>
                            <Pressable onPress={handleClose} className="modal-close">
                                <Text className="modal-close-text">✕</Text>
                            </Pressable>
                        </View>

                        <ScrollView className="modal-body" showsVerticalScrollIndicator={false}>
                            {/* Name Input */}
                            <View className="auth-field">
                                <Text className="auth-label">Name</Text>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="e.g. Netflix, Spotify"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    className="auth-input"
                                />
                            </View>

                            {/* Price Input */}
                            <View className="auth-field mt-4">
                                <Text className="auth-label">Price</Text>
                                <TextInput
                                    value={price}
                                    onChangeText={setPrice}
                                    placeholder="0.00"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    keyboardType="decimal-pad"
                                    className="auth-input"
                                />
                            </View>

                            {/* Frequency Toggle */}
                            <View className="auth-field mt-4">
                                <Text className="auth-label">Frequency</Text>
                                <View className="picker-row">
                                    <Pressable
                                        onPress={() => setFrequency('Monthly')}
                                        className={clsx(
                                            'picker-option',
                                            frequency === 'Monthly' && 'picker-option-active'
                                        )}
                                    >
                                        <Text
                                            className={clsx(
                                                'picker-option-text',
                                                frequency === 'Monthly' && 'picker-option-text-active'
                                            )}
                                        >
                                            Monthly
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setFrequency('Yearly')}
                                        className={clsx(
                                            'picker-option',
                                            frequency === 'Yearly' && 'picker-option-active'
                                        )}
                                    >
                                        <Text
                                            className={clsx(
                                                'picker-option-text',
                                                frequency === 'Yearly' && 'picker-option-text-active'
                                            )}
                                        >
                                            Yearly
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            {/* Category Selection */}
                            <View className="auth-field mt-4">
                                <Text className="auth-label">Category</Text>
                                <View className="category-scroll">
                                    {CATEGORIES.map((cat) => (
                                        <Pressable
                                            key={cat}
                                            onPress={() => setCategory(cat)}
                                            className={clsx(
                                                'category-chip',
                                                category === cat && 'category-chip-active'
                                            )}
                                        >
                                            <Text
                                                className={clsx(
                                                    'category-chip-text',
                                                    category === cat && 'category-chip-text-active'
                                                )}
                                            >
                                                {cat}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Submit Button */}
                            <View className="mt-8 mb-4">
                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    className={clsx(
                                        'auth-button',
                                        !isValid && 'auth-button-disabled'
                                    )}
                                >
                                    <Text className="auth-button-text">Add Subscription</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

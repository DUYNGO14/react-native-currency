import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import SubscriptionCard from '../../components/SubscriptionCard';

const baseSubscription: Subscription = {
    id: 'test-sub',
    icon: { uri: 'https://example.com/icon.png' },
    name: 'Netflix',
    billing: 'Monthly',
    price: 15.99,
    currency: 'USD',
};

const fullSubscription: Subscription = {
    id: 'adobe-creative-cloud',
    icon: { uri: 'https://example.com/adobe.png' },
    name: 'Adobe Creative Cloud',
    plan: 'Teams Plan',
    category: 'Design',
    paymentMethod: 'Visa ending in 8530',
    status: 'active',
    startDate: '2025-03-20T10:00:00.000Z',
    price: 77.49,
    currency: 'USD',
    billing: 'Monthly',
    renewalDate: '2026-03-20T10:00:00.000Z',
    color: '#f5c542',
};

describe('SubscriptionCard (collapsed)', () => {
    it('renders the subscription name', () => {
        render(
            <SubscriptionCard
                data={baseSubscription}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Netflix')).toBeTruthy();
    });

    it('renders the formatted price', () => {
        render(
            <SubscriptionCard
                data={baseSubscription}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('$15.99')).toBeTruthy();
    });

    it('renders the billing period', () => {
        render(
            <SubscriptionCard
                data={baseSubscription}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Monthly')).toBeTruthy();
    });

    it('calls onPress when the card is pressed', () => {
        const onPressMock = jest.fn();
        render(
            <SubscriptionCard
                data={baseSubscription}
                expanded={false}
                onPress={onPressMock}
            />
        );
        fireEvent.press(screen.getByText('Netflix'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('shows category in meta when category is provided', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Design')).toBeTruthy();
    });

    it('shows plan in meta when category is absent but plan is present', () => {
        const subWithPlanOnly: Subscription = {
            ...baseSubscription,
            plan: 'Pro Plan',
        };
        render(
            <SubscriptionCard
                data={subWithPlanOnly}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Pro Plan')).toBeTruthy();
    });

    it('shows formatted renewal date in meta when no category or plan', () => {
        const subWithRenewalOnly: Subscription = {
            ...baseSubscription,
            renewalDate: '2026-04-02T10:00:00.000Z',
        };
        render(
            <SubscriptionCard
                data={subWithRenewalOnly}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('04/02/2026')).toBeTruthy();
    });

    it('does not show expanded details when collapsed', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.queryByText('Payment:')).toBeNull();
        expect(screen.queryByText('Category:')).toBeNull();
        expect(screen.queryByText('Started:')).toBeNull();
        expect(screen.queryByText('Renewal date:')).toBeNull();
        expect(screen.queryByText('Status:')).toBeNull();
    });
});

describe('SubscriptionCard (expanded)', () => {
    it('shows expanded detail labels when expanded', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Payment:')).toBeTruthy();
        expect(screen.getByText('Category:')).toBeTruthy();
        expect(screen.getByText('Started:')).toBeTruthy();
        expect(screen.getByText('Renewal date:')).toBeTruthy();
        expect(screen.getByText('Status:')).toBeTruthy();
    });

    it('shows payment method when expanded', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Visa ending in 8530')).toBeTruthy();
    });

    it('shows formatted start date when expanded', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('03/20/2025')).toBeTruthy();
    });

    it('shows formatted renewal date when expanded', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('03/20/2026')).toBeTruthy();
    });

    it('shows capitalized status when expanded and renewalDate is set', () => {
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Active')).toBeTruthy();
    });

    it('shows "paused" status capitalized', () => {
        const pausedSub = { ...fullSubscription, status: 'paused' };
        render(
            <SubscriptionCard
                data={pausedSub}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Paused')).toBeTruthy();
    });

    it('does not show status value when renewalDate is absent (expanded)', () => {
        const subNoRenewal: Subscription = {
            ...baseSubscription,
            status: 'active',
        };
        render(
            <SubscriptionCard
                data={subNoRenewal}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        // Status label row is visible but value is empty string
        expect(screen.getByText('Status:')).toBeTruthy();
        expect(screen.queryByText('Active')).toBeNull();
    });

    it('shows empty start date cell when startDate is absent', () => {
        const subNoStart: Subscription = {
            ...baseSubscription,
            renewalDate: '2026-04-02T10:00:00.000Z',
        };
        render(
            <SubscriptionCard
                data={subNoStart}
                expanded={true}
                onPress={jest.fn()}
            />
        );
        // Started: label exists but no date text
        expect(screen.getByText('Started:')).toBeTruthy();
    });

    it('still calls onPress when expanded card is pressed', () => {
        const onPressMock = jest.fn();
        render(
            <SubscriptionCard
                data={fullSubscription}
                expanded={true}
                onPress={onPressMock}
            />
        );
        fireEvent.press(screen.getByText('Adobe Creative Cloud'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});

describe('SubscriptionCard currency formatting', () => {
    it('formats EUR currency correctly', () => {
        const eurSub: Subscription = {
            ...baseSubscription,
            price: 12.0,
            currency: 'EUR',
        };
        render(
            <SubscriptionCard
                data={eurSub}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        const priceEl = screen.getByText(/12\.00/);
        expect(priceEl).toBeTruthy();
    });

    it('renders a subscription with yearly billing', () => {
        const yearlySub: Subscription = {
            ...fullSubscription,
            billing: 'Yearly',
            price: 119.99,
        };
        render(
            <SubscriptionCard
                data={yearlySub}
                expanded={false}
                onPress={jest.fn()}
            />
        );
        expect(screen.getByText('Yearly')).toBeTruthy();
        expect(screen.getByText('$119.99')).toBeTruthy();
    });
});
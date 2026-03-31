import React from 'react';
import { render, screen } from '@testing-library/react-native';
import UpcomingSubscriptionCard from '../../components/UpcomingSubscriptionCard';

const baseData: UpcomingSubscriptionCardProps = {
    icon: { uri: 'https://example.com/spotify.png' },
    name: 'Spotify',
    price: 5.99,
    currency: 'USD',
    daysLeft: 2,
};

describe('UpcomingSubscriptionCard', () => {
    it('renders the subscription name', () => {
        render(<UpcomingSubscriptionCard data={baseData} />);
        expect(screen.getByText('Spotify')).toBeTruthy();
    });

    it('renders the formatted price', () => {
        render(<UpcomingSubscriptionCard data={baseData} />);
        expect(screen.getByText('$5.99')).toBeTruthy();
    });

    it('shows "X day left" when daysLeft > 1', () => {
        render(<UpcomingSubscriptionCard data={baseData} />);
        expect(screen.getByText('2 day left')).toBeTruthy();
    });

    it('shows "Last day" when daysLeft is exactly 1', () => {
        render(<UpcomingSubscriptionCard data={{ ...baseData, daysLeft: 1 }} />);
        expect(screen.getByText('Last day')).toBeTruthy();
    });

    it('shows "Last day" when daysLeft is 0', () => {
        render(<UpcomingSubscriptionCard data={{ ...baseData, daysLeft: 0 }} />);
        expect(screen.getByText('Last day')).toBeTruthy();
    });

    it('shows correct count for daysLeft of 6', () => {
        render(<UpcomingSubscriptionCard data={{ ...baseData, daysLeft: 6 }} />);
        expect(screen.getByText('6 day left')).toBeTruthy();
    });

    it('does not show "Last day" when daysLeft > 1', () => {
        render(<UpcomingSubscriptionCard data={baseData} />);
        expect(screen.queryByText('Last day')).toBeNull();
    });

    it('renders with a different name', () => {
        render(<UpcomingSubscriptionCard data={{ ...baseData, name: 'Notion' }} />);
        expect(screen.getByText('Notion')).toBeTruthy();
    });

    it('renders with EUR currency', () => {
        render(
            <UpcomingSubscriptionCard
                data={{ ...baseData, price: 12.0, currency: 'EUR' }}
            />
        );
        const priceEl = screen.getByText(/12\.00/);
        expect(priceEl).toBeTruthy();
    });

    it('renders price with 2 decimal places for a whole number', () => {
        render(
            <UpcomingSubscriptionCard data={{ ...baseData, price: 20, currency: 'USD' }} />
        );
        expect(screen.getByText('$20.00')).toBeTruthy();
    });

    it('shows "X day left" with daysLeft of 30', () => {
        render(<UpcomingSubscriptionCard data={{ ...baseData, daysLeft: 30 }} />);
        expect(screen.getByText('30 day left')).toBeTruthy();
    });
});
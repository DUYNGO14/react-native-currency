import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ListHeading from '../../components/ListHeading';

describe('ListHeading', () => {
    it('renders the provided title text', () => {
        render(<ListHeading title="Upcoming" />);
        expect(screen.getByText('Upcoming')).toBeTruthy();
    });

    it('renders the "View all" button', () => {
        render(<ListHeading title="All Subscriptions" />);
        expect(screen.getByText('View all')).toBeTruthy();
    });

    it('renders a different title when provided', () => {
        render(<ListHeading title="All Subscription" />);
        expect(screen.getByText('All Subscription')).toBeTruthy();
    });

    it('renders an empty title without crashing', () => {
        render(<ListHeading title="" />);
        expect(screen.getByText('View all')).toBeTruthy();
    });

    it('renders a long title without crashing', () => {
        const longTitle = 'A Very Long Section Title That Could Overflow';
        render(<ListHeading title={longTitle} />);
        expect(screen.getByText(longTitle)).toBeTruthy();
    });

    it('"View all" button is pressable (TouchableOpacity)', () => {
        render(<ListHeading title="Test" />);
        const button = screen.getByText('View all');
        // Should not throw when pressed
        fireEvent.press(button);
    });
});
import SubscriptionCard from '@/components/SubscriptionCard';
import { HOME_SUBSCRIPTIONS } from '@/constants/data';
import { styled } from 'nativewind';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

export default function Subscriptions() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    const handleSetExpandedSubscriptionId = useCallback((id: string) => {
        setExpandedSubscriptionId((currentId) => (currentId === id ? null : id));
    }, []);

    const filteredSubscriptions = useMemo(() => {
        if (!searchQuery.trim()) {
            return HOME_SUBSCRIPTIONS;
        }
        return HOME_SUBSCRIPTIONS.filter((sub) =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="px-5 pb-2 pt-4">
                <Text className="mb-4 text-3xl font-sans-bold text-primary">Subscriptions</Text>
                
                {/* Search Bar */}
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search subscriptions..."
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-sans-medium text-primary"
                    clearButtonMode="while-editing"
                />
            </View>

            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                contentContainerClassName="p-5 pb-30"
                ItemSeparatorComponent={() => <View className="h-4" />}
                showsVerticalScrollIndicator={false}
                extraData={expandedSubscriptionId}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        data={item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() => handleSetExpandedSubscriptionId(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View className="py-10 items-center justify-center">
                        <Text className="text-base font-sans-medium text-muted-foreground">
                            {searchQuery.trim() ? "No subscriptions found matching your search." : "No subscriptions yet."}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
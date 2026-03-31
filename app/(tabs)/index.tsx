import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import { formatCurrency } from "@/lib/utils";
import { useUser } from "@clerk/expo";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, View, Pressable } from "react-native";
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    const handleSetExpandedSubscriptionId = useCallback((id: string) => {
        setExpandedSubscriptionId((currentId) => currentId === id ? null : id);
    }, []);
    const [subscriptions, setSubscriptions] = useState(HOME_SUBSCRIPTIONS);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { user } = useUser();
    const displayName = `${user?.firstName} ${user?.lastName}` || user?.fullName || user?.emailAddresses[0]?.emailAddress || 'User';
    
    const handleAddSubscription = (newSub: any) => {
        setSubscriptions([newSub, ...subscriptions]);
    };
    const Header = () => (
        <>
            <View className={'home-header'}>
                <View className={'home-user'}>
                    <Image 
                        source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                        className={'home-avatar'}
                    />
                    <Text className={"home-user-name"}>Hi, {displayName}</Text>
                </View>
                <Pressable onPress={() => setIsModalVisible(true)}>
                    <Image source={icons.add} className={'home-add-icon'}/>
                </Pressable>
            </View>
            <View className={'home-balance-card'}>
                <Text className={'home-balance-label'}>
                    Balance
                </Text>
                <View className={'home-balance-row'}>
                    <Text className={'home-balance-amount'}>
                        {formatCurrency(HOME_BALANCE.amount)}
                    </Text>
                    <Text className={'home-balance-date'}>
                        {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
                    </Text>
                </View>
            </View>
            <View className={'mb-5'}>
                <ListHeading title={"Upcoming"}/>
                <FlatList
                    ListHeaderComponent={<></>}
                    data={UPCOMING_SUBSCRIPTIONS}
                    renderItem={({item}) => (
                        <UpcomingSubscriptionCard data={item}/>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text className={'home-empty-state'}>No Upcoming renewals yet.</Text>
                    }
                />
            </View>
            <ListHeading title={"All Subscription"}/>
        </>
    );

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
                <FlatList
                    ListHeaderComponent={<Header />}
                    data={subscriptions}
                    renderItem={({item}) => (
                        <SubscriptionCard
                            data={item}
                            expanded={expandedSubscriptionId === item.id}
                            onPress={() => handleSetExpandedSubscriptionId(item.id)}/>
                    )}
                    keyExtractor={(item) => item.id}
                    extraData={expandedSubscriptionId}
                    ListEmptyComponent={
                        <Text className={'home-empty-state'}>No subscriptions yet.</Text>
                    }
                    ItemSeparatorComponent={() => <View className={'h-4'}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName={'pb-30'}
                />

                <CreateSubscriptionModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onAdd={handleAddSubscription}
                />
        </SafeAreaView>
    );
}

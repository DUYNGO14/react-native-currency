import {FlatList, Image, Text, View} from "react-native";
import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';
import {styled} from "nativewind"
import images from "@/constants/images";
import {HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS} from "@/constants/data";
import {icons} from "@/constants/icons";
import {formatCurrency} from "@/lib/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import {useCallback, useState} from "react";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    const handleSetExpandedSubscriptionId = useCallback((id: string) => {
        setExpandedSubscriptionId((currentId) => currentId === id ? null : id);
    }, []);
    return (
        <SafeAreaView className="flex-1 bg-background p-5">

                <FlatList
                    ListHeaderComponent={
                        <>
                            <View className={'home-header'}>
                                <View className={'home-user'}>
                                    <Image source={images.avatar} className={'home-avatar'}/>
                                    <Text className={"home-user-name"}>{HOME_USER.name}</Text>
                                </View>
                                <Image source={icons.add} className={'home-add-icon'}/>
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
                                    ListHeaderComponent={
                                        <>
                                        </>}
                                    data={UPCOMING_SUBSCRIPTIONS}
                                    renderItem={({item}) => (
                                        <UpcomingSubscriptionCard data={item}/>
                                    )}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id}
                                    ListEmptyComponent={
                                        <Text className={'home-empty-state'}>No Upcoming renewals yet.</Text>}
                                />
                            </View>
                            <ListHeading title={"All Subscription"}/>
                        </>
                    }
                    data={HOME_SUBSCRIPTIONS}
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
        </SafeAreaView>
    );
}

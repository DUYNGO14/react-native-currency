import {Text, View} from "react-native";
import React from "react";
import {Link, useLocalSearchParams} from "expo-router";


const SubscriptionDetail = () => {
    const {id} = useLocalSearchParams<{id:string}>();
    return(
        <View className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-bold text-success">
                Subscription Detail {id}
            </Text>
            <Link href={"/index"} className='mt-4 bg-primary text-white p-4'>Go to back</Link>
        </View>
    )
}

export default SubscriptionDetail;
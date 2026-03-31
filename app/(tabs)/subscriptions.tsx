import React from 'react';
import {Text, View} from "react-native";
import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';
import {styled} from "nativewind"

const SafeAreaView = styled(RNSafeAreaView);
function Subscriptions() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-bold text-success">
                Subscriptions
            </Text>
        </SafeAreaView>
    );
}

export default Subscriptions;
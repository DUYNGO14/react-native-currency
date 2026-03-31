import { useAuth, useUser } from '@clerk/expo';
import { styled } from 'nativewind';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';

const SafeAreaView = styled(RNSafeAreaView);

export default function Settings() {
    const { user } = useUser();
    const { signOut } = useAuth();

    const displayName = user?.fullName || `${user?.firstName} ${user?.lastName}`.trim() || 'User';
    const email = user?.primaryEmailAddress?.emailAddress || '';

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="mb-6 mt-4 px-5">
                <Text className="text-3xl font-sans-bold text-primary">Settings</Text>
            </View>

            {/* Profile Section */}
            <View className="mx-5 mb-8 flex-row items-center rounded-3xl border border-border bg-card p-5">
                <Image 
                    source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                    className="size-16 rounded-full" 
                />
                <View className="ml-4 flex-1">
                    <Text className="text-xl font-sans-bold text-primary">{displayName}</Text>
                    <Text className="mt-1 text-sm font-sans-medium text-muted-foreground">{email}</Text>
                </View>
            </View>

            {/* Actions Section */}
            <View className="px-5">
                <Pressable 
                    onPress={() => signOut()}
                    className="items-center rounded-2xl border border-destructive/30 bg-destructive/10 py-4"
                >
                    <Text className="text-base font-sans-bold text-destructive">Log Out</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
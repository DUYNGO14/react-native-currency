import {Text} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';
import {styled} from "nativewind"

const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="text-7xl  font-bold">
                Welcome to Home Page!
            </Text>
            <Link href={"/Onboarding"} className='mt-4 bg-primary text-white p-4 font-sans-bold'>Go to onboarding</Link>
            <Link href={"/(auth)/sign-in"} className='mt-4 bg-primary text-white p-4 font-sans-bold'>Go to signin</Link>
            <Link href={"/(auth)/sign-up"} className='mt-4 bg-primary text-white p-4 font-sans-bold'>Go to signup</Link>
        </SafeAreaView>
    );
}
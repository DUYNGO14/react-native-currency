import React from 'react';
import {Text, View} from "react-native";
import {Link} from "expo-router";

function SignIn() {
    return (
        <View>
            <Text>Sign In</Text>
            <Link href={"/(auth)/sign-up"} className='mt-4 bg-primary text-white p-4'>SignUn</Link>
        </View>
    );
}

export default SignIn;
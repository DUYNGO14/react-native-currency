import React from 'react';
import {Text, View} from "react-native";
import {Link} from "expo-router";

function SignUp() {
    return (
        <View>
            <Text>Sign Up</Text>
            <Link href={"/(auth)/sign-in"} className='mt-4 bg-primary text-white p-4'>SignIn</Link>
        </View>
    );
}

export default SignUp;
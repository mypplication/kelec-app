import { getWhiteColour } from "./lib/graphics/utils";
import { View, ActivityIndicator, StyleSheet, useColorScheme } from "react-native";

function FullScreenLoading(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return <View testID="loadingView" style={[styles.loadingSafeArea, { backgroundColor: getWhiteColour(isDarkMode) }]} >

        <ActivityIndicator size="large" />

    </View>
}

const styles = StyleSheet.create({
    loadingSafeArea: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 15
    }
});

export default FullScreenLoading;
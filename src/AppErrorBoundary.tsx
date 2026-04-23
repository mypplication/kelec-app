import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import Text from './screen/Common/CustomText';
import uuid from 'react-native-uuid';

type Props = {
    children: React.ReactNode;
}

type State = {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
    id?: string;
}

export class AppErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const id = uuid.v4();
        this.setState({ error, errorInfo, id });

        // 👉 Log error to your backend here
        this.logErrorToBackend(error, errorInfo, id);
    }

    logErrorToBackend(error: Error, errorInfo: React.ErrorInfo, id: string) {

        const payload = {
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
            platform: 'react-native',
            id: id,
        };

        console.log('Sending error to server...', payload);

  
        /* fetch('https://api.kelec.app/api/v1/crashes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).catch(err => {
            console.error('Failed to send error to backend:', err);
            Alert.alert('Error', 'An error occurred while trying to report the issue. Please try again later.');
        }); */
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Something went wrong.</Text>
                    <Text style={styles.details}>
                        <Text>ID : {this.state.id}{'\n'}</Text>
                        {this.state.error?.message}
                    </Text>
                    <Button title="Try again" onPress={this.resetError} />
                </View>
            );
        }

        return this.props.children;
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    details: { fontSize: 14, color: 'gray', marginBottom: 20, textAlign: 'center' },
});
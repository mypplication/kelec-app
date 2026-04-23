import { fireEvent, render } from "@testing-library/react-native";
import BigButton, { ButtonColours } from "../../src/screen/Common/BigButton";
import React from "react";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { act } from "react-test-renderer";


let mockCurrentColorScheme = 'dark'
const mockAppearanceEventEmitter = new EventEmitter()
const mockGetColorScheme = jest.fn();
jest.mock('react-native/Libraries/Utilities/Appearance', () => {
    return {
        getColorScheme: mockGetColorScheme,
        addChangeListener: (listener: any) => {
            return mockAppearanceEventEmitter.addListener('change', listener)
        },
        setColorScheme: (colorScheme: any) => {
            mockCurrentColorScheme = colorScheme
            mockAppearanceEventEmitter.emit('change', { colorScheme })
        },
    }
});


test('should by primary light', () => {
    mockGetColorScheme.mockImplementationOnce(() => "light");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.PRIMARY} text="title" icon="person" onPress={() => { }} />);
    expect(getByTestId('bigButtonWrapper').props.style[1]).toMatchObject(
        { backgroundColor: 'black', color: 'white' }
    );
    // the text should be here
    expect(getByTestId('bigButtonText')).toBeTruthy();
    expect(getByTestId('bigButtonText').props.style[2][1]).toMatchObject(
        { color: 'white' }
    );
    // the icon should be here
    expect(getByTestId('bigButtonIcon')).toBeTruthy();
});

test('should by primary dark', () => {
    mockGetColorScheme.mockImplementationOnce(() => "dark");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.PRIMARY} text="title" icon="person" onPress={() => { }} />);
    expect(getByTestId('bigButtonWrapper').props.style[1]).toMatchObject(
        { backgroundColor: 'black', color: 'white' }
    );
    // the text should be here
    expect(getByTestId('bigButtonText')).toBeTruthy();
    expect(getByTestId('bigButtonText').props.style[2][1]).toMatchObject(
        { color: 'white' }
    );
    // the icon should be here
    expect(getByTestId('bigButtonIcon')).toBeTruthy();
});

test('should by secondary light', () => {
    mockGetColorScheme.mockImplementationOnce(() => "light");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.SECONDARY} text="title" icon="person" onPress={() => { }} />);
    expect(getByTestId('bigButtonWrapper').props.style[1]).toMatchObject(
        { backgroundColor: 'white', color: 'black' }
    );
    // the text should be here
    expect(getByTestId('bigButtonText')).toBeTruthy();
    expect(getByTestId('bigButtonText').props.style[2][1]).toMatchObject(
        { color: 'black' }
    );
    // the icon should be here
    expect(getByTestId('bigButtonIcon')).toBeTruthy();
});

test('should by secondary dark', () => {
    mockGetColorScheme.mockImplementationOnce(() => "dark");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.SECONDARY} text="title" icon="person" onPress={() => { }} />);
    expect(getByTestId('bigButtonWrapper').props.style[1]).toMatchObject(
        { backgroundColor: 'white', color: 'black' }
    );
    // the text should be here
    expect(getByTestId('bigButtonText')).toBeTruthy();
    expect(getByTestId('bigButtonText').props.style[2][1]).toMatchObject(
        { color: 'black' }
    );
    // the icon should be here
    expect(getByTestId('bigButtonIcon')).toBeTruthy();
});

test('should by delete light', () => {
    mockGetColorScheme.mockImplementationOnce(() => "light");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.DELETE} text="title" icon="person" onPress={() => { }} />);
    expect(getByTestId('bigButtonWrapper').props.style[1]).toMatchObject(
        { backgroundColor: 'red', color: 'white' }
    );
    // the text should be here
    expect(getByTestId('bigButtonText')).toBeTruthy();
    expect(getByTestId('bigButtonText').props.style[2][1]).toMatchObject(
        { color: 'white' }
    );
    // the icon should be here
    expect(getByTestId('bigButtonIcon')).toBeTruthy();
});

test('should by delete dark', () => {
    mockGetColorScheme.mockImplementationOnce(() => "dark");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.DELETE} text="title" icon="person" onPress={() => { }} />);
    expect(getByTestId('bigButtonWrapper').props.style[1]).toMatchObject(
        { backgroundColor: 'red', color: 'white' }
    );
    // the text should be here
    expect(getByTestId('bigButtonText')).toBeTruthy();
    expect(getByTestId('bigButtonText').props.style[2][1]).toMatchObject(
        { color: 'white' }
    );
    // the icon should be here
    expect(getByTestId('bigButtonIcon')).toBeTruthy();
});

test('no text', () => {
    mockGetColorScheme.mockImplementationOnce(() => "dark");
    const { queryAllByTestId } = render(<BigButton testID="bigButton" icon="person" colour={ButtonColours.DELETE} onPress={() => { }} />);
    expect(queryAllByTestId('bigButtonWrapper')[0].props.style[1]).toMatchObject(
        { backgroundColor: 'red', color: 'white' }
    );
    // the text should be here
    expect(queryAllByTestId('bigButtonText')).toHaveLength(0);
    // the icon should be here
    expect(queryAllByTestId('bigButtonIcon')).toHaveLength(1);
});

test('press on the button', async () => {
    const onPress = jest.fn(() => { });
    mockGetColorScheme.mockImplementationOnce(() => "dark");
    const { getByTestId } = render(<BigButton testID="bigButton" colour={ButtonColours.DELETE} text="title" icon="person" onPress={onPress} />);
    await act(async () => {
        fireEvent.press(getByTestId('bigButtonWrapper'));
    })
    expect(onPress).toHaveBeenCalled();
});
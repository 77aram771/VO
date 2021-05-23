import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar, StyleSheet } from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

const FirstRoute = () => (
    <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

export default class VideoTabs extends React.Component {
    state = {
        index: 0,
        routes: [{ key: '1', title: 'First' }, { key: '2', title: 'Second' }],
    };

    _handleIndexChange = index => {
        this.setState({index})
    };

    _renderHeader = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        '1': FirstRoute,
        '2': SecondRoute,
    });

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Constants.statusBarHeight,
                    backgroundColor: '#1982f3',
                }}>
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleIndexChange}
                />
                <StatusBar barStyle="light-content" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

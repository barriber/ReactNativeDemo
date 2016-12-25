'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import _ from 'lodash';
import BarcodeScanner from 'react-native-barcodescanner';

let Card = React.createClass({
    render() {
        return (
            <View style={[styles.card]}>
                <Text>{this.props.text}</Text>
                <Image style={styles.thumbnail} source={{uri: this.props.imgSource}} />
            </View>
        )
    }
})

export default class FirstApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cards: []
        }
    }

    barcodeReceived(e) {
        if (e.data === '7290000688077') {
            this.setState({
                cards: [{
                    text: 'water',
                    imgSource: 'http://www.lautman.co.il/ProductsImages/G861123.jpg',
                    backgroundColor: 'blue'
                }]
            })
        } else if (e.data = '7290008909846') {
            this.setState({
                cards: [{
                    text: 'cola zero',
                    imgSource: 'http://www.overcaffeinated.org/sites/default/files/styles/large/public/products/coca_cola_zero_12oz_can.jpg?itok=IhvS0KXB',
                    backgroundColor: 'black'
                }]
            })
        }
        console.log('Barcode: ' + e.data);
        console.log('Type: ' + e.type);
    }

    handleYup(card) {
        this.setState({cart: _.concat(this.state.cart, card.text), cards: []});
    }

    handleNope() {
        this.setState({cards: []})
    }

    render() {
        if (_.isEmpty(this.state.cards)) {
            return (
                <BarcodeScanner
                    onBarCodeRead={(e) => this.barcodeReceived(e)}
                    style={{ flex: 1 }}
                />      )
        } else {
            return (
                <SwipeCards
                    cards={this.state.cards}
                    renderCard={(cardData) => <Card {...cardData} />}
                    handleYup={(card) => this.handleYup(card)}
                    handleNope={() => this.handleNope()}
                />
            )
        }
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    thumbnail: {
        flex: 1,
        width: 300,
        height: 300,
    },
})

AppRegistry.registerComponent('FirstApp', () => FirstApp);

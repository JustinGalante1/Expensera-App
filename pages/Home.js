import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-navigation';

//native base
import {Card, Container, Content, Text, CardItem, View} from 'native-base';

//our components
import Header from '../components/Header';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: "January"     
        }
    }

    componentDidMount(){
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});
        this.setState({month: month});
    }

    render() {
        const { navigation } = this.props;
        const windowWidth = Dimensions.get('window').width;
        console.log(windowWidth);
        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}>
                </SafeAreaView>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <Header navigation = {navigation}/>
                        <View style={styles.centerContainer}>
                            <View style={styles.centerContainer}>
                                <Card style={{width: windowWidth-20, borderRadius: 20}}>
                                    <CardItem header bordered style={styles.cardHeader}>
                                        <Text style={{flex: 1, color: '#1ef442'}}>
                                            Overview - {this.state.month}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Net Spending: 
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Income:
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Expenses:
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}/>
                                </Card> 
                            </View>
                            <View style={styles.centerContainer}>
                                <Card style={{width: windowWidth-20, borderRadius: 20}}>
                                    <CardItem header bordered style={styles.cardHeader}>
                                        <Text style={{color: '#1ef442', alignSelf: 'center'}}>
                                            Budget - {this.state.month}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Net Spending: 
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Income:
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Expenses:
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}/>
                                </Card> 
                            </View>
                        </View>
                </SafeAreaView>
            </Container>
            
        )
    }
}

export default Home

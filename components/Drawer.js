import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import Home from '../pages/Home';
import BudgetOverview from '../pages/BudgetOverview';

const Drawer = createDrawerNavigator({
    Home: {screen: Home},
    Budget: {screen: BudgetOverview}
});

export default createAppContainer(Drawer);
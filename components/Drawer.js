import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import Home from '../pages/Home';
import BudgetOverview from '../pages/BudgetOverview';
import ExpenseOverview from '../pages/ExpenseOverview';
import IncomeOverview from '../pages/ExpenseOverview';

const Drawer = createDrawerNavigator({
    Home: {screen: Home},
    Budget: {screen: BudgetOverview},
    Expense: {screen: ExpenseOverview},
    Income : {screen: IncomeOverview}
});

export default createAppContainer(Drawer);
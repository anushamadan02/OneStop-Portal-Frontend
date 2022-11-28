
import Newnavbar from './components/newnavbar';
import Mobile from './components/pages/mobile'
import Broadband from './components/pages/broadband';
import Home from './components/pages/home'
import Profile from './components/pages/profile';
import Products from './components/pages/products';
import Cart from './components/pages/cart';
import Contactus from './components/pages/contactus';
import Payment from "./components/pages/payment";
import Product from "./components/pages/product";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div style={{display:"flex",marginTop:"60px"}} >
         <Router>
                        <Newnavbar/>
                        <Switch >
                            <Route path='/' exact component={Home} />
                            <Route path='/profile' component={Profile} />
                            <Route path='/mobile' component={Mobile} />
                            <Route path='/broadband' component={Broadband} />
                            <Route path='/products' component={Products} />
                            <Route path='/cart' component={Cart} />
                            <Route path='/payment' component={Payment} />
                            <Route path='/contactus' component={Contactus} />
                            <Route path='/product/:productId' component={Product}/>
                        </Switch>
        </Router>
    </div>
  );
}
//render={(props) => <Paymentpage {...props} order={`Props through render`} />   
export default App;
/* <Route path='/product/:id' component={Product}/>   */
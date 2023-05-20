//https://legacy.reactjs.org/docs/hooks-effect.html
import { useEffect } from "react";
//https://reactrouter.com/en/main/router-components/browser-router
//https://reactrouter.com/en/main/route/route
//https://reactrouter.com/en/main/hooks/use-location
//https://reactrouter.com/en/main/components/routes
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

//Include all of the files we've created for the app
import Home from "./scenes/home/Home"
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";

//https://reactrouter.com/en/main/hooks/use-location
const ScrollToTop = () => {
  const { pathname } = useLocation();
  //https://legacy.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    //https://www.w3schools.com/jsref/met_win_scrollto.asp
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return ( <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/**Start at the home page */}
          <Route path="/" element={<Home />} />
          {/**Directed to the item detials once clicked on */}
          <Route path="item/:itemId" element={<ItemDetails />} />
          {/**Proceed to checkout after adding items to the cart */}
          <Route path="checkout" element={<Checkout />} />
          {/**Directed to confirmation page once items are paid for */}
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

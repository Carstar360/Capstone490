import MainCarousel from "./MainCarousel"; //Import each file from the home directory
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";



const Home = () => {
    //Each file in the home directory is assigned to the value Home
    return ( <div className="home">
        <MainCarousel />
        <ShoppingList />
        <Subscribe />
        </div>
    );
};

export default Home;
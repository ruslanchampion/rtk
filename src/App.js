import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { CartContainer } from "./components/CartContainer";
import { getCartItems } from "./features/cart/cartSlice";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCartItems());
	}, []);

	return (
		<main>
			<Navbar />
			<CartContainer />
		</main>
	);
};

export default App;

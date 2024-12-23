import { useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { fetch24HrStats } from "../../Data/fetchTokens";
import SpinnerFullSize from "../../Widgets/SpinnerFullSize";
import RootLayout from "../Components/RootLayout";
import ListTokens from "./ListTokens";

const Home = () => {
  const { tokens, setTokens } = useAppContext();
  const fetchTokensList = () => {
    fetch24HrStats()
      .then((tokens_) => {
        // Target only USDT tokens
        const usdtTokens = tokens_.filter((t) => t.symbol.slice(-4) == "USDT");

        setTokens(usdtTokens);
      })
      .catch((e) => {
        alert("Error fetching: " + e);
      });
  };

  useEffect(() => {
    fetchTokensList();
  }, []);

  // register a interval for refetching after a certain period of time
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokensList();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <RootLayout>
      <ListTokens />
    </RootLayout>
  );
};

export default Home;

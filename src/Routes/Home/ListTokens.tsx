import React, { useEffect, useState } from "react";
import { TokenStats } from "../../Data/fetchTokens";
import { useAppContext } from "../../Context/AppContext";
import SpinnerHCenter from "../../Widgets/SpinnerHCenter";
import { MdCancel } from "react-icons/md";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListTokens = () => {
  const [filteredTokens, setFilteredTokens] = useState<TokenStats[] | null>(
    null
  );
  const { tokens } = useAppContext();
  const TopTokens = [
    "BTCUSDT",
    "ETHUSDT",
    "XRPUSDT",
    "SOLUSDT",
    "BNBUSDT",
    "GFTUSDT",
  ];
  const [currentFilter, setCurrentFilter] = useState("default");
  const filterButtons: FilterButtonProps[] = [
    {
      text: "Following",
      fid: "default",
      onTap: () => {},
    },
    {
      text: "Gainers",
      onTap: () => {},
      fid: "gainer",
    },
    {
      text: "Losers",
      onTap: () => {},
      fid: "loser",
    },
  ];

  useEffect(() => {
    if (currentFilter == "default" && tokens) {
      const tokens_ = tokens!.filter((t) => TopTokens.includes(t.symbol));
      setFilteredTokens(tokens_);
    } else {
      setFilteredTokens(tokens);
    }
  }, [tokens]);

  return (
    <div className="list-tokens">
      {/* List Filter buttons */}
      <div className="area-filter">
        <div className="filter-buttons">
          {filterButtons.map((filterButton, index) => (
            <FilterButton
              onTap={filterButton.onTap}
              text={filterButton.text}
              key={index}
              fid={filterButton.fid}
              selected={filterButton.fid == currentFilter}
              disabled={filteredTokens == null}
            />
          ))}
        </div>
        <div className="search-box-area">
          <input type="text" className="input-search" />
          <MdCancel />
        </div>
      </div>
      {filteredTokens ? (
        <TokenList tokens={filteredTokens} />
      ) : (
        <SpinnerHCenter />
      )}
    </div>
  );
};

interface FilterButtonProps {
  text: string;
  onTap(): void;
  disabled?: boolean;
  fid: string;
  selected?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  text,
  onTap,
  disabled,
  selected = false,
}) => {
  return (
    <button
      className={`btn-filter ${selected ? "btn-filter-selected" : ""}`}
      onClick={onTap}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

interface TokenListProps {
  tokens: TokenStats[];
}
interface TokenListItemProps {
  token: TokenStats;
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  return (
    <div className="token-list">
      {tokens.map((token, index) => (
        <TokenListItem token={token} key={index} />
      ))}
    </div>
  );
};

const TokenListItem: React.FC<TokenListItemProps> = ({ token }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/token/${token.symbol}`)}
      className={`ti ${
        token.priceChangePercent > 0 ? "ti-bg-up" : "ti-bg-down"
      }`}
    >
      <div className="ti-l">${token.symbol}</div>
      <div className="ti-right">
        <div
          className={`ti-24-chg ${
            token.priceChangePercent > 0 ? "t-up-color" : "t-down-color"
          }`}
        >
          {token.priceChangePercent}%
        </div>
        {token.priceChangePercent > 0 ? (
          <FaLongArrowAltUp className="t-up-color" />
        ) : (
          <FaLongArrowAltDown className="t-down-color" />
        )}
      </div>
    </div>
  );
};

export default ListTokens;

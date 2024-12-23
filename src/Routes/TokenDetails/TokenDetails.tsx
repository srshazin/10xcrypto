import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import { BiArrowBack } from "react-icons/bi";
import { useAppContext } from "../../Context/AppContext";
import { GrHomeOption } from "react-icons/gr";
import { AnimatePresence, motion } from "motion/react";

const TokenDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const backButtonPossible = window.history.state.key != null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{
          type: "tween",
          duration: 0.1,
        }}
        className="tokenDetails"
      >
        <div className="td-h" onClick={() => navigate(-1)}>
          {backButtonPossible ? (
            <div className="tdh-nav-ic">
              <BiArrowBack className="td-nav-arr" />
            </div>
          ) : (
            <div className="tdh-nav-ic">
              <GrHomeOption className="td-nav-arr" />
            </div>
          )}

          <div className="tdh-token-name">{params.symbol}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TokenDetails;

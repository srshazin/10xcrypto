import React, { ReactNode } from "react";
import Header from "./Header";
import { motion } from "motion/react";
interface RootLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: 100 }}
      transition={{
        type: "tween",
        duration: 0.1,
      }}
      className="root-layout"
    >
      <Header />
      <div className="content-space">{children}</div>
    </motion.div>
  );
};

export default RootLayout;

import { CaretUpOutlined } from "@ant-design/icons";
import classes from "./HeaderFooter.module.scss";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className={classes.footer}>
      Powered by
      <CaretUpOutlined style={{ fontSize: "20px", color: "#08c" }} /> Guxim
    </footer>
  );
}

export default Footer;

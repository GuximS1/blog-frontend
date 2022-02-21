/* eslint-disable @next/next/no-img-element */
import { PlusOutlined, RobotFilled } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import classes from "./HeaderFooter.module.scss";
import { useRouter } from "next/router";
type Props = {};

function Header({}: Props) {
  const router = useRouter();
  function visitHome() {
    router.push({
      pathname: "/",
    });
  }
  return (
    <header className={classes.header}>
      <h1
        className={classes.title}
        style={{ cursor: "pointer" }}
        onClick={visitHome}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1200px-F1.svg.png"
          width={200}
          alt="img"
        />
        F1news.com
      </h1>
      <Link href="/AddBlog">
        <a>
          <Button type="primary" shape="round" icon={<PlusOutlined />}>
            Add post
          </Button>
        </a>
      </Link>
    </header>
  );
}

export default Header;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card } from "antd";
import { EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import classes from "./Card.module.scss";
import { gql, useMutation } from "@apollo/client";
import { GET_BLOGS } from "./index";
import { useRouter } from "next/router";

const REMOVE_BLOG = gql`
  mutation ($id: String!) {
    removeBlog(deleteBlogData: { blogId: $id }) {
      id
      title
      body
      author
      image
    }
  }
`;

const { Meta } = Card;

function Blog(props: any) {
  const router = useRouter();
  const [removeB] = useMutation(REMOVE_BLOG);

  function visitHandler() {
    router.push({
      pathname: "visitpage/[visit]",
      query: {
        visit: props.data.id,
      },
    });
  }

  function editHandler() {
    router.push({
      pathname: "[edit]",
      query: {
        edit: props.data.id,
      },
    });
  }

  function deleteHandler() {
    console.log(props.data.id);
    removeB({
      variables: {
        id: props.data.id,
      },
      refetchQueries: [{ query: GET_BLOGS }],
    });
  }

  return (
    <Card
      className={classes.cards}
      style={{
        width: 445,
        margin: "auto",
        display: "inline-block",
        marginLeft: "5%",
        marginTop: "40px",
      }}
      cover={
        <img
          alt="example"
          src={props.data.image}
          style={{ cursor: "pointer" }}
          onClick={visitHandler}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={editHandler} />,
        <MinusOutlined key="ellipsis" onClick={deleteHandler} />,
      ]}
    >
      <Meta
        title={props.data.title}
        description={"Author: " + props.data.author}
      />
    </Card>
  );
}

export default Blog;

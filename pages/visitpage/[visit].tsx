/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import classes from "../../styles/Blog.module.scss";
export const GET_BLOGS = gql`
  query {
    blogs {
      id
      title
      body
      author
      image
    }
  }
`;
type Props = {};

export default function Visit({}: Props) {
  const router = useRouter().query;
  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading)
    return (
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        THIS PAGE IS LOADING
      </h1>
    );
  if (error) return <h1>`Error! ${error.message}`</h1>;
  console.log(data);

  return (
    <div>
      {data.blogs
        .filter((item: any) => item.id === router.visit)
        .map((item: any) => {
          return (
            <div key={item.id} className={classes.datas}>
              <h1 className={classes.myTitle}>{item.title}</h1>
              <br />
              <img src={item.image} alt="img" />
              <br />
              <h2 className={classes.myAuthor}>Author: {item.author}</h2>
              <p className={classes.paragraph}>{item.body}</p>
            </div>
          );
        })}
    </div>
  );
}

import React from "react";
import Blog from "./Card";
import classes from "./MainContent.module.scss";
import { gql, useQuery } from "@apollo/client";

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
function Content() {
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
    <div className={classes.main}>
      {data.blogs.map((item: any) => {
        return <Blog key={item.id} data={item} />;
      })}
    </div>
  );
}

export default Content;

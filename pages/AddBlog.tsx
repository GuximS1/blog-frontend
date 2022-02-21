import React from "react";
import classes from "../styles/Blog.module.scss";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_BLOGS } from "../components/";
type Props = {};

const ADD_NEW_BLOG = gql`
  mutation (
    $title: String!
    $body: String!
    $author: String!
    $image: String!
  ) {
    createBlog(
      createBlogData: {
        title: $title
        body: $body
        author: $author
        image: $image
      }
    ) {
      id
      title
      body
      author
      image
    }
  }
`;

function AddBlog({}: Props) {
  const [newBlog] = useMutation(ADD_NEW_BLOG);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      author: "",
      image: "",
    },
  });
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    console.log(data.title);
    newBlog({
      variables: {
        title: data.title,
        body: data.body,
        author: data.author,
        image: data.image,
      },
      refetchQueries: [{ query: GET_BLOGS }],
    });
    router.push({
      pathname: "/",
    });
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{ fontWeight: "bold", color: "lightblue" }}>NEW ARTICLE</h1>
      <label htmlFor="">Title:</label>
      <input type="text" {...register("title", { required: true })} />
      {errors.title && <p>This field is required</p>}
      <label htmlFor="">Body:</label>
      <input type="text" {...register("body", { required: true })} />
      {errors.body && <p>This field is required</p>}
      <label htmlFor="">Author:</label>
      <input type="text" {...register("author", { required: true })} />
      {errors.author && <p>This field is required</p>}
      <label htmlFor="">Image:</label>
      <input type="text" {...register("image", { required: true })} />
      {errors.image && <p>This field is required</p>}
      <br />
      <input type="submit" className={classes.button} />
    </form>
  );
}
export default AddBlog;

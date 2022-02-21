import React from "react";
import classes from "../styles/Blog.module.scss";
import { useForm } from "react-hook-form";
import { GET_BLOGS } from "../components";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
type Props = {};
const UPDATE_BLOG = gql`
  mutation (
    $id: String!
    $title: String!
    $body: String!
    $author: String!
    $image: String!
  ) {
    updateBlog(
      updateBlogData: {
        blogId: $id
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
function Edit({}: Props) {
  const router = useRouter();
  const queryRouter = useRouter().query;
  const [editBlog] = useMutation(UPDATE_BLOG);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      body: "",
      author: "",
      image: "",
    },
  });
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();

    editBlog({
      variables: {
        id: queryRouter.edit,
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
      <h1 style={{ fontWeight: "bold", color: "lightblue" }}>EDITING</h1>
      <label htmlFor="">ID:</label>
      <input type="text" disabled value={queryRouter.edit} />
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

export default Edit;

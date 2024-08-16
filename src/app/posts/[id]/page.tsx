import React from "react";

const Post = ({ params }: any) => {
  const { id } = params;
  return <h1>Un post individual numero {id}</h1>;
};

export default Post;

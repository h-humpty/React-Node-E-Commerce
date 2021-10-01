import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>Welcome to Backyard BBQ</title>
      <meta
        name='description'
        content='Retaurant online store for delivery'
      ></meta>
      <meta name='keyword' content='food restaurant' />
    </Helmet>
  );
};

export default Meta;

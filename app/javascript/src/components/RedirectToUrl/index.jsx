import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import urlsApi from "apis/url";

function RedirectToUrl() {
  const { slug } = useParams();

  useEffect(() => {
    getOriginalUrl();
  }, []);

  const getOriginalUrl = async () => {
    try {
      await urlsApi.show(slug);
      // RedirectToUrl()
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
}

export default RedirectToUrl;

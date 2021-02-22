import React, { useState, useEffect } from "react";
import Input from "components/Input.jsx";
import urlsApi from "apis/url";
// import PageLoader from "../PageLoader";

function UrlDashboard() {
  const [urlList, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const urls = await urlsApi.list();
      setUrls(urls);
      console.log(urls.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center">Dashboard</h1>
      {/* <Input /> */}
      {/* {urlList} */}
    </div>
  );
}

export default UrlDashboard;

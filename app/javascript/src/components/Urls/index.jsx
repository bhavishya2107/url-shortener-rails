import React, { useState, useEffect } from "react";
import Input from "components/Input.jsx";
import Button from "components/Button.jsx"
import urlsApi from "apis/url";
import PageLoader from "../PageLoader";

function UrlDashboard() {
  const [urlList, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await urlsApi.list();
      setUrls(res.data.urls);
      console.log(urls.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await urlsApi.create({
        url: { original_url: originalUrl },
      });
      console.log(res.data, "respionse form be");
      setLoading(false);
      setOriginalUrl("");
      fetchUrls();
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error.response.data.errors);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 lg:px-8 bg-gray-50 sm:px-6">
      <div className="w-full max-w-lg border border-gray-300 rounded-md bg-white p-8 rounded-lg shadow-lg w-full">
        <Input
          label="Enter Original Url"
          placeholder="Enter url"
          onChange={(e) => setOriginalUrl(e.target.value)}
          value={originalUrl}
        />
        <Button buttonText="Submit" loading={loading} onClick={handleSubmit} />
      </div>
      {/* {urlList && urlList.map(url => {
        return (<h1 className="text-xl text-center">{url.original_url}</h1>)
      })} */}
    </div>
  );
}

export default UrlDashboard;

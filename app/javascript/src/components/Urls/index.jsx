import React, { useState, useEffect } from "react";
import Input from "components/Input.jsx";
import Button from "components/Button.jsx";
import urlsApi from "apis/url";

function UrlDashboard() {
  const [urlList, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setLoading(false);
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await urlsApi.list();
      setUrls(res.data.urls);
      console.log(res.data);
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

  const handleClick = async (slug, originalUrl) => {
    try {
      await urlsApi.show(slug);
      window.open(`${originalUrl}`, "_blank");
      console.log(originalUrl);
      fetchUrls();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePinned = async (slug) => {
    try {
      await urlsApi.update({slug});
      fetchUrls();
      console.log(slug);
      alert("hello")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-4 py-6 lg:px-8 bg-gray-50 sm:px-6">
        <div className="border border-gray-300 rounded-md bg-white p-8 rounded-lg shadow-lg">
          <Input
            label="Enter Url"
            placeholder="Enter url"
            onChange={(e) => setOriginalUrl(e.target.value)}
            value={originalUrl}
          />
          <Button
            buttonText="Submit"
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
        <section className="my-4 w-4/6 p-4 my-0 mx-auto">
          <div>
            <ul className="border shadow-sm">
              <li className="flex items-center justify-between bg-blue-600 mb-px p-4 text-white text-xl">
                <p className="w-2/5 flex justify-center">Original</p>
                <p className="w-2/5 flex justify-center">Short</p>
              </li>
              {urlList &&
                urlList.map((url) => {
                  return (
                    <li key={url.id} className="bg-white mb-px">
                      <article className="flex justify-between">
                        <aside className="flex">
                          <button
                            className={`${
                              url.pinned ? "text-blue-500" : "text-gray-600"
                            } p-4 bg-gray-100 hover:text-blue-400`}
                            onClick={() => handlePinned(url.slug)}
                          >
                            <svg
                              width="16px"
                              height="16px"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="thumbtack"
                              className="svg-inline--fa fa-thumbtack fa-w-12"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 384 512"
                            >
                              <path
                                fill="currentColor"
                                d="M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z"
                              />
                            </svg>
                          </button>
                        </aside>
                        <div className="w-4/5 flex justify-between items-center">
                          <a
                            className="p-4 hover:underline text-gray-800 break-all"
                            href={url.original_url}
                            target="_blank"
                          >
                            {url.original_url}
                          </a>
                          <button
                            className="p-4 hover:underline text-gray-800 break-all"
                            href={url.original_url}
                            onClick={() =>
                              handleClick(url.slug, url.original_url)
                            }
                          >
                            {window.location.href + url.slug}
                          </button>
                        </div>
                        <aside className="flex items-center p-2">
                          <span className="bg-gray-800 p-2 border border-gray-400 text-white text-xs font-bold rounded-r-lg">
                            {url.clicks}
                          </span>
                        </aside>
                      </article>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UrlDashboard;

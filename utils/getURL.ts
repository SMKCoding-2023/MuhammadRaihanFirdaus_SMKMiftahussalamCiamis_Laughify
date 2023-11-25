const getURL = () => {
  const { SITE_URL, VERCEL_URL } = useAppConfig();
  let url = SITE_URL ?? VERCEL_URL ?? "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  //@ts-ignore
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  //@ts-ignore
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  // /confirm is the endpoint
  return url + "confirm";
};

export default getURL;

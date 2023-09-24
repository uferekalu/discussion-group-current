export function getCookie(name: string) {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const desiredCookie = cookies.find((cookie) =>
      cookie.startsWith(name + "=")
    );
    if (desiredCookie) {
      const cookieValue = desiredCookie.substring(name.length + 1);
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function setCookie(name: string, value: string, options = {}) {
  // Default options
  const defaults = {
    path: "/",
    expires: "", // Expiration date (e.g., 'Tue, 19 Jan 2038 03:14:07 GMT')
    maxAge: "", // Max age in seconds
    secure: false,
    sameSite: "Strict",
  };

  // Merge default options with user-provided options
  const mergedOptions: {
    path: string;
    expires: string;
    maxAge: string;
    secure: boolean;
    sameSite: string;
    [key: string]: string | boolean;
  } = { ...defaults, ...options };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Add options to the cookie string
  for (const key in mergedOptions) {
    if (mergedOptions[key] !== "") {
      cookieString += `; ${key}`;
      if (mergedOptions[key] !== true) {
        cookieString += `=${mergedOptions[key]}`;
      }
    }
  }

  // Set the cookie
  document.cookie = cookieString;
}

export function parseTokenExpiration(token: string) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTimestamp = payload.exp;

      if (!expirationTimestamp) {
        return null; // Token doesn't contain an expiration claim
      }

      const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

      if (currentTimestamp > expirationTimestamp) {
        return null; // Token has expired
      }

      // Return the expiration timestamp if the token is still valid
      return expirationTimestamp;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null; // Error occurred while parsing
    }
  }

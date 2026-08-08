export function extractMapDetails(url) {
  const regex = /@(-?\d+\.?\d*),(-?\d+\.?\d*)(?:,3a,(\d+\.?\d*)y,(-?\d+\.?\d*)h,(\d+\.?\d*)t)?/;
  const match = url.match(regex);

  if (match) {
    const lat = parseFloat(match[1]);
    const long = parseFloat(match[2]);
    const fov = match[3] ? parseFloat(match[3]) : null;
    const heading = match[4] ? parseFloat(match[4]) : null;
    const pitch = match[5] ? parseFloat(match[5]) - 90 : null;
    const zoom = fov !== null ? Math.log2(180 / fov) : null;

    let panoId = null;
    const panoIdRegex = /!1s([A-Za-z0-9_-]+)/;
    const panoIdMatch = url.match(panoIdRegex);
    if (panoIdMatch) {
      panoId = panoIdMatch[1];
    }

    return { lat, lng: long, heading, pitch, zoom, panoId };
  } else {
    return null;
  }
}

export default function parseMapData(obj) {
  if (typeof obj === 'string') {
    try {
      obj = JSON.parse(obj);
    } catch (e) {
      return;
    }
  }

  let array = [];
  if (Array.isArray(obj)) {
    array = obj;
  }

  // if not, find a key with an array and use that
  if (array.length === 0) {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        array = obj[key];
        break;
      }
    }
  }

  if (array.length === 0) {
    return;
  }

  let output = array.map((loc) => {
    if (!loc) return;

    if (typeof loc === 'string') {
      try {
        loc = JSON.parse(loc);
      } catch (e) {
        const extracted = extractMapDetails(loc);
        loc = extracted;
      }
    }

    const params = ["lat", "lng", "heading", "pitch", "zoom", "panoId"];
    const misspelled = [["latitude"], ["longitude", "long", "lon"]];
    let data = {};

    // fix misspelled keys
    try {
      for (const key of misspelled) {
        for (const k of key) {
          if (loc[k] !== undefined) {
            loc[key[0]] = loc[k];
            delete loc[k];
          }
        }
      }
    } catch (e) {
      return;
    }

    // only keep the keys we want
    for (const key of params) {
      if (loc[key] !== undefined) {
        data[key] = loc[key];
      }
    }

    // make sure at least lat and lng are present
    if (data.lat === undefined || data.lng === undefined) {
      return;
    }

    return data;
  });

  output = output.filter((x) => x);
  if (output.length === 0) {
    return null;
  }

  return output;
}

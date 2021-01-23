import moment from "moment";
import axios from "axios";
import CustomStore from "devextreme/data/custom_store";
import { Store } from "./app/redux/Store";
import { logoutUser } from "app/redux/actions/UserActions";

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference =
    moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(
      moment(date, "DD/MM/YYYY HH:mm:ss")
    ) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(" ");
}

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

function getFilterParsed(item) {
  const prop = item[0];
  let operator = item[1];
  const term = item[2];

  switch (operator) {
    case ">":
      operator = "gt";
      break;
    case ">=":
      operator = "ge";
      break;
    case "<=":
      operator = "le";
      break;
    case "<":
      operator = "lt";
      break;
    case "=":
      operator = "eq";
      break;
    case "<>":
      operator = "neq";
      break;
    case "contains":
      operator = "cs";
      break;
    case "notcontains":
      operator = "ncs";
      break;
    case "startswith":
      operator = "sw";
      break;
    case "endswith":
      operator = "ew";
      break;

    default:
      break;
  }

  return `filter=${prop},${operator},${term}`;
}

function getAllFilters(filtersParam) {
  let filters = "";
  let just1Filter = true;
  if (
    filtersParam.length === 3 &&
    (Array.isArray(filtersParam[0]) ||
      Array.isArray(filtersParam[1]) ||
      Array.isArray(filtersParam[2]))
  ) {
    just1Filter = false;
  }

  if (just1Filter) {
    const item = [filtersParam[0], filtersParam[1], filtersParam[2]];
    const itemParsed = getFilterParsed(item);
    filters += `${itemParsed}&`;
  } else {
    for (const i in filtersParam) {
      const item = filtersParam[i];

      if (Array.isArray(item) && item.length === 3) {
        if (Array.isArray(item[0])) {
          const itemsParsed = getAllFilters(item);
          filters += `${itemsParsed}&`;
        } else {
          const itemParsed = getFilterParsed(item);
          filters += `${itemParsed}&`;
        }
      }
    }
  }
  return filters;
}

export function createDevExpressStore(apiBase, fieldsToGet, urlViewBase) {
  const store = new CustomStore({
    key: "id",
    load: function (loadOptions) {
      let params = "?";

      //Page
      const page = loadOptions.skip / loadOptions.take + 1;
      if (isNotEmpty(page)) {
        params += `page=${page},${loadOptions.take}&`;
      } else {
        params += `page=1,${loadOptions.take}&`;
      }

      //Sort
      if (loadOptions.sort) {
        for (const i in loadOptions.sort) {
          const item = loadOptions.sort[i];
          const way = item.desc ? "desc" : "asc";
          params += `order=${item.selector},${way}&`;
        }
      }

      //Filter
      if (loadOptions.filter) {
        const allFilters = getAllFilters(loadOptions.filter);
        params += `${allFilters}&`;
      }

      //Fields
      if (isNotEmpty(fieldsToGet) && fieldsToGet.length > 0) {
        params += `include=${fieldsToGet.join(",")}&`;
      }

      const apiViewBase = urlViewBase ? urlViewBase : apiBase;
      return axios.get(`${apiViewBase}${params}`).then((res) => {
        if (res.data.records) {
          return {
            data: res.data.records,
            totalCount: res.data.results ? res.data.results : 0,
          };
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "Data Loading Error";
        }
      });
    },
    update: function (id, data) {
      return axios.put(`${apiBase}/${id}`, data).then((res) => {
        if (res.data) {
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "Data Loading Error";
        }
      });
    },
    insert: function (data) {
      return axios.post(`${apiBase}`, data).then((res) => {
        if (res.data) {
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "Data Loading Error";
        }
      });
    },
    remove: function (id) {
      return axios.delete(`${apiBase}/${id}`).then((res) => {
        if (res.data) {
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "Data Loading Error";
        }
      });
    },
  });

  return store;
}

export function axiosInterceptor() {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error && error.response) {
        if (401 === error.response.status) {
          Store.dispatch(logoutUser());
        }
      }
    }
  );
}

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const base64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const createAvatarUrl = (photoBase4) => {
  if (photoBase4) {
    const contentType = "image/png";
    const blob = base64toBlob(photoBase4, contentType);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }
  return "/assets/images/default-avatar.png";
};

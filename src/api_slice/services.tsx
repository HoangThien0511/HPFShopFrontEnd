import { isAuthenticate } from "../utils/LocalStorage";
import instance from "./port";

const user = isAuthenticate()

let header = {}

if (user) {
  header = {
    headers: {
      Authorization: `${user.token}`,
    },
  }
}
const httpGetOneService = (id: any) => {
  return instance.get(`order/${id}`);
};

const getSerViceBySlug = (slug: any) => {
  return instance.get(`order-slug/${slug}`);
};

const groupAgeByService = () => {
  return instance.get(`age-by-order`, header);
};

const httpGetAllService = () => {
  return instance.get(`order`, header);
};

const groupGenderByService = () => {
  return instance.get(`gender-by-order`, header);
};

const turnoverServicesMonth = (year: any) => {
  return instance.get(`turnover-month-order?year=${year}`, header);
};

const servicesStatistic = (month: any, year: any) => {
  let url
  if (month == undefined && year == undefined) {
    url = `order-statistics`
  }
  else if (month != undefined && year != undefined) {
    url = `order-statistics?month=${month}&year=${year}`;
  } else if (month == undefined) {
    url = `order-statistics?year=${year}`;
  }
  return instance.get(url, header);
}

const httpGet = (endpoint: any, id: any) => {
  return instance.get(`${endpoint}/${id}`, header);
};
const httpPost = (endpoint: any, data: any, header: any) => {
  return instance.post(`${endpoint}`, data, header);
};
const httpPut = (endpoint: any, id: any, data: any) => {
  return instance.patch(`${endpoint}/${id}`, data, header);
};

const httpDelete = (endpoint: any, id: any) => {
  return instance.delete(`${endpoint}/${id}`, header);
};

export const employeeOrderStatistics = (month: any, year: any) => {
  let url;
  if (month == undefined && year == undefined) {
    url = `employee/order-statistics`;
  } else if (month != undefined && year != undefined) {
    url = `employee/order-statistics?month=${month}&year=${year}`;
  } else if (month == undefined) {
    url = `employee/order-statistics?year=${year}`;
  }
  return instance.get(url, header);
};

export {
  httpGetOneService,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  httpGetAllService,
  getSerViceBySlug,
  servicesStatistic,
  turnoverServicesMonth,
  groupAgeByService,
  groupGenderByService
};

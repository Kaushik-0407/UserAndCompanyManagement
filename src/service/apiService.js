import urls from "../constant/UrlConstant";
import strings from "../constant/stringConstant";
import { getNoAuthCallParams, makeCall } from "./service";

export async function getEmployeeList(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.empList, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCompanyList(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${urls.companyList}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}



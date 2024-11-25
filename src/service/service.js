import { toast } from 'react-toastify';
import strings from '../constant/stringConstant';


export function getNoAuthCallParams(methodType, body) {
  const params = {
    method: methodType,
    headers: strings.applicationJSON,
  };
  switch (methodType) {
    case strings.GET:
      return params;
    case strings.PUT:
      return { ...params, body: JSON.stringify(body) };
      case strings.DELETE:
        return { ...params, body: JSON.stringify(body) };
    default:
      return false;
  }
}

export async function getHeaderObject(accessToken, contentType) {
  try {
    if (accessToken) {
      return {
        ...contentType,
        authorization: `Bearer ${accessToken}`,
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function makeCall(callName, callParams, isToast) {
  try {

    let call = await fetch(callName, {
      ...callParams,
      mode: 'cors'
    });
    
    let timeout = getTimeoutPromise();

    const response = await Promise.race([timeout, call]).catch((err) => {
      throw err;
    });

    const json = await response.json();
    if (json.responseCode === 401) {
      localStorage.clear();
      sessionStorage.setItem('sessionExpierd', true);
      window.location.href = '/';
    }
    if (json.success === false) {
      toast.error(json.errMessage);
      return null;
    } else if (isToast && (json.success === true || json.code === 200)) {
      toast.info(json.message);
    }
    return json;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
}

export function getTimeoutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: true, message: 'Timeout', success: false }), 5000);
  });
}


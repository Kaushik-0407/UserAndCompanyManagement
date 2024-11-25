class UrlConstant {
  constructor() {}
  url_dev = 'https://673736a9aafa2ef222330e54.mockapi.io';
  empList = `${this.url_dev}/users`;
  companyList = `${this.url_dev}/company`;
}

const urls = new UrlConstant();
export default urls;

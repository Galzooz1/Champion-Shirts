// let myApi:string = "http://localhost:3005";
let myApi:string = "https://final-project-designs-shop.herokuapp.com";

export const URL_API = myApi;

export const doApiGet = async(_url:string) => {
    try {
      let resp = await fetch(_url);
      let data = await resp.json();
      return data;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  export const doApiMethod = async (_url:string, _method:any, _body?:any) => {
    try {
      let resp = await fetch(_url, {
        method: _method,
        body: JSON.stringify(_body),
        headers: {
          'auth-token': localStorage["token"],
          'content-type': "application/json"
        }
      })
      let data = await resp.json();
      return data;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
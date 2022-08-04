const axios = require("axios");
const API_URL = "http://localhost:3000/products";

describe("GET /products", () => {
  it("Should get a list of products, default 5 if no count pass in query parameters", (done) => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data;
        expect(data.length).toEqual(5);
        expect(data[0].id).toEqual(1);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
  it("Should get a list of products, the length of the list should equal to count", (done) => {
    const count = 10;
    axios
      .get(`${API_URL}?count=${count}`)
      .then((res) => {
        const data = res.data;
        expect(data.length).toEqual(count);
        expect(data[0].id).toEqual(1);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe("GET /products/:product_id", () => {
  it("Should get a product with the specified product id", (done) => {
    const product_id = Math.floor(Math.random() * 100000);
    axios
      .get(`${API_URL}/${product_id}`)
      .then((res) => {
        const data = res.data;
        expect(data.id).toEqual(product_id);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe("GET /products/:product_id/styles", () => {
  it("Should get all styles of the specified product", (done) => {
    const product_id = Math.floor(Math.random() * 10000);
    axios
      .get(`${API_URL}/${product_id}/styles`)
      .then((res) => {
        const data = res.data;
        expect(Number(data.product_id)).toEqual(product_id);
        expect(data.results).toBeTruthy();
        expect(data.results[0].style_id).toBeTruthy();
        expect(data.results[0].name).toBeTruthy();
        expect(data.results[0].sale_price).toBeTruthy();
        expect(data.results[0].original_price).toBeTruthy();
        expect(data.results[0].photos).toBeTruthy();
        expect(data.results[0].skus).toBeTruthy();
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe("GET /products/:product_id/related", () => {
  it("Should get a list of related products", (done) => {
    const product_id = Math.floor(Math.random() * 100000);
    axios
      .get(`${API_URL}/${product_id}/related`)
      .then((res) => {
        const data = res.data;
        expect(data).toBeTruthy();
        expect(data[0]).toBeTruthy();
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
});

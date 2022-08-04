import http from "k6/http";
import { sleep, check } from "k6";
import { Counter } from "k6/metrics";

export const requests = new Counter("http_reqs");

export const options = {
  vus: 100,
  duration: "10s",
};

const product_id = Math.floor(Math.random() * 100000) + 900000;
const url = `http://localhost:3000/products/${product_id}`;

export default function () {
  const res = http.get(url);
  sleep(1);
  check(res, {
    "is status 200": (r) => r.status === 200,
    "transaction time < 50ms": (r) => r.timings.duration < 50,
    "transaction time < 200ms": (r) => r.timings.duration < 200,
    "transcation time < 500ms": (r) => r.timings.duration < 500,
    "transcation time < 1000ms": (r) => r.timings.duration < 1000,
    "transcation time < 2000ms": (r) => r.timings.duration < 2000,
  });
}

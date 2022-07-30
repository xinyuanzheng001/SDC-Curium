const express = require("express");
// const router = express.Router();
const app = express();
const db = require("../db/db.js");

/**
 * @route /products
 * @method GET
 * @description get list of products, default 5
 * @optional count?
 */
app.get("/", (req, res) => {
  console.log(req.query);
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  db.query(`SELECT * FROM product WHERE id<=${count}`, (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.send(response.rows);
    }
  });
});

/**
 * @route /products/:product_id
 * @method GET
 * @description get product base on the product_id
 */
app.get("/:product_id", (req, res) => {
  console.log(req.params);
  const product_id = req.params.product_id;
  // db.query(`SELECT * FROM product WHERE id=${product_id}`)
  //   .then((response) => {
  //     let responseData = response.rows[0];
  //     db.query(
  //       `SELECT feature, value FROM features WHERE product_id=${product_id}`
  //     ).then((data) => {
  //       responseData["features"] = data.rows;
  //       res.send(responseData);
  //     });
  //   })
  db.query(
    `select json_agg(distinct jsonb_build_object('id', product.id, 'name', product.product_name, 'slogan', product.slogan, 'description', product.product_description, 'category', product.category, 'default_price', product.default_price)) as product, json_agg(distinct jsonb_build_object('feature', features.feature, 'value', features.value)) as features from product, features where product.id=${product_id} and features.product_id=product.id;`
  )
    .then((data) => {
      const responseData = data.rows[0].product[0];
      responseData["features"] = data.rows[0].features;
      res.send(responseData);
    })
    .catch((e) => res.send({ error: e.stack }));
});

/**
 * @route /products/:product_id/styles
 * @method GET
 * @description get style of the product
 */
app.get("/:product_id/styles", (req, res) => {
  const product_id = req.params.product_id;
  const data = { product_id: product_id };
  data["results"] = [];
  // db.query(`SELECT * FROM styles WHERE product_id=${product_id}`)
  //   .then((response) => {
  //     data["results"] = response.rows.map((row) => {
  //       row["default?"] = row.default_style === 1 ? true : false;
  //       row["sale_price"] =
  //         row["sale_price"] === "null" ? "0" : row["sale_price"];
  //       delete row["default_style"];
  //       delete row["product_id"];
  //       return row;
  //     });
  //     return data;
  //   })
  //   .then((data) => {
  //     const getPhotos = async () => {
  //       for (let i = 0; i < data.results.length; i++) {
  //         const { rows } = await db.query(
  //           `SELECT thumbnail_url, url FROM photos WHERE styles_id=${data.results[i].style_id}`
  //         );
  //         data.results[i]["photos"] = rows;
  //         const dt = await db.query(
  //           `SELECT id, size, quantity FROM skus WHERE style_id=${data.results[i].style_id}`
  //         );
  //         const d = dt.rows;
  //         const obj = {};
  //         d.forEach((row) => {
  //           obj[row["id"]] = {
  //             quantity: Number(row["quantity"]),
  //             size: row["size"],
  //           };
  //           data.results[i]["skus"] = obj;
  //         });
  //       }
  //     };
  //     return getPhotos();
  //   })
  // db.query(
  //   "select json_agg(json_build_object('style_id', styles.style_id, 'name', styles.name, 'sale_price', styles.sale_price, 'photos', json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url))) AS results from styles join photos on styles.product_id = 1 and photos.styles_id=styles.style_id group by styles.style_id;"
  // )
  db.query(
    `select json_agg(distinct styles.*) as results, json_agg(distinct jsonb_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos, json_agg(distinct jsonb_build_object(skus.id, jsonb_build_object('size', skus.size, 'quantity', skus.quantity))) as skus from styles, photos, skus where styles.product_id = ${product_id} and photos.styles_id = styles.style_id and skus.style_id = styles.style_id group by styles.style_id;`
  )
    .then((r) => {
      r.rows.forEach((row) => {
        const temp = row.results[0];
        temp["default?"] = temp["default_style"] === 1 ? true : false;
        temp["sale_price"] =
          temp["sale_price"] === "null" ? 0 : temp["sale_price"];
        delete temp["default_style"];
        delete temp["product_id"];
        temp["photos"] = row.photos;
        temp["skus"] = {};
        row.skus.forEach((r) => {
          temp["skus"][Object.keys(r)[0]] = r[Object.keys(r)[0]];
        });
        data["results"].push(temp);
      });
    })
    .then(() => res.send(data))
    .catch((e) => res.send({ error: e }));
});

/**
 * @route /products/:product_id/related
 * @method GET
 * @description get all related products
 */
app.get("/:product_id/related", (req, res) => {
  const product_id = req.params.product_id;
  db.query(
    `SELECT related_product_id FROM related_products WHERE product_id=${product_id}`
  )
    .then((response) => {
      const data = response.rows.map((row) => row.related_product_id);
      res.send(data);
    })
    .catch((e) => res.send("error: can not get data"));
});

module.exports = app;

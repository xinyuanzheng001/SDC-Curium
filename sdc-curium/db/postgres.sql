DROP DATABASE IF EXISTS sdc_curium;
CREATE DATABASE sdc_curium;

CREATE TABLE product(
  id serial NOT NULL,
  product_name varchar NOT NULL,
  slogan varchar NOT NULL,
  product_description varchar NOT NULL,
  category varchar NOT NULL,
  default_price varchar NOT NULL,
  CONSTRAINT product_pkey PRIMARY KEY(id)
);

CREATE TABLE features(
  id serial NOT NULL,
  feature varchar NOT NULL,
  feature_value varchar NOT NULL,
  product_id integer NOT NULL,
  CONSTRAINT features_pkey PRIMARY KEY(id)
);

CREATE TABLE related_products(
  id serial NOT NULL,
  product_id integer NOT NULL,
  related_product_id integer NOT NULL,
  CONSTRAINT related_products_pkey PRIMARY KEY(id)
);

CREATE TABLE styles(
  id serial NOT NULL,
  style_name varchar NOT NULL,
  sale_price varchar,
  original_price varchar NOT NULL,
  default_style integer NOT NULL,
  product_id integer NOT NULL,
  CONSTRAINT styles_pkey PRIMARY KEY(id)
);

CREATE TABLE photos(
  id serial NOT NULL,
  thumbnail_url varchar NOT NULL,
  image_url varchar NOT NULL,
  styles_id integer NOT NULL,
  CONSTRAINT photos_pkey PRIMARY KEY(id)
);

CREATE TABLE skus(
  id serial NOT NULL,
  size varchar NOT NULL,
  quantity varchar NOT NULL,
  styles_id integer NOT NULL,
  CONSTRAINT skus_pkey PRIMARY KEY(id)
);

ALTER TABLE features
  ADD CONSTRAINT features_product_id_fkey
    FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE related_products
  ADD CONSTRAINT related_products_product_id_fkey
    FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE styles
  ADD CONSTRAINT styles_product_id_fkey
    FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE photos
  ADD CONSTRAINT photos_styles_id_fkey
    FOREIGN KEY (styles_id) REFERENCES styles (id);

ALTER TABLE skus
  ADD CONSTRAINT skus_styles_id_fkey
    FOREIGN KEY (styles_id) REFERENCES styles (id);

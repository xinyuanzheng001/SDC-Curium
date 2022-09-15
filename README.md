<div id="top"/>

# Product detail API
RESTful API and server for product detail of a modern retail eCommerce website

## Tech Stack
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## API

### List Products
Retrieves the list of products

```
GET /products
```
Parameters
| Parameter | Type | Description |
| ----------| -----| -----|
| page | integer | Selects the page of results to return. Default 1. |
| count | integer | Specifies how many results per page to return. Default 5. |

Response
```
Status: 200 OK
```
```
[
  {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
    },
  {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69"
    },
  {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40"
    },
    // ...
]
```

### Product Information
Returns all product level information for a specified product id.
```
GET /products/:product_id
```

Parameters
| Parameter | Type | Description |
| ----------| -----| ------------|
| product_id | integer | Required ID of the Product requested |

Response
```
Status: 200 OK
```
```
{
    "id": 11,
    "name": "Air Minis 250",
    "slogan": "Full court support",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "Basketball Shoes",
    "default_price": "0",
    "features": [
  	{
            "feature": "Sole",
            "value": "Rubber"
        },
  	{
            "feature": "Material",
            "value": "FullControlSkin"
        },
  	// ...
    ],
}
```

### Product Styles
Returns the all styles available for the given product
```
GET /products/:product_id/styles
```

Parameters
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| product_id | integer | Required ID of the Product requested |

Response
```
Status: 200 OK
```
```
{
    "product_id": "1",
    "results": [
  	{
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                },
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                }
  			// ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_2_photo_number.jpg"
        }
      // ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  // ...
}
```

### Related Products
Returns the id's of products related to the product specified.
```
GET /products/:product_id/related
```

Parameters
| Parameter | Type | Description |
| --------- | -----| ----------- |
| product_id | integer | Required ID of the Product requested |

Response
```
Status: 200 OK
```
```
[
  2,
  3,
  8,
  7
],
```


## Getting Started

### Set up
From the root directory, run the following commands in terminal

1. Install dependencies
```
npm install
```
2. Start PostgreSQL services
```
sudo service postgresql start
```
3. Stop PostgreSQL services
```
sudo service postgresql stop
```
4. Build database
```
npm run build-db
```
5. Start server
```
npm start
```

<p align="right">(<a href="#top">back to top</a>)</p>

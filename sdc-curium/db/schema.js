const mongoose = required("mongoose");

// not connect

const FeatureSchame = mongoose.Schema({
  feature: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true,
    default: null
  }
})
const PhotoSchema = mongoose.Schema({
  thumbnail_url: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const SkusSchema = mongoose.Schema({
  skus_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
})

const StyleSchema = mongoose.Schema({
  style_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  original_price: {
    type: String,
    required: true
  },
  sale_price: {
    type: String,
    required: true
  },
  default? : {
    type: Boolean,
    required: true
  },
  photos: [PhotoSchema],
  skus: [SkusSchema]
})

const StylesSchema = mongoose.Schema({
  product_id: {
    type: Number,
    required: true
  },
  results: [StyleSchema]
})

const ProductSchema = mongoose.Schema({
  product_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slogan: {
    type: String,
    required: true,
    default: null
  },
  description: {
    type: String,
    required: true,
    default: null
  },
  category: {
    type: String,
    required: true,
    default: null
  },
  default_price: {
    type: Number,
    required: true
  },
  features: [FeatureSchame],
})

const RelatedProductSchema = mongoose.Schema({
  product_id: {
    type: Number,
    required
  }
  related_product: [{type: Number, required: true}]
})
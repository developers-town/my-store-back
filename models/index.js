const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const brand = require('./brand');
const category = require('./category');
const image = require('./image')
const importDetail = require('./import_detail');
const importDefinition = require('./import');
const orderDetail = require('./order_detail');
const order = require('./order');
const payment = require('./payment');
const productUnit =require('./product_unit');
const product = require('./product');
const shipment = require('./shipment');
const staff = require('./staff');
const stock = require('./stock');
const supplier = require('./supplier');
const unit = require('./unit');
const user = require('./user');

const call = require('./call');
const permission = require('./permission');
const recycle = require('./recycle');

module.exports = {
  brand: model("Brand", new Schema(brand)),
  category: model("Category", new Schema(category)),
  image: model('Image', new Schema(image)),
  import_detail: model("ImportDetail", new Schema(importDetail)),
  import: model("Import", new Schema(importDefinition)),
  order_detail: model("OrderDetail", new Schema(orderDetail)),
  order: model("Order", new Schema(order)),
  payment: model("Payment", new Schema(payment)),
  product_unit: model("ProductUnit", new Schema(productUnit)),
  product: model("Product", new Schema(product)),
  shipment: model("Shipment", new Schema(shipment)),
  staff: model("Staff", new Schema(staff)),
  stock: model("Stock", new Schema(stock)),
  supplier: model("Supplier", new Schema(supplier)),
  unit: model("Unit", new Schema(unit)),
  user: model("User", create(user)),

  call: model("Call", new Schema(call)),
  permission: model("Permission", new Schema(permission)),
  recycle: model("Recycle", new Schema(recycle)),
}

function create ({ definition, middlewares, methods, statics }) {
  let schema = new Schema(definition);
  if (methods) methods(schema);
  if (middlewares) middlewares(schema);
  if (statics) statics(schema)
  return schema;
}

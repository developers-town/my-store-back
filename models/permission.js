module.exports = {
  role: {
    type: 'String',
    required : true
  },
  resource: {
    type: 'String',
    required: true,
    enum: [
      'brand',
      'call',
      'category',
      'image',
      'import_detail',
      'import',
      'order_detail',
      'order',
      'payment',
      'permission',
      'product_unit',
      'product',
      'recycle',
      'role',
      'shipment',
      'staff',
      'stock',
      'supplier',
      'unit',
      'user_oauth',
      'user'
    ]
  },
  action: {
    type: 'String',
    required: true,
    enum: [
      'create:own',
      'read:own',
      'update:own',
      'delete:own',
      'create:any',
      'read:any',
      'update:any',
      'delete:any',
    ]
  }, 
  attributes: {
    type: 'String',
    required: true,
    default: '*'
  },
  info: 'String',
	create_date: {
		type: 'Date',
		default: new Date(),
	},
	update_date: {
		type: 'Date'
	},
}
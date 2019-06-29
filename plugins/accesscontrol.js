const AccessControl = require('accesscontrol');

let grantsObject = {
  admin: {
    category: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    product: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    supplier: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    user: {
      'create:any': ['*', '!password'],
      'read:any': ['*', '!password'],
      'update:any': ['*', '!password', '!email'],
      'delete:any': ['*', '!password']
    },
    importOrder: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    order: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    payment: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
  },
  user: {
    user: {
      'create:own': ['*', '!password', '!role'],
      'read:own': ['*', '!password', '!role'],
      'update:own': ['*', '!password', '!role'],
      'delete:own': ['*', '!password', '!role']
    }
  }
};

module.exports = new AccessControl(grantsObject);

import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';
import _ from 'lodash';
import { salesBaseUrl } from '../utils/baseUrls';

let users = [
  {
    id: 1,
    name: "Abshir Jama",
    email: "abshirj05@gmail.com",
    password: "abshir26",
    company: "admin",
    title: "Engineer",
    entitlements: 777
  }
]

let orderItems = [
  {
    id: 1,
    orderId: 1,
    description: 'Caano geel',
    discount: '10',
    quantity: 25,
    total: '500',
  },
  {
    id: 2,
    orderId: 1,
    description: 'Raashin',
    quantity: 45,
    total: '900'
  },
  {
    id: 3,
    orderId: 2,
    description: 'Caano geel',
    quantity: 25,
    total: '500'
  },
  {
    id: 4,
    orderId: 2,
    description: 'Raashin',
    quantity: 45,
    total: '900'
  }
]

let orders = [
  {
    id: 1,
    customerId: 12,
    ref: 'FAD103',
    cashierId: 1,
    method: 'Cash',
    total: '500.00',
    date: new Date().getTime(),
    dueDate: new Date().getTime(),
    shipment: 'gaari',
    noteAddedBy: "Abdi Faarah",
    noteDate: new Date().getTime(),
    note: "this is the note for this transaction",
    discount: '10%'
  },
  {
    id: 2,
    customerId: 13,
    ref: 'FAD104',
    cashierId: 1,
    method: 'Cash',
    total: '500.00',
    date: new Date().getTime(),
    dueDate: new Date().getTime(),
    shipment: 'gaari',
    discount: '10%'
  }
]

let emails = [
  {
    id: uuid(),
    customerId: 12,
    description: 'Order confirmation',
    created_at: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes')
  },
  {
    id: uuid(),
    customerId: 12,
    description: 'Order confirmation',
    created_at: moment()
      .subtract(4, 'days')
      .subtract(11, 'hours')
      .subtract(49, 'minutes')
  },
  {
    id: uuid(),
    customerId: 13,
    description: 'Order confirmation',
    created_at: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes')
  },
  {
    id: uuid(),
    customerId: 13,
    description: 'Order confirmation',
    created_at: moment()
      .subtract(4, 'days')
      .subtract(11, 'hours')
      .subtract(49, 'minutes')
  }
]

let customers = [
  {
    id: 12,
    name: 'Abshir Jama',
    email: 'abshirj05@gmail.com',
    phone: '+2247636417',
    location: 'Chicago',
    verified: true,
    currency: '$',
    creditEligible: 'Yes',
    shipment: 'gaari',
    invoices: 1,
    invoice: {
      totalPurchase: '$4000',
      paid: '$3500',
      unpaid: '$500',
      refunded: '$200'
    }
  },
  {
    id: 13,
    name: 'Ibrahim Jama',
    email: 'ibrahim@gmail.com',
    phone: '+13124093514',
    location: 'Minneapolis',
    verified: true,
    currency: '$',
    creditEligible: 'No',
    invoices: 1,
    shipment: 'diyaarad',
    invoice: {
      totalPurchase: '$9000',
      paid: '$9000',
      unpaid: '$0',
      refunded: '$0'
    }
  }
]

let invoices = [
  {
    id: 1,
    customerId: 12,
    date: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    receivableId: 1,
    total: 555,
  },
  {
    id: 2,
    customerId: 13,
    date: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    receivableId: 1,
    total: 555,
  }
];

let receivables = [
  {
    id: 1,
    invoiceId: 1,
    customerId: 12,
    date: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    dueDate: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    description: 'badeeco uu gatay',
    transactionType: 'debit',
    amount: 500,
    cashier: 'Abdi Jama'
  },
  {
    id: 2,
    invoiceId: 1,
    customerId: 13,
    date: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    dueDate: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    description: 'badeeco uu gatay',
    transactionType: 'debit',
    amount: 500,
    cashier: 'Abdi Jama'
  }
]

let inventory = [
  {
    id: 121,
    description: 'Geel',
    purchaseId: 1,
    available: 4,
    barcode: 987987,
    expired: 4,
    supplierCost: 34,
    earning: 5,
    finalCost: 39,
    lastUpdated: new Date().getTime(),
    operatorId: 1,
  },
  {
    id: 122,
    description: 'Lo',
    purchaseId: 1,
    available: 4,
    barcode: 765765,
    expired: 4,
    supplierCost: 34,
    earning: 5,
    finalCost: 39,
    lastUpdated: new Date().getTime(),
    operatorId: 1,
  },
  {
    id: 123,
    description: 'Ari',
    purchaseId: 1,
    available: 4,
    barcode: 543534,
    expired: 4,
    supplierCost: 34,
    earning: 5,
    finalCost: 39,
    lastUpdated: new Date().getTime(),
    operatorId: 1,
  }
]

mock.onGet(`${salesBaseUrl()}/transactions/orders`).reply(200, {
  orders: orders.map(item => {
    return {
      ...item,
      customerName: customers.find(customer => customer.id === item.customerId).name,
      location: customers.find(customer => customer.id === item.customerId).location,
      cashier: users.find(user => user.id === item.cashierId).name
    }
  })
});

mock.onGet(`${salesBaseUrl()}/transactions/products`).reply(200, {
  products: inventory
});

mock.onGet(`${salesBaseUrl()}/orderDetail`).reply((config) => {
  const id = config.params.id
  const order = orders.find(item => item.id === +id)
  return [200, {
    order: order ? {
      ...order,
      customerName: customers.find(customer => customer.id === order.customerId).name,
      items: orderItems.filter(item => item.orderId === order.id)
    } : {}
  }]
});

mock.onPost(`${salesBaseUrl()}/newOrder`).reply((config) => {
  const newOrder = JSON.parse(config.data);
  newOrder.ordersList.forEach(item => {
    orderItems.push({
      id: orderItems.length + 1,
      orderId: orders.length + 1,
      description: item.description,
      discount: item.discount,
      quantity: item.count,
      total: item.total,
    })
  })

  const total = _.sum(newOrder.ordersList.map(item => +item.total.replace('$', '')))
  orders.push({
    id: orders.length + 1,
    customerId: 12,
    cashierId: 1,
    ref: `FAD10${orders.length + 1}`,
    cashier: newOrder.cashierName,
    method: newOrder.paymentOption,
    total: total,
    date: newOrder.date,
    dueDate: newOrder.dueDate,
    shipment: newOrder.customer.shipment,
    // discount: '10%'
  })

  return [200, {
    orders: orders.map(item => {
      return {
        ...item,
        customerName: customers.find(customer => customer.id === item.customerId).name,
        location: customers.find(customer => customer.id === item.customerId).location,
        cashier: users.find(user => user.id === item.cashierId).name
      }
    })
  }]
});

mock.onGet(`${salesBaseUrl()}/customers`).reply(200, {
  customers
});

mock.onGet(`${salesBaseUrl()}/summary`).reply((config) => {
  const id = config.params.id
  const customer = customers.find(item => item.id === +id)
  return [200, {
    customer: customer ? {
      ...customer,
      emails: emails.filter(email => email.customerId === customer.id)
    } : {}
  }]
});

mock.onGet(`${salesBaseUrl()}/invoices`).reply((config) => {
  const id = config.params.id
  const customerInvoices = invoices.filter(item => item.customerId === +id)
  return [200, {
    customerInvoices: customerInvoices || []
  }]
});

mock.onGet(`${salesBaseUrl()}/reveivables`).reply((config) => {
  const id = config.params.id
  const customerReceivables = receivables.filter(item => item.customerId === +id)
  return [200, {
    customerReceivables: customerReceivables || []
  }]
});

mock.onPost(`${salesBaseUrl()}/reveivables/edit`).reply((config) => {
  const newEditData = JSON.parse(config.data).editingReceivable
  console.log('submitted edit data=>', newEditData)
  const id = newEditData.customerId
  receivables = receivables.map(item => {
    if (item.id === newEditData.id) {
      item = newEditData
    }
    return item
  })
  const customerReceivables = receivables.filter(item => item.customerId === +id)
  return [200, {
    customerReceivables: customerReceivables || []
  }]
});

mock.onPost(`${salesBaseUrl()}/reveivables/payment`).reply((config) => {
  const newPayment = JSON.parse(config.data).paymentInfo;
  console.log('submitted payment=>', newPayment)
  const id = newPayment.customerId
  receivables.push({
    id: receivables.length + 1,
    invoiceId: 1,
    customerId: newPayment.customerId,
    date: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    dueDate: moment()
      .subtract(3, 'days')
      .subtract(5, 'hours')
      .subtract(34, 'minutes'),
    description: newPayment.paymentDescription,
    transactionType: 'credit',
    amount: newPayment.paymentAmount,
    cashier: 'Abdi Jama'
  })
  const customerReceivables = receivables.filter(item => item.customerId === +id)
  return [200, {
    customerReceivables: customerReceivables || []
  }]
});

mock.onPost(`${salesBaseUrl()}/customers/edit`).reply((config) => {
  const { emails, ...rest } = JSON.parse(config.data);
  console.log('customer edited=>', rest)
  customers = customers.map(customer => {
    if (customer.id === rest.id) {
      customer = rest
    }

    return customer
  })
  const id = rest.id
  const customer = customers.find(item => item.id === +id)
  return [200, {
    customer: customer ? {
      ...customer,
      emails: emails.filter(email => email.customerId === customer.id)
    } : {}
  }]
});

mock.onGet(`${salesBaseUrl()}/inventory`).reply(200, {
  inventory
})

mock.onPost(`${salesBaseUrl()}/newCustomer`).reply((config) => {
  const newCustomer = JSON.parse(config.data);
  customers.unshift({
    creditEligible: "yes",
    currency: "$",
    email: newCustomer.email,
    id: customers.length + 1,
    invoice: { totalPurchase: "", paid: "", unpaid: "", refunded: "" },
    invoices: 0,
    location: newCustomer.location,
    name: newCustomer.name,
    phone: newCustomer.phone,
    shipment: "",
    verified: newCustomer.verified
  })
  return [201, {
    customers
  }]
});

mock.onPost(`${salesBaseUrl()}/transactions/edit`).reply((config) => {
  const editedTransaction = JSON.parse(config.data);

  orders = orders.map(order => {
    if (order.id === editedTransaction.id) {
      order = editedTransaction
    } else {
      order = {
        ...order,
        customerName: customers.find(customer => customer.id === order.customerId).name,
        location: customers.find(customer => customer.id === order.customerId).location,
        cashier: users.find(user => user.id === order.cashierId).name
      }
    }

    return order
  })
  return [201, {
    orders
  }]
})

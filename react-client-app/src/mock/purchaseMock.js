import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';
import _ from 'lodash';
import { purchasesBaseUrl } from '../utils/baseUrls';

const users = [
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

const purchaseItems = [
    {
        id: 1,
        purchaseId: 1,
        description: 'Caano geel',
        quantity: 25,
        total: '500',
    },
    {
        id: 2,
        purchaseId: 1,
        description: 'Raashin',
        quantity: 45,
        total: '900'
    },
    {
        id: 3,
        purchaseId: 2,
        description: 'Caano geel',
        quantity: 25,
        total: '500'
    },
    {
        id: 4,
        purchaseId: 2,
        description: 'Raashin',
        quantity: 45,
        total: '900'
    }
]

const purchases = [
    {
        id: 1,
        supplierId: 12,
        ref: 'FAD103',
        cashierId: 1,
        method: 'Cash',
        total: '500.00',
        date: new Date().getTime(),
        deliveryDate: new Date().getTime(),
        shipment: 'gaari',
        discount: '10%'
    },
    {
        id: 2,
        supplierId: 13,
        ref: 'FAD104',
        cashierId: 1,
        method: 'Cash',
        total: '500.00',
        date: new Date().getTime(),
        deliveryDate: new Date().getTime(),
        shipment: 'gaari',
        discount: '10%'
    }
]

let emails = [
    {
        id: uuid(),
        supplierId: 12,
        description: 'Order confirmation',
        created_at: moment()
            .subtract(3, 'days')
            .subtract(5, 'hours')
            .subtract(34, 'minutes')
    },
    {
        id: uuid(),
        supplierId: 12,
        description: 'Order confirmation',
        created_at: moment()
            .subtract(4, 'days')
            .subtract(11, 'hours')
            .subtract(49, 'minutes')
    },
    {
        id: uuid(),
        supplierId: 13,
        description: 'Order confirmation',
        created_at: moment()
            .subtract(3, 'days')
            .subtract(5, 'hours')
            .subtract(34, 'minutes')
    },
    {
        id: uuid(),
        supplierId: 13,
        description: 'Order confirmation',
        created_at: moment()
            .subtract(4, 'days')
            .subtract(11, 'hours')
            .subtract(49, 'minutes')
    }
]

let suppliers = [
    {
        id: 12,
        name: 'Gaadiid',
        email: 'gaadiid@gmail.com',
        phone: '+2247636417',
        location: 'Chicago',
        verified: true,
        shipment: 'gaari',
        invoices: 1,
        primaryContact: 'Abshir Jama',
        invoice: {
            fullfilled: 4000,
            paid: 3500,
            payable: 500,
        }
    },
    {
        id: 13,
        name: 'Cadceed',
        email: 'cadceed@gmail.com',
        phone: '+13124093514',
        location: 'Minneapolis',
        verified: true,
        invoices: 1,
        primaryContact: 'Geedi Jama',
        shipment: 'diyaarad',
        invoice: {
            fullfilled: 9000,
            paid: 9000,
            payable: 0
        }
    }
]

let invoices = [
    {
        id: 1,
        supplierId: 12,
        date: moment()
            .subtract(3, 'days')
            .subtract(5, 'hours')
            .subtract(34, 'minutes'),
        payableId: 1,
        total: 555,
    },
    {
        id: 2,
        supplierId: 13,
        date: moment()
            .subtract(3, 'days')
            .subtract(5, 'hours')
            .subtract(34, 'minutes'),
        payableId: 1,
        total: 555,
    }
];

let payables = [
    {
        id: 1,
        invoiceId: 1,
        supplierId: 12,
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
        supplierId: 13,
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
        lastUpdated: new Date(),
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
        lastUpdated: new Date(),
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
        lastUpdated: new Date(),
        operatorId: 1,
    }
]

mock.onGet(`${purchasesBaseUrl()}/purchases`).reply(200, {
    purchases: purchases.map(item => {
        return {
            ...item,
            customerName: suppliers.find(supplier => supplier.id === item.supplierId).name,
            location: suppliers.find(supplier => supplier.id === item.supplierId).location,
            cashier: users.find(user => user.id === item.cashierId).name
        }
    })
});

mock.onGet(`${purchasesBaseUrl()}/purchaseDetails`).reply((config) => {
    const id = config.params.id
    const purchase = purchases.find(item => item.id === +id)
    return [200, {
        purchase: purchase ? {
            ...purchase,
            customerName: suppliers.find(supplier => supplier.id === purchase.supplierId).name,
            items: purchaseItems.filter(item => item.purchaseId === purchase.id)
        } : {}
    }]
});

mock.onPost(`${purchasesBaseUrl()}/newPurchase`).reply((config) => {
    const newOrder = JSON.parse(config.data);
    newOrder.ordersList.forEach(item => {
        purchaseItems.push({
            id: purchaseItems.length + 1,
            purchaseId: purchases.length + 1,
            description: item.description,
            // discount: item.discount,
            quantity: item.count,
            total: item.total.replace('$', ''),
        })
    })

    const total = _.sum(newOrder.ordersList.map(item => +item.total.replace('$', '')))
    purchases.push({
        id: purchases.length + 1,
        supplierId: newOrder.supplier.id,
        cashierId: 1,
        ref: `FAD10${purchases.length + 1}`,
        cashier: 'Abdi Farah',
        method: newOrder.paymentOption,
        total: total,
        date: newOrder.date,
        deliveryDate: newOrder.deliveryDate,
        shipment: newOrder.supplier.shipment,
        // discount: '10%'
    })

    return [200, {
        purchases: purchases.map(item => {
            return {
                ...item,
                customerName: suppliers.find(supplier => supplier.id === item.supplierId).name,
                location: suppliers.find(supplier => supplier.id === item.supplierId).location,
                cashier: users.find(user => user.id === item.cashierId).name
            }
        })
    }]
});

mock.onGet(`${purchasesBaseUrl()}/suppliers`).reply(200, {
    suppliers
});

mock.onGet(`${purchasesBaseUrl()}/summary`).reply((config) => {
    const id = config.params.id
    const supplier = suppliers.find(item => item.id === +id)
    return [200, {
        supplier: supplier ? {
            ...supplier,
            emails: emails.filter(email => email.supplierId === supplier.id)
        } : {}
    }]
});

mock.onGet(`${purchasesBaseUrl()}/invoices`).reply((config) => {
    const id = config.params.id
    const supplierInvoices = invoices.filter(item => item.supplierId === +id)
    return [200, {
        supplierInvoices: supplierInvoices || []
    }]
});

mock.onGet(`${purchasesBaseUrl()}/payables`).reply((config) => {
    const id = config.params.id
    const supplierPayables = payables.filter(item => item.supplierId === +id)
    return [200, {
        supplierPayables: supplierPayables || []
    }]
});

mock.onPost(`${purchasesBaseUrl()}/payables/edit`).reply((config) => {
    const newEditData = JSON.parse(config.data).editingReceivable
    console.log('submitted edit data=>', newEditData)
    const id = newEditData.supplierId
    payables = payables.map(item => {
        if (item.id === newEditData.id) {
            item = newEditData
        }
        return item
    })
    const supplierPayables = payables.filter(item => item.supplierId === +id)
    return [200, {
        supplierPayables: supplierPayables || []
    }]
});

mock.onPost(`${purchasesBaseUrl()}/payables/payment`).reply((config) => {
    const newPayment = JSON.parse(config.data).paymentInfo;
    console.log('submitted payment=>', newPayment)
    const id = newPayment.supplierId
    payables.push({
        id: payables.length + 1,
        invoiceId: 1,
        supplierId: newPayment.supplierId,
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
    const supplierPayables = payables.filter(item => item.supplierId === +id)
    return [200, {
        supplierPayables: supplierPayables || []
    }]
});

mock.onPost(`${purchasesBaseUrl()}/suppliers/edit`).reply((config) => {
    const { emails, ...rest } = JSON.parse(config.data);
    console.log('supplier edited=>', rest)
    suppliers = suppliers.map(supplier => {
        if (supplier.id === rest.id) {
            supplier = rest
        }

        return supplier
    })
    const id = rest.id
    const supplier = suppliers.find(item => item.id === +id)
    return [200, {
        supplier: supplier ? {
            ...supplier,
            emails: emails.filter(email => email.supplierId === supplier.id)
        } : {}
    }]
});

mock.onGet(`${purchasesBaseUrl()}/inventory`).reply(200, {
    inventory
})

mock.onPost(`${purchasesBaseUrl()}/newSupplier`).reply((config) => {
    const newCustomer = JSON.parse(config.data);
    suppliers.unshift({
        creditEligible: "yes",
        currency: "$",
        email: newCustomer.email,
        id: suppliers.length + 1,
        invoice: { totalPurchase: "", paid: "", unpaid: "", refunded: "" },
        invoices: 0,
        location: newCustomer.location,
        name: newCustomer.name,
        phone: newCustomer.phone,
        shipment: "",
        verified: newCustomer.verified
    })
    return [201, {
        suppliers
    }]
});

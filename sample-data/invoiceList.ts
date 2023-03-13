const invoices = [
  {
    id: 1,
    title: 'Puma Sneakers',
    number: '#09472',
    amount: 'NGN 3,500.00',
    dueDate: 'Jan 24,2023, 04:58 PM',
    disbursementType: 'One-time',
    status: 'awaiting-confirmation'
  },
  {
    id: 2,
    title: 'Puma Sneakers',
    number: '#09472',
    amount: 'NGN 3,500.00',
    dueDate: 'Jan 24,2023, 04:58 PM',
    disbursementType: 'One-time',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Puma Sneakers',
    number: '#09472',
    amount: 'NGN 3,500.00',
    dueDate: 'Jan 24,2023, 04:58 PM',
    disbursementType: 'One-time',
    status: 'awaiting-payment'
  },
  {
    id: 4,
    title: 'Puma Sneakers',
    number: '#09472',
    amount: 'NGN 3,500.00',
    dueDate: 'Jan 24,2023, 04:58 PM',
    disbursementType: 'One-time',
    status: 'in-progress'
  },
  {
    id: 5,
    title: 'Puma Sneakers',
    number: '#09472',
    amount: 'NGN 3,500.00',
    dueDate: 'Jan 24,2023, 04:58 PM',
    disbursementType: 'One-time',
    status: 'dispute'
  }
];

export default invoices;

export const invoice = {
  title: 'Electronics purchase',
  orderList: [
    {
      id: '00129292', name: 'Fireman Generator', price: 85000, quantity: 2, total: 170000
    },
    {
      id: '00938383', name: 'Philip Pressing Iron', price: 5400, quantity: 1, total: 5400
    },
    {
      id: '00228282', name: 'LG Washing machine', price: 76500, quantity: 1, total: 76500
    }
  ],
  paymentPlan: 'oneoff',
  agreement: 'string',
  agreementFile: 'file',
  recipientName: 'Francis Musa',
  recipientEmail: 'francis.musa@gmail.com',
  recipientPhone: '081220020299',
  recipientAddress: '33 Fake address street, Abuja'
};

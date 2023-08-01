const transactions = [
  {
    id: '1',
    type: 'credit',
    transactionReference: 'BRGE|98|9384580|2842',
    amount: 3500,
    date: '2023-03-10T13:43:33.9333333',
    channel: 'transfer',
    status: 'successful'
  },
  {
    id: '2',
    type: 'credit',
    transactionReference: 'BRGE|98|9384580|2842',
    amount: 2450,
    date: '2023-03-10T13:43:33.9333333',
    channel: 'bank',
    status: 'pending'
  },
  {
    id: '3',
    type: 'debit',
    transactionReference: 'BRGE|98|9384580|2842',
    amount: 23800,
    date: '2023-03-10T13:43:33.9333333',
    channel: 'transfer',
    status: 'successful'
  },
  {
    id: '4',
    type: 'credit',
    transactionReference: 'BRGE|98|9384580|2842',
    amount: 2000,
    date: '2023-03-10T13:43:33.9333333',
    channel: 'transfer',
    status: 'successful'
  },
  {
    id: '5',
    type: 'debit',
    transactionReference: 'BRGE|98|9384580|2842',
    amount: 850,
    date: '2023-03-10T13:43:33.9333333',
    channel: 'transfer',
    status: 'failed'
  }
];

export default transactions;

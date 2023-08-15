export const disputes = [
  {
    invoiceNo: '#09472', status: 'in-progress', inspectionPeriod: 2, dueDate: '2023-03-10T13:43:33.9333333'
  },
  {
    invoiceNo: '#09987', status: 'rejected', inspectionPeriod: 3, dueDate: '2023-03-10T13:43:33.9333333'
  },
  {
    invoiceNo: '#09200', status: 'in-progress', inspectionPeriod: 2, dueDate: '2023-03-10T13:43:33.9333333'
  }
];

export const disputeActivities = [
  {
    date: '19th Jun at 8:14 AM',
    user: 'Moyinoluwa Akindele',
    role: 'buyer',
    activity: 'opened a dispute',
    reason: 'Incomplete or Missing Deliverables',
    proposal: 'Buyer requested for a refund',
    files: [
      { filename: 'Transaction.jpeg', filepath: 'https://images.unsplash.com/photo-1587116987928-21e47bd76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAzMzh8MHwxfHNlYXJjaHwzN3x8ZG9jdW1lbnR8ZW58MHx8fHwxNjc0NzYwNzky&ixlib=rb-4.0.3&q=80&w=1080' },
      { filename: 'Receipt printout.jpeg', filepath: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffc4226bf-ed83-4bdd-b5d3-bc84e5c91e22_1473x833.png' }
    ]
  },
  {
    date: '20th Jun at 8:14 AM',
    user: 'Jonathan Igwe',
    role: 'seller',
    activity: 'rejected with a new proposal',
    comment: 'Dear Friend Very very sorry about the bad shipping. Because it is the shipping peak in the year, all the packages delay more or less. After Bridge deal with the dispute, you will get refund',
    proposal: 'Partial refund and replacement of order',
    files: [
      { filename: 'Delivery invoice.jpeg', filepath: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffc4226bf-ed83-4bdd-b5d3-bc84e5c91e22_1473x833.png' }
    ]
  },
  {
    date: '20th Jun at 8:14 PM',
    user: 'Moyinoluwa Akindele',
    role: 'buyer',
    activity: 'escalated'
  },
  {
    date: '21th Jun at 10:14 AM',
    user: 'Bridge Mediator',
    role: 'admin',
    activity: 'reviewing'
  },
  {
    date: '21th Jun at 8:14 PM',
    user: 'Bridge Mediator',
    role: 'admin',
    comment: 'Dear Friend Very very sorry about the bad shipping. Because it is the shipping peak in the year, all the packages delay more or less. After Bridge deal with the dispute, you will get refund',
    activity: 'give verdict',
    decision: 'Seller to ship additional Item'
  }
];

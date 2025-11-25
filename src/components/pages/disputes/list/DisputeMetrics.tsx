import Image from 'next/image';

import DisputeIcon from '../../../../assets/svgs/ticket.svg';

export default function DisputeMetrics() {
  const stats = [
    {
      icon: DisputeIcon,
      title: "Total number of disputes",
      value: "7,450",
      color: "blue"
    },
    {
      icon: DisputeIcon,
      title: "Resolved",
      value: "5,000",
      color: "blue"
    },
    {
      icon: DisputeIcon,
      title: "In progress",
      value: "2,250",
      color: "blue"
    }
  ];

  return (
    <div className="w-full grid grid-cols-3 gap-4 my-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border-1 shadow-sm border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className='p-2 rounded-full bg-purple/10'>
              <Image src={stat.icon} alt={stat.title} width={18} className="w-auto h-auto" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

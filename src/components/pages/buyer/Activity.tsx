interface ActivityItem {
  timestamp: string;
  action: string;
  isChecked: boolean;
}

interface ActivityProps {
  activities?: ActivityItem[];
}

export default function Activity({ activities = [] }: ActivityProps) {
  return (
    <div className="w-full lg:mt-[9.5rem]">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6">Activity</h2>

        <section className="relative space-y-6">
          <div
            className="absolute left-[5px] top-4 bottom-4 w-[1px] bg-[#683AB7]"
            aria-hidden="true"
          ></div>

          {activities.map((activity, index) => (
            <div key={index} className="bg-blue-50/30 z-10">
              <div className="flex gap-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div className="flex-1 mt-1 min-w-0">
                  <p className="text-sm text-grey2 font-normal mb-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                  <p className="text-lg text-textColor font-bold leading-relaxed capitalize">
                    {activity.action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

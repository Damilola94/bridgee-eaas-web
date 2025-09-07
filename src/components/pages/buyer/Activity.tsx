interface ActivityItem {
  date: string;
  text: string;
  completed: boolean;
}

interface ActivityProps {
  activities: ActivityItem[];
}

export default function Activity({ activities }: ActivityProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Activity</h2>

        <div className="bg-blue-50/30">
          <div className="flex gap-x-4">

            <div className="flex-shrink-0 mt-1">
              {/* <div
                className={`w-3 h-3 rounded-full ${
                  activity.completed ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            </div> */}

              <div className="w-3 h-3 rounded-full bg-red-700 ">

              </div>
            </div>
            <div className="flex-1 mt-1 min-w-0">
              <p className="text-xs text-blue-600 font-medium mb-1">
                August 1, 2021; 12:00pm
              </p>
              <p className="text-sm text-gray-900 font-medium leading-relaxed">
                Seller initiates transaction
              </p>
            </div>

            {/* {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.completed ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 font-medium mb-1">
                    {activity.date}
                  </p>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">
                    {activity.text}
                  </p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

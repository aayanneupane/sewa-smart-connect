
import { Users, CheckCircle, Clock, Star } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Technicians",
      color: "text-blue-600"
    },
    {
      icon: CheckCircle,
      value: "50,000+",
      label: "Jobs Completed",
      color: "text-green-600"
    },
    {
      icon: Clock,
      value: "30 min",
      label: "Avg Response Time",
      color: "text-teal-600"
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Customer Rating",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex p-3 rounded-full bg-gray-50 mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

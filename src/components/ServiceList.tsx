
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, DollarSign, Star, User } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  category: string;
  hourly_rate: number;
  location: string;
  image_url: string;
  availability_status: string;
  created_at: string;
  provider_id?: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

interface ServiceListProps {
  services: Service[];
  onEdit?: (service: Service) => void;
  onDelete?: (serviceId: string) => void;
  isProvider?: boolean;
}

export const ServiceList: React.FC<ServiceListProps> = ({ 
  services, 
  onEdit, 
  onDelete, 
  isProvider = false 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'busy':
        return 'bg-yellow-100 text-yellow-700';
      case 'offline':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
  };

  // Mock rating for now (you can implement a proper rating system later)
  const getMockRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm overflow-hidden">
          {/* Service Image */}
          <div className="relative overflow-hidden">
            {service.image_url ? (
              <img
                src={service.image_url}
                alt={service.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`${service.image_url ? 'hidden' : ''} w-full h-48 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center`}>
              <div className="text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <span className="text-sm">No Image</span>
              </div>
            </div>
            
            {/* Category Badge */}
            <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
              {service.category}
            </Badge>
            
            {/* Status Badge */}
            <Badge className={`absolute top-3 right-3 ${getStatusColor(service.availability_status)}`}>
              {getStatusText(service.availability_status)}
            </Badge>
            
            {/* Rating Badge */}
            {!isProvider && (
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm font-semibold">{getMockRating()}</span>
              </div>
            )}
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {service.profiles?.full_name || service.profiles?.email || 'Service Provider'}
                </CardDescription>
              </div>
            </div>
            
            {/* Service Description */}
            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
              {service.description}
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Location and Price */}
              <div className="flex items-center justify-between text-sm">
                {service.location && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{service.location}</span>
                  </div>
                )}
                {service.hourly_rate && (
                  <div className="flex items-center gap-1 font-semibold text-blue-600">
                    <DollarSign className="w-3 h-3" />
                    <span>${service.hourly_rate}/hr</span>
                  </div>
                )}
              </div>

              {/* Rating for clients */}
              {!isProvider && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{getMockRating()} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isProvider && onEdit && onDelete ? (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(service)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(service.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    Book Now
                  </Button>
                  <Button variant="outline" className="border-blue-200 hover:border-blue-300">
                    View Profile
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, Clock, DollarSign } from 'lucide-react';

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          {service.image_url && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={service.image_url}
                alt={service.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                <CardDescription className="mt-1">{service.description}</CardDescription>
              </div>
              <Badge className={getStatusColor(service.availability_status)}>
                {getStatusText(service.availability_status)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <Badge variant="outline">{service.category}</Badge>
              {service.hourly_rate && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>${service.hourly_rate}/hr</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {service.location && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <MapPin className="w-3 h-3" />
                <span>{service.location}</span>
              </div>
            )}

            {service.detailed_description && (
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {service.detailed_description}
              </p>
            )}

            {isProvider && onEdit && onDelete && (
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
            )}

            {!isProvider && (
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                Contact Provider
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

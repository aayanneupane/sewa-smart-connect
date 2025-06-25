
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";

interface Service {
  id: number;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  category: string;
  location: string;
  availability: string;
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
            {service.category}
          </Badge>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-semibold">{service.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            by {service.provider}
          </CardDescription>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{service.rating} ({service.reviews} reviews)</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{service.price}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{service.location}</span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 text-green-600" />
            <span className="text-green-600 font-medium">{service.availability}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
            Book Now
          </Button>
          <Button variant="outline" className="border-blue-200 hover:border-blue-300">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

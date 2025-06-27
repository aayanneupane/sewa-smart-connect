import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceList } from "@/components/ServiceList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Wrench, Zap, Paintbrush, Car, Home, Laptop, Camera, Scissors } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ServicesBrowse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { name: "All Services", value: "", icon: Home, color: "bg-gray-100 text-gray-700" },
    { name: "Plumbing", value: "Plumbing", icon: Wrench, color: "bg-blue-100 text-blue-700" },
    { name: "Electrical", value: "Electrical", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
    { name: "Painting", value: "Painting", icon: Paintbrush, color: "bg-green-100 text-green-700" },
    { name: "Appliances", value: "Appliances", icon: Car, color: "bg-red-100 text-red-700" },
    { name: "HVAC", value: "HVAC", icon: Home, color: "bg-purple-100 text-purple-700" },
    { name: "Computer Repair", value: "Computer Repair", icon: Laptop, color: "bg-indigo-100 text-indigo-700" },
    { name: "Carpentry", value: "Carpentry", icon: Camera, color: "bg-pink-100 text-pink-700" },
    { name: "Cleaning", value: "Cleaning", icon: Scissors, color: "bg-teal-100 text-teal-700" },
  ];

  // Fetch services from database with provider information
  const { data: services, isLoading } = useQuery({
    queryKey: ['browse-services', selectedCategory, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('services')
        .select(`
          *,
          profiles:provider_id (
            full_name,
            email
          )
        `)
        .eq('availability_status', 'available')
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              🔍 Browse Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Find the Perfect Service
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Browse through our extensive collection of verified service providers. 
              Find exactly what you need, when you need it.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                    selectedCategory === category.value 
                      ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white" 
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Results */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory 
                ? `${selectedCategory} Services` 
                : "All Services"
              }
            </h2>
            <Badge variant="outline">
              {services?.length || 0} services found
            </Badge>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : services && services.length > 0 ? (
            <ServiceList services={services} />
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory 
                    ? "Try adjusting your search criteria" 
                    : "No services are currently available"
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesBrowse;

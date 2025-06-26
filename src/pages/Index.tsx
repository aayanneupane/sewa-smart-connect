
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Shield, Clock, CheckCircle, Users, Wrench, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { ServiceCard } from "@/components/ServiceCard";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { Footer } from "@/components/Footer";
import { UserMenu } from "@/components/UserMenu";
import { ServiceList } from "@/components/ServiceList";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  // Fetch all services from database
  const { data: services, isLoading } = useQuery({
    queryKey: ['all-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('availability_status', 'available')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    }
  });

  // Filter services based on search term
  const filteredServices = services?.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Updated Header with Authentication */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              TechSewa
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/services">
                  <Button variant="outline">My Services</Button>
                </Link>
                <UserMenu />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              🚀 AI-Powered Service Matching
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
              TechSewa
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Connect with trusted local technicians instantly. Smart matching, transparent pricing, and guaranteed quality service.
            </p>
            {user && (
              <div className="mb-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Welcome back, {user.email}!
                </Badge>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for services (plumber, electrician, repair...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-32 py-4 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                Find Services
              </Button>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Technicians</h3>
              <p className="text-gray-600 text-center">Background-checked, licensed professionals you can trust</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-teal-100">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Same-Day Service</h3>
              <p className="text-gray-600 text-center">Get help when you need it, with flexible scheduling</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-center">Quality work backed by our service guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Featured Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchTerm ? 'Search Results' : 'Featured Services Near You'}
            </h2>
            <p className="text-xl text-gray-600">
              {searchTerm ? `Found ${filteredServices.length} services` : 'Top-rated technicians ready to help with your home and office needs'}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredServices.length > 0 ? (
            <ServiceList services={filteredServices} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? 'No services found' : 'No services available'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Be the first to list a service!'}
              </p>
              {user && (
                <Link to="/services">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    List Your Service
                  </Button>
                </Link>
              )}
            </div>
          )}

          {!searchTerm && filteredServices.length > 0 && (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                View All Services
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How TechSewa Works
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Get connected with the right technician in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">1. Describe Your Need</h3>
              <p className="text-blue-100">Tell us what service you need and when you need it</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">2. Get Matched</h3>
              <p className="text-blue-100">Our AI finds the best technicians for your specific requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">3. Get It Done</h3>
              <p className="text-blue-100">Book, track, and pay securely through our platform</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers and skilled technicians
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Find a Technician
                </Button>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg">
                    <Wrench className="mr-2 h-5 w-5" />
                    List Your Services
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg">
                    <Users className="mr-2 h-5 w-5" />
                    Find a Technician
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg">
                    <Wrench className="mr-2 h-5 w-5" />
                    Become a Provider
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;


import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Award, Clock, CheckCircle, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            🚀 About TechSewa
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Connecting Communities Through Technology
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            TechSewa is Nepal's premier platform for connecting skilled technicians with customers who need reliable, professional services. We're building trust in the service industry through technology.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/60 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To revolutionize how people find and connect with trusted local service providers, 
                  making quality home and business services accessible to everyone while empowering 
                  skilled technicians to grow their businesses.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border border-teal-100">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-600">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To become the most trusted and comprehensive service marketplace in Nepal, 
                  where quality, reliability, and customer satisfaction are guaranteed through 
                  innovative technology and rigorous vetting processes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose TechSewa?
            </h2>
            <p className="text-xl text-blue-100">
              We're committed to excellence in every interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Verified Professionals</h3>
              <p className="text-blue-100">All our service providers are thoroughly vetted, licensed, and background-checked</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Quality Guarantee</h3>
              <p className="text-blue-100">Every service comes with our satisfaction guarantee and quality assurance</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">24/7 Support</h3>
              <p className="text-blue-100">Round-the-clock customer support to help you whenever you need assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Transparency</h3>
                <p className="text-gray-600">Clear pricing, honest reviews, and open communication at every step</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Star className="h-6 w-6 text-yellow-600 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">Striving for the highest standards in service quality and customer satisfaction</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="h-6 w-6 text-blue-600 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-600">Building strong relationships between service providers and customers</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-purple-600 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Trust</h3>
                <p className="text-gray-600">Creating a safe, reliable platform where everyone can transact with confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

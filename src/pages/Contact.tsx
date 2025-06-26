
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, MessageSquare, HeadphonesIcon } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            📞 Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Contact TechSewa
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Have questions, need support, or want to partner with us? We're here to help. 
            Reach out to our friendly team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/60 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input placeholder="Doe" className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" placeholder="john@example.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input placeholder="+977 98XXXXXXXX" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <Input placeholder="How can we help you?" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..." 
                    className="mt-1 min-h-[120px]" 
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border border-teal-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-teal-600 flex items-center">
                    <HeadphonesIcon className="mr-2 h-6 w-6" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">support@techsewa.com</p>
                      <p className="text-gray-600">hello@techsewa.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+977 1-4XXXXXX</p>
                      <p className="text-gray-600">+977 98XXXXXXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        Kathmandu, Nepal<br />
                        Bagmati Province, 44600
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="bg-white/60 backdrop-blur-sm border border-green-100">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">Quick Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      <strong>For Service Providers:</strong> Questions about listing services or account management
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>For Customers:</strong> Help with booking services or payment issues
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Technical Support:</strong> App issues or website problems
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Partnerships:</strong> Business collaboration opportunities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

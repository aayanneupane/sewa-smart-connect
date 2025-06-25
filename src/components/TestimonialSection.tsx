
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "TechSewa saved my weekend! My kitchen sink was completely blocked, and I found an amazing plumber within minutes. Professional, affordable, and reliable!",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Mike Rodriguez", 
      role: "Business Owner",
      content: "As an electrician on TechSewa, I've doubled my client base. The platform makes it easy to connect with customers who really need my services.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Emily Chen",
      role: "Apartment Renter",
      content: "The AI recommendations are spot-on! Every technician I've booked through TechSewa has been exactly what I needed. Love the transparent pricing too.",
      rating: 5,
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from customers and technicians
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

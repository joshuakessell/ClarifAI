import { useState } from "react";
import StaticPage from "@/components/layout/StaticPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting FactFocus. We'll respond to your inquiry shortly.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
    }, 1500);
  };

  return (
    <StaticPage 
      title="Contact Us" 
      description="Get in touch with the FactFocus team for general inquiries, support, or partnership opportunities."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Contact Us</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          We welcome your questions, feedback, and inquiries about FactFocus. Our team is committed to 
          responding promptly to all messages.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Us</h2>
            <p className="text-gray-600 mb-4">For general questions and inquiries.</p>
            <a href="mailto:info@factfocus.com" className="text-blue-600 font-medium">info@factfocus.com</a>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Support</h2>
            <p className="text-gray-600 mb-4">For help with your account or technical issues.</p>
            <a href="mailto:support@factfocus.com" className="text-blue-600 font-medium">support@factfocus.com</a>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Partnerships</h2>
            <p className="text-gray-600 mb-4">For business and collaboration opportunities.</p>
            <a href="mailto:partnerships@factfocus.com" className="text-blue-600 font-medium">partnerships@factfocus.com</a>
          </div>
        </div>
        
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Jane Smith" 
                  required 
                  className="mt-1 w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="jane@example.com" 
                  required 
                  className="mt-1 w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="inquiryType">Type of Inquiry</Label>
                <RadioGroup value={formData.inquiryType} onValueChange={handleRadioChange} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="cursor-pointer">General Inquiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="support" id="support" />
                    <Label htmlFor="support" className="cursor-pointer">Technical Support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feedback" id="feedback" />
                    <Label htmlFor="feedback" className="cursor-pointer">Feedback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partnership" id="partnership" />
                    <Label htmlFor="partnership" className="cursor-pointer">Partnership Opportunity</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Brief description of your inquiry" 
                  required 
                  className="mt-1 w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Please provide details about your inquiry..." 
                  required 
                  className="mt-1 w-full min-h-[150px]"
                />
              </div>
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How quickly can I expect a response?</h3>
              <p className="text-gray-700">
                We aim to respond to all inquiries within 1-2 business days. For urgent support 
                matters, we prioritize responses and typically reply within 24 hours.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">I'm a journalist interested in covering FactFocus. Who should I contact?</h3>
              <p className="text-gray-700">
                For media inquiries, please email our press team at <a href="mailto:press@factfocus.com" className="text-blue-600">press@factfocus.com</a>. 
                We're happy to arrange interviews, provide information, or assist with your coverage.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How can I report inaccurate information in an article?</h3>
              <p className="text-gray-700">
                We take factual accuracy very seriously. Please email <a href="mailto:corrections@factfocus.com" className="text-blue-600">corrections@factfocus.com</a> with 
                the article title, the specific information you believe is inaccurate, and supporting evidence.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Are you hiring?</h3>
              <p className="text-gray-700">
                Visit our <a href="#" className="text-blue-600">Careers page</a> for current job openings. If you don't see a 
                position that matches your skills but are passionate about our mission, feel free to 
                send your resume to <a href="mailto:careers@factfocus.com" className="text-blue-600">careers@factfocus.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StaticPage>
  );
}
import CompanyCarousel from "@/components/company-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart, Calendar, ChevronRight, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import faqs from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description: "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description: "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description: "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          Streamline Your Workflow <br/>
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            with{" "}
            <Image
              src="/luv.png"  // Updated path - ensure this exists in public/images
              alt="Luvarum Logo"
              width={400}
              height={80}
              className="h-14 sm:h-24 w-auto object-contain"
              priority
            />
          </span>
        </h1>
        <p className="text-xl font-bold text-red-500 m-10 max-w-3xl mx-auto">
          Empower your team with our intuitive project management solution.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/onboarding" passHref legacyBehavior>
            <Button size="lg">
              Get Started <ChevronRight size={18}/>
            </Button>
          </Link>
          <Link href="#features" passHref legacyBehavior>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-red-300 py-20 px-5">
        <div className="container mx-auto">
        <h3 className="text-4xl font-bold text-center text-red-600 mb-12">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className=" bg-red-400 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <feature.icon className="h-12 w-12 mb-4 text-red-700"/>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-red-900">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
        <h3 className="text-4xl font-bold text-center text-red-600 mb-12">Trusted by Industry Leaders</h3>
          <CompanyCarousel/>
        </div>
      </section>

 {/* FAQ Section */}
      <section className="bg-red-400 py-20 px-7">
        <div className="container mx-auto">
        <h3 className="text-4xl font-bold text-center text-red-900 mb-12">
        Frequently Asked Questions
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq,index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        </div>
      </section>

      <section className="py-20 text-center px-5">
        <div className="container mx-auto">
        <h3 className="text-4xl font-bold mb-6 text-red-600">Ready to Tranform Your Workflow</h3>
          <p className="text-xl font-bold text-red-600 mb-12">
          Join thousands of teams already using LUVARUM to streamline their
          projects and boost productivity.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="animate-bounce">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
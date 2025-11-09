import CTA from "@/components/landingPage/CTA";
import Features from "@/components/landingPage/Features";
import Footer from "@/components/landingPage/Footer";
import Hero from "@/components/landingPage/Hero";
import HowItWorks from "@/components/landingPage/HowItWorks";
import Testimonials from "@/components/landingPage/Testimonials";
import { isAuthenticated } from "@/lib/session/serverSession";
import { redirect } from "next/navigation";


export default async function LandingPage() {

  const IsLoggedIn = await isAuthenticated()

  if(IsLoggedIn){
    redirect("/searchcourses")
  }

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}


 


 


 











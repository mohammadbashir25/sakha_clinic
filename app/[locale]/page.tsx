import { Hero } from "@/components/home/hero/Hero"
import { ProblemDesire } from "@/components/home/ProblemDesire/ProblemDesire"
import { SignatureServices } from "@/components/home/SignatureServices/SignatureServices"
import { BeforeAfter } from "@/components/home/BeforeAfter/BeforeAfter"
import { Testimonials } from "@/components/home/Testimonials/Testimonials"
import FinalCta from "@/components/home/FinalCTA/FinalCta"

const page = () => {
  return (
    <div>
      <Hero />
      <ProblemDesire />
      <SignatureServices />
      <BeforeAfter />
      <Testimonials />

      <FinalCta />
    </div>
  )
}

export default page

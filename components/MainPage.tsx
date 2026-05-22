"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { ChevronDown, ArrowRight, Mail, Calendar, Check } from "lucide-react";

const founders = [
  { name: "Neal Karani", school: "Stanford '29", major: "Mathematics & CS · AI", role: "Leads essay strategy and overall application positioning. Every roadmap reviewed before delivery.", img: "/neal.png" },
  { name: "Arhan Barve", school: "Harvard '30", major: "Economics & CS", role: "Leads activity positioning and brings an admissions-committee perspective to how each student's story is told.", img: "/arhan.png" },
  { name: "Andrew Lin", school: "MIT '29", major: "Engineering · 1600 SAT", role: "Leads STEM positioning and technical activity strategy for students pursuing engineering and science.", img: "/andrew.png" },
];

const services = [
  { num: "01", title: "Application Strategy", desc: "Full-cycle roadmap — course selection, activity prioritization, school list, and timeline built around your student's unique strengths." },
  { num: "02", title: "Essay Coaching", desc: "Every draft reviewed line by line. We help students find the story only they can tell, then make it impossible to ignore." },
  { num: "03", title: "Activity Positioning", desc: "We reframe extracurriculars as a coherent narrative. What you've done matters less than how it's presented." },
  { num: "04", title: "Scholarship Support", desc: "We identify scholarships matched to your student's profile and review selected drafts before every deadline." },
];

const steps = [
  { num: "01", title: "Free Consultation", desc: "30-minute call to understand your student's goals, timeline, and where we can add the most value.", tag: "No commitment required" },
  { num: "02", title: "Custom Roadmap", desc: "We build a personalized weekly plan — every deliverable, every deadline, every decision point mapped out.", tag: "Delivered within 72 hours" },
  { num: "03", title: "Weekly Execution", desc: "Your student receives a concrete task list each week. Every completed piece gets detailed founder feedback.", tag: "Both founders review" },
  { num: "04", title: "Submission & Beyond", desc: "We stay with you through decisions, waitlists, appeals, and scholarship applications.", tag: "Full cycle support" },
];

const admits = ["Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia", "UPenn", "Dartmouth", "Cornell", "Duke", "Northwestern", "Johns Hopkins"];

const testimonials = [
  { text: "Neal personally rewrote my Common App intro three times until it was perfect. I got into Stanford ED.", image: "https://i.pravatar.cc/128?img=11", name: "Priya S.", role: "Stanford '28" },
  { text: "Worth every penny. My daughter went from generic to compelling. Harvard waitlist to accepted.", image: "https://i.pravatar.cc/128?img=12", name: "Parent of Maya R.", role: "Harvard '29" },
  { text: "The weekly plans kept us on track. Essay feedback was more detailed than any counselor I'd used before.", image: "https://i.pravatar.cc/128?img=13", name: "Rohan K.", role: "MIT '28" },
  { text: "Arhan's activity reframing was game-changing. Same activities, completely different story. Accepted to Yale.", image: "https://i.pravatar.cc/128?img=14", name: "Sofia M.", role: "Yale '29" },
  { text: "Andrew helped me position my research so it actually stood out. Got into every STEM school I applied to.", image: "https://i.pravatar.cc/128?img=15", name: "Aiden L.", role: "Princeton '28" },
  { text: "The free consultation alone was more valuable than hours with my school counselor.", image: "https://i.pravatar.cc/128?img=16", name: "Emma T.", role: "Columbia '29" },
  { text: "As a first-gen student I had no idea how to approach this. Laplace gave me a real shot at elite schools.", image: "https://i.pravatar.cc/128?img=17", name: "Carlos V.", role: "Cornell '28" },
  { text: "The money-back guarantee gave us confidence. We never needed it — my son got his first choice.", image: "https://i.pravatar.cc/128?img=18", name: "Parent of David H.", role: "Duke '29" },
  { text: "I used three college counselors before Laplace. None came close to this level of personal attention.", image: "https://i.pravatar.cc/128?img=19", name: "Zara A.", role: "Northwestern '28" },
];

const packages = [
  { name: "Essay Edge", tag: "Best for juniors & seniors", featured: false, items: ["3 full essay reviews", "Common App main essay", "2 supplemental essays", "48-hr turnaround", "Email support"], cta: "Get Started" },
  { name: "Full Cycle", tag: "Most popular — comprehensive", featured: true, items: ["Everything in Essay Edge", "Custom application roadmap", "Activity list reframe", "School list strategy", "Weekly check-ins", "Scholarship review", "Decision support"], cta: "Book Free Call" },
  { name: "Roadmap", tag: "Best for freshmen & sophomores", featured: false, items: ["4-year course plan", "Extracurricular strategy", "Summer program guidance", "Monthly check-ins", "Essay preview session"], cta: "Get Started" },
];

const faqs = [
  { q: "Do you guarantee admission?", a: "No. Admission decisions belong to universities. What we guarantee is a meticulously prepared, well-positioned application — and our full attention to every detail of it." },
  { q: "What grades do you work with?", a: "Grades 8 through 12, plus gap year and transfer students. The earlier a student starts, the more strategic options we can open." },
  { q: "How does weekly support actually work?", a: "Each week your student receives a concrete task list. Completed work receives detailed feedback within your package's guaranteed response window." },
  { q: "What does it cost?", a: "Engagements typically range from a few thousand to mid-five-figures depending on package, grade level, and timeline. Exact pricing is shared on your free consultation." },
  { q: "Do you offer a money-back guarantee?", a: "Yes. If you're not satisfied after the first two weeks, we refund 100% — no questions asked." },
];

export function MainPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t1 = testimonials.slice(0, 3);
  const t2 = testimonials.slice(3, 6);
  const t3 = testimonials.slice(6, 9);

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/97 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Laplace College Consulting"
              width={44}
              height={44}
              className={`w-10 h-10 object-contain transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
            />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[["About", "#about"], ["Services", "#services"], ["Process", "#process"], ["Packages", "#packages"], ["Results", "#results"]].map(([label, href]) => (
              <a key={label} href={href} className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-red-600" : "text-white/80 hover:text-white"}`}>{label}</a>
            ))}
          </div>
          <a
            href="https://calendly.com/laplacecc/freeconsultation"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
          >
            Book Free Call
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-[#0f1923] via-[#1a2a3a] to-[#0f1923] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-16 items-center w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/75 text-xs font-medium tracking-widest uppercase">Stanford · Harvard · MIT · Founded</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.02em" }}>
              YOUR STUDENT&apos;S STORY DESERVES TO BE{" "}
              <em className="text-red-500 not-italic" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>heard</em>{" "}
              AT THE RIGHT SCHOOLS.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg">
              We build the strategy behind the application — courses, activities, essays, and positioning — guided by three valedictorian founders from Stanford, Harvard, and MIT.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://calendly.com/laplacecc/freeconsultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded transition-colors"
              >
                Book FREE Session <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#packages" className="inline-flex items-center gap-2 text-white/70 hover:text-white border-b border-white/25 hover:border-white pb-0.5 transition-colors text-sm font-medium">
                View Packages <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-12 mt-14 pt-10 border-t border-white/10">
              {[["3", "Valedictorian Founders"], ["12+", "Elite Admits"], ["100%", "Personalized Plans"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-white">{num}</div>
                  <div className="text-white/45 text-xs uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="bg-[#0f1923] px-8 py-6 border-b border-white/10">
              <div className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-2">Founded by</div>
              <p className="text-white/75 text-sm italic">&quot;Three valedictorians. Three elite universities. One firm.&quot;</p>
            </div>
            {founders.map((f, i) => (
              <div key={f.name} className={`flex items-center gap-4 px-8 py-5 ${i < founders.length - 1 ? "border-b border-white/10" : ""}`}>
                <Image src={f.img} alt={f.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover object-top border-2 border-white/20 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">{f.name}</div>
                  <div className="text-red-400 text-xs font-semibold tracking-wider uppercase">{f.school}</div>
                  <div className="text-white/45 text-xs">{f.major} · Valedictorian</div>
                </div>
              </div>
            ))}
            <div className="px-8 py-4 bg-red-600/10 border-t border-red-500/20">
              <p className="text-red-400 text-xs italic">Every deliverable reviewed by our founders before delivery.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCROLL ANIMATION FEATURE */}
      <section className="bg-gray-50">
        <ContainerScroll
          titleComponent={
            <div className="text-center">
              <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-4">The Laplace Process</p>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                A system built for<br /><span className="text-red-600">elite outcomes</span>
              </h2>
            </div>
          }
        >
          <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1923] to-[#1a2a3a] rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-8">
              {steps.map((step) => (
                <div key={step.num} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
                  <div className="text-red-500 text-2xl font-bold mb-2">{step.num}</div>
                  <div className="text-white font-semibold text-sm mb-1">{step.title}</div>
                  <div className="text-white/40 text-xs">{step.tag}</div>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm italic text-center max-w-md">
              &quot;Every roadmap reviewed by our founders before it reaches your family.&quot;
            </p>
          </div>
        </ContainerScroll>
      </section>

      {/* ADMITS */}
      <section id="results" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">Student Admits</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">One standard. <span className="text-red-600">Twelve schools.</span></h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {admits.map((school) => (
              <motion.div
                key={school}
                whileHover={{ y: -2 }}
                className="border border-gray-100 rounded-xl p-4 text-center hover:border-red-200 hover:bg-red-50 transition-all cursor-default group"
              >
                <div className="text-2xl font-bold text-gray-100 group-hover:text-red-200 transition-colors mb-1">{school[0]}</div>
                <div className="text-xs font-medium text-gray-700">{school}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything your application needs.<br /><span className="text-red-600">Nothing it doesn&apos;t.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            {services.map((svc) => (
              <div key={svc.num} className="bg-white p-10 group hover:bg-red-50 transition-colors">
                <div className="text-red-600 text-xs font-bold tracking-widest mb-4">{svc.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Four steps to a<br /><span className="text-red-600">standout application.</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="py-8 grid grid-cols-12 gap-8 items-start group hover:bg-gray-50 -mx-6 px-6 rounded-lg transition-colors"
              >
                <div className="col-span-2 text-5xl font-bold text-gray-100 group-hover:text-red-100 transition-colors leading-none">{step.num}</div>
                <div className="col-span-7">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                <div className="col-span-3 flex items-start pt-1">
                  <span className="inline-block border border-red-200 text-red-600 text-xs px-3 py-1 rounded-full">{step.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="about" className="py-24 bg-[#0f1923]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-3">Founded by</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Three valedictorians.<br /><span className="text-red-500">Three elite universities. One standard.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors"
              >
                <Image src={f.img} alt={f.name} width={96} height={96} className="w-24 h-24 rounded-full object-cover object-top border-2 border-red-500/30 mb-6" />
                <h3 className="text-xl font-bold text-white mb-1">{f.name}</h3>
                <p className="text-red-400 text-xs font-semibold tracking-wider uppercase mb-1">{f.school}</p>
                <p className="text-white/45 text-xs mb-4">{f.major} · Valedictorian</p>
                <p className="text-white/65 text-sm leading-relaxed border-t border-white/10 pt-4">{f.role}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 bg-red-600/10 border border-red-500/20 rounded-2xl p-8 flex gap-5 items-start"
          >
            <div className="w-1 h-16 bg-red-500 rounded-full flex-shrink-0 mt-1" />
            <div>
              <p className="text-white text-lg italic leading-relaxed">
                &quot;Every roadmap, every essay revision, every activity description — reviewed by our founders before it reaches your family. That is our standard, for every student, without exception.&quot;
              </p>
              <p className="text-red-400 text-sm font-semibold mt-4">— Neal Karani, Arhan Barve &amp; Andrew Lin, Co-founders</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What families are saying.</h2>
            <p className="text-gray-400 mt-3 text-sm">From first-gen students to legacy admits — the same standard for everyone.</p>
          </div>
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
            <TestimonialsColumn testimonials={t1} duration={20} />
            <TestimonialsColumn testimonials={t2} className="hidden md:block" duration={26} />
            <TestimonialsColumn testimonials={t3} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose your package.</h2>
            <p className="text-gray-400 mt-3 text-sm">Exact pricing discussed on your free consultation call.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border-2 p-8 relative transition-all ${pkg.featured ? "border-red-600 shadow-2xl shadow-red-100 bg-[#0f1923] md:-mt-4 md:mb-4" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${pkg.featured ? "text-white" : "text-gray-900"}`}>{pkg.name}</h3>
                <p className={`text-xs mb-6 ${pkg.featured ? "text-white/45" : "text-gray-400"}`}>{pkg.tag}</p>
                <div className={`border-t mb-6 ${pkg.featured ? "border-white/10" : "border-gray-100"}`} />
                <ul className="space-y-3 mb-8">
                  {pkg.items.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${pkg.featured ? "text-white/75" : "text-gray-700"}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.featured ? "text-red-400" : "text-red-600"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://calendly.com/laplacecc/freeconsultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-colors ${pkg.featured ? "bg-red-600 hover:bg-red-700 text-white" : "border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900"}`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Common questions.</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left gap-4 group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 text-gray-600 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#0f1923] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to start?</h2>
            <p className="text-white/55 mb-10 text-lg leading-relaxed">
              Book a free 15-minute consultation. No commitment, no sales pitch — just an honest look at how we can help your student.
            </p>
            <a
              href="https://calendly.com/laplacecc/freeconsultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-5 rounded transition-colors"
            >
              <Calendar className="w-5 h-5" /> Book Free Session
            </a>
            <p className="text-white/25 text-xs mt-6">100% money-back guarantee if you&apos;re not satisfied after two weeks.</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Laplace" width={36} height={36} className="w-9 h-9 brightness-0 invert opacity-60" />
            <div>
              <div className="text-white font-semibold text-sm">Laplace College Consulting</div>
              <div className="text-white/25 text-xs">Stanford · Harvard · MIT · Founded</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/laplace_cc/" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white transition-colors text-xs font-medium tracking-wider">
              @laplace_cc
            </a>
            <a href="mailto:laplacecollegeconsulting@gmail.com" className="text-white/35 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://calendly.com/laplacecc/freeconsultation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
            >
              Book Free Call
            </a>
          </div>
          <p className="text-white/15 text-xs">© 2025 Laplace College Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

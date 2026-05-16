import { motion } from "framer-motion";
import { 
  Search, 
  FileText, 
  ShieldCheck, 
  Network, 
  ChevronRight, 
  Play, 
  Filter, 
  DollarSign, 
  CheckCircle2,
  Cpu,
  BrainCircuit,
  Zap
} from "lucide-react";
const BookMarkedIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-5" />
    <polyline points="10 2 10 10 13 7 16 10 16 2" />
  </svg>
);

const Navbar = ({ onActionClick }: { onActionClick: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-sage bg-white/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-forest-green rounded-sm flex items-center justify-center">
          <BookMarkedIcon className="text-white w-5 h-5" />
        </div>
        <span className="font-display text-xl font-medium tracking-tight text-charcoal">PeerReviewAI</span>
      </a>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#home" className="hover:text-forest-green transition-colors text-charcoal">Home</a>
        <a href="#methodology" className="hover:text-forest-green transition-colors text-charcoal">Methodology</a>
        <a href="#architecture" className="hover:text-forest-green transition-colors text-charcoal">Architecture</a>
        <a href="#benefits" className="hover:text-forest-green transition-colors text-charcoal">Benefits</a>
      </div>

      <button 
        onClick={onActionClick}
        className="bg-forest-green text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-forest-green-light transition-colors professional-shadow"
      >
        Try the Project
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="py-12 px-6 max-w-7xl mx-auto border-t border-border-sage">
    <div className="grid grid-cols-3 md:grid-cols-12 gap-8">
      
      <div className="col-span-1 md:col-span-2">
        <h5 className="text-[10px] font-medium uppercase tracking-widest text-charcoal mb-4">Product</h5>
        <ul className="space-y-2 text-sm text-muted-grey">
          <li><a href="#" className="hover:text-forest-green transition-colors">Manage cookies</a></li>
          <li><a href="#" className="hover:text-forest-green transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-forest-green transition-colors">Sample Reports</a></li>
        </ul>
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <h5 className="text-[10px] font-medium uppercase tracking-widest text-charcoal mb-4">Discovery</h5>
        <ul className="space-y-2 text-sm text-muted-grey">
          <li><a href="#home" className="hover:text-forest-green transition-colors">Home</a></li>
          <li><a href="#methodology" className="hover:text-forest-green transition-colors">Methodology</a></li>
          <li><a href="#architecture" className="hover:text-forest-green transition-colors">Architecture</a></li>
        </ul>
      </div>

      <div className="col-span-1 md:col-span-3">
        <h5 className="text-[10px] font-medium uppercase tracking-widest text-charcoal mb-4">Company</h5>
        <ul className="space-y-2 text-sm text-muted-grey break-all sm:break-normal">
          <li><a href="https://github.com/BhaveshBhakta" className="hover:text-forest-green transition-colors">Github</a></li>
          <li><a href="https://www.linkedin.com/in/bhavesh-bhakta" className="hover:text-forest-green transition-colors">Linkedin</a></li>
          <li><a href="https://www.linkedin.com/in/bhavesh-bhakta" className="hover:text-forest-green transition-colors">Contact</a></li>
        </ul>
      </div>

      <div className="col-span-3 md:col-span-5 md:order-first border-t border-border-sage/40 md:border-0 pt-8 md:pt-0">
        <div className="flex items-center gap-2 mb-4">
           <div className="w-8 h-8 bg-forest-green rounded-sm flex items-center justify-center">
             <BookMarkedIcon className="text-white w-5 h-5" />
           </div>
           <span className="font-display text-xl font-medium tracking-tight text-charcoal">PeerReviewAI</span>
        </div>
        <p className="text-muted-grey text-sm max-w-xs leading-relaxed">
          © 2025 PeerReviewAI. All rights reserved. Peer review precision for the digital age.
        </p>
      </div>

    </div>
  </footer>
);

const Hero = ({ onStartAnalysis }: { onStartAnalysis: () => void }) => (
  <section id="home" className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 bg-white border border-border-sage rounded-full px-3 py-1 mb-8"
      >
        <div className="w-2 h-2 rounded-full bg-forest-green animate-pulse" />
        <span className="text-[10px] font-medium tracking-widest uppercase text-muted-grey">AI-Driven Academic Excellence</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-display font-medium text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto"
      >
        Automating the rigor of <br />
        <span className="text-forest-green">academic peer review.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-muted-grey text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
      >
        An agentic AI system that performs novelty detection, citation analysis, and factual verification with multi-agent reasoning.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button 
          onClick={onStartAnalysis}
          className="bg-forest-green text-white px-8 py-4 rounded-4xl font-medium professional-shadow hover:bg-forest-green-light transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          Analyze Manuscript
        </button>
        
      </motion.div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-20 relative px-4"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-xl border border-border-sage professional-shadow overflow-hidden">
        <div className="h-10 bg-sage-wash/50 border-b border-border-sage flex items-center justify-between px-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border-sage" />
            <div className="w-2.5 h-2.5 rounded-full bg-border-sage" />
            <div className="w-2.5 h-2.5 rounded-full bg-border-sage" />
          </div>
          <div className="text-[10px] font-medium uppercase tracking-widest text-muted-grey flex items-center gap-2">
            System Status: <span className="text-forest-green">Scanning</span>
          </div>
        </div>
        
        <div className="p-8 flex flex-col md:flex-row gap-8 items-start text-left">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-sage-wash rounded-lg flex items-center justify-center">
                <FileText className="text-forest-green w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-grey">Manuscript File</p>
                <p className="font-medium">medical_ai_review.pdf</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium">Processing...</span>
                <span className="text-muted-grey">82%</span>
              </div>
              <div className="w-full h-2 bg-sage-wash rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-forest-green" 
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 flex-1 w-full md:border-l md:border-border-sage md:pl-12">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-grey mb-1">Novelty Index</p>
              <p className="font-medium text-sm">Low</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-grey mb-1">Citaton Key</p>
              <p className="font-medium text-sm">48 Ref.</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-grey mb-1">Claim Status</p>
              <p className="font-medium text-sm text-forest-green flex items-center gap-1.5">
                Verifying...
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const Architecture = () => (
  <section id="architecture" className="py-32 px-6 bg-white overflow-hidden border-y border-border-sage">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-medium uppercase tracking-widest text-forest-green mb-6">Agentic Architecture</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight font-medium">
              A committee of <span className="italic">specialized minds</span> working in parallel.
            </h2>
            <p className="text-muted-grey text-lg leading-relaxed mb-12 max-w-xl">
              Strict peer review requires multiple perspectives. PeerReviewAI simulates a high-level academic committee through autonomous agent coordination.
            </p>
            
            <div className="space-y-10 relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-border-sage hidden md:block" />
              
              {[
                { 
                  name: "Planner & Meta Reviewer", 
                  role: "Orchestration", 
                  desc: "Decomposes manuscripts into structural units and synthesises multi-agent outputs.",
                  icon: <Network className="w-5 h-5" />
                },
                { 
                  name: "The Critical Opponent", 
                  role: "Truth Enforcement", 
                  desc: "Attempts to refute reasoning to proactively eliminate AI hallucinations.",
                  icon: <Zap className="w-5 h-5" />
                },
                { 
                  name: "Factual Verification Agent", 
                  role: "Technical Rigor", 
                  desc: "Executes targeted numerical auditing of statistical results and data processing.",
                  icon: <Cpu className="w-5 h-5" />
                }
              ].map((agent, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-12 group"
                >
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-sage-wash border border-border-sage flex items-center justify-center group-hover:bg-forest-green group-hover:text-white transition-all">
                    {agent.icon}
                  </div>
                  <h4 className="font-display font-medium text-lg mb-1">{agent.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-forest-green font-medium mb-2">{agent.role}</p>
                  <p className="text-muted-grey text-sm max-w-md">{agent.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="relative z-10 w-full aspect-square max-w-lg mx-auto bg-sage-wash/30 rounded-full border border-border-sage/50 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[0.5px] border-dashed border-forest-green/20 rounded-full"
            />
            
            <div className="relative bg-white professional-shadow rounded-2xl border border-border-sage p-8 w-64 md:w-80">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-forest-green" />
                   <div className="w-2 h-2 rounded-full bg-forest-green/20" />
                 </div>
                 <span className="text-[9px] font-mono opacity-50">AGENT_FLOW_03</span>
               </div>
               <div className="space-y-4">
                 <div className="h-1 w-full bg-sage-wash rounded-full relative overflow-hidden">
                   <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-forest-green/30" 
                   />
                 </div>
                 <div className="h-2 w-3/4 bg-sage-wash rounded-full" />
                 <div className="h-2 w-1/2 bg-sage-wash rounded-full" />
               </div>
               <div className="mt-8 flex justify-end">
                 <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center text-white">
                   <BrainCircuit className="w-5 h-5" />
                 </div>
               </div>
            </div>

            {/* Orbiting Elements */}
            {[
              { icon: <Search className="w-4 h-4" />, top: "10%", left: "10%" },
              { icon: <ShieldCheck className="w-4 h-4" />, top: "80%", left: "15%" },
              { icon: <CheckCircle2 className="w-4 h-4" />, top: "30%", left: "85%" },
            ].map((node, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, delay: i, repeat: Infinity }}
                className="absolute w-10 h-10 bg-white border border-border-sage rounded-xl flex items-center justify-center professional-shadow"
                style={{ top: node.top, left: node.left }}
              >
                <div className="text-forest-green">{node.icon}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Foundations = () => (
  <section id="benefits" className="py-24 px-6 bg-white border-y border-border-sage">
    <div className="max-w-7xl mx-auto mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 text-forest-green mb-4">
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-[10px] font-medium tracking-widest uppercase">BENEFITS</span>
        </div>
        <h2 className="font-display font-medium text-5xl mb-6">Why PeerReviewAI Matters</h2>
        <p className="text-muted-grey text-lg max-w-3xl leading-relaxed">
          Leverage the power of AI to automatically maintain the integrity of your research, ensuring you 
          get the most rigorous evaluation for your manuscript with every analysis.
        </p>
      </motion.div>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { 
          title: "Novelty Search", 
          icon: <Search className="w-6 h-6" />, 
          desc: "Advanced FAISS embeddings compare your research against thousands of papers to identify truly novel contributions" 
        },
        { 
          title: "Plagiarism Detection", 
          icon: <ShieldCheck className="w-6 h-6" />, 
          desc: "Sophisticated algorithms detect not just direct copying, but paraphrasing and structural similarities" 
        },
        { 
          title: "Factual Verification", 
          icon: <CheckCircle2 className="w-6 h-6" />, 
          desc: "Automated validation of numerical data, units, and statistical claims against established databases" 
        },
        { 
          title: "Claim Mapping", 
          icon: <Network className="w-6 h-6" />, 
          desc: "Extract and cross-reference scientific claims with existing literature to ensure accuracy and context" 
        },
        { 
          title: "Citation Quality Check", 
          icon: <FileText className="w-6 h-6" />, 
          desc: "Comprehensive analysis of citation accuracy, relevance, and completeness with suggestions for improvement" 
        },
        { 
          title: "LLM Review Synthesis", 
          icon: <BrainCircuit className="w-6 h-6" />, 
          desc: "Generate structured, professional reviewer-style feedback that matches human expert standards" 
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 30px -10px rgba(42, 93, 59, 0.1)",
            borderColor: "rgba(42, 93, 59, 0.3)"
          }}
          className="bg-white border border-border-sage rounded-2xl p-8 relative transition-none group cursor-default"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="text-charcoal group-hover:text-forest-green transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>
            <div className="w-8 h-8 rounded-full bg-sage-wash flex items-center justify-center text-muted-grey/50 group-hover:bg-forest-green/10 group-hover:text-forest-green transition-colors">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <h4 className="font-display font-medium text-2xl mb-4 group-hover:text-forest-green transition-colors">{item.title}</h4>
          <p className="text-muted-grey text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Precision = () => (
  <section className="py-24 px-6 bg-white border-t border-border-sage overflow-hidden">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <p className="text-[10px] font-medium uppercase tracking-widest text-muted-grey mb-4 italic">THE FINAL SYNTHESIS</p>
      <h2 className="font-display font-medium text-5xl">Elite Editorial Precision</h2>
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto relative group"
    >
      <div className="absolute -right-12 -top-12 bg-white rounded-lg p-2 border border-border-sage professional-shadow z-10 hidden lg:block">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-2 h-2 rounded-full bg-forest-green animate-pulse" />
          <span className="text-[9px] font-medium tracking-widest uppercase text-forest-green">Live Audit Log</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-border-sage overflow-hidden professional-shadow-lg transform transition-transform group-hover:scale-[1.01]">
        <div className="bg-forest-green-light p-6 text-white flex justify-between items-center bg-gradient-to-r from-forest-green-light to-forest-green">
          <div>
            <h3 className="font-display text-2xl font-medium">Peer Review Report</h3>
            <p className="text-[10px] opacity-80 font-mono mt-1">ID 2302.3242-AR • OCT 24, 2025</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] opacity-80 uppercase tracking-widest font-medium">Confidence Score</p>
             <p className="text-3xl font-display font-medium">91.4%</p>
          </div>
        </div>
        
        <div className="p-10 space-y-12 text-left">
          <div>
            <span className="text-[9px] font-medium uppercase tracking-widest text-muted-grey mb-4 block">Executive Summary</span>
            <p className="text-sm font-medium border-l-2 border-forest-green pl-6 leading-relaxed">
            The manuscript presents a structured framework for integrating finance and sustainability in supply chain management. Novelty analysis indicates moderate similarity to prior literature, while citation analysis identified missing DOI information and outdated references.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <span className="text-[9px] font-medium uppercase tracking-widest text-muted-grey mb-4 block">Methodology Audit</span>
               <p className="text-[11px] text-muted-grey leading-relaxed italic bg-sage-wash/50 p-4 rounded-lg border border-border-sage/50">
                 "Section 2.2 demonstrates potential inconsistencies in the scaling laws. Our numerical auditor found a discrepancy in p-values..."
               </p>
            </div>
            <div className="space-y-4">
              <span className="text-[9px] font-medium uppercase tracking-widest text-muted-grey mb-2 block">Scoring Matrix</span>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span>Originality</span>
                    <span className="font-mono">8.2/10</span>
                  </div>
                  <div className="w-full h-1 bg-sage-wash rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "82%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-forest-green rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span>Clarity</span>
                    <span className="font-mono">9.1/10</span>
                  </div>
                  <div className="w-full h-1 bg-sage-wash rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "91%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-forest-green rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 animate-pulse">
               <ShieldCheck className="text-red-600 w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-red-600">Integrity Alert</p>
              <p className="text-[11px] text-red-800 font-medium">Detected 12% semantic overlap with prior publications.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

const UseCases = () => (
  <section className="py-32 px-6 bg-white border-t border-border-sage">
    <div className="max-w-7xl mx-auto">
      <div className="mb-24">
        <p className="text-[10px] font-medium uppercase tracking-widest text-forest-green mb-6">IMPACT & DELIVERY</p>
        <h2 className="font-display font-medium text-5xl md:text-6xl max-w-2xl leading-none italic">
          Rigorous evaluation <br />at <span className="text-forest-green">every stage.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
        {[
          { 
            title: "Pre-submission", 
            desc: "Helping authors identify flaws, citation gaps, and statistical inconsistencies before they reach the desk of a high-tier journal editor.",
            num: "01",
            tag: "Manuscript Health",
            icon: <Play className="w-5 h-5" />
          },
          { 
            title: "Journal Screening", 
            desc: "Empowering editorial boards with rapid initial assessments for high-volume submissions, filtering for technical rigor and scope fit.",
            num: "02",
            tag: "Editorial Velocity",
            icon: <Filter className="w-5 h-5" />
          },
          { 
            title: "Grant Evaluation", 
            desc: "Providing funding bodies with deep technical analysis of project feasibility, novelty, and societal impact projections.",
            num: "03",
            tag: "Funding Integrity",
            icon: <DollarSign className="w-5 h-5" />
          },
          { 
            title: "Integrity Audit", 
            desc: "A forensic terminal layer designed to detect citation circles, structural manipulation, and image duplicate issues.",
            num: "04",
            tag: "Forensic Analysis",
            icon: <ShieldCheck className="w-5 h-5" />
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative p-12 border border-border-sage -ml-px -mt-px hover:bg-sage-wash/30 transition-colors duration-500"
          >
            <div className="flex justify-between items-start mb-12">
               <span className="text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity">/ PHASE_{item.num}</span>
               <div className="w-10 h-10 rounded-full border border-forest-green/20 flex items-center justify-center text-forest-green group-hover:bg-forest-green group-hover:text-white transition-all duration-300">
                 {item.icon}
               </div>
            </div>
            
            <div className="max-w-xs">
              <span className="text-[10px] font-medium text-forest-green uppercase tracking-widest mb-4 block">{item.tag}</span>
              <h3 className="font-display font-medium text-4xl mb-6 group-hover:text-forest-green transition-colors">{item.title}</h3>
              <p className="text-muted-grey text-base leading-relaxed mb-8">
                {item.desc}
              </p>
              
              
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section id="methodology" className="py-32 px-6 bg-white overflow-hidden border-b border-border-sage">
    <div className="max-w-7xl mx-auto text-center mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-px bg-border-sage mx-auto mb-8" />
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-grey mb-8">THE METHODOLOGY</p>
        <h2 className="font-display font-medium text-5xl md:text-7xl mb-8 leading-[1.1] text-charcoal max-w-4xl mx-auto">
          The structure behind consistent scholarly integrity.
        </h2>
      </motion.div>
    </div>
 
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
      {[
        {
          num: "01",
          title: "Scientific Integrity",
          desc: "Define a clear audit trail that validates every claim, differentiates novel contributions, and creates focus for technical validation."
        },
        {
          num: "02",
          title: "Technical Rigor",
          desc: "Build credibility through consistent multi-agent cross-examination so researchers recognize leadership and trust the peer review output."
        },
        {
          num: "03",
          title: "Efficient Synthesis",
          desc: "Create structured synthesis systems that convert raw technical data into qualified and scalable peer review reports for journals."
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
          className="group relative flex flex-col items-center cursor-default p-6 rounded-2xl transition-none"
        >
          <div className="font-display text-[120px] leading-none text-muted-grey/10 mb-[-40px] select-none font-medium transition-colors group-hover:text-forest-green/10">
            {item.num}
          </div>
          <h4 className="font-display font-medium text-3xl mb-6 relative z-10 group-hover:text-forest-green transition-colors">{item.title}</h4>
          <p className="text-muted-grey text-base leading-relaxed max-w-xs mx-auto">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export const LandingPage = ({ onStartAnalysis }: { onStartAnalysis: () => void }) => {
  return (
    <div className="min-h-screen">
      <Navbar onActionClick={onStartAnalysis} />
      <main>
        <Hero onStartAnalysis={onStartAnalysis} />
        <WhyChooseUs />
        <Architecture />
        <Foundations />
        <Precision />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
};

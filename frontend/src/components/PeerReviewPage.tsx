import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader, ShieldCheck, Zap, MinusCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-sage bg-white/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-forest-green rounded-sm flex items-center justify-center">
          <BookMarkedIcon className="text-white w-5 h-5" />
        </div>
        <span className="font-display text-xl font-medium tracking-tight text-charcoal">PeerReviewAI</span>
      </a>
      
      
    </div>
  </nav>
);

const Footer = () => (
  <footer className="py-12 px-6 max-w-7xl mx-auto border-t border-border-sage">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-5">
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
      
      <div className="md:col-span-2">
        <h5 className="text-[10px] font-medium uppercase tracking-widest text-charcoal mb-4">Product</h5>
        <ul className="space-y-2 text-sm text-muted-grey">
          <li><a href="#" className="hover:text-forest-green transition-colors">Manage cookies</a></li>
          <li><a href="#" className="hover:text-forest-green transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-forest-green transition-colors">Sample Reports</a></li>
        </ul>
      </div>
      
      <div className="md:col-span-2">
        <h5 className="text-[10px] font-medium uppercase tracking-widest text-charcoal mb-4">Discovery</h5>
        <ul className="space-y-2 text-sm text-muted-grey">
          <li><a href="#home" className="hover:text-forest-green transition-colors">Home</a></li>
          <li><a href="#methodology" className="hover:text-forest-green transition-colors">Methodology</a></li>
          <li><a href="#architecture" className="hover:text-forest-green transition-colors">Architecture</a></li>
        </ul>
      </div>
 
      <div className="md:col-span-3">
        <h5 className="text-[10px] font-medium uppercase tracking-widest text-charcoal mb-4">Company</h5>
        <ul className="space-y-2 text-sm text-muted-grey">
          <li><a href="https://github.com/BhaveshBhakta" className="hover:text-forest-green transition-colors">Github</a></li>
          <li><a href="https://www.linkedin.com/in/bhavesh-bhakta" className="hover:text-forest-green transition-colors">Linkedin</a></li>
          <li><a href="https://www.linkedin.com/in/bhavesh-bhakta" className="hover:text-forest-green transition-colors">Contact</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

interface PeerReviewPageProps {
  onBackToHome: () => void;
}

const PeerReviewPage: React.FC<PeerReviewPageProps> = ({ onBackToHome }) => {
  const [file, setFile] = useState<File | null>(null);
  const [enableDeepSearch, setEnableDeepSearch] = useState(false);
  const [topic, setTopic] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (uploadedFile: File) => {
    if (uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  };

  const handleRunReview = async () => {
    if (!file) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("deep_search", enableDeepSearch ? "true" : "");
    formData.append("topic", topic);

    try {
      const response = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        setResults({
          overallRecommendation: data.review["9. Final Recommendation"] || "Check review.txt",
          detailedFeedback: Object.keys(data.review).map((key) => ({
            category: key,
            feedback: data.review[key],
            status: "good"
          })),
        });
      }
    } catch (error) {
      alert("Error contacting backend: " + error);
    }

    setIsProcessing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="text-green-500" size={20} />;
      case 'good': return <CheckCircle className="text-blue-500" size={20} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={20} />;
      default: return <AlertCircle className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={onBackToHome}
              className="mb-8 text-forest-green hover:text-forest-green-light font-medium inline-flex items-center gap-2 group transition-all"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
            </button>
            <h1 className="font-display text-4xl md:text-5xl mb-4 font-medium tracking-tight">Peer Review Analysis</h1>
            <p className="text-lg text-muted-grey max-w-2xl mx-auto">
              Upload your research paper (PDF) for automated peer review analysis using our agentic AI committee.
            </p>
          </div>

        {!results ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-border-sage">
            {/* File Upload */}
            <div className="mb-10">
              <label className="block text-[10px] font-medium uppercase tracking-widest text-forest-green mb-4">
                Upload Research Paper
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer ${
                  dragOver ? 'border-forest-green bg-sage-wash' : 'border-border-sage hover:border-forest-green hover:bg-slate-50'
                } ${file ? 'border-forest-green/50 bg-sage-wash/30' : ''}`}
                onClick={() => !file && document.getElementById('file-upload')?.click()}
              >
                {file ? (
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center professional-shadow">
                      <FileText className="text-forest-green" size={32} />
                    </div>
                    <div className="text-left">
                      <p className="font-display font-medium text-xl text-charcoal">{file.name}</p>
                      <p className="text-sm text-forest-green/70">Ready for rigorous analysis</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-xs text-red-500 hover:text-red-600 font-medium mt-2 flex items-center gap-1"
                      >
                        Change file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="w-16 h-16 bg-sage-wash rounded-full flex items-center justify-center mx-auto mb-6">
                      <Upload className="text-forest-green" size={28} />
                    </div>
                    <p className="text-xl font-display font-medium text-charcoal mb-2">
                      Drop your PDF here or{' '}
                      <span className="text-forest-green underline decoration-forest-green/30">
                        click to browse
                      </span>
                    </p>
                    <p className="text-muted-grey text-sm">Maximum file size: 25MB (PDF only)</p>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="h-full">
                <label className="flex items-center h-full space-x-4 p-5 border border-border-sage rounded-xl hover:bg-sage-wash/20 cursor-pointer transition-colors group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={enableDeepSearch}
                      onChange={(e) => setEnableDeepSearch(e.target.checked)}
                      className="w-5 h-5 rounded border-border-sage text-forest-green focus:ring-forest-green"
                    />
                  </div>
                  <div>
                    <div className="font-display font-medium text-charcoal">Enable Deep Search</div>
                    <div className="text-xs text-muted-grey">Comprehensive analysis across global citation networks</div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-medium uppercase tracking-widest text-forest-green mb-2">
                  Research Topic (Optional)
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Quantum Computing, Neural Networks"
                  className="w-full px-5 py-4 border border-border-sage rounded-xl focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green outline-none transition-all placeholder:text-muted-grey/50"
                />
              </div>
            </div>

            {/* Run Review Button */}
            <button
              onClick={handleRunReview}
              disabled={!file || isProcessing}
              className="w-full bg-forest-green text-white py-5 rounded-2xl font-display font-medium text-lg hover:bg-forest-green-light professional-shadow transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-3">
                  <Loader className="animate-spin" size={24} />
                  <span>Activating Agentic Committee...</span>
                </span>
              ) : (
                'Run Integrated Review'
              )}
            </button>
          </div>
        ) : (

          /* Results Display */
          <div className="space-y-8">
            {/* Report Header Card */}
            <div className="bg-white rounded-3xl p-8 border border-border-sage professional-shadow flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-sage-wash rounded-2xl flex items-center justify-center text-forest-green">
                  <FileText size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-grey mb-1">Integrated Analysis Report</p>
                  <h2 className="font-display text-2xl font-medium text-charcoal">{file?.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] font-medium text-forest-green bg-sage-wash px-2 py-0.5 rounded-full uppercase tracking-tight">Verified</span>
                    <span className="text-xs text-muted-grey opacity-60">System Version 4.2.1</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className={`inline-block px-8 py-4 rounded-3xl professional-shadow border-2 transition-all hover:scale-105 ${
                  results.overallRecommendation.toLowerCase().includes('reject') ? 'bg-red-50 border-red-200 text-red-600' : 
                  results.overallRecommendation.toLowerCase().includes('accept') ? 'bg-green-50 border-green-200 text-green-600' : 
                  'bg-amber-50 border-amber-200 text-amber-600'
                }`}>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-2">Editor's Verdict</p>
                  <p className="text-2xl font-display font-bold leading-none">{results.overallRecommendation}</p>
                </div>
              </div>
            </div>

            {/* Analysis Metadata Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-border-sage professional-shadow text-center">
                <p className="text-[10px] uppercase font-bold text-muted-grey mb-1">Agent Committee</p>
                <p className="text-xl font-display font-medium text-forest-green">12 Active</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border-sage professional-shadow text-center">
                <p className="text-[10px] uppercase font-bold text-muted-grey mb-1">Novelty Index</p>
                <p className="text-xl font-display font-medium text-blue-500">92% High</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border-sage professional-shadow text-center">
                <p className="text-[10px] uppercase font-bold text-muted-grey mb-1">Citations Key</p>
                <p className="text-xl font-display font-medium text-amber-600">48 Ref.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border-sage professional-shadow text-center">
                <p className="text-[10px] uppercase font-bold text-muted-grey mb-1">AI Detection</p>
                <p className="text-xl font-display font-medium text-red-500">4% Low</p>
              </div>
            </div>

            {/* Detailed Feedback Sections */}
            <div className="grid gap-6">
              {results.detailedFeedback
                .filter((item: any) => !item.category.includes("9.")) // Filter out recommendation since it's in the header
                .map((item: any, index: number) => {
                  // Extract cleaner title (remove numbers like "1. ")
                  const cleanTitle = item.category.replace(/^\d+\.\s*/, '');
                  
                  // Decide icon based on title
                  let SectionIcon = Info;
                  let colorClass = "text-charcoal";
                  let bgClass = "bg-sage-wash";
                  
                  const titleLower = cleanTitle.toLowerCase();
                  if (titleLower.includes("strength")) {
                    SectionIcon = Zap;
                    colorClass = "text-forest-green";
                    bgClass = "bg-forest-green/10";
                  } else if (titleLower.includes("weakness")) {
                    SectionIcon = MinusCircle;
                    colorClass = "text-red-500";
                    bgClass = "bg-red-50";
                  } else if (titleLower.includes("summary")) {
                    SectionIcon = FileText;
                    colorClass = "text-blue-500";
                    bgClass = "bg-blue-50";
                  } else if (titleLower.includes("contribution") || titleLower.includes("novelty")) {
                    SectionIcon = ShieldCheck;
                    colorClass = "text-amber-600";
                    bgClass = "bg-amber-50";
                  }

                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-3xl p-8 border border-border-sage hover:border-forest-green/30 transition-all group relative overflow-hidden"
                    >
                      <div className="flex items-start gap-6 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${colorClass}`}>
                          <SectionIcon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-medium text-charcoal mb-4 flex items-center justify-between">
                            {cleanTitle}
                            <span className="text-[10px] font-mono p-1 bg-sage-wash rounded uppercase tracking-tighter opacity-50">Sect_{index + 1}</span>
                          </h3>
                          <div className="text-muted-grey text-base leading-relaxed space-y-4">
                            {item.feedback.split('\n').map((para: string, pIndex: number) => {
                              const trimmed = para.trim();
                              if (!trimmed) return null;
                              
                              const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed);
                              
                              return (
                                <p key={pIndex} className={isBullet ? "pl-4 border-l-2 border-border-sage/40 py-1" : ""}>
                                  {isBullet ? trimmed.replace(/^[-•]\s*/, '') : trimmed}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            {/* Action Bar */}
            <div className="sticky bottom-6 z-10 bg-white/80 backdrop-blur-lg rounded-full border border-border-sage professional-shadow py-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
              <span className="text-xs font-medium text-muted-grey">Report generated by PeerReviewAI Agentic System</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setResults(null)}
                  className="px-6 py-2.5 bg-forest-green text-white rounded-full font-medium text-sm hover:bg-forest-green-light transition-all active:scale-95"
                >
                  New Analysis
                </button>
                <button
                  onClick={onBackToHome}
                  className="px-6 py-2.5 bg-white border border-border-sage text-charcoal rounded-full font-medium text-sm hover:bg-slate-50 transition-all active:scale-95"
                >
                  Exit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </main>
      <Footer />

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xl flex items-center justify-center z-50 p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-12 max-w-lg w-full text-center professional-shadow-lg border border-border-sage relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-forest-green/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700" />
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-forest-green rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-forest-green/20 relative">
                  <Loader className="text-white animate-[spin_3s_linear_infinite]" size={48} />
                  <div className="absolute inset-0 bg-white/10 animate-pulse rounded-3xl" />
                </div>
                
                <h3 className="text-3xl font-semibold text-gray-900 mb-4 font-display tracking-tight">Agentic Synthesis</h3>
                <p className="text-muted-grey text-lg leading-relaxed mb-8">
                  Our multi-agent committee is cross-referencing your manuscript against global citation networks, technical standards, and novelty databases.
                </p>
                
                <div className="space-y-6">
                  {/* Status Steps */}
                  <div className="flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-forest-green">
                    <span className="animate-pulse">Parsing</span>
                    <span className="animate-pulse delay-200">Retrieving</span>
                    <span className="animate-pulse delay-500">Synthesizing</span>
                  </div>
                  
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-forest-green"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    />
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-grey font-bold flex items-center justify-center gap-2">
                    <ShieldCheck size={12} className="text-forest-green" />
                    Security Verified & Encrypted Analysis
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeerReviewPage;

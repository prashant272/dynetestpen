import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Award, ShieldCheck, Download } from 'lucide-react';
import SEO from '../components/SEO';

const BlogDetail = () => {
    const { slug } = useParams();

    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Technical Article | ImageTech Industries"
                description="Technical documentation and application guidelines for industrial surface energy measurement and flexographic doctor blades."
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B6F] hover:text-[#0D6EFD] mb-6 transition-colors"
                >
                    <ArrowLeft size={14} /> Back to Technical Bulletins
                </Link>

                <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DCE5EF] shadow-xs">
                    
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <span className="bg-[#0B3B6F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded inline-block mb-3">
                            ASTM D-2578 Norm Guide
                        </span>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#172B4D] tracking-tight leading-tight mb-4">
                            Understanding ASTM D-2578: Surface Energy Testing of Polyethylene &amp; Polypropylene Films
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} /> November 4, 2026
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <User size={14} /> ImageTech Chemical Formulation Laboratory
                            </span>
                            <span>•</span>
                            <span className="text-[#0D6EFD] font-bold">6 min read</span>
                        </div>
                    </div>

                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                            alt="Dyne testing procedure"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-blue max-w-none text-xs sm:text-sm text-gray-600 leading-relaxed space-y-6">
                        <p className="text-base text-[#172B4D] font-semibold leading-relaxed">
                            Polyolefin films such as BOPP, CPP, and LDPE possess inherently low surface energy (typically 29–31 mN/m). Without active surface modification such as corona discharge or atmospheric plasma treatment, flexo printing inks, coatings, and lamination adhesives fail to wet out, resulting in severe peeling, flaking, or delamination.
                        </p>

                        <h2 className="text-lg font-bold text-[#172B4D]">The Principle of ASTM D-2578 Test Method</h2>
                        <p>
                            ASTM D-2578 dictates the exact chemical ratio of Formamide and 2-Ethoxyethanol to formulate calibrated test fluids ranging from 30 to 56 Dyne/cm. When a fluid with a surface tension matching or lower than the substrate’s critical surface energy is applied, the fluid film remains continuous across the test stroke for a benchmark period of two seconds.
                        </p>

                        <h2 className="text-lg font-bold text-[#172B4D]">Step-by-Step Procedure with MAGNET Dyne Test Pens</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Lay the film sample flat on a smooth, clean glass or stainless steel support surface.</li>
                            <li>Uncap the MAGNET Dyne pen and press the valve tip lightly once on a clean wipe to saturate the felt chisel.</li>
                            <li>Draw a continuous line approximately 50mm long across the web direction without applying excessive downward force.</li>
                            <li>Observe the liquid film under good lighting: if the film remains intact for 2 seconds without retracting into droplets, the substrate surface tension is at least equal to the pen's dyne value.</li>
                            <li>Repeat with the next higher dyne level until droplet reticulation occurs within 2 seconds.</li>
                        </ol>

                        <div className="bg-[#F5F8FC] p-4 rounded-xl border border-[#DCE5EF] my-6">
                            <h4 className="font-bold text-xs text-[#0B3B6F] uppercase mb-1">Technical Recommendation:</h4>
                            <p className="text-xs text-gray-600">
                                Always replace caps immediately after testing to avoid solvent evaporation, which can increase the concentration and cause elevated readings. Store pens between 15°C and 25°C.
                            </p>
                        </div>
                    </div>

                </article>

            </div>
        </main>
    );
};

export default BlogDetail;

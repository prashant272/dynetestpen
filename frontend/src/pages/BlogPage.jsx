import React from 'react';
import { BookOpen, FileQuestion } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import SEO from '../components/SEO';

const BlogPage = () => {
    const { data: dbBlogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/blogs`);
                if (!res.ok) return [];
                const data = await res.json();
                return Array.isArray(data) ? data : (data.blogs || []);
            } catch {
                return [];
            }
        },
        staleTime: 1000 * 60 * 15,
    });

    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Industrial Insights & Technical Articles | ImageTech Industries"
                description="Technical publications, ASTM D2578 test tutorials, corona treatment guidelines, and flexographic printing best practices from ImageTech Industries."
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <BookOpen size={14} />
                        <span>Technical Knowledgebase</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B3B6F] tracking-tight mb-3">
                        Industrial Insights &amp; Technical Bulletins
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto font-medium">
                        In-depth articles covering surface tension measurement, ASTM D2578 standards, and corona treatment verification.
                    </p>
                </header>

                {/* Real Data or Clean "No Blogs Available" State */}
                {isLoading ? (
                    <div className="p-12 text-center text-sm font-bold text-gray-500">
                        Checking for published bulletins...
                    </div>
                ) : dbBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {dbBlogs.map((item, idx) => (
                            <Link 
                                to={`/blog/${item.slug || item._id}`}
                                key={item._id || idx}
                                className="bg-white rounded-2xl border border-[#DCE5EF] hover:border-[#0D6EFD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                            >
                                {item.image && (
                                    <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-base sm:text-lg font-black text-[#172B4D] group-hover:text-[#0D6EFD] transition-colors leading-snug mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                                        {item.excerpt || item.description}
                                    </p>
                                    <span className="text-xs font-bold text-[#0D6EFD]">Read Article &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Clean No Blog Available Card */
                    <div className="bg-white rounded-3xl border border-[#DCE5EF] p-12 text-center shadow-xs max-w-xl mx-auto space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#0B3B6F]/5 text-[#0B3B6F] flex items-center justify-center mx-auto">
                            <FileQuestion size={32} />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#0B3B6F]">
                            No Blogs Available Right Now
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                            Our technical engineering team is preparing new bulletins and testing guides. Please check back soon or explore our product catalogue.
                        </p>
                        <div className="pt-2">
                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 bg-[#0B3B6F] hover:bg-[#082a50] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-xs active:scale-95"
                            >
                                Explore Dyne Products
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
};

export default BlogPage;

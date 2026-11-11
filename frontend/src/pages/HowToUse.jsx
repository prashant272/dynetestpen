import React from 'react';
import { 
  CheckCircle2, AlertTriangle, PenTool, ShieldCheck, 
  ArrowRight, Info, Check, Clock, Layers, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const HowToUse = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] font-sans pb-20">
      <SEO
        title="How to Use MAGNET Dyne Test Pen | Surface Energy Testing Guide (IS : 6104)"
        description="Comprehensive technical guide on how to use MAGNET Dyne Test Pens. Exact test procedures, 4-second observation rule, standards As per IS : 6104, and complete suggested treat levels chart for Flexo, Gravure, Offset, Lamination & Coating."
        keywords={["how to use dyne test pen", "MAGNET dyne test pen instructions", "surface energy testing guide", "IS 6104 checking standard", "corona treatment check", "dyne chart dynes/cm"]}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0B3B6F] via-[#0D4E96] to-[#0B3B6F] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 bg-blue-400/20 text-blue-200 border border-blue-300/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                <PenTool size={13} />
                <span>Checking Standards: As per IS : 6104</span>
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
                How to Use MAGNET Dyne Test Pen
              </h1>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Step-by-step instructions for testing and measuring substrate surface wetting and surface energy (Dyne/cm) with precision.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl max-w-sm text-xs space-y-2.5 text-blue-50">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <ShieldCheck size={18} className="text-yellow-400" />
                <span>Certified Dyne Range</span>
              </div>
              <p className="leading-relaxed">
                <strong className="text-white">Dyne Value Range:</strong> 28, 30, 32, 34, 36, 38, 40, 42, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72 Dyne/cm
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Special Value Range:</strong> 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53 Dyne/cm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">

        {/* 1. Introduction & Overview Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#DCE5EF] mb-8">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-wider">MAGNET Dyne Test Pen Overview</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] leading-tight">
              Cost-Effective, Quick &amp; Easy Solution for Surface Energy Measurement
            </h2>
            
            <div className="prose prose-sm max-w-none text-gray-600 space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>MAGNET Dyne Test Pen</strong> is a cost-effective, quick, and easy solution for measuring surface wetting and surface energy. Also known as a corona test pen, the MAGNET Dyne Test Pen provides a simple, reliable, and accurate method for evaluating the surface energy of most polymer-based materials.
              </p>
              <p>
                The MAGNET Dyne Test Pen and Dyne test solutions are widely used during <strong>plasma surface modification, corona treatment, and flame treatment processes</strong> to check surface energy levels and substrate cleanliness. This ensures proper adhesion for printing, coating, bonding, and lamination applications.
              </p>
              <p>
                Designed for industrial use, the MAGNET Dyne Test Pen is highly effective in quality control processes across industries such as packaging and converting, automotive, aerospace, and medical device manufacturing.
              </p>
              <p>
                With consistent performance and ease of use, the MAGNET Dyne Test Pen helps improve product quality, reduce defects, and ensure reliable surface treatment results. It helps ensure proper adhesion for printing, coating, bonding, and lamination applications.
              </p>
            </div>

            {/* Standards & Ranges Bar */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Checking Standards</span>
                <span className="text-sm font-black text-[#0B3B6F]">As per IS : 6104</span>
              </div>
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl md:col-span-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Available Dyne Ranges</span>
                <p className="text-xs font-semibold text-[#172B4D] leading-relaxed">
                  <strong>Standard:</strong> 28, 30, 32, 34, 36, 38, 40, 42, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72 Dyne/cm
                  <br />
                  <strong>Special:</strong> 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53 Dyne/cm
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Test Procedure Guidelines */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#DCE5EF] mb-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-wider">Quality Assurance</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] mt-1">
              Test Procedure Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Follow these recommended operating procedures to ensure accuracy and repeatability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1 */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-[#0B3B6F] text-white font-black text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm mb-1.5">Prepare the Sample Surface</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Place the sample on a clean, flat, and stable surface. If required, secure the edges to prevent curling, bending, or deformation during testing.
              </p>
            </div>

            {/* 2 */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-[#0B3B6F] text-white font-black text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm mb-1.5">Check Environmental Conditions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Record the ambient temperature and relative humidity. If the sample temperature differs, allow it to stabilize to room conditions before testing for accurate results.
              </p>
            </div>

            {/* 3 */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-[#0B3B6F] text-white font-black text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm mb-1.5">Perform Multiple Test Points</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Use the MAGNET Dyne Test Pen to test at a minimum of three locations across the sample—at 1/4, 1/2, and 3/4 positions. For best practice, also test near the edges.
              </p>
            </div>

            {/* 4 */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-[#0B3B6F] text-white font-black text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm mb-1.5">Ensure Surface Cleanliness</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Avoid touching or contaminating the test surface. Even minor contamination (oil, dust, or moisture) can reduce wettability and affect accuracy. Clean the test area if necessary.
              </p>
            </div>

            {/* 5 */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-[#0B3B6F] text-white font-black text-sm flex items-center justify-center mb-3">
                5
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm mb-1.5">Use Fresh &amp; Uncontaminated Pens</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Always use properly stored, uncontaminated, and in-date MAGNET Dyne Test Pens to ensure consistent and reliable measurements.
              </p>
            </div>

            {/* 6 */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-[#0B3B6F] text-white font-black text-sm flex items-center justify-center mb-3">
                6
              </div>
              <h3 className="font-bold text-[#172B4D] text-sm mb-1.5">Proper Storage and Handling</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Store and use MAGNET Dyne Test Pens at room temperature. Keep caps tightly closed after use to prevent evaporation or contamination.
              </p>
            </div>

          </div>
        </div>

        {/* 3. How To Use & Measuring Surface Energy / Tension */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#DCE5EF] mb-8">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-wider">Operational Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] mt-1">
              How To use &amp; Measuring Surface Energy / Tension
            </h2>
          </div>

          <div className="space-y-4">
            
            {/* Step 1: Apply Line */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200">
              <h4 className="text-sm font-bold text-[#0B3B6F] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D6EFD]"></span>
                Apply the Test Line
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                Using the MAGNET Dyne Test Pen, draw a smooth line on the substrate or material surface to be tested.
              </p>
            </div>

            {/* Step 2: Observe for 4 Seconds */}
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
              <h4 className="text-sm font-bold text-[#0B3B6F] flex items-center gap-2">
                <Clock size={16} className="text-[#0D6EFD]" />
                Observe for 4 Seconds
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">
                Carefully observe the test line for up to <strong>4 seconds</strong>:
              </p>
              <div className="mt-2.5 p-3.5 bg-white rounded-xl border border-blue-100 text-xs sm:text-sm text-gray-800 font-medium">
                If the line remains continuous and intact for <strong>4 seconds</strong> before any shrinkage occurs, the surface energy of the material matches the dyne value of the MAGNET Dyne Test Pen used.
              </div>
            </div>

            {/* Step 3: If Line Breaks Immediately */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200">
              <h4 className="text-sm font-bold text-amber-700 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                If the Line Breaks Immediately
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                If the line breaks into droplets instantly, it indicates that the surface energy is lower than the dyne value of the pen used.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium">
                ➔ To determine the correct value, repeat the test using a <strong>lower dyne value</strong> MAGNET Dyne Test Pen until the correct level is identified.
              </p>
            </div>

            {/* Step 4: If Line Remains Beyond 4 Seconds */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200">
              <h4 className="text-sm font-bold text-[#0B3B6F] flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                If the Line Remains Beyond 4 Seconds
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                If the line does not shrink or form droplets even after 4 seconds, it indicates that the surface energy is higher than the dyne value of the pen used.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium">
                ➔ In this case, use a <strong>higher dyne value</strong> MAGNET Dyne Test Pen to find the accurate surface energy level.
              </p>
            </div>

            {/* Step 5: Avoid Re-testing */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 font-medium">
              <strong>Avoid Re-testing on the Same Area:</strong> Always perform the test on a fresh, unused area of the substrate to ensure accurate and consistent results.
            </div>

            {/* Step 6: Determine the Correct Dyne Level */}
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs sm:text-sm text-green-900 font-medium">
              <strong>Determine the Correct Dyne Level:</strong> The correct surface energy (dyne level) is identified as the value at which the test line remains stable for approximately <strong>4 seconds</strong> before showing signs of shrinkage or droplet formation.
            </div>

          </div>
        </div>

        {/* 4. MAGNET DYNE VALUE CHECK PEN - Suggested Treat Levels Chart (dynes/cm) */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#DCE5EF] mb-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-wider">MAGNET DYNE VALUE CHECK PEN</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] mt-1">
              Suggested Treat Levels Chart (dynes/cm)
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Standard treatment levels across printing, laminating, and coating processes.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Table 1: Flexo & Gravure */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B3B6F]" />
                <h3 className="text-base sm:text-lg font-bold text-[#0B3B6F]">Flexo &amp; Gravure</h3>
              </div>
              <div className="overflow-x-auto border border-[#DCE5EF] rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#DCE5EF] text-[#172B4D] font-bold">
                    <tr>
                      <th className="py-3 px-4">Substrate</th>
                      <th className="py-3 px-4">Water</th>
                      <th className="py-3 px-4">Solvent</th>
                      <th className="py-3 px-4">UV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PE</td><td className="py-2.5 px-4 font-mono font-semibold">38–44</td><td className="py-2.5 px-4 font-mono font-semibold">36–40</td><td className="py-2.5 px-4 font-mono font-semibold">38–50</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PP</td><td className="py-2.5 px-4 font-mono font-semibold">38–44</td><td className="py-2.5 px-4 font-mono font-semibold">36–40</td><td className="py-2.5 px-4 font-mono font-semibold">40–50</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PVC</td><td className="py-2.5 px-4 font-mono font-semibold">38–44</td><td className="py-2.5 px-4 font-mono font-semibold">36–40</td><td className="py-2.5 px-4 font-mono font-semibold">50–60</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PET</td><td className="py-2.5 px-4 font-mono font-semibold">52–56</td><td className="py-2.5 px-4 font-mono font-semibold">46–54</td><td className="py-2.5 px-4 font-mono font-semibold">54–60</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PS</td><td className="py-2.5 px-4 font-mono font-semibold">38–44</td><td className="py-2.5 px-4 font-mono font-semibold">35–40</td><td className="py-2.5 px-4 font-mono font-semibold">42–48</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PVDC</td><td className="py-2.5 px-4 font-mono font-semibold">40–46</td><td className="py-2.5 px-4 font-mono font-semibold">38–42</td><td className="py-2.5 px-4 font-mono font-semibold">52–58</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PU</td><td className="py-2.5 px-4 font-mono font-semibold">40–46</td><td className="py-2.5 px-4 font-mono font-semibold">38–42</td><td className="py-2.5 px-4 font-mono font-semibold">50–56</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">ABS</td><td className="py-2.5 px-4 font-mono font-semibold">42–46</td><td className="py-2.5 px-4 font-mono font-semibold">40–44</td><td className="py-2.5 px-4 font-mono font-semibold">50–52</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PTFE</td><td className="py-2.5 px-4 font-mono font-semibold">40–44</td><td className="py-2.5 px-4 font-mono font-semibold">34–39</td><td className="py-2.5 px-4 font-mono font-semibold">36–52</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">Silicone</td><td className="py-2.5 px-4 font-mono font-semibold">40–44</td><td className="py-2.5 px-4 font-mono font-semibold">35–40</td><td className="py-2.5 px-4 font-mono font-semibold">40–50</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Offset */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h3 className="text-base sm:text-lg font-bold text-[#0B3B6F]">Offset</h3>
              </div>
              <div className="overflow-x-auto border border-[#DCE5EF] rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#DCE5EF] text-[#172B4D] font-bold">
                    <tr>
                      <th className="py-3 px-4">Substrate</th>
                      <th className="py-3 px-4">Water</th>
                      <th className="py-3 px-4">Solvent</th>
                      <th className="py-3 px-4">UV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PE</td><td className="py-2.5 px-4 font-mono font-semibold">40–46</td><td className="py-2.5 px-4 font-mono font-semibold">37–42</td><td className="py-2.5 px-4 font-mono font-semibold">40–50</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PP</td><td className="py-2.5 px-4 font-mono font-semibold">40–46</td><td className="py-2.5 px-4 font-mono font-semibold">38–42</td><td className="py-2.5 px-4 font-mono font-semibold">40–50</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PVC</td><td className="py-2.5 px-4 font-mono font-semibold">40–45</td><td className="py-2.5 px-4 font-mono font-semibold">37–42</td><td className="py-2.5 px-4 font-mono font-semibold">36–52</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PET</td><td className="py-2.5 px-4 font-mono font-semibold">56–60</td><td className="py-2.5 px-4 font-mono font-semibold">46–56</td><td className="py-2.5 px-4 font-mono font-semibold">56–60</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PS</td><td className="py-2.5 px-4 font-mono font-semibold">40–45</td><td className="py-2.5 px-4 font-mono font-semibold">37–42</td><td className="py-2.5 px-4 font-mono font-semibold">42–50</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3: Lamination */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h3 className="text-base sm:text-lg font-bold text-[#0B3B6F]">Lamination</h3>
              </div>
              <div className="overflow-x-auto border border-[#DCE5EF] rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#DCE5EF] text-[#172B4D] font-bold">
                    <tr>
                      <th className="py-3 px-4">Substrate</th>
                      <th className="py-3 px-4">Water</th>
                      <th className="py-3 px-4">Solvent</th>
                      <th className="py-3 px-4">UV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PE</td><td className="py-2.5 px-4 font-mono font-semibold">42–50</td><td className="py-2.5 px-4 font-mono font-semibold">38–44</td><td className="py-2.5 px-4 font-mono font-semibold">42–54</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PP</td><td className="py-2.5 px-4 font-mono font-semibold">42–50</td><td className="py-2.5 px-4 font-mono font-semibold">38–44</td><td className="py-2.5 px-4 font-mono font-semibold">42–54</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PET</td><td className="py-2.5 px-4 font-mono font-semibold">≥60</td><td className="py-2.5 px-4 font-mono font-semibold">≥48</td><td className="py-2.5 px-4 font-mono font-semibold">≥62</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PS</td><td className="py-2.5 px-4 font-mono font-semibold">42–52</td><td className="py-2.5 px-4 font-mono font-semibold">37–44</td><td className="py-2.5 px-4 font-mono font-semibold">42–54</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 4: Coating */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <h3 className="text-base sm:text-lg font-bold text-[#0B3B6F]">Coating</h3>
              </div>
              <div className="overflow-x-auto border border-[#DCE5EF] rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#DCE5EF] text-[#172B4D] font-bold">
                    <tr>
                      <th className="py-3 px-4">Substrate</th>
                      <th className="py-3 px-4">Water</th>
                      <th className="py-3 px-4">Solvent</th>
                      <th className="py-3 px-4">UV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PE</td><td className="py-2.5 px-4 font-mono font-semibold">42–48</td><td className="py-2.5 px-4 font-mono font-semibold">38–45</td><td className="py-2.5 px-4 font-mono font-semibold">44–54</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PP</td><td className="py-2.5 px-4 font-mono font-semibold">42–48</td><td className="py-2.5 px-4 font-mono font-semibold">38–45</td><td className="py-2.5 px-4 font-mono font-semibold">44–54</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PET</td><td className="py-2.5 px-4 font-mono font-semibold">≥52</td><td className="py-2.5 px-4 font-mono font-semibold">≥48</td><td className="py-2.5 px-4 font-mono font-semibold">≥60</td></tr>
                    <tr className="hover:bg-blue-50/40"><td className="py-2.5 px-4 font-bold text-[#0B3B6F]">PS</td><td className="py-2.5 px-4 font-mono font-semibold">42–50</td><td className="py-2.5 px-4 font-mono font-semibold">38–46</td><td className="py-2.5 px-4 font-mono font-semibold">44–54</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-[#0B3B6F] to-[#0D6EFD] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">Need Certified Dyne Test Pens?</h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              Manufactured as per <strong>IS : 6104</strong> checking standards. Available in full ranges from 28 to 72 Dyne/cm for film extruders, printers, and laminators.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/shop?category=Dyne%20Test%20Pen"
              className="bg-white text-[#0B3B6F] hover:bg-gray-100 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 inline-flex items-center gap-2"
            >
              <span>Order Dyne Pens</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-white/40 hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all active:scale-95"
            >
              Request Custom Batch
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HowToUse;

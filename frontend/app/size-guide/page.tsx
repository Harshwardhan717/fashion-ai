"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function SizeGuidePage() {
  const sizeCharts = {
    sarees: [
      { size: "Free Size", bust: "One Size Fits Most", length: "6.3 meters" },
    ],
    lehengas: [
      { size: "XS", bust: "32", waist: "26", length: "42" },
      { size: "S", bust: "34", waist: "28", length: "42" },
      { size: "M", bust: "36", waist: "30", length: "42" },
      { size: "L", bust: "38", waist: "32", length: "42" },
      { size: "XL", bust: "40", waist: "34", length: "42" },
      { size: "2XL", bust: "42", waist: "36", length: "42" },
    ],
    suits: [
      { size: "XS", bust: "32", waist: "26", length: "46" },
      { size: "S", bust: "34", waist: "28", length: "47" },
      { size: "M", bust: "36", waist: "30", length: "48" },
      { size: "L", bust: "38", waist: "32", length: "49" },
      { size: "XL", bust: "40", waist: "34", length: "50" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Size Guide</h1>
              <p className="text-muted-foreground">Find your perfect fit</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {Object.entries(sizeCharts).map(([category, sizes], idx) => (
                <div key={category}>
                  <h2 className="text-2xl font-serif font-bold mb-4 capitalize">{category}</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          {Object.keys(sizes[0]).map((col) => (
                            <th key={col} className="border px-4 py-2 text-left font-semibold capitalize">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sizes.map((row, rowIdx) => (
                          <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                            {Object.values(row).map((val, colIdx) => (
                              <td key={colIdx} className="border px-4 py-2">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mt-8">
                <h3 className="font-semibold mb-2">Measurement Tips:</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Measure yourself wearing undergarments</li>
                  <li>• Stand straight while measuring</li>
                  <li>• Keep the measuring tape relaxed, not too tight</li>
                  <li>• All measurements are in inches</li>
                  <li>• When in doubt, choose the larger size</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

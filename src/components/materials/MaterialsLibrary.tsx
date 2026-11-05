import React, { useState } from 'react';
import { Library, Download, FileText, Search, Filter, BookOpen } from 'lucide-react';

interface MaterialItem {
  id: string;
  title: string;
  category: 'Grammar Guide' | 'Vocabulary Sheet' | 'Hangul Chart' | 'TOPIK Preparation' | 'Worksheet';
  level: string;
  description: string;
  fileSize: string;
}

export const MaterialsLibrary: React.FC = () => {
  const [materials] = useState<MaterialItem[]>([
    {
      id: 'mat-1',
      title: 'Complete Hangul 40-Letter Chart & Stroke Order Cheatsheet',
      category: 'Hangul Chart',
      level: 'Pre-A1',
      description: 'High-resolution printable PDF guide covering all 21 vowels, 19 consonants, and the 7 Batchim representative rules.',
      fileSize: '1.4 MB'
    },
    {
      id: 'mat-2',
      title: 'Beginner Korean Essential Particles (은/는, 이/가, 을/를, 에, 에서)',
      category: 'Grammar Guide',
      level: 'Level 1',
      description: 'Comprehensive comparative handbook with practical examples, dialogue contrasts, and Filipino translation notes.',
      fileSize: '2.1 MB'
    },
    {
      id: 'mat-3',
      title: 'TOPIK I Official 800 Core Vocabulary Frequency List',
      category: 'Vocabulary Sheet',
      level: 'Level 1 / Level 2',
      description: 'Alphabetized vocabulary compilation with parts of speech, English definitions, and sample test phrases.',
      fileSize: '3.8 MB'
    },
    {
      id: 'mat-4',
      title: 'Korean Batchim (받침) Sound Change & Liaison Practice Worksheets',
      category: 'Worksheet',
      level: 'Pre-A1',
      description: 'Drill worksheets with answer keys for mastering the 7 representative sounds and fluent pronunciation flow.',
      fileSize: '1.8 MB'
    },
    {
      id: 'mat-5',
      title: 'Real-Life Seoul Dialogues: Restaurant, Subway & Shopping Scenarios',
      category: 'Grammar Guide',
      level: 'Level 1',
      description: 'Role-play script collection with phonetic pronunciation guides and polite classroom Korean.',
      fileSize: '2.6 MB'
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = materials.filter(m => {
    const matchQuery = m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'all' || m.category === selectedCat;
    return matchQuery && matchCat;
  });

  const handleDownload = (item: MaterialItem) => {
    // Generate text/markdown document download
    const content = `# HANGUL ACADEMY OFFICIAL STUDY MATERIAL
Title: ${item.title}
Category: ${item.category}
Academic Level: ${item.level}
Curriculum Affiliation: Seoul Institute Standard

DESCRIPTION:
${item.description}

CONTENTS & STUDY RECOMMENDATIONS:
1. Review the material alongside your daily 60-minute structured study plan.
2. Practice speech shadowing with the Speaking Lab audio player.
3. Complete the interactive exercises on the Virtual Classroom platform.

© Hangul Academy. All rights reserved for enrolled academic students.`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-navy text-academy-gold">
            <Library className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Academy Learning Resource Library & Download Center
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Authorized educational worksheets, printable stroke order guides, and TOPIK preparation compendiums.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search learning materials, worksheets, grammar references..."
            className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-700"
          >
            <option value="all">All Categories</option>
            <option value="Hangul Chart">Hangul Charts</option>
            <option value="Grammar Guide">Grammar Guides</option>
            <option value="Vocabulary Sheet">Vocabulary Sheets</option>
            <option value="Worksheet">Worksheets</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-academy-gold transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                  {item.category}
                </span>
                <span className="text-xs font-mono font-bold text-academy-gold-dark">
                  {item.level}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-academy-navy">
                {item.title}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">{item.fileSize}</span>
              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resource</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

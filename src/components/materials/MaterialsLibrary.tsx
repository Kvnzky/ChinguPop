import React, { useState } from 'react';
import { Library, Download, FileText, Search, Filter, BookOpen, Eye, X, Printer } from 'lucide-react';

interface MaterialItem {
  id: string;
  title: string;
  category: 'Grammar Guide' | 'Vocabulary Sheet' | 'Hangul Chart' | 'TOPIK Preparation' | 'Worksheet';
  level: string;
  description: string;
  fileSize: string;
  studyNotes: string[];
}

export const MaterialsLibrary: React.FC = () => {
  const [materials] = useState<MaterialItem[]>([
    {
      id: 'mat-1',
      title: 'Complete Hangul 40-Letter Chart & Stroke Order Cheatsheet',
      category: 'Hangul Chart',
      level: 'Pre-A1',
      description: 'Printable reference covering all 21 vowels (10 basic + 11 compound), 19 consonants (14 basic + 5 tense), and the 7 Batchim representative rules.',
      fileSize: 'Study Guide',
      studyNotes: [
        '10 Basic Vowels (기본 모음): ㅏ [a], ㅑ [ya], ㅓ [eo], ㅕ [yeo], ㅗ [o], ㅛ [yo], ㅜ [u], ㅠ [yu], ㅡ [eu], ㅣ [i]',
        '11 Compound Vowels (복합 모음): ㅐ [ae], ㅒ [yae], ㅔ [e], ㅖ [ye], ㅘ [wa], ㅙ [wae], ㅚ [oe], ㅝ [wo], ㅞ [we], ㅟ [wi], ㅢ [ui]',
        '14 Basic Consonants (기본 자음): ㄱ [g/k], ㄴ [n], ㄷ [d/t], ㄹ [r/l], ㅁ [m], ㅂ [b/p], ㅅ [s], ㅇ [silent/ng], ㅈ [j], ㅊ [ch], ㅋ [k], ㅌ [t], ㅍ [p], ㅎ [h]',
        '5 Double/Tense Consonants (쌍자음): ㄲ [kk], ㄸ [tt], ㅃ [pp], ㅆ [ss], ㅉ [jj]',
        'Stroke Order Rule: Always write Top-to-Bottom (위에서 아래로) and Left-to-Right (왼쪽에서 오른쪽으로).'
      ]
    },
    {
      id: 'mat-2',
      title: 'Beginner Korean Essential Particles (은/는, 이/가, 을/를, 에, 에서)',
      category: 'Grammar Guide',
      level: 'Level 1 (A1)',
      description: 'Comprehensive comparative handbook with practical examples, Batchim selection rules, and optional Filipino translation notes.',
      fileSize: 'Study Guide',
      studyNotes: [
        'Topic Marker 은/는: Attach 은 after a consonant Batchim (저 + 는 -> 저는, 학생 + 은 -> 학생은). Introduces the main topic or contrast.',
        'Subject Marker 이/가: Attach 이 after a consonant Batchim (책 + 이 -> 책이) and 가 after a vowel (학교 + 가 -> 학교가). Identifies new or specific subjects.',
        'Object Marker 을/를: Attach 을 after a consonant Batchim (밥 + 을 -> 밥을) and 를 after a vowel (커피 + 를 -> 커피를). Marks the direct object of an action verb.',
        'Location/Destination 에 vs 에서: Use 에 for static existence or movement destination (학교에 가요 = I go to school). Use 에서 for dynamic action locations (도서관에서 공부해요 = I study at the library).'
      ]
    },
    {
      id: 'mat-3',
      title: 'TOPIK I Official Core Vocabulary Frequency List',
      category: 'Vocabulary Sheet',
      level: 'Level 1 / Level 2',
      description: 'Curated high-frequency vocabulary compilation with parts of speech, English definitions, and sample test phrases.',
      fileSize: 'Study Guide',
      studyNotes: [
        'Essential Nouns: 학생 (student), 선생님 (teacher), 학교 (school), 친구 (friend), 가족 (family), 한국어 (Korean language), 물 (water), 밥 (meal/rice).',
        'Essential Action Verbs: 가다 (to go -> 가요), 오다 (to come -> 와요), 먹다 (to eat -> 먹어요), 마시다 (to drink -> 마셔요), 공부하다 (to study -> 공부해요).',
        'Essential Descriptive Verbs: 좋다 (to be good -> 좋아요), 크다 (to be big -> 커요), 작다 (to be small -> 작아요), 많다 (to be many -> 많아요).',
        'Dual Number Systems: Sino-Korean (일, 이, 삼, 사, 오...) for dates, money, minutes, and phone numbers; Native Korean (하나, 둘, 셋, 넷, 다섯...) for hours, age, and general item counting (한 개, 두 명).'
      ]
    },
    {
      id: 'mat-4',
      title: 'Korean Batchim (받침) Sound Change & Liaison Practice Worksheets',
      category: 'Worksheet',
      level: 'Pre-A1 / A1',
      description: 'Drill worksheets with answer keys for mastering the 7 representative final sounds and fluent liaison (연음) pronunciation flow.',
      fileSize: 'Study Guide',
      studyNotes: [
        '1. Velar Stop [ㄱ]: ㄱ, ㅋ, ㄲ at the end of a syllable all neutralize to unreleased [k] (박, 부엌, 밖).',
        '2. Alveolar Stop [ㄷ]: ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ at the end of a syllable all neutralize to unreleased [t] (옷 [옫], 꽃 [꼳], 있다 [읻따]).',
        '3. Bilabial Stop [ㅂ]: ㅂ, ㅍ neutralize to unreleased [p] (집, 앞 [압]).',
        '4. Liaison Rule (연음 법칙): When a Batchim is followed by a vowel starting with silent ㅇ, the Batchim sound carries over: 한국어 -> [한구거], 먹어요 -> [머거요], 같이 -> [가치] (palatalization).'
      ]
    },
    {
      id: 'mat-5',
      title: 'Real-Life Seoul Dialogues: Restaurant, Subway & Shopping Scenarios',
      category: 'Grammar Guide',
      level: 'Level 1 (A1/A2)',
      description: 'Role-play script collection with phonetic pronunciation guides and polite classroom Korean (-아/어요 and -(스)ㅂ니다).',
      fileSize: 'Study Guide',
      studyNotes: [
        'Ordering at a Restaurant: 여기요! 비빔밥 하나하고 물 주세요. (Excuse me! One bibimbap and water, please.)',
        'Asking for Price in Shopping: 이거 얼마예요? 카드 돼요? (How much is this? Do you accept card?)',
        'Asking Directions at the Subway: 서울역이 어디에 있어요? (Where is Seoul Station?)',
        'Polite Parting Greetings: 안녕히 계세요 (Stay in peace — said when you are leaving) vs 안녕히 가세요 (Go in peace — said when the other person is leaving).'
      ]
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<MaterialItem | null>(null);

  const filtered = materials.filter(m => {
    const matchQuery = m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'all' || m.category === selectedCat;
    return matchQuery && matchCat;
  });

  const handleDownload = (item: MaterialItem) => {
    const content = `# CHINGUPOP OFFICIAL KOREAN STUDY MATERIAL
Title: ${item.title}
Category: ${item.category}
Academic Level: ${item.level}
Curriculum Affiliation: ChinguPop Korean Language Academy

DESCRIPTION:
${item.description}

KEY STUDY NOTES & REFERENCE RULES:
${item.studyNotes.map((n, idx) => `${idx + 1}. ${n}`).join('\n')}

STUDY RECOMMENDATIONS:
1. Review the material alongside your daily structured study plan.
2. Practice speech shadowing with the Speaking Lab audio player.
3. Complete the interactive exercises on the Virtual Classroom platform.

© ChinguPop. All rights reserved for enrolled academic students.`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
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
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center space-y-2">
          <BookOpen className="w-8 h-8 text-stone-300 mx-auto" />
          <p className="font-serif font-bold text-sm text-academy-navy">No matching resources found</p>
          <p className="text-xs text-stone-500">Try clearing your search filter or selecting &ldquo;All Categories&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCat('all');
            }}
            className="mt-2 px-4 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold text-academy-navy"
          >
            Reset Filters
          </button>
        </div>
      ) : (
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

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-stone-500">{item.fileSize}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-academy-navy text-xs font-semibold transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.md)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Study Guide Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#6C52EE] tracking-wider block">
                  {previewItem.category} • {previewItem.level}
                </span>
                <h3 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
                  {previewItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {previewItem.description}
            </p>

            <div className="space-y-2.5 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-academy-navy uppercase tracking-wider">
                Core Reference Rules & Examples
              </div>
              <ul className="space-y-2 text-xs text-stone-800 leading-relaxed list-disc pl-4">
                {previewItem.studyNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Guide</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownload(previewItem)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Study Guide</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

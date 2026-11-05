import React, { useState } from 'react';
import { Certificate, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { certificateService } from '../../services/certificateService';
import { 
  Award, 
  Printer, 
  Search, 
  CheckCircle, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface CertificateViewProps {
  currentUser: UserProfile;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ currentUser }) => {
  const [certs, setCerts] = useState<Certificate[]>(() => {
    const list = storage.getCertificates(currentUser.id);
    if (list.length === 0 && currentUser.role === 'student') {
      // Issue honorary initial Pre-A1 Foundation certificate for current student if eligible
      const initialCert = certificateService.issueCertificate(
        currentUser,
        'Korean Foundations & Hangul Mastery (Level 0)',
        'Pre-A1',
        'A',
        98
      );
      return [initialCert];
    }
    return list;
  });

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(certs[0] || null);
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<Certificate | null | 'not-found'>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    const found = certificateService.verifyCertificate(verifyInput.trim());
    setVerifyResult(found || 'not-found');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-gold/20 text-academy-gold-dark border border-academy-gold/40">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Academy Certificates of Completion & Verification
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Verified academic credentials issued upon curriculum completion and passing examinations.
            </p>
          </div>
        </div>

        {selectedCert && (
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Certificate Display Screen (Printable) */}
        <div className="lg:col-span-2 space-y-4">
          {selectedCert ? (
            <div className="bg-[#FAF8F5] border-8 border-double border-academy-navy p-8 sm:p-12 rounded-xl shadow-2xl relative text-center text-academy-charcoal space-y-6 overflow-hidden">
              
              {/* Corner Traditional Accents */}
              <div className="absolute top-2 left-2 text-academy-gold font-serif text-lg select-none">❖</div>
              <div className="absolute top-2 right-2 text-academy-gold font-serif text-lg select-none">❖</div>
              <div className="absolute bottom-2 left-2 text-academy-gold font-serif text-lg select-none">❖</div>
              <div className="absolute bottom-2 right-2 text-academy-gold font-serif text-lg select-none">❖</div>

              {/* Academy Seal Header */}
              <div className="space-y-1">
                <div className="w-14 h-14 mx-auto rounded-full bg-academy-navy border-2 border-academy-gold flex items-center justify-center font-serif text-2xl font-bold text-academy-gold shadow-md">
                  한
                </div>
                <div className="text-xs font-serif uppercase tracking-widest text-academy-gold-dark font-bold mt-2">
                  HANGUL ACADEMY SEOUL • KOREAN LANGUAGE INSTITUTE
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-academy-navy tracking-wider pt-2">
                  수료증서 (CERTIFICATE OF COMPLETION)
                </div>
                <div className="text-[11px] font-mono text-stone-500">
                  Registration No: {selectedCert.certificateNumber}
                </div>
              </div>

              {/* Certificate Body */}
              <div className="space-y-3 py-4 border-y border-stone-300/80">
                <p className="text-xs text-stone-600 uppercase tracking-widest font-sans">
                  This certifies that
                </p>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-academy-navy underline decoration-academy-gold/60 underline-offset-8">
                  {selectedCert.studentName}
                </div>
                <p className="text-xs text-stone-700 max-w-lg mx-auto leading-relaxed pt-2">
                  has successfully completed the structured academic requirements, coursework, examinations, and speaking assessments for the program:
                </p>
                <div className="text-lg font-serif font-bold text-academy-gold-dark">
                  {selectedCert.courseTitle}
                </div>
                <div className="flex items-center justify-center gap-4 text-xs font-mono pt-1 text-stone-600">
                  <span>Level: <strong>{selectedCert.level}</strong></span>
                  <span>•</span>
                  <span>Final Grade: <strong className="text-academy-navy font-bold">{selectedCert.finalGrade} ({selectedCert.scorePercentage}%)</strong></span>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="flex items-end justify-between pt-4 px-4 text-xs">
                <div className="text-left space-y-1">
                  <div className="text-[10px] text-stone-500 font-mono">Date of Conferral:</div>
                  <div className="font-semibold text-academy-navy font-serif">{selectedCert.issueDate}</div>
                  <div className="text-[10px] text-stone-400 font-mono">Verification: {selectedCert.verificationCode}</div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-serif italic text-sm text-stone-800">Min-jun Kim</div>
                  <div className="h-0.5 w-32 bg-stone-400 ml-auto" />
                  <div className="font-serif font-bold text-academy-navy text-xs">Prof. Min-jun Kim (김민준)</div>
                  <div className="text-[10px] text-stone-500">Director of Academic Affairs</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[9px] text-stone-400 border-t border-stone-200 pt-3">
                * Note: This is an internal certificate of academic achievement issued by Hangul Academy. It is not an official government TOPIK examination credential.
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500 text-xs">
              No certificate selected.
            </div>
          )}
        </div>

        {/* Right: Verification & Issued Certificates */}
        <div className="space-y-6">
          
          {/* Public Verification Box */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <ShieldCheck className="w-5 h-5 text-academy-gold-dark" />
              <h3 className="font-serif font-bold text-sm text-academy-navy">
                Verify Certificate Reference
              </h3>
            </div>

            <form onSubmit={handleVerify} className="space-y-3">
              <input
                type="text"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                placeholder="Enter Certificate No or Code (e.g. HA-2026-..., V-...)"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Verify Credential
              </button>
            </form>

            {verifyResult && verifyResult !== 'not-found' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Officially Verified Credential</span>
                </div>
                <div>Recipient: <strong>{verifyResult.studentName}</strong></div>
                <div>Course: {verifyResult.courseTitle}</div>
                <div>Grade: {verifyResult.finalGrade} ({verifyResult.scorePercentage}%)</div>
              </div>
            )}

            {verifyResult === 'not-found' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Certificate record not found. Please recheck reference code.</span>
              </div>
            )}
          </div>

          {/* Student's Earned Certificates List */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-sm text-academy-navy pb-2 border-b border-stone-200">
              Earned Academic Certificates ({certs.length})
            </h3>
            <div className="space-y-2">
              {certs.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCert(c)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedCert?.id === c.id
                      ? 'border-academy-navy bg-stone-50 font-semibold shadow-sm'
                      : 'border-stone-100 hover:border-stone-200 bg-white'
                  }`}
                >
                  <div className="text-xs font-serif font-bold text-academy-navy">{c.courseTitle}</div>
                  <div className="text-[11px] text-stone-500 font-mono mt-0.5">{c.certificateNumber} • Grade: {c.finalGrade}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

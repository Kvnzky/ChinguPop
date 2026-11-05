import { Certificate, KoreanProficiency, UserProfile } from '../types';
import { storage } from './storageService';

export class CertificateService {
  issueCertificate(
    student: UserProfile,
    courseTitle: string,
    level: KoreanProficiency,
    finalGrade: string,
    scorePercentage: number
  ): Certificate {
    const certNumber = `HA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const verificationCode = `V-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const cert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNumber,
      studentId: student.id,
      studentName: student.name,
      courseTitle,
      level,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      finalGrade,
      scorePercentage,
      instructorName: 'Prof. Min-jun Kim (김민준 교수)',
      verificationCode
    };

    storage.saveCertificate(cert);
    return cert;
  }

  verifyCertificate(codeOrId: string): Certificate | null {
    const certs = storage.getCertificates();
    return certs.find(c => 
      c.certificateNumber.toLowerCase() === codeOrId.toLowerCase().trim() ||
      c.verificationCode.toLowerCase() === codeOrId.toLowerCase().trim()
    ) || null;
  }
}

export const certificateService = new CertificateService();

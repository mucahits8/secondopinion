export const demoCase = {
  id: "SO-2026-00184",
  patientName: "Ahmet",
  patientSummary: "47 yaş",
  study: "Brain MRI",
  studyDate: "3 Eylül 2026",
  specialist: "Prof. Dr. Mehmet Kaya",
  specialty: "Nöroradyoloji",
  status: "Uzman değerlendiriyor",
  expectedResult: "Operasyon onayı sonrası netleşir",
  documents: ["Radiology Report.pdf", "Previous MRI Report.pdf"],
  patientQuestion:
    "İlk raporda tarif edilen bulgunun önceki görüntülemeye göre değişip değişmediğini öğrenmek istiyorum.",
  imaging: {
    studies: 1,
    series: 13,
    images: 612,
    size: "847 MB",
  },
};

export const cases = [demoCase];

export const caseSteps = [
  { label: "Görüntüler alındı", state: "done" },
  { label: "Uzman atandı", state: "done" },
  { label: "Değerlendiriliyor", state: "active" },
  { label: "Rapor hazırlanıyor", state: "next" },
  { label: "Tamamlandı", state: "next" },
];

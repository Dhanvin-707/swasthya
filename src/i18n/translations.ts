import type { LanguageCode } from "../types";

const en = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI Doctor",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "Demo data only — not for real medical decisions",
  emergencyDisclaimer: "For emergencies, call 108 or 112 immediately.",
  notMedicalAdvice: "Informational only. Consult a qualified doctor.",
};

const hi = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI डॉक्टर",
  cbcName: "सम्पूर्ण रक्त गणना (CBC)",
  fbsName: "UPVAAS BLOOD SUGAR & HbA1c",
  thyroidName: "थायराइड प्रोफाइल (T3, T4, TSH)",
  demoNotice: "सिर्फ डेमो डेटा — असली चिकित्सा निर्णयों के लिए नहीं",
  emergencyDisclaimer: "आपात स्थिति में तुरंत 108 या 112 पर कॉल करें।",
  notMedicalAdvice: "केवल सूचनात्मक। किसी योग्य डॉक्टर से परामर्श करें।",
};

const bn = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI ডাক্তার",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "শুধু ডেমো ডেটা — বাস্তব চিকিৎসা সিদ্ধান্তের জন্য নয়",
  emergencyDisclaimer: "জরুরী ক্ষেত্রে 108 বা 112 এ কল করুন।",
  notMedicalAdvice: "শুধু তথ্যবহুল। যোগ্য ডাক্তারের পরামর্ নিন।",
};

const mr = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI डॉक्टर",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "फक्त डेमो डेटा — खर्‍या वैद्यकिक निर्णयासाठी नाही",
  emergencyDisclaimer: "आणीबाणीसाठी 108 किंवा 112 वर कॉल करा.",
  notMedicalAdvice: "फक्त माहितीपूर्ण. पातळ डॉक्टरांचा सल्ला घ्या.",
};

const te = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI డాక్టర్",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "డెమో డేటా మాత్రమే — నిజమైన వైద్య నిర్ణయాలకు కాదు",
  emergencyDisclaimer: "అత్యవసర పరిస్థితుల్లో 108 లేదా 112 కి కాల్ చేయండి.",
  notMedicalAdvice: "సమాచార మాత్రమే. అర్హత కల వైద్యుడి సలహా తీసుకోండి.",
};

const ta = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI மருத்துவர்",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "வெறும் ெமோ தரவு — உண்ணையான மருத்துவ முடிவுகளுக்கு அல்ல",
  emergencyDisclaimer: "அவசர் பட்சத்தில் 108 அல்லது 112  அழைக்கவும்.",
  notMedicalAdvice: "தகவல் மட்டுமே. தகுதியான மருத்துவரை கலந்தாய்வு செய்யவும்.",
};

const gu = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI ડૉક્ટર",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "ફક્ત ડેમો ડેટા — વાસ્તવિક મેડિકલ નિર્ણયો માટે નહીં",
  emergencyDisclaimer: "કટોકટી માટે 108 અથવા 112 પર કૉલ કરો.",
  notMedicalAdvice: "માત્ર માહિતી્રદ. યોગ્ય ડૉક્ટરની સલાહ લો.",
};

const kn = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI ಡಾಕ್ಟರ್",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "ಡೆಮೋ ಡೇಟಾ ಮಾತ್ರ — ನಿಜವైಯ ವೈದ್ಯಕೀಯ ನಿರ್ಣಯಗಳಿಗೆ ಅಲ್ಲ",
  emergencyDisclaimer: "ಎಮರ್ಜೆನ್ಸಿಗೆ 108 ಅಥವಾ 112 ಗೆ ಕಾಲ್ ಮಾಡಿ.",
  notMedicalAdvice: "ಮಾಹಿತಿ ಮಾತ್ರ. ಯೋಗ್ಯ ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ.",
};

const ml = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI ഡോക്ർ",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "ഡെമോ ാറ്റ മാത്രം — യഥാർത്ഥ മെഡിക്കൽ നിഗമനങ്ങൾക്കല്ല",
  emergencyDisclaimer: "എമർജൻസികൾക്ക് 108 അല്ലെങ്കിൽ 112 ൽ വിളിക്കുക.",
  notMedicalAdvice: "വിദഗ്ധ ഡോക്ടറുടെ സലഹ സ്വീകരിക്കുക.",
};

const pa = {
  appName: "Swasthya AI",
  tagline: "National Digital Health Stack",
  aiDoctorTitle: "AI ਡਾਕਟਰ",
  cbcName: "Complete Blood Count (CBC)",
  fbsName: "Fasting Blood Sugar & HbA1c",
  thyroidName: "Thyroid Profile (T3, T4, TSH)",
  demoNotice: "ਸਿਰਫ਼ ਡੇਮੋ ਡੇਟਾ — ਅਸਲੀ ਮੈਡੀਕਲ ਫੈਸਲਿਆਂ ਲਈ ਨਹੀਂ",
  emergencyDisclaimer: "ਮਰਜੈਂਸੀ ਲਈ 108 ਜਾਂ 112 'ਤੇ ਕਾਲ ਕਰੋ।",
  notMedicalAdvice: "ਸਿਰਫ਼ ਜਾਣਕਾਰੀ। ਯੋਗ ਡਾਟਰ ਦੀ ਸਲਾਹ ਲਓ।",
};

const dictionaries: Record<LanguageCode, typeof en> = {
  en,
  hi,
  bn,
  mr,
  te,
  ta,
  gu,
  kn,
  ml,
  pa,
};

export function t(lang: LanguageCode, key: keyof typeof en): string {
  return dictionaries[lang]?.[key] ?? en[key];
}

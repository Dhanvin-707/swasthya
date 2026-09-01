import type { LanguageCode } from "@/types";

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

// Per spec: only AI-doctor title and blood-test names are translated in all
// 10 languages; the wider UI intentionally stays English with fallback.
const dict: Record<string, Partial<Record<LanguageCode, string>>> = {
  "aiDoctor.title": {
    en: "Swasthya AI Doctor",
    hi: "स्वास्थ्य एआई डॉक्टर",
    mr: "स्वास्थ्य एआय डॉक्टर",
    te: "స్వస్థ్య AI డాక్టర్",
    ta: "ஸ்வஸ்த்யா AI மருத்துவர்",
    bn: "স্বাস্থ্য এআই ডাক্তার",
    gu: "સ્વાસ્થ્ય એઆઈ ડૉક્ટર",
    kn: "ಸ್ವಸ್ಥ್ಯ AI ಡಾಕ್ಟರ್",
    ml: "സ്വസ്ഥ്യ AI ഡോക്ടർ",
    pa: "ਸਵਾਸਥਿਆ AI ਡਾਕਟਰ",
  },
  "test.cbc": {
    en: "Complete Blood Count (CBC)",
    hi: "सम्पूर्ण रक्त गणना (CBC)",
    mr: "संपूर्ण रक्त गणना (CBC)",
    te: "సంపూర్ణ రక్త పరీక్ష (CBC)",
    ta: "முழு இரத்த எண்ணிக்கை (CBC)",
    bn: "সম্পূর্ণ রক্ত পরীক্ষা (CBC)",
    gu: "સંપૂર્ણ રક્ત ગણતરી (CBC)",
    kn: "ಸಂಪೂರ್ಣ ರಕ್ತ ಪರೀಕ್ಷೆ (CBC)",
    ml: "സമ്പൂർണ്ണ രക്ത പരിശോധന (CBC)",
    pa: "ਸੰਪੂਰਨ ਖੂਨ ਗਿਣਤੀ (CBC)",
  },
  "test.fbs": {
    en: "Fasting Blood Sugar & HbA1c",
    hi: "फास्टिंग ब्लड शुगर और HbA1c",
    mr: "उपाशी रक्तशर्करा व HbA1c",
    te: "ఫాస్టింగ్ బ్లడ్ షుగర్ & HbA1c",
    ta: "உண்ணா இரத்த சர்க்கரை & HbA1c",
    bn: "ফাস্টিং ব্লাড সুগার ও HbA1c",
    gu: "ફાસ્ટિંગ બ્લડ શુગર અને HbA1c",
    kn: "ಉಪವಾಸ ರಕ್ತ ಸಕ್ಕರೆ & HbA1c",
    ml: "ഫാസ്റ്റിംഗ് ബ്ലഡ് ഷുഗർ & HbA1c",
    pa: "ਫਾਸਟਿੰਗ ਬਲੱਡ ਸ਼ੂਗਰ ਅਤੇ HbA1c",
  },
  "test.thyroid": {
    en: "Thyroid Profile (T3, T4, TSH)",
    hi: "थायराइड प्रोफाइल (T3, T4, TSH)",
    mr: "थायरॉइड प्रोफाइल (T3, T4, TSH)",
    te: "థైరాయిడ్ ప్రొఫైల్ (T3, T4, TSH)",
    ta: "தைராய்டு சுயவிவரம் (T3, T4, TSH)",
    bn: "থাইরয়েড প্রোফাইল (T3, T4, TSH)",
    gu: "થાઈરોઈડ પ્રોફાઈલ (T3, T4, TSH)",
    kn: "ಥೈರಾಯ್ಡ್ ಪ್ರೊಫೈಲ್ (T3, T4, TSH)",
    ml: "തൈറോയ്ഡ് പ്രൊഫൈൽ (T3, T4, TSH)",
    pa: "ਥਾਈਰਾਇਡ ਪ੍ਰੋਫਾਈਲ (T3, T4, TSH)",
  },
};

export function t(lang: LanguageCode, key: string): string {
  return dict[key]?.[lang] ?? dict[key]?.en ?? key;
}

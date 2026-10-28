import { Locale } from "@/i18n/routing";

export interface TrilingualText {
  si: string;
  en: string;
  ta: string;
}

export function getTrilingual(text: TrilingualText, locale: Locale): string {
  return text[locale] || text.en || text.si;
}

// 1. Vision, Mission & Objectives
export const VISION_MISSION_DATA = {
  vision: {
    si: "ලස්සන ජීවිතයක්",
    en: "A Beautiful Life",
    ta: "அழகான வாழ்க்கை",
  },
  mission: {
    si: "මත්ද්‍රව්‍ය ඇබ්බැහි පුරවැසියන් පුනරුත්ථාපනය මඟින්, සෞඛ්‍ය සම්පන්න හා ඵලදායී සමාජයක් ගොඩනැගීම",
    en: "Building a healthy and productive society through the rehabilitation of drug-dependent citizens.",
    ta: "போதைப்பொருளுக்கு அடிமையான பிரஜைகளை புனர்வாழ்வளிப்பதன் மூலம் ஆரோக்கியமான மற்றும் உற்பத்தித்திறன் மிக்க சமூகத்தை கட்டியெழுப்புதல்.",
  },
  objectives: [
    {
      id: "obj-1",
      number: "01",
      title: {
        si: "චර්යාත්මක හා මනෝවිද්‍යාත්මක වෙනස",
        en: "Behavioral & Psychological Transformation",
        ta: "நடத்தை மற்றும் உளவியல் மாற்றம்",
      },
      desc: {
        si: "පුනරුත්ථාපන ලාභීන් අන්තරායකර ඖෂධ භාවිතයෙන් ඈත්වීම සඳහා සහාය වීම හා මනෝ විද්‍යාත්මක ප්‍රතිකාර ක්‍රම තුළින් චර්යාත්මක වෙනසකට භාජනය කිරීම.",
        en: "Supporting beneficiaries to overcome hazardous drug abuse and facilitating sustainable behavioural change through proven psychological therapies.",
        ta: "புனர்வாழ்வு பெறுவோர் அபாயகரமான போதைப்பொருள் பயன்பாட்டிலிருந்து விடுபட உதவுதல் மற்றும் உளவியல் சிகிச்சை முறைகள் மூலம் நடத்தை மாற்றத்திற்கு உட்படுத்துதல்.",
      },
    },
    {
      id: "obj-2",
      number: "02",
      title: {
        si: "ජීවන රටාව හා පරිසරය වෙනස් කිරීම",
        en: "Lifestyle & Environmental Renewal",
        ta: "வாழ்க்கை முறை மற்றும் சூழல் மாற்றம்",
      },
      desc: {
        si: "ඔවුන්ගේ ජීවන රටාව හා පරිසරය වෙනස් කිරීම තුළින් අන්තරායකර ඖෂධ වලට ඇබ්බැහිවිමෙන් මුදවා ගැනීම.",
        en: "Freeing individuals from hazardous drug dependency by transforming their day-to-day lifestyle patterns and socio-environmental surroundings.",
        ta: "அவர்களின் வாழ்க்கை முறை மற்றும் சூழலை மாற்றுவதன் மூலம் அபாயகரமான போதைப்பொருட்களுக்கு அடிமையாவதிலிருந்து விடுவித்தல்.",
      },
    },
    {
      id: "obj-3",
      number: "03",
      title: {
        si: "වෘත්තීය නිපුණතාව හා සමාජගත කිරීම",
        en: "Vocational Skills & Social Reintegration",
        ta: "தொழில்முறைத் திறன் மற்றும் சமூகமயமாக்கல்",
      },
      desc: {
        si: "පුනරුත්ථාපන ලාභීන් හට රැකියා අවස්ථා උදාකර ගැනීමට හැකි වන පරිදි වෘත්තීය දැනුම ලබාදීම තුළින් නිපුණත්වයෙන් පිරිපුන් පුද්ගලයින් වශයෙන් සමාජගත කිරීම.",
        en: "Imparting certified vocational and technical skills to empower beneficiaries to secure dignified livelihoods and reintegrate as productive members of society.",
        ta: "புனர்வாழ்வு பெறுவோருக்கு தொழில் வாய்ப்புகளைப் பெறக்கூடிய வகையில் தொழில்முறை அறிவை வழங்குவதன் மூலம் திறமையான நபர்களாக சமூகமயமாக்குதல்.",
      },
    },
    {
      id: "obj-4",
      number: "04",
      title: {
        si: "පවුල් සංස්ථාව ශක්තිමත් කිරීම",
        en: "Family Unit Strengthening & Welfare",
        ta: "குடும்ப அமைப்பை வலுப்படுத்துதல் மற்றும் நலன்புரி",
      },
      desc: {
        si: "පවුල් සංස්ථාව ශක්තිමත් කිරීම, එහි වැදගත්කම අවබෝධ කර දීම හා පවුල් සංස්ථාව පවත්වාගෙන යාම සඳහා අවශ්‍ය වූ ආර්ථික, සමාජීය හා සුභසාධන කටයුතු නගා සිටුවීම.",
        en: "Strengthening the core family unit, instilling its vital importance, and uplifting economic, social, and welfare conditions necessary to sustain family stability.",
        ta: "குடும்ப அமைப்பை வலுப்படுத்துதல், அதன் முக்கியத்துவத்தை உணர்த்துதல் மற்றும் குடும்ப அமைப்பைப் பேணுவதற்குத் தேவையான பொருளாதார, சமூக மற்றும் நலன்புரி நடவடிக்கைகளை மேம்படுத்துதல்.",
      },
    },
  ],
};

// 2. Bureau Powers & Mandate
export const POWERS_DATA = [
  {
    id: "power-1",
    act: "Act No. 2 of 2023 / Act No. 54 of 2007",
    title: {
      si: "ප්‍රතිකාර සහ පුනරුත්ථාපනය ලබා දීම",
      en: "Treatment & Rehabilitation Services",
      ta: "சிகிச்சை மற்றும் புனர்வாழ்வு வழங்கல்",
    },
    desc: {
      si: "ප්‍රතිකාර සහ පුනරුත්ථාපනය ඉල්ලා සිටින හෝ ලබා දිය යුතු යැයි නියම කර ඇති තැනැත්තන් සඳහා එය ලබා දීම.",
      en: "Providing certified inpatient and outpatient treatment and rehabilitation for persons who voluntarily seek it or are mandated by court order.",
      ta: "சிகிச்சை மற்றும் புனர்வாழ்வைக் கோரும் அல்லது வழங்கப்பட வேண்டும் என உத்தரவிடப்பட்ட நபர்களுக்கு அதனை வழங்குதல்.",
    },
  },
  {
    id: "power-2",
    act: "Economic Empowerment",
    title: {
      si: "රැකියා නියුක්තිය හා ආර්ථික ඵලදායීතාව",
      en: "Employability & Economic Productivity",
      ta: "தொழில் வாய்ப்பு மற்றும் பொருளாதார உற்பத்தித்திறன்",
    },
    desc: {
      si: "සමාජ ආර්ථික ආන්තික කරණ අවදානම අවම කරමින් ඔවුන්ගේ රැකියා සොයා ගැනීමේ හැකියාව වැඩි දියුණු කිරීම සහ ආර්ථිකය ඵලදායී ලෙස වැඩි දියුණු කිරීම සදහා භාවිත කිරීම.",
      en: "Minimizing socioeconomic marginalization risks, boosting employability, and channeling rehabilitated human potential into national economic growth.",
      ta: "சமூக-பொருளாதார ஓரங்கட்டல் அபாயத்தைக் குறைத்தல், வேலைவாய்ப்புத் திறனை மேம்படுத்துதல் மற்றும் பொருளாதாரத்தை திறம்பட வளர்க்கப் பயன்படுத்துதல்.",
    },
  },
  {
    id: "power-3",
    act: "Human Rights & Policy",
    title: {
      si: "මානව හිමිකම් හා ප්‍රතිපත්ති උපදේශනය",
      en: "Human Rights & Policy Advisory",
      ta: "மனித உரிமைகள் மற்றும் கொள்கை ஆலோசனைகள்",
    },
    desc: {
      si: "මානව හිමිකම් පිළිබඳ මූලික ධර්මතා සැලකිල්ලට ගනිමින් වැඩසටහන් සම්බන්ධයෙන් අමාත්‍යවරයාට උපදෙස් ලබා දීම.",
      en: "Advising the Minister regarding rehabilitation policies and developmental programs in strict accordance with core human rights standards.",
      ta: "அடிப்படை மனித உரிமைக் கோட்பாடுகளைக் கருத்திற்கொண்டு திட்டங்கள் தொடர்பாக அமைச்சருக்கு ஆலோசனை வழங்குதல்.",
    },
  },
  {
    id: "power-4",
    act: "Aftercare & Review",
    title: {
      si: "ප්‍රතිසංකලනය වූවන් සමාලෝචනය හා අධීක්ෂණය",
      en: "Reintegration Review & Monitoring",
      ta: "சமூக மீள் ஒருங்கிணைப்பு மீளாய்வு மற்றும் கண்காணிப்பு",
    },
    desc: {
      si: "සමාජයට ප්‍රතිසංකලනය වී ඇති තැනැත්තන් සමාලෝචනය කිරීම, අධීක්ෂණය කිරීම සහ සහාය ලබා දීම.",
      en: "Regularly reviewing, monitoring, and extending sustained post-rehabilitation assistance to individuals successfully reintegrated into the community.",
      ta: "சமூகத்தில் மீண்டும் ஒருங்கிணைக்கப்பட்ட நபர்களை மீளாய்வு செய்தல், கண்காணித்தல் மற்றும் தொடர் ஆதரவை வழங்குதல்.",
    },
  },
  {
    id: "power-5",
    act: "Resource Management",
    title: {
      si: "ප්‍රදාන, ත්‍යාග සහ පරිත්‍යාග භාර ගැනීම",
      en: "Grants & Resource Acceptance",
      ta: "மானியங்கள் மற்றும் நன்கொடைகளைப் பெறுதல்",
    },
    desc: {
      si: "විදේශ සම්පත් දෙපාර්තමේන්තුවේ පූර්ව ලිඛිත අනුමතය ඇතිව මුදල් හෝ ද්‍රව්‍යමය ප්‍රදාන, ත්‍යාග හෝ පරිත්‍යාග භාර ගැනීම.",
      en: "Accepting monetary or material grants, gifts, or donations under prior written approval of the Department of External Resources.",
      ta: "வெளிநாட்டு வளங்கள் திணைக்களத்தின் முன் எழுத்துப்பூர்வ அனுமதியுடன் நிதி அல்லது பொருள் ரீதியான மானியங்கள் மற்றும் நன்கொடைகளைப் பெறுதல்.",
    },
  },
  {
    id: "power-6",
    act: "Financial Governance",
    title: {
      si: "අරමුදල් කළමනාකරණය හා ආයෝජන",
      en: "Fund Governance & Asset Management",
      ta: "நிதி முகாமைத்துவம் மற்றும் சொத்து முதலீடு",
    },
    desc: {
      si: "ගිණුම් විවෘත කිරීම, අරමුදල කළමනාකරණය කිරීම, භාවිතයට නොගන්නා මුදල් ආයෝජනය කිරීම සහ දේපළ අත් කර ගැනීම හෝ බැහැර කිරීම.",
      en: "Opening and operating bank accounts, managing statutory funds, prudently investing unutilized capital, and acquiring or disposing of real property.",
      ta: "வங்கிக் கணக்குகளைத் திறத்தல், நிதியை நிர்வகித்தல், பயன்படுத்தப்படாத நிதியை முதலீடு செய்தல் மற்றும் சொத்துக்களைக் கையகப்படுத்துதல் அல்லது அகற்றுதல்.",
    },
  },
  {
    id: "power-7",
    act: "Operational Delivery",
    title: {
      si: "පුනරුත්ථාපන මධ්‍යස්ථාන පිහිටුවීම හා පවත්වාගෙන යාම",
      en: "Centre Establishment & Capacity Training",
      ta: "புனர்வாழ்வு நிலையங்களை நிறுவுதல் மற்றும் பராமரித்தல்",
    },
    desc: {
      si: "අන්තරායදායක ඖෂධ පාලනය කිරීමේ ජාතික මණ්ඩලයේ විධානය යටතේ පුනරුත්ථාපන මධ්‍යස්ථාන පිහිටුවා පවත්වා ගෙන යාම සහ පුහුණු වැඩසටහන් පැවැත්වීම.",
      en: "Establishing and operating specialized rehabilitation treatment centres and conducting institutional training programs under the directives of NDDCB.",
      ta: "அபாயகர ஔடதங்கள் கட்டுப்பாட்டு தேசிய சபையின் வழிகாட்டலின் கீழ் புனர்வாழ்வு நிலையங்களை அமைத்து பராமரித்தல் மற்றும் பயிற்சித் திட்டங்களை நடத்துதல்.",
    },
  },
];

// 3. Institutional Structure
export const STRUCTURE_DATA = {
  establishedUnder: {
    si: "2023 අංක 02 දරන පුනරුත්ථාපන කාර්යාංශ පනත",
    en: "Bureau of Rehabilitation Act No. 02 of 2023",
    ta: "2023 ஆம் ஆண்டின் 02 ஆம் இலக்க புனர்வாழ்வு பணியக சட்டம்",
  },
  ministryTransferDate: "2025.10.17",
  ministries: {
    previous: {
      si: "අධිකරණ සහ ජාතික ඒකාබද්ධතා අමාත්‍යාංශය (2025)",
      en: "Ministry of Justice and National Integration (2025)",
      ta: "நீதி மற்றும் தேசிய ஒருமைப்பாட்டு அமைச்சு (2025)",
    },
    current: {
      si: "මහජන ආරක්ෂක සහ පාර්ලිමේන්තු කටයුතු අමාත්‍යාංශය (2025.10.17 දින සිට)",
      en: "Ministry of Public Security and Parliamentary Affairs (From 2025.10.17)",
      ta: "பொதுமக்கள் பாதுகாப்பு மற்றும் பாராளுமன்ற விவகாரங்கள் அமைச்சு (2025.10.17 முதல்)",
    },
  },
  courtOrderedCentresCount: 3,
  courtOrderedCentres: [
    {
      name: {
        si: "නවෝදාව ප්‍රතිකාරක මධ්‍යස්ථානය",
        en: "Navodawa Treatment Centre",
        ta: "நவோதாவா சிகிச்சை மையம்",
      },
      capacity: 500,
      focus: {
        si: "ප්‍රාථමික ප්‍රතිකාර හා වෛද්‍ය පුනරුත්ථාපනය",
        en: "Primary Treatment & Medical Rehabilitation",
        ta: "ஆரம்ப சிகிச்சை மற்றும் மருத்துவ புனர்வாழ்வு",
      },
    },
    {
      name: {
        si: "නවෝදාව තෘතීය සහ වෘත්තීය සාක්ෂරතා පුහුණු මධ්‍යස්ථානය",
        en: "Navodawa Tertiary & Vocational Literacy Training Centre",
        ta: "நவோதாவா மூன்றாம் நிலை மற்றும் தொழிற்கல்வி பயிற்சி மையம்",
      },
      capacity: 400,
      focus: {
        si: "වෘත්තීය සාක්ෂරතාව හා කාර්මික නිපුණතා සංවර්ධනය",
        en: "Vocational Literacy & Technical Skill Building",
        ta: "தொழில்சார் எழுத்தறிவு மற்றும் தொழில்நுட்ப திறன் மேம்பாடு",
      },
    },
    {
      name: {
        si: "සාරංගා මධ්‍යස්ථානය",
        en: "Saranga Centre",
        ta: "சாரங்கா மையம்",
      },
      capacity: 120,
      focus: {
        si: "විශේෂිත දැඩි නේවාසික පුනරුත්ථාපනය",
        en: "Specialized Intensive Residential Care",
        ta: "சிறப்பு தீவிர குடியிருப்பு புனர்வாழ்வு",
      },
    },
  ],
  voluntaryCentresCount: 1,
  voluntaryCentres: [
    {
      name: {
        si: "නවෝදාව තෘතීය සහ වෘත්තීය සාක්ෂරතා පුහුණු මධ්‍යස්ථානය - සේනපුර",
        en: "Navodawa Tertiary & Vocational Literacy Training Centre - Senapura",
        ta: "நவோதாவா மூன்றாம் நிலை மற்றும் தொழிற்கல்வி பயிற்சி மையம் - சேனபுர",
      },
      capacity: 100,
      startedDate: "2025.10.16",
      focus: {
        si: "ස්වේච්ඡාවෙන් ඉදිරිපත්වන්නන් සඳහා මාස 3ක නේවාසික ප්‍රතිකාර",
        en: "3-Month Inpatient Residential Care for Voluntary Applicants",
        ta: "சுயமாக முன்வருவோருக்கான 3 மாத உறைவிட சிகிச்சை",
      },
    },
  ],
  districtOfficesCount: 15,
  islandCoverage: {
    si: "දිවයිනේ සියලුම දිස්ත්‍රික්ක 25 ආවරණය වන පරිදි දිස්ත්‍රික් සම්බන්ධීකරණ කාර්යාල 15ක්",
    en: "15 District Coordination Offices spanning all 25 administrative districts island-wide",
    ta: "தீவு முழுவதிலும் உள்ள 25 மாவட்டங்களையும் உள்ளடக்கிய 15 மாவட்ட ஒருங்கிணைப்பு அலுவலகங்கள்",
  },
};

// 4. Physical Progress & Centre Capacity
export interface CenterCapacityItem {
  id: string;
  name: TrilingualText;
  category: "judicial" | "voluntary";
  capacity: number;
  currentInmates: number;
  availableSlots: number;
  occupancyRate: number;
}

export const PHYSICAL_PROGRESS_OVERVIEW = {
  totalAdmittedSince2013: 13408,
  year2026Admitted: 1074,
  period2026: "2026.01.01 - 2026.10.21",
};

export const CENTRE_CAPACITY_DATA: CenterCapacityItem[] = [
  {
    id: "navodawa-treatment",
    name: {
      si: "නවෝදාව ප්‍රතිකාරක මධ්‍යස්ථානය",
      en: "Navodawa Treatment Centre",
      ta: "நவோதாவா சிகிச்சை மையம்",
    },
    category: "judicial",
    capacity: 500,
    currentInmates: 200,
    availableSlots: 300,
    occupancyRate: 40.0,
  },
  {
    id: "navodawa-tertiary",
    name: {
      si: "නවෝදාව තෘතියික හා වෘත්තීය සාක්ෂරතා මධ්‍යස්ථානය",
      en: "Navodawa Tertiary & Vocational Literacy Centre",
      ta: "நவோதாவா மூன்றாம் நிலை தொழிற்கல்வி மையம்",
    },
    category: "judicial",
    capacity: 400,
    currentInmates: 166,
    availableSlots: 234,
    occupancyRate: 41.5,
  },
  {
    id: "saranga",
    name: {
      si: "සාරංගා මධ්‍යස්ථානය",
      en: "Saranga Centre",
      ta: "சாரங்கா மையம்",
    },
    category: "judicial",
    capacity: 120,
    currentInmates: 116,
    availableSlots: 4,
    occupancyRate: 96.7,
  },
  {
    id: "senapura-voluntary",
    name: {
      si: "ස්වේච්ඡා පුනරුත්ථාපන මධ්‍යස්ථානය (සේනපුර)",
      en: "Voluntary Rehabilitation Centre (Senapura)",
      ta: "சுயவிருப்ப புனர்வாழ்வு மையம் (சேனபுர)",
    },
    category: "voluntary",
    capacity: 100,
    currentInmates: 37,
    availableSlots: 63,
    occupancyRate: 37.0,
  },
];

export const CAPACITY_TOTALS = {
  judicial: {
    capacity: 1020,
    currentInmates: 482,
    availableSlots: 538,
    occupancyRate: 47.3,
  },
  voluntary: {
    capacity: 100,
    currentInmates: 37,
    availableSlots: 63,
    occupancyRate: 37.0,
  },
  overall: {
    capacity: 1120,
    currentInmates: 519,
    availableSlots: 601,
    occupancyRate: 46.3,
  },
};

// 5. Treatment Programs and Vocational Courses
export interface TreatmentProgramItem {
  id: string;
  title: TrilingualText;
  count: number;
  percentage: number;
  color: string;
}

export const TREATMENT_PROGRAMS_DATA: TreatmentProgramItem[] = [
  {
    id: "prog-counseling",
    title: {
      si: "උපදේශන වැඩසටහන් (කණ්ඩායම් උපදේශනය, චිකිත්සා, අභිප්‍රේරණ)",
      en: "Counseling (Group Therapy, Psychotherapy, Motivation)",
      ta: "ஆலோசனைத் திட்டங்கள் (குழு ஆலோசனை, உளவியல் சிகிச்சை, ஊக்கம்)",
    },
    count: 101,
    percentage: 24.0,
    color: "#882637",
  },
  {
    id: "prog-beyond-rehab",
    title: {
      si: "\"පුනරුත්ථාපනයෙන් ඔබ්බට\" වැඩසටහන්",
      en: "\"Beyond Rehabilitation\" Life-Readiness Programs",
      ta: "\"புனர்வாழ்வுக்கு அப்பால்\" வாழ்க்கைத்திறன் திட்டங்கள்",
    },
    count: 85,
    percentage: 20.2,
    color: "#059669",
  },
  {
    id: "prog-thai-language",
    title: {
      si: "තෛයි භාෂා පුහුණු වැඩසටහන්",
      en: "Thai Language Immersion Training",
      ta: "தாய் மொழிப் பயிற்சித் திட்டங்கள்",
    },
    count: 74,
    percentage: 17.6,
    color: "#D97706",
  },
  {
    id: "prog-national-festivals",
    title: {
      si: "ජාතික උත්සව හා ආගමික වැඩසටහන්",
      en: "National Festivals & Cultural/Religious Observances",
      ta: "தேசிய விழாக்கள் மற்றும் மத ரீதியான நிகழ்வுகள்",
    },
    count: 70,
    percentage: 16.7,
    color: "#2563EB",
  },
  {
    id: "prog-vocational",
    title: {
      si: "වෘත්තීය පුහුණු පාඨමාලා",
      en: "Certified Vocational Training Courses",
      ta: "தொழில்நுட்ப மற்றும் தொழிற்பயிற்சி படிப்புகள்",
    },
    count: 32,
    percentage: 7.6,
    color: "#7C3AED",
  },
  {
    id: "prog-yoga",
    title: {
      si: "යෝගා සහ ශාරීරික සුවතා වැඩසටහන්",
      en: "Yoga & Holistic Mindfulness Sessions",
      ta: "யோகா மற்றும் உடல்நலப் பயிற்சிகள்",
    },
    count: 24,
    percentage: 5.7,
    color: "#0D9488",
  },
  {
    id: "prog-aesthetic",
    title: {
      si: "සෞන්දර්ය හා සංස්කෘතික වැඩසටහන්",
      en: "Aesthetic, Music & Expressive Arts Therapy",
      ta: "நுண்கலை, இசை மற்றும் அழகியல் சிகிச்சைகள்",
    },
    count: 15,
    percentage: 3.6,
    color: "#DB2777",
  },
  {
    id: "prog-spiritual",
    title: {
      si: "අධ්‍යාත්මික සුවපත් කිරීමේ වැඩසටහන්",
      en: "Spiritual Healing & Moral Elevation",
      ta: "ஆன்மீக சிகிச்சை மற்றும் நல்வாழ்வு திட்டங்கள்",
    },
    count: 7,
    percentage: 1.7,
    color: "#4F46E5",
  },
  {
    id: "prog-sports",
    title: {
      si: "ක්‍රීඩා සහ කණ්ඩායම් හැඟීම නංවන වැඩසටහන්",
      en: "Sports, Fitness & Recreational Activities",
      ta: "விளையாட்டு மற்றும் குழு உணர்வு மேம்பாட்டு நிகழ்வுகள்",
    },
    count: 6,
    percentage: 1.4,
    color: "#EA580C",
  },
  {
    id: "prog-leadership",
    title: {
      si: "නායකත්ව හා පෞරුෂත්ව සංවර්ධන වැඩසටහන්",
      en: "Leadership & Personality Development",
      ta: "தலைமைத்துவம் மற்றும் ஆளுமை மேம்பாட்டுப் பயிற்சிகள்",
    },
    count: 4,
    percentage: 1.0,
    color: "#65A30D",
  },
  {
    id: "prog-excursions",
    title: {
      si: "අධ්‍යාපන සහ නිරීක්ෂණ සංචාර",
      en: "Educational Exposure Excursions",
      ta: "கல்வி மற்றும் கள விஜயங்கள்",
    },
    count: 1,
    percentage: 0.2,
    color: "#0284C7",
  },
  {
    id: "prog-special-talents",
    title: {
      si: "විශේෂ හැකියාවන් එළි දැක්වීමේ වැඩසටහන්",
      en: "Special Talents & Innovation Showcase",
      ta: "சிறப்பு திறமைகளை வெளிப்படுத்தும் நிகழ்வுகள்",
    },
    count: 1,
    percentage: 0.2,
    color: "#9333EA",
  },
];

export const TOTAL_PROGRAMS_COUNT = 420;
export const VOCATIONAL_COURSES_COUNT = 12;

// 6. Social Reintegration Timeline
export interface MonthlyReintegrationItem {
  monthKey: string;
  name: TrilingualText;
  count: number;
}

export const REINTEGRATION_2026_MONTHLY: MonthlyReintegrationItem[] = [
  { monthKey: "jan", name: { si: "ජනවාරි", en: "January", ta: "ஜனவரி" }, count: 129 },
  { monthKey: "feb", name: { si: "පෙබරවාරි", en: "February", ta: "பெப்ரவரி" }, count: 127 },
  { monthKey: "mar", name: { si: "මාර්තු", en: "March", ta: "மார்ச்" }, count: 130 },
  { monthKey: "apr", name: { si: "අප්‍රේල්", en: "April", ta: "ஏப்ரல்" }, count: 121 },
  { monthKey: "may", name: { si: "මැයි", en: "May", ta: "மே" }, count: 184 },
  { monthKey: "jun", name: { si: "ජුනි", en: "June", ta: "ஜூன்" }, count: 22 },
  { monthKey: "jul", name: { si: "ජුලි", en: "July", ta: "ஜூலை" }, count: 209 },
  { monthKey: "aug", name: { si: "අගෝස්තු", en: "August", ta: "ஆகஸ்ட்" }, count: 102 },
  { monthKey: "sep", name: { si: "සැප්තැම්බර්", en: "September", ta: "செப்டம்பர்" }, count: 120 },
  { monthKey: "oct", name: { si: "ඔක්තෝබර්", en: "October (to 21st)", ta: "ஒக்டோபர் (21 வரை)" }, count: 56 },
];

export const REINTEGRATION_TOTALS = {
  cumulativeSince2013: 10859,
  year2026Total: 1200,
  peakMonth: {
    month: { si: "ජුලි", en: "July", ta: "ஜூலை" },
    count: 209,
  },
};

// 7. Voluntary Inpatient Care (Senapura Center)
export const VOLUNTARY_SENAPURA_DATA = {
  centerName: {
    si: "නවෝදාව තෘතීය සහ වෘත්තීය සාක්ෂරතා පුහුණු මධ්‍යස්ථානය - සේනපුර",
    en: "Navodawa Tertiary & Vocational Literacy Training Centre - Senapura",
    ta: "நவோதாவா மூன்றாம் நிலை மற்றும் தொழிற்கல்வி பயிற்சி மையம் - சேனபுர",
  },
  establishedDate: "2025.10.16",
  durationMonths: 3,
  concurrentCapacity: 100,
  year2026Referred: 94,
  year2026Reintegrated: 59,
  currentInCare: 35,
  reintegrationRate: 62.8,
  highlights: [
    {
      title: {
        si: "ස්වේච්ඡා ප්‍රවේශය",
        en: "Voluntary Admission",
        ta: "சுயவிருப்ப சேர்க்கை",
      },
      desc: {
        si: "නීතිමය බියකින් තොරව ස්වකැමැත්තෙන් ප්‍රතිකාර ලබාගැනීමට ඇති අයිතිය සහතික කරයි.",
        en: "Guarantees medical and psychological support without fear of legal prosecution or criminal stigma.",
        ta: "சட்ட ரீதியான பயமின்றி சுயமாக முன்வந்து சிகிச்சை பெறுவதற்கான உரிமையை உறுதிசெய்கிறது.",
      },
    },
    {
      title: {
        si: "මාස 3ක නේවාසික ප්‍රතිකාර",
        en: "3-Month Intensive Course",
        ta: "3 மாத உறைவிட சிகிச்சை",
      },
      desc: {
        si: "සම්පූර්ණ වෛද්‍ය, මනෝවිද්‍යාත්මක සහ වෘත්තීය පුහුණු පැකේජයක් සහිත නේවාසික වැඩසටහන.",
        en: "Structured curriculum encompassing clinical detox, counseling, wellness, and practical trade mastery.",
        ta: "முழுமையான மருத்துவ, உளவியல் மற்றும் தொழில்சார் பயிற்சிகளைக் கொண்ட உறைவிடத் திட்டம்.",
      },
    },
    {
      title: {
        si: "සමාජයට ගෞරවාන්විතව යොමු කිරීම",
        en: "Dignified Reintegration",
        ta: "கௌரவமான சமூக மீள் ஒருங்கிணைப்பு",
      },
      desc: {
        si: "පාඨමාලාව සාර්ථකව අවසන් කළ 59 දෙනෙකු ස්වාධීන ආර්ථික ජීවිතයක් සඳහා සමාජගත කර ඇත.",
        en: "59 individuals graduated in 2026 with certified skills ready to re-enter family and economic life.",
        ta: "பாடநெறியை வெற்றிகரமாக நிறைவுசெய்த 59 பேர் சுயாதீன பொருளாதார வாழ்விற்காக சமூகமயப்படுத்தப்பட்டுள்ளனர்.",
      },
    },
  ],
};

// 8. Post-Rehabilitation and Aftercare Process
export interface AftercareDistrictItem {
  id: string;
  coordinatingOffice: TrilingualText;
  district: TrilingualText;
  reintegrated: number;
  followedUp: number;
  followUpRate: number;
}

export const AFTERCARE_DATA: AftercareDistrictItem[] = [
  { id: "af-1", coordinatingOffice: { si: "අනුරාධපුරය", en: "Anuradhapura", ta: "அனுராதபுரம்" }, district: { si: "අනුරාධපුරය", en: "Anuradhapura", ta: "அனுராதபுரம்" }, reintegrated: 249, followedUp: 249, followUpRate: 100.0 },
  { id: "af-2", coordinatingOffice: { si: "මඩකලපුව", en: "Batticaloa", ta: "மட்டக்களப்பு" }, district: { si: "අම්පාර", en: "Ampara", ta: "அம்பாறை" }, reintegrated: 55, followedUp: 26, followUpRate: 47.3 },
  { id: "af-3", coordinatingOffice: { si: "මඩකලපුව", en: "Batticaloa", ta: "மட்டக்களப்பு" }, district: { si: "මඩකලපුව", en: "Batticaloa", ta: "மட்டக்களப்பு" }, reintegrated: 71, followedUp: 69, followUpRate: 97.2 },
  { id: "af-4", coordinatingOffice: { si: "කොළඹ - උතුර", en: "Colombo North", ta: "கொழும்பு வடக்கு" }, district: { si: "කොළඹ", en: "Colombo", ta: "கொழும்பு" }, reintegrated: 1524, followedUp: 1508, followUpRate: 98.9 },
  { id: "af-5", coordinatingOffice: { si: "කොළඹ - දකුණ", en: "Colombo South", ta: "கொழும்பு தெற்கு" }, district: { si: "කොළඹ", en: "Colombo", ta: "கொழும்பு" }, reintegrated: 1286, followedUp: 1254, followUpRate: 97.5 },
  { id: "af-6", coordinatingOffice: { si: "ගාල්ල", en: "Galle", ta: "காலி" }, district: { si: "ගාල්ල", en: "Galle", ta: "காலி" }, reintegrated: 1246, followedUp: 1229, followUpRate: 98.6 },
  { id: "af-7", coordinatingOffice: { si: "ගම්පහ", en: "Gampaha", ta: "கம்பஹா" }, district: { si: "ගම්පහ", en: "Gampaha", ta: "கம்பஹா" }, reintegrated: 2021, followedUp: 1942, followUpRate: 96.1 },
  { id: "af-8", coordinatingOffice: { si: "ගම්පහ", en: "Gampaha", ta: "கம்பஹா" }, district: { si: "මාතර", en: "Matara", ta: "மாத்தறை" }, reintegrated: 160, followedUp: 142, followUpRate: 88.8 },
  { id: "af-9", coordinatingOffice: { si: "හම්බන්තොට", en: "Hambantota", ta: "அம்பாந்தோட்டை" }, district: { si: "හම්බන්තොට", en: "Hambantota", ta: "அம்பாந்தோட்டை" }, reintegrated: 161, followedUp: 154, followUpRate: 95.7 },
  { id: "af-10", coordinatingOffice: { si: "හම්බන්තොට", en: "Hambantota", ta: "அம்பாந்தோட்டை" }, district: { si: "මොණරාගල", en: "Monaragala", ta: "மொணராகலை" }, reintegrated: 44, followedUp: 42, followUpRate: 95.5 },
  { id: "af-11", coordinatingOffice: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, district: { si: "මුලතිව්", en: "Mullaitivu", ta: "முல்லைத்தீவு" }, reintegrated: 152, followedUp: 147, followUpRate: 96.7 },
  { id: "af-12", coordinatingOffice: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, district: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, reintegrated: 209, followedUp: 205, followUpRate: 98.1 },
  { id: "af-13", coordinatingOffice: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, district: { si: "මන්නාරම", en: "Mannar", ta: "மன்னார்" }, reintegrated: 28, followedUp: 20, followUpRate: 71.4 },
  { id: "af-14", coordinatingOffice: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, district: { si: "කිළිනොච්චිය", en: "Kilinochchi", ta: "கிளிநொச்சி" }, reintegrated: 89, followedUp: 85, followUpRate: 95.5 },
  { id: "af-15", coordinatingOffice: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, district: { si: "වව්නියාව", en: "Vavuniya", ta: "வவுனியா" }, reintegrated: 32, followedUp: 22, followUpRate: 68.8 },
  { id: "af-16", coordinatingOffice: { si: "කළුතර", en: "Kalutara", ta: "களுத்துறை" }, district: { si: "කළුතර", en: "Kalutara", ta: "களுத்துறை" }, reintegrated: 522, followedUp: 496, followUpRate: 95.0 },
  { id: "af-17", coordinatingOffice: { si: "රත්නපුරය", en: "Ratnapura", ta: "இரத்தினபுரி" }, district: { si: "රත්නපුරය", en: "Ratnapura", ta: "இரத்தினபுரி" }, reintegrated: 95, followedUp: 54, followUpRate: 56.8 },
  { id: "af-18", coordinatingOffice: { si: "මහනුවර", en: "Kandy", ta: "கண்டி" }, district: { si: "මහනුවර", en: "Kandy", ta: "கண்டி" }, reintegrated: 534, followedUp: 480, followUpRate: 89.9 },
  { id: "af-19", coordinatingOffice: { si: "මහනුවර", en: "Kandy", ta: "கண்டி" }, district: { si: "මාතලේ", en: "Matale", ta: "மாத்தளை" }, reintegrated: 154, followedUp: 83, followUpRate: 53.9 },
  { id: "af-20", coordinatingOffice: { si: "බදුල්ල", en: "Badulla", ta: "பதுளை" }, district: { si: "බදුල්ල", en: "Badulla", ta: "பதுளை" }, reintegrated: 35, followedUp: 32, followUpRate: 91.4 },
  { id: "af-21", coordinatingOffice: { si: "බදුල්ල", en: "Badulla", ta: "பதுளை" }, district: { si: "නුවර එළිය", en: "Nuwara Eliya", ta: "நுவரெலியா" }, reintegrated: 40, followedUp: 20, followUpRate: 50.0 },
  { id: "af-22", coordinatingOffice: { si: "කුරුණෑගල", en: "Kurunegala", ta: "குருநாகல்" }, district: { si: "කුරුණෑගල", en: "Kurunegala", ta: "குருநாகல்" }, reintegrated: 755, followedUp: 738, followUpRate: 97.7 },
  { id: "af-23", coordinatingOffice: { si: "කුරුණෑගල", en: "Kurunegala", ta: "குருநாகல்" }, district: { si: "කෑගල්ල", en: "Kegalle", ta: "கேகாலை" }, reintegrated: 154, followedUp: 136, followUpRate: 88.3 },
  { id: "af-24", coordinatingOffice: { si: "පොළොන්නරුව", en: "Polonnaruwa", ta: "பொலன்னறுவை" }, district: { si: "පොළොන්නරුව", en: "Polonnaruwa", ta: "பொலன்னறுவை" }, reintegrated: 105, followedUp: 95, followUpRate: 90.5 },
  { id: "af-25", coordinatingOffice: { si: "පොළොන්නරුව", en: "Polonnaruwa", ta: "பொலன்னறுவை" }, district: { si: "ත්‍රිකුණාමලය", en: "Trincomalee", ta: "திருகோணமலை" }, reintegrated: 42, followedUp: 30, followUpRate: 71.4 },
  { id: "af-26", coordinatingOffice: { si: "පුත්තලම", en: "Puttalam", ta: "புத்தளம்" }, district: { si: "පුත්තලම", en: "Puttalam", ta: "புத்தளம்" }, reintegrated: 1096, followedUp: 1021, followUpRate: 93.2 },
];

export const AFTERCARE_TOTALS = {
  totalReintegrated: 10859,
  totalFollowedUp: 10279,
  nationalRetentionRate: 94.7,
  totalCoordinatingOffices: 15,
};

// 9. Drug Prevention Awareness Programs
export interface PreventionDistrictItem {
  id: string;
  district: TrilingualText;
  schoolPrograms: number;
  studentsReached: number;
  communityPrograms: number;
  communityReached: number;
  totalPrograms: number;
  totalReached: number;
}

export const PREVENTION_DATA: PreventionDistrictItem[] = [
  { id: "pr-1", district: { si: "අනුරාධපුරය", en: "Anuradhapura", ta: "அனுராதபுரம்" }, schoolPrograms: 38, studentsReached: 9415, communityPrograms: 68, communityReached: 33517, totalPrograms: 106, totalReached: 42932 },
  { id: "pr-2", district: { si: "මඩකලපුව", en: "Batticaloa", ta: "மட்டக்களப்பு" }, schoolPrograms: 5, studentsReached: 430, communityPrograms: 16, communityReached: 725, totalPrograms: 21, totalReached: 1155 },
  { id: "pr-3", district: { si: "කොළඹ (උතුර)", en: "Colombo (North)", ta: "கொழும்பு (வடக்கு)" }, schoolPrograms: 46, studentsReached: 8670, communityPrograms: 60, communityReached: 7284, totalPrograms: 106, totalReached: 15954 },
  { id: "pr-4", district: { si: "කොළඹ (දකුණ)", en: "Colombo (South)", ta: "கொழும்பு (தெற்கு)" }, schoolPrograms: 29, studentsReached: 5962, communityPrograms: 44, communityReached: 3028, totalPrograms: 73, totalReached: 8990 },
  { id: "pr-5", district: { si: "ගාල්ල", en: "Galle", ta: "காலி" }, schoolPrograms: 23, studentsReached: 4460, communityPrograms: 60, communityReached: 38801, totalPrograms: 83, totalReached: 43261 },
  { id: "pr-6", district: { si: "ගම්පහ", en: "Gampaha", ta: "கம்பஹா" }, schoolPrograms: 28, studentsReached: 2913, communityPrograms: 25, communityReached: 9996, totalPrograms: 53, totalReached: 12909 },
  { id: "pr-7", district: { si: "හම්බන්තොට", en: "Hambantota", ta: "அம்பாந்தோட்டை" }, schoolPrograms: 25, studentsReached: 5657, communityPrograms: 54, communityReached: 6663, totalPrograms: 79, totalReached: 12320 },
  { id: "pr-8", district: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, schoolPrograms: 5, studentsReached: 775, communityPrograms: 48, communityReached: 3675, totalPrograms: 53, totalReached: 4450 },
  { id: "pr-9", district: { si: "කළුතර", en: "Kalutara", ta: "களுத்துறை" }, schoolPrograms: 17, studentsReached: 2360, communityPrograms: 18, communityReached: 1800, totalPrograms: 35, totalReached: 4160 },
  { id: "pr-10", district: { si: "මහනුවර", en: "Kandy", ta: "கண்டி" }, schoolPrograms: 19, studentsReached: 3972, communityPrograms: 64, communityReached: 10092, totalPrograms: 83, totalReached: 14064 },
  { id: "pr-11", district: { si: "කුරුණෑගල", en: "Kurunegala", ta: "குருநாகல்" }, schoolPrograms: 28, studentsReached: 5332, communityPrograms: 56, communityReached: 20289, totalPrograms: 84, totalReached: 25621 },
  { id: "pr-12", district: { si: "පොළොන්නරුව", en: "Polonnaruwa", ta: "பொலன்னறுவை" }, schoolPrograms: 13, studentsReached: 1454, communityPrograms: 25, communityReached: 615, totalPrograms: 38, totalReached: 2069 },
  { id: "pr-13", district: { si: "පුත්තලම", en: "Puttalam", ta: "புத்தளம்" }, schoolPrograms: 36, studentsReached: 8929, communityPrograms: 52, communityReached: 14992, totalPrograms: 88, totalReached: 23921 },
  { id: "pr-14", district: { si: "රත්නපුර", en: "Ratnapura", ta: "இரத்தினபுரி" }, schoolPrograms: 5, studentsReached: 1380, communityPrograms: 16, communityReached: 7025, totalPrograms: 21, totalReached: 8405 },
  { id: "pr-15", district: { si: "බදුල්ල", en: "Badulla", ta: "பதுளை" }, schoolPrograms: 16, studentsReached: 3319, communityPrograms: 29, communityReached: 31025, totalPrograms: 45, totalReached: 34344 },
];

export const PREVENTION_TOTALS = {
  totalSchoolPrograms: 333,
  totalStudentsReached: 65028,
  totalCommunityPrograms: 635,
  totalCommunityReached: 189527,
  totalPrograms: 968,
  totalReached: 254555,
};

// 10 & 11. Welfare and "Ratama Ekata" National Operation
export interface RatamaEkataDistrictItem {
  id: string;
  district: TrilingualText;
  schoolPrograms: number;
  studentsReached: number;
  communityPrograms: number;
  communityReached: number;
  posterShortPrograms: number;
  posterShortReached: number;
  totalPrograms: number;
  totalReached: number;
}

export const RATAMA_EKATA_DISTRICTS: RatamaEkataDistrictItem[] = [
  { id: "re-1", district: { si: "අනුරාධපුර", en: "Anuradhapura", ta: "அனுராதபுரம்" }, schoolPrograms: 13, studentsReached: 10885, communityPrograms: 7, communityReached: 4188, posterShortPrograms: 15, posterShortReached: 1890, totalPrograms: 66, totalReached: 16993 },
  { id: "re-2", district: { si: "මඩකලපුව", en: "Batticaloa", ta: "மட்டக்களப்பு" }, schoolPrograms: 20, studentsReached: 2795, communityPrograms: 0, communityReached: 0, posterShortPrograms: 0, posterShortReached: 0, totalPrograms: 20, totalReached: 2795 },
  { id: "re-3", district: { si: "කොළඹ (උතුර)", en: "Colombo (North)", ta: "கொழும்பு (வடக்கு)" }, schoolPrograms: 6, studentsReached: 6550, communityPrograms: 2, communityReached: 310, posterShortPrograms: 4, posterShortReached: 285, totalPrograms: 47, totalReached: 11045 },
  { id: "re-4", district: { si: "කොළඹ (දකුණ)", en: "Colombo (South)", ta: "கொழும்பு (தெற்கு)" }, schoolPrograms: 15, studentsReached: 17190, communityPrograms: 4, communityReached: 800, posterShortPrograms: 7, posterShortReached: 3870, totalPrograms: 204, totalReached: 48560 },
  { id: "re-5", district: { si: "ගාල්ල", en: "Galle", ta: "காலி" }, schoolPrograms: 31, studentsReached: 16125, communityPrograms: 2, communityReached: 400, posterShortPrograms: 1, posterShortReached: 83, totalPrograms: 85, totalReached: 16708 },
  { id: "re-6", district: { si: "ගම්පහ", en: "Gampaha", ta: "கம்பஹா" }, schoolPrograms: 3, studentsReached: 3750, communityPrograms: 5, communityReached: 2825, posterShortPrograms: 7, posterShortReached: 4200, totalPrograms: 185, totalReached: 20675 },
  { id: "re-7", district: { si: "හම්බන්තොට", en: "Hambantota", ta: "அம்பாந்தோட்டை" }, schoolPrograms: 13, studentsReached: 6360, communityPrograms: 4, communityReached: 523, posterShortPrograms: 6, posterShortReached: 882, totalPrograms: 26, totalReached: 7918 },
  { id: "re-8", district: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, schoolPrograms: 15, studentsReached: 2720, communityPrograms: 0, communityReached: 0, posterShortPrograms: 0, posterShortReached: 0, totalPrograms: 15, totalReached: 3420 },
  { id: "re-9", district: { si: "කළුතර", en: "Kalutara", ta: "களுத்துறை" }, schoolPrograms: 17, studentsReached: 16750, communityPrograms: 10, communityReached: 2150, posterShortPrograms: 2, posterShortReached: 1100, totalPrograms: 31, totalReached: 24500 },
  { id: "re-10", district: { si: "මහනුවර", en: "Kandy", ta: "கண்டி" }, schoolPrograms: 25, studentsReached: 33530, communityPrograms: 9, communityReached: 3202, posterShortPrograms: 0, posterShortReached: 0, totalPrograms: 159, totalReached: 58732 },
  { id: "re-11", district: { si: "කුරුණෑගල", en: "Kurunegala", ta: "குருநாகல்" }, schoolPrograms: 6, studentsReached: 3050, communityPrograms: 10, communityReached: 5185, posterShortPrograms: 18, posterShortReached: 4115, totalPrograms: 389, totalReached: 23050 },
  { id: "re-12", district: { si: "පොළොන්නරුව", en: "Polonnaruwa", ta: "பொலன்னறுவை" }, schoolPrograms: 5, studentsReached: 320, communityPrograms: 4, communityReached: 443, posterShortPrograms: 11, posterShortReached: 652, totalPrograms: 50, totalReached: 5415 },
  { id: "re-13", district: { si: "පුත්තලම", en: "Puttalam", ta: "புத்தளம்" }, schoolPrograms: 8, studentsReached: 4050, communityPrograms: 3, communityReached: 1450, posterShortPrograms: 3, posterShortReached: 200, totalPrograms: 164, totalReached: 9700 },
  { id: "re-14", district: { si: "රත්නපුර", en: "Ratnapura", ta: "இரத்தினபுரி" }, schoolPrograms: 9, studentsReached: 6050, communityPrograms: 3, communityReached: 1060, posterShortPrograms: 4, posterShortReached: 352, totalPrograms: 36, totalReached: 8462 },
  { id: "re-15", district: { si: "කිලිනොච්චි", en: "Kilinochchi", ta: "கிளிநொச்சி" }, schoolPrograms: 4, studentsReached: 800, communityPrograms: 0, communityReached: 0, posterShortPrograms: 0, posterShortReached: 0, totalPrograms: 4, totalReached: 800 },
  { id: "re-16", district: { si: "මුලතිව්", en: "Mullaitivu", ta: "முல்லைத்தீவு" }, schoolPrograms: 2, studentsReached: 350, communityPrograms: 0, communityReached: 0, posterShortPrograms: 0, posterShortReached: 0, totalPrograms: 2, totalReached: 350 },
  { id: "re-17", district: { si: "වව්නියාව", en: "Vavuniya", ta: "வவுனியா" }, schoolPrograms: 1, studentsReached: 200, communityPrograms: 0, communityReached: 0, posterShortPrograms: 0, posterShortReached: 0, totalPrograms: 1, totalReached: 200 },
];

export const RATAMA_EKATA_TOTALS = {
  schoolPrograms: 193,
  studentsReached: 131475,
  communityPrograms: 63,
  communityReached: 22536,
  posterShortPrograms: 78,
  posterShortReached: 17629,
  totalPrograms: 1484,
  totalReached: 259323,
};

export const COUNSELOR_WORKSHOPS = [
  { district: { si: "ගම්පහ", en: "Gampaha", ta: "கம்பஹா" }, date: "2025.10.14" },
  { district: { si: "ගාල්ල", en: "Galle", ta: "காலி" }, date: "2026.01.21" },
  { district: { si: "පොළොන්නරුව", en: "Polonnaruwa", ta: "பொலன்னறுவை" }, date: "2026.03.05" },
  { district: { si: "යාපනය", en: "Jaffna", ta: "யாழ்ப்பாணம்" }, date: "2026.07.21" },
  { district: { si: "මහනුවර", en: "Kandy", ta: "கண்டி" }, date: "2026.09.18" },
  { district: { si: "රත්නපුර", en: "Ratnapura", ta: "இரத்தினபுரி" }, date: "2026.10.02" },
  { district: { si: "පුත්තලම", en: "Puttalam", ta: "புத்தளம்" }, date: "2026.10.14" },
];

export const KEY_EVENTS = [
  {
    date: "2026.03.03",
    title: {
      si: "කොළඹ කොටුව දුම්රිය ස්ථානයේ අත්පත්‍රිකා බෙදාදීම",
      en: "Public Awareness at Colombo Fort Railway Station",
      ta: "கொழும்பு கோட்டை ரயில் நிலையத்தில் துண்டுப்பிரசுர விநியோகம்",
    },
    desc: {
      si: "දෛනිකව ගමන් ගන්නා දහස් සංඛ්‍යාත මගී ජනතාව ඉලක්ක කරගත් ප්‍රධාන දැනුවත් කිරීමේ මෙහෙයුමක්.",
      en: "Mass commuter engagement drive distributing educational leaflets on drug dangers and confidential hotlines.",
      ta: "தினசரி பயணிக்கும் ஆயிரக்கணக்கான பிரயாணிகளை இலக்காகக் கொண்ட விழிப்புணர்வு மற்றும் துண்டுப்பிரசுர விநியோகம்.",
    },
  },
  {
    date: "2026.06.18",
    title: {
      si: "මට්ටක්කුලිය ක්‍රීඩාංගනයේ ප්‍රදර්ශන කුටියක් ක්‍රියාත්මක කිරීම",
      en: "Interactive Exhibition Stall at Mattakkuliya Stadium",
      ta: "மட்டக்குளி மைதானத்தில் விழிப்புணர்வு கண்காட்சி கூடம்",
    },
    desc: {
      si: "තරුණ ප්‍රජාව සහ ක්‍රීඩකයින් දැනුවත් කිරීම සඳහා විශේෂ අධ්‍යාපනික ප්‍රදර්ශන කුටියක් පිහිටුවීම.",
      en: "Live demonstration and counselor interactive kiosk engaging urban youth during community sports tournaments.",
      ta: "இளைஞர்கள் மற்றும் விளையாட்டு வீரர்களை விழிப்புணர்வூட்ட விசேட கண்காட்சிக் கூடம் நடாத்துதல்.",
    },
  },
  {
    date: "2026.06.26",
    title: {
      si: "ජාත්‍යන්තර මත්ද්‍රව්‍ය විරෝධී දින ජාතික වැඩසටහන් මාලාව",
      en: "International Day Against Drug Abuse Island-wide Operations",
      ta: "சர்வதேச போதைப்பொருள் எதிர்ப்பு தின தேசிய நிகழ்வுகள்",
    },
    desc: {
      si: "දිස්ත්‍රික් කාර්යාල මගින් අත්පත්‍රිකා බෙදාදීම, පෝස්ටර් ප්‍රදර්ශනය සහ මත්ද්‍රව්‍ය විරෝධී දැවැන්ත පාගමන.",
      en: "Nationwide rally, mass poster campaigns, public pledge ceremonies, and community solidarity marches.",
      ta: "மாவட்ட அலுவலகங்கள் ஊடாக துண்டுப்பிரசுர விநியோகம், சுவரொட்டி கண்காட்சி மற்றும் போதைப்பொருள் எதிர்ப்பு பேரணி.",
    },
  },
  {
    date: "2026.08.21",
    title: {
      si: "මීගමුව ඒකාබද්ධ ප්‍රජා දැනුවත් කිරීමේ වැඩසටහන",
      en: "Integrated Community Mobilization Drive in Negombo",
      ta: "நீர்கொழும்பு ஒருங்கிணைந்த சமூக விழிப்புணர்வு திட்டம்",
    },
    desc: {
      si: "වෙරළබඩ හා ධීවර ප්‍රජාව ඉලක්ක කරගත් ඒකාබද්ධ නිවාරණ සහ පසු විපරම් වැඩසටහනක් ක්‍රියාත්මක කිරීම.",
      en: "Targeted cross-agency outreach addressing vulnerable coastal settlements and fisheries communities.",
      ta: "கடலோர மற்றும் மீனவ சமூகங்களை இலக்காகக் கொண்ட ஒருங்கிணைந்த தடுப்பு மற்றும் விழிப்புணர்வு நடவடிக்கை.",
    },
  },
];

// 12. Physical Development & Capital Budget Allocations
export interface CapitalProjectItem {
  id: string;
  description: TrilingualText;
  amountLkr: number;
  sharePercentage: number;
  category: "land" | "accommodation" | "sanitation";
  color: string;
}

export const CAPITAL_PROJECTS_DATA: CapitalProjectItem[] = [
  {
    id: "cap-narangallegama",
    description: {
      si: "නාරංගල්ලේගම පිහිටි හෙක්ටයාර් 9.9209 ඉඩම පවරා ගැනීම සහ අලුත්වැඩියාව (පුද්ගලයින් 200ක් සඳහා)",
      en: "Acquisition and comprehensive refurbishment of 9.9209 Hectares land at Narangallegama (for 200 residents)",
      ta: "நாரங்கல்லேகமவில் அமைந்துள்ள 9.9209 ஹெக்டேயர் நிலத்தை கையகப்படுத்துதல் மற்றும் புனரமைத்தல் (200 நபர்களுக்கு)",
    },
    amountLkr: 72220094,
    sharePercentage: 82.32,
    category: "land",
    color: "#882637",
  },
  {
    id: "cap-officer-quarters-2",
    description: {
      si: "100'x32' අංක 02 නිලධාරි නිවස්නයේ කටයුතු අවසන් කිරීම",
      en: "Completion of 100'x32' Officer Quarters Complex No. 02",
      ta: "100'x32' இலக்கம் 02 உத்தியோகத்தர் குடியிருப்பு பணிகளை நிறைவு செய்தல்",
    },
    amountLkr: 5252131,
    sharePercentage: 5.99,
    category: "accommodation",
    color: "#2563EB",
  },
  {
    id: "cap-counseling-hostel-3",
    description: {
      si: "100'x32' අංක 03 සහය උපදේශන නේවාසිකාගාරයේ කටයුතු අවසන් කිරීම",
      en: "Completion of 100'x32' Assistant Counseling Hostel No. 03",
      ta: "100'x32' இலக்கம் 03 உதவி ஆலோசனை விடுதி பணிகளை நிறைவு செய்தல்",
    },
    amountLkr: 4513650,
    sharePercentage: 5.14,
    category: "accommodation",
    color: "#7C3AED",
  },
  {
    id: "cap-officer-quarters-1",
    description: {
      si: "100'x32' අංක 01 නිලධාරි නිවස්නයේ කටයුතු අවසන් කිරීම",
      en: "Completion of 100'x32' Officer Quarters Complex No. 01",
      ta: "100'x32' இலக்கம் 01 உத்தியோகத்தர் குடியிருப்பு பணிகளை நிறைவு செய்தல்",
    },
    amountLkr: 3332993,
    sharePercentage: 3.80,
    category: "accommodation",
    color: "#059669",
  },
  {
    id: "cap-toilet-system-inmates",
    description: {
      si: "පුනරුත්ථාපන ලාභීන් සඳහා 40'x15' වැසිකිළි පද්ධතියක් ඉදිකිරීම",
      en: "Construction of dedicated 40'x15' modern sanitary toilet block for beneficiaries",
      ta: "புனர்வாழ்வு பெறுவோருக்கான 40'x15' நவீன மலசலகூடத் தொகுதியை நிர்மாணித்தல்",
    },
    amountLkr: 1279131,
    sharePercentage: 1.46,
    category: "sanitation",
    color: "#D97706",
  },
  {
    id: "cap-shower-facility",
    description: {
      si: "නවෝදාව මධ්‍යස්ථානයේ වතුරමල් 100කින් යුත් නාන ස්ථානයක් ඉදිකිරීම",
      en: "Construction of 100-shower communal bathing facility at Navodawa Centre",
      ta: "நவோதாவா மையத்தில் 100 நீர்த்துளிகளைக் கொண்ட குளியல் இடத்தை அமைத்தல்",
    },
    amountLkr: 1025077,
    sharePercentage: 1.17,
    category: "sanitation",
    color: "#0D9488",
  },
  {
    id: "cap-toilet-renovation",
    description: {
      si: "දැනට තිබෙන වැසිකිළි 06කින් යුත් පද්ධතිය අලුත්වැඩියා කිරීම",
      en: "Complete overhaul and sanitary renovation of existing 6-toilet block",
      ta: "தற்போதுள்ள 06 மலசலகூடங்களைக் கொண்ட தொகுதியை முழுமையாக திருத்துதல்",
    },
    amountLkr: 108000,
    sharePercentage: 0.12,
    category: "sanitation",
    color: "#E11D48",
  },
];

export const TOTAL_CAPITAL_ALLOCATION = 87731076;

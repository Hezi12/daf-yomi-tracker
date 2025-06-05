import { MasechetInfo } from '../types';

export const MASECHET_DATA: MasechetInfo[] = [
  // סדר זרעים
  { name: 'berachot', hebrewName: 'ברכות', totalPages: 64, order: 1 },
  
  // סדר מועד
  { name: 'shabbat', hebrewName: 'שבת', totalPages: 157, order: 2 },
  { name: 'eruvin', hebrewName: 'עירובין', totalPages: 105, order: 3 },
  { name: 'pesachim', hebrewName: 'פסחים', totalPages: 121, order: 4 },
  { name: 'rosh-hashanah', hebrewName: 'ראש השנה', totalPages: 35, order: 5 },
  { name: 'yoma', hebrewName: 'יומא', totalPages: 88, order: 6 },
  { name: 'sukkah', hebrewName: 'סוכה', totalPages: 56, order: 7 },
  { name: 'beitzah', hebrewName: 'ביצה', totalPages: 40, order: 8 },
  { name: 'taanit', hebrewName: 'תענית', totalPages: 31, order: 9 },
  { name: 'megillah', hebrewName: 'מגילה', totalPages: 32, order: 10 },
  { name: 'moed-katan', hebrewName: 'מועד קטן', totalPages: 29, order: 11 },
  { name: 'chagigah', hebrewName: 'חגיגה', totalPages: 27, order: 12 },
  
  // סדר נשים
  { name: 'yevamot', hebrewName: 'יבמות', totalPages: 122, order: 13 },
  { name: 'ketubot', hebrewName: 'כתובות', totalPages: 112, order: 14 },
  { name: 'nedarim', hebrewName: 'נדרים', totalPages: 91, order: 15 },
  { name: 'nazir', hebrewName: 'נזיר', totalPages: 66, order: 16 },
  { name: 'sotah', hebrewName: 'סוטה', totalPages: 49, order: 17 },
  { name: 'gittin', hebrewName: 'גיטין', totalPages: 90, order: 18 },
  { name: 'kiddushin', hebrewName: 'קדושין', totalPages: 82, order: 19 },
  
  // סדר נזיקין
  { name: 'bava-kamma', hebrewName: 'בבא קמא', totalPages: 119, order: 20 },
  { name: 'bava-metzia', hebrewName: 'בבא מציעא', totalPages: 119, order: 21 },
  { name: 'bava-batra', hebrewName: 'בבא בתרא', totalPages: 176, order: 22 },
  { name: 'sanhedrin', hebrewName: 'סנהדרין', totalPages: 113, order: 23 },
  { name: 'makkot', hebrewName: 'מכות', totalPages: 24, order: 24 },
  { name: 'shevuot', hebrewName: 'שבועות', totalPages: 49, order: 25 },
  { name: 'avodah-zarah', hebrewName: 'עבודה זרה', totalPages: 76, order: 26 },
  { name: 'horayot', hebrewName: 'הוריות', totalPages: 14, order: 27 },
  
  // סדר קדשים
  { name: 'zevachim', hebrewName: 'זבחים', totalPages: 120, order: 28 },
  { name: 'menachot', hebrewName: 'מנחות', totalPages: 110, order: 29 },
  { name: 'chullin', hebrewName: 'חולין', totalPages: 142, order: 30 },
  { name: 'bechorot', hebrewName: 'בכורות', totalPages: 61, order: 31 },
  { name: 'arachin', hebrewName: 'ערכין', totalPages: 34, order: 32 },
  { name: 'temurah', hebrewName: 'תמורה', totalPages: 34, order: 33 },
  { name: 'keritot', hebrewName: 'כריתות', totalPages: 28, order: 34 },
  { name: 'meilah', hebrewName: 'מעילה', totalPages: 22, order: 35 },
  
  // סדר טהרות
  { name: 'niddah', hebrewName: 'נדה', totalPages: 73, order: 36 },
];

export const getTotalDafim = (): number => {
  return MASECHET_DATA.reduce((total, masechet) => total + masechet.totalPages, 0);
};

export const getMasechetByName = (name: string): MasechetInfo | undefined => {
  return MASECHET_DATA.find(m => m.name === name || m.hebrewName === name);
};

export const getMasechetOptions = () => {
  return MASECHET_DATA.map(m => ({
    value: m.name,
    label: m.hebrewName,
    totalPages: m.totalPages
  }));
}; 
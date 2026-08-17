export type PhoneCountry = {
  iso: string
  nameRu: string
  nameEn: string
  dial: string
  maskLength: number
  flag: string
}

export const phoneCountries: PhoneCountry[] = [
  { iso: 'RU', nameRu: 'Россия', nameEn: 'Russia', dial: '+7', maskLength: 10, flag: '🇷🇺' },
  { iso: 'KZ', nameRu: 'Казахстан', nameEn: 'Kazakhstan', dial: '+7', maskLength: 10, flag: '🇰🇿' },
  { iso: 'BY', nameRu: 'Беларусь', nameEn: 'Belarus', dial: '+375', maskLength: 9, flag: '🇧🇾' },
  { iso: 'UZ', nameRu: 'Узбекистан', nameEn: 'Uzbekistan', dial: '+998', maskLength: 9, flag: '🇺🇿' },
  { iso: 'UA', nameRu: 'Украина', nameEn: 'Ukraine', dial: '+380', maskLength: 9, flag: '🇺🇦' },
  { iso: 'AZ', nameRu: 'Азербайджан', nameEn: 'Azerbaijan', dial: '+994', maskLength: 9, flag: '🇦🇿' },
  { iso: 'AM', nameRu: 'Армения', nameEn: 'Armenia', dial: '+374', maskLength: 8, flag: '🇦🇲' },
  { iso: 'GE', nameRu: 'Грузия', nameEn: 'Georgia', dial: '+995', maskLength: 9, flag: '🇬🇪' },
  { iso: 'KG', nameRu: 'Кыргызстан', nameEn: 'Kyrgyzstan', dial: '+996', maskLength: 9, flag: '🇰🇬' },
  { iso: 'TJ', nameRu: 'Таджикистан', nameEn: 'Tajikistan', dial: '+992', maskLength: 9, flag: '🇹🇯' },
  { iso: 'TR', nameRu: 'Турция', nameEn: 'Turkey', dial: '+90', maskLength: 10, flag: '🇹🇷' },
  { iso: 'AE', nameRu: 'ОАЭ', nameEn: 'UAE', dial: '+971', maskLength: 9, flag: '🇦🇪' },
  { iso: 'DE', nameRu: 'Германия', nameEn: 'Germany', dial: '+49', maskLength: 11, flag: '🇩🇪' },
  { iso: 'GB', nameRu: 'Великобритания', nameEn: 'United Kingdom', dial: '+44', maskLength: 10, flag: '🇬🇧' },
  { iso: 'US', nameRu: 'США', nameEn: 'USA', dial: '+1', maskLength: 10, flag: '🇺🇸' },
]

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export function formatLocalPhone(digits: string, country: PhoneCountry) {
  const d = digits.slice(0, country.maskLength)

  if (country.dial === '+7' && country.maskLength === 10) {
    const p1 = d.slice(0, 3)
    const p2 = d.slice(3, 6)
    const p3 = d.slice(6, 8)
    const p4 = d.slice(8, 10)
    if (d.length <= 3) return p1
    if (d.length <= 6) return `${p1} ${p2}`
    if (d.length <= 8) return `${p1} ${p2}-${p3}`
    return `${p1} ${p2}-${p3}-${p4}`
  }

  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3, 6)}-${d.slice(6)}`
  return `${d.slice(0, 3)} ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`
}

export function buildFullPhone(country: PhoneCountry, localDigits: string) {
  return `${country.dial}${digitsOnly(localDigits).slice(0, country.maskLength)}`
}

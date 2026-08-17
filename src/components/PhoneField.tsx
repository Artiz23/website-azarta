import { useMemo, useState } from 'react'
import {
  buildFullPhone,
  digitsOnly,
  formatLocalPhone,
  phoneCountries,
  type PhoneCountry,
} from '../data/phoneCountries'
import type { Lang } from '../data/content'

type PhoneFieldProps = {
  lang: Lang
  label: string
  required?: boolean
  onChangePhone: (fullPhone: string, valid: boolean) => void
}

export function PhoneField({ lang, label, required, onChangePhone }: PhoneFieldProps) {
  const [country, setCountry] = useState<PhoneCountry>(phoneCountries[0])
  const [local, setLocal] = useState('')

  const placeholder = useMemo(() => {
    if (country.dial === '+7') return '999 123-45-67'
    return '000 000-00-00'.slice(0, country.maskLength + 4)
  }, [country])

  const sync = (nextCountry: PhoneCountry, nextLocal: string) => {
    const digits = digitsOnly(nextLocal).slice(0, nextCountry.maskLength)
    const formatted = formatLocalPhone(digits, nextCountry)
    setLocal(formatted)
    const full = buildFullPhone(nextCountry, digits)
    const valid = digits.length === nextCountry.maskLength
    onChangePhone(full, valid)
  }

  return (
    <div className="field">
      <label htmlFor="phone-local">{label}</label>
      <div className="phone-field">
        <label className="phone-field__country" aria-label={lang === 'ru' ? 'Страна' : 'Country'}>
          <span className="phone-field__flag" aria-hidden>
            {country.flag}
          </span>
          <select
            className="phone-field__select"
            value={`${country.iso}-${country.dial}`}
            onChange={(e) => {
              const next =
                phoneCountries.find((c) => `${c.iso}-${c.dial}` === e.target.value) ??
                phoneCountries[0]
              setCountry(next)
              sync(next, local)
            }}
          >
            {phoneCountries.map((item) => (
              <option key={`${item.iso}-${item.dial}`} value={`${item.iso}-${item.dial}`}>
                {item.flag} {lang === 'ru' ? item.nameRu : item.nameEn} {item.dial}
              </option>
            ))}
          </select>
          <span className="phone-field__dial">{country.dial}</span>
          <span className="phone-field__chevron" aria-hidden>
            ▾
          </span>
        </label>

        <input
          id="phone-local"
          name="phone_local"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          required={required}
          placeholder={placeholder}
          value={local}
          onChange={(e) => sync(country, e.target.value)}
        />
        <input type="hidden" name="phone" value={buildFullPhone(country, local)} />
      </div>
    </div>
  )
}

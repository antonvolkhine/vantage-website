'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { PHONE_COUNTRIES, COUNTRY_NAMES_DE, COUNTRY_NAMES_RU, SEARCH_PLACEHOLDERS } from '@/lib/phoneCountries';
import type { Lang } from '@/lib/translations';
import type { PhoneCountry } from '@/lib/phoneCountries';

const BACKEND_URL = 'https://api.wifimoney-club.com';

const COPIED_TEXT: Record<string, string> = {
    de: '\u2713 Kopiert!',
    en: '\u2713 Copied!',
    ru: '\u2713 \u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e!',
    pt: '\u2713 Copiado!'
};

function getCountryName(c: PhoneCountry, lang: string): string {
    const code = c[0];
    if (lang === 'de' && (COUNTRY_NAMES_DE as Record<string, string>)[code]) return (COUNTRY_NAMES_DE as Record<string, string>)[code];
    if (lang === 'ru' && (COUNTRY_NAMES_RU as Record<string, string>)[code]) return (COUNTRY_NAMES_RU as Record<string, string>)[code];
    return c[3];
}

function getDefaultCountryCode(lang: string): string {
    return lang === 'ru' ? 'RU' : lang === 'pt' ? 'BR' : 'DE';
}

function findCountry(countryCode: string): PhoneCountry | undefined {
    return PHONE_COUNTRIES.find(c => c[0] === countryCode);
}

// PhoneCodeDropdown
function PhoneCodeDropdown({ lang, selectedFlag, selectedDial, onSelect }: {
    lang: string;
    selectedFlag: string;
    selectedDial: string;
    onSelect: (flag: string, dial: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const wrapRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (open && searchRef.current) {
            searchRef.current.focus();
        }
    }, [open]);

    const q = search.toLowerCase();
    const filtered = q
        ? PHONE_COUNTRIES.filter(c => {
            const name = getCountryName(c, lang);
            return name.toLowerCase().includes(q) || c[2].includes(q) || c[3].toLowerCase().includes(q);
        })
        : PHONE_COUNTRIES;

    return (
        <div className="phone-code-wrap" ref={wrapRef}>
            <button
                type="button"
                className="phone-code-btn form-input"
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); setSearch(''); }}
            >
                <span className="phone-code-flag">{selectedFlag}</span>
                <span className="phone-code-dial">{selectedDial}</span>
                <svg className="phone-code-arrow" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {open && (
                <div className="phone-code-dropdown open">
                    <input
                        ref={searchRef}
                        type="text"
                        className="phone-code-search"
                        autoComplete="off"
                        placeholder={(SEARCH_PLACEHOLDERS as Record<string, string>)[lang] || (SEARCH_PLACEHOLDERS as Record<string, string>).en}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.stopPropagation()}
                    />
                    <div className="phone-code-list">
                        {filtered.map(c => (
                            <div
                                key={c[0] + c[2]}
                                className="phone-code-option"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    onSelect(c[1], c[2]);
                                    setOpen(false);
                                    setSearch('');
                                }}
                            >
                                <span className="phone-code-option-flag">{c[1]}</span>
                                <span className="phone-code-option-name">{getCountryName(c, lang)}</span>
                                <span className="phone-code-option-dial">{c[2]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// CopyButton
function CopyButton({ text, lang }: { text: string; lang: string }) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        const str = text.trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(str).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }).catch(() => fallbackCopy(str));
        } else {
            fallbackCopy(str);
        }
    }

    function fallbackCopy(str: string) {
        try {
            const ta = document.createElement('textarea');
            ta.value = str;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch { /* ignore */ }
    }

    if (copied) {
        return (
            <button type="button" className="copy-btn copied">
                {COPIED_TEXT[lang] || COPIED_TEXT.de}
            </button>
        );
    }

    return (
        <button type="button" className="copy-btn" title="Kopieren" onClick={handleCopy}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
        </button>
    );
}

// SuccessView
function SuccessView({ vantageId, lang, t }: { vantageId: string; lang: string; t: Record<string, string> }) {
    const keyword = 'GO';

    return (
        <section className="register-section">
            <div className="card register-card register-success">
                <div className="success-title-row">
                    <svg className="success-title-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h2 className="success-title">{t.regSuccessTitle}</h2>
                </div>

                <div className="card step-card success-step-card">
                    <div className="step-badge">{t.regSuccessStepBadge}</div>
                    <p className="step-text" dangerouslySetInnerHTML={{ __html: t.regSuccessText }} />
                </div>

                <div className="success-code">
                    <span>{keyword}</span> <span>{vantageId}</span>
                    <CopyButton text={`${keyword} ${vantageId}`} lang={lang} />
                </div>

                <p className="success-example">{t.regSuccessExample}</p>
                <p className="success-note">{t.regSuccessNote}</p>

                <div className="success-warning">
                    <p dangerouslySetInnerHTML={{ __html: t.regSuccessWarning }} />
                </div>

                <a href="https://t.me/WifiMoneySupportBot" target="_blank" rel="noopener noreferrer" className="btn register-btn">
                    {t.regSuccessTelegramBtn}
                </a>
            </div>
        </section>
    );
}

// Register (Main)
export default function RegisterPage() {
    const { lang, t } = useLang();

    useEffect(() => {
        if (t.regPageTitle) document.title = t.regPageTitle;
        return () => { if (t.pageTitle) document.title = t.pageTitle; };
    }, [t]);

    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorKey, setErrorKey] = useState<string | null>(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [referredBy, setReferredBy] = useState('');
    const [formLang, setFormLang] = useState<string>(lang);
    const [vantageId, setVantageId] = useState('');
    const [telegram, setTelegram] = useState('');
    const [privacy, setPrivacy] = useState(false);

    const defaultCountry = findCountry(getDefaultCountryCode(lang));
    const [phoneFlag, setPhoneFlag] = useState(defaultCountry ? defaultCountry[1] : '\ud83c\udde9\ud83c\uddea');
    const [phoneDial, setPhoneDial] = useState(defaultCountry ? defaultCountry[2] : '+49');

    useEffect(() => {
        setFormLang(lang);
    }, [lang]);

    useEffect(() => {
        const c = findCountry(getDefaultCountryCode(lang));
        if (c) {
            setPhoneFlag(c[1]);
            setPhoneDial(c[2]);
        }
    }, [lang]);

    const handlePhoneSelect = useCallback((flag: string, dial: string) => {
        setPhoneFlag(flag);
        setPhoneDial(dial);
    }, []);

    function validate(): boolean {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim() || !vantageId.trim() || !telegram.trim() || !privacy) {
            setErrorKey('regErrRequired');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setErrorKey('regErrEmail');
            return false;
        }
        if (!referredBy.trim()) {
            setErrorKey('regErrReferredBy');
            return false;
        }
        if (!/^[0-9]+$/.test(vantageId.trim())) {
            setErrorKey('regErrRequired');
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorKey(null);

        if (!validate()) return;

        setSubmitting(true);

        const fullPhone = phoneDial + ' ' + phoneNumber.replace(/[^0-9]/g, '');

        const formData = {
            vorname: firstName.trim(),
            nachname: lastName.trim(),
            email: email.trim(),
            telefon: fullPhone,
            empfohlen_von: referredBy.trim(),
            sprache: formLang,
            vantage_user_id: vantageId.trim(),
            telegram_username: telegram.trim().replace(/^@+/, ''),
            status: 'ausstehend'
        };

        try {
            const response = await fetch(BACKEND_URL + '/nutzer-vantage', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                await response.json().catch(() => ({}));
                if (response.status === 409) {
                    setErrorKey('regErrAlreadyRegistered');
                } else {
                    setErrorKey('regErrUnknown');
                }
                setSubmitting(false);
                return;
            }

            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
            setErrorKey('regErrServer');
            setSubmitting(false);
        }
    }

    if (success) {
        return (
            <main className="main">
                <section className="hero register-hero">
                    <h1 className="headline register-headline">{t.regTitle}</h1>
                </section>
                <SuccessView vantageId={vantageId.trim()} lang={lang} t={t} />
            </main>
        );
    }

    return (
        <main className="main">
            <section className="hero register-hero">
                <h1 className="headline register-headline">{t.regTitle}</h1>
                <p className="register-subtitle">{t.regSubtitle}</p>
            </section>

            <section className="register-section">
                <form className="card register-card" noValidate onSubmit={handleSubmit}>

                    {/* Section 1 - Personal */}
                    <div className="form-section">
                        <h2 className="form-section-title">{t.regSection1}</h2>

                        <div className="form-group">
                            <label htmlFor="firstName" className="form-label">{t.regFirstName}</label>
                            <input type="text" id="firstName" className="form-input" required
                                placeholder={t.regFirstNamePh} value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName" className="form-label">{t.regLastName}</label>
                            <input type="text" id="lastName" className="form-input" required
                                placeholder={t.regLastNamePh} value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">{t.regEmail}</label>
                            <input type="email" id="email" className="form-input" required
                                placeholder={t.regEmailPh} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t.regTelefon}</label>
                            <div className="phone-row">
                                <PhoneCodeDropdown
                                    lang={lang}
                                    selectedFlag={phoneFlag}
                                    selectedDial={phoneDial}
                                    onSelect={handlePhoneSelect}
                                />
                                <input type="tel" id="telefonNummer" className="form-input phone-number-input" required
                                    placeholder="123 456789" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="referredBy" className="form-label">{t.regReferredBy}</label>
                            <input type="text" id="referredBy" className="form-input" required
                                placeholder={t.regReferredByPh} value={referredBy} onChange={e => setReferredBy(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="language" className="form-label">{t.regLanguage}</label>
                            <select id="language" className="form-input form-select" value={formLang} onChange={e => setFormLang(e.target.value)}>
                                <option value="de">Deutsch</option>
                                <option value="en">English</option>
                                <option value="ru">{'\u0420\u0443\u0441\u0441\u043a\u0438\u0439'}</option>
                                <option value="pt">{`Portugu\u00eas`}</option>
                            </select>
                        </div>
                    </div>

                    {/* Section 2 - Vantage */}
                    <div className="form-section">
                        <h2 className="form-section-title">{t.regSection2}</h2>

                        <div className="form-group">
                            <label htmlFor="vantageId" className="form-label">{t.regPuprimeId}</label>
                            <input type="text" id="vantageId" className="form-input" inputMode="numeric" pattern="[0-9]*" required
                                placeholder={t.regPuprimeIdPh} value={vantageId}
                                onChange={e => setVantageId(e.target.value.replace(/[^0-9]/g, ''))} />
                        </div>

                        <div className="form-hint">
                            <span className="form-hint__icon">{'\ud83d\udca1'}</span>
                            <span className="form-hint__text">{t.regPuprimeHint}</span>
                        </div>

                        <img src="/assets/images/puprimeid.webp" className="vantage-id-img" alt={t.regPuprimeIdImgAlt} />
                    </div>

                    {/* Section 3 - Telegram */}
                    <div className="form-section">
                        <h2 className="form-section-title">{t.regSection3}</h2>

                        <div className="form-group">
                            <label htmlFor="telegram" className="form-label">{t.regTelegram}</label>
                            <input type="text" id="telegram" className="form-input" required
                                placeholder={t.regTelegramPh} value={telegram} onChange={e => setTelegram(e.target.value)} />
                        </div>

                        <div className="form-hint">
                            <span className="form-hint__icon">{'\ud83d\udca1'}</span>
                            <span className="form-hint__text">{t.regTelegramHint}</span>
                        </div>
                    </div>

                    {/* Section 4 - Privacy */}
                    <div className="form-section">
                        <h2 className="form-section-title">{t.regSection4}</h2>

                        <label className="form-checkbox">
                            <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} />
                            <span className="form-checkbox__mark" />
                            <span className="form-checkbox__text">
                                {t.regPrivacy}
                                <Link href="/datenschutz" target="_blank" className="form-link">{t.regPrivacyLink}</Link>
                            </span>
                        </label>
                    </div>

                    {/* Error */}
                    {errorKey && (
                        <div className="form-error">
                            <span className="form-error__icon">{'\u26A0\uFE0F'}</span>
                            <span className="form-error__text">{t[errorKey] || errorKey}</span>
                        </div>
                    )}

                    {/* Submit */}
                    <button type="submit" className="btn register-btn" disabled={submitting}>
                        {t.regSubmit}
                    </button>
                </form>
            </section>
        </main>
    );
}

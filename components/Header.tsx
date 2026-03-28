'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import type { Lang } from '@/lib/translations';

export default function Header() {
    const { lang, setLang, LANG_LABELS } = useLang();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const switcherRef = useRef<HTMLDivElement>(null);
    const [logoError, setLogoError] = useState(false);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <header className="header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    {!logoError ? (
                        <img
                            src="/assets/images/capitalrise_logo_white_transparent.webp"
                            alt="Capital Rise"
                            onError={() => setLogoError(true)}
                        />
                    ) : (
                        <span id="logo-fallback" style={{ display: 'inline', fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
                            WifiMoney
                        </span>
                    )}
                </Link>
                <div className="lang-switcher" ref={switcherRef}>
                    <button
                        className="lang-toggle"
                        onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                    >
                        <span>{LANG_LABELS[lang]}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="lang-dropdown">
                            {(['en', 'de', 'ru', 'pt'] as Lang[]).map(l => (
                                <button key={l} onClick={() => { setLang(l); setDropdownOpen(false); }}>
                                    {LANG_LABELS[l]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

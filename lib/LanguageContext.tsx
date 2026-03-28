'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations, LANG_LABELS, type Lang } from './translations';

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: Record<string, string>;
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
    LANG_LABELS: Record<Lang, string>;
}

const LanguageContext = createContext<LanguageContextType>(null!);

function safeGetStorage(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
}

function safeSetStorage(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

function detectBrowserLang(): Lang {
    const lang = (navigator.language || 'en').toLowerCase();
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('ru')) return 'ru';
    if (lang.startsWith('pt')) return 'pt';
    return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('de');
    const [showPopup, setShowPopup] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = safeGetStorage('capitalrise-lang') as Lang | null;
        if (saved && ['en', 'de', 'ru', 'pt'].includes(saved)) {
            setLangState(saved);
        } else {
            setLangState(detectBrowserLang());
            setShowPopup(true);
        }
        setMounted(true);
    }, []);

    const setLang = useCallback((newLang: Lang) => {
        setLangState(newLang);
        safeSetStorage('capitalrise-lang', newLang);
        setShowPopup(false);
    }, []);

    const t = translations[lang] || translations.en;

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.lang = lang;
        if (t.pageTitle) {
            document.title = t.pageTitle;
        }
    }, [lang, t, mounted]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, showPopup, setShowPopup, LANG_LABELS }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}

'use client';

import { useLang } from '@/lib/LanguageContext';
import type { Lang } from '@/lib/translations';

export default function LanguagePopup() {
    const { showPopup, setLang, LANG_LABELS } = useLang();

    if (!showPopup) return null;

    return (
        <div className="lang-overlay">
            <div className="lang-modal card">
                <h2>Choose your language</h2>
                <div className="lang-options">
                    {(['en', 'de', 'ru', 'pt'] as Lang[]).map(l => (
                        <button key={l} className="lang-btn" onClick={() => setLang(l)}>
                            {LANG_LABELS[l]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

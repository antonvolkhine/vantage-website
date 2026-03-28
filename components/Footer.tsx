'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
    const { t } = useLang();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <img className="footer-logo" src="/assets/images/capitalrise_logo_white_transparent.webp" alt="Capital Rise" />
                <div className="footer-bottom">
                    <p className="footer-copy">
                        &copy; {new Date().getFullYear()} CapitalRise. <span>{t.footerRights}</span>
                    </p>
                    <div className="footer-rights">
                        <Link href="/impressum" className="footer-impressum">{t.footerImpressum}</Link>
                        <span className="footer-sep">&middot;</span>
                        <Link href="/datenschutz" className="footer-impressum">{t.footerDatenschutz}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

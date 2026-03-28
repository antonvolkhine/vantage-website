'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import VideoPlayer from './VideoPlayer';

export default function HomePage() {
    const { t } = useLang();

    return (
        <main className="main">
            {/* Hero */}
            <section className="hero">
                <h1 className="headline" dangerouslySetInnerHTML={{ __html: t.headline }} />
            </section>

            {/* Steps */}
            <section className="steps">
                {/* Step 1 */}
                <div className="card step-card step-card-wide">
                    <div className="step-badge">{t.step1Badge}</div>
                    <div className="step-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                    </div>
                    <h3 className="step-title">{t.step1Title}</h3>
                    <p className="step-text">{t.step1Text}</p>
                    <VideoPlayer />
                </div>

                {/* Step 2 */}
                <div className="card step-card">
                    <div className="step-badge">{t.step2Badge}</div>
                    <div className="step-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <line x1="10" y1="9" x2="8" y2="9"/>
                        </svg>
                    </div>
                    <h3 className="step-title">{t.step2Title}</h3>
                    <p className="step-text">{t.step2Text}</p>
                    <div className="step-warning">
                        <span className="step-warning__icon">{'\u26A0\uFE0F'}</span>
                        <span className="step-warning__text">{t.stepWarning}</span>
                    </div>
                    <Link href="/register" className="btn">{t.step2Btn}</Link>
                </div>

                {/* Step 3 */}
                <div className="card step-card">
                    <div className="step-badge">{t.step3Badge}</div>
                    <div className="step-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </div>
                    <h3 className="step-title">{t.step3Title}</h3>
                    <p className="step-text">{t.step3Text}</p>
                    <div className="step-warning">
                        <span className="step-warning__icon">{'\u26A0\uFE0F'}</span>
                        <span className="step-warning__text">{t.stepWarning}</span>
                    </div>
                    <a href="https://t.me/WifiMoneySupportBot" target="_blank" rel="noopener noreferrer" className="btn">{t.step3Btn}</a>
                </div>

                {/* Step 4 */}
                <div className="card step-card">
                    <div className="step-badge">{t.step4Badge}</div>
                    <div className="step-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                        </svg>
                    </div>
                    <h3 className="step-title">{t.step4Title}</h3>
                    <p className="step-text">{t.step4Text}</p>
                </div>
            </section>

            {/* Finish */}
            <section className="finish">
                <div className="card finish-card">
                    <div className="finish-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h2 className="finish-title" dangerouslySetInnerHTML={{ __html: t.finishTitle }} />
                    <p className="finish-text">{t.finishText}</p>
                </div>
            </section>
        </main>
    );
}

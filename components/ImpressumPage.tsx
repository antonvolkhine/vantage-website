'use client';

import { useLang } from '@/lib/LanguageContext';

export default function ImpressumPage() {
    const { t } = useLang();

    return (
        <main className="main">
            <div className="legal-content">
                <h1 dangerouslySetInnerHTML={{ __html: t.impTitle }} />
                <p dangerouslySetInnerHTML={{ __html: t.impIntro }} />
                <h2>{t.impContactHeading}</h2>
                <p>{t.impContactText}</p>
                <h2>{t.impDisputeHeading}</h2>
                <p>{t.impDisputeText}</p>
                <h2 dangerouslySetInnerHTML={{ __html: t.impDsaHeading }} />
                <p>{t.impDsaText1}</p>
                <p>{t.impDsaEmail}</p>
                <p>{t.impDsaLangs}</p>
            </div>
        </main>
    );
}

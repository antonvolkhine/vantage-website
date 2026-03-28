'use client';

import { useLang } from '@/lib/LanguageContext';

export default function DatenschutzPage() {
    const { t } = useLang();

    return (
        <main className="main">
            <div className="legal-content">
                <h1>{t.dsTitle}</h1>

                <h2>{t.ds1Heading}</h2>
                <p>{t.ds1Text1}</p>
                <p dangerouslySetInnerHTML={{ __html: t.ds1Text2 }} />

                <h2>{t.ds2Heading}</h2>
                <p>{t.ds2Text1}</p>

                <h2>{t.ds3Heading}</h2>
                <h3>{t.ds3Sub1}</h3>
                <p>{t.ds3Text1}</p>
                <p>{t.ds3Text2}</p>
                <p>{t.ds3Text3}</p>
                <p dangerouslySetInnerHTML={{ __html: t.ds3Text4 }} />
                <h3>{t.ds3Sub2}</h3>
                <p>{t.ds3Text5}</p>

                <h2>{t.ds4Heading}</h2>
                <p>{t.ds4Text1}</p>
                <p>{t.ds4Text2}</p>

                <h2>{t.ds5Heading}</h2>
                <p>{t.ds5Text1}</p>

                <h2>{t.ds6Heading}</h2>
                <p>{t.ds6Text1}</p>
                <p>{t.ds6Text2}</p>
                <p>{t.ds6Text3}</p>
                <p dangerouslySetInnerHTML={{ __html: t.ds6Text4 }} />

                <h2>{t.ds7Heading}</h2>
                <p>{t.ds7Text1}</p>
                <p>{t.ds7Text2}</p>
                <p>{t.ds7Text3}</p>
                <p dangerouslySetInnerHTML={{ __html: t.ds7Text4 }} />

                <h2>{t.ds8Heading}</h2>
                <p>{t.ds8Text1}</p>
                <p>{t.ds8Text2}</p>
                <p>{t.ds8Text3}</p>
                <p dangerouslySetInnerHTML={{ __html: t.ds8Text4 }} />

                <h2>{t.ds9Heading}</h2>
                <p>{t.ds9Text1}</p>
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t.ds9Li1 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.ds9Li2 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.ds9Li3 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.ds9Li4 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.ds9Li5 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.ds9Li6 }} />
                </ul>
                <p>{t.ds9Text2}</p>

                <h2>{t.ds10Heading}</h2>
                <p>{t.ds10Text1}</p>

                <h2>{t.ds11Heading}</h2>
                <p>{t.ds11Text1}</p>
            </div>
        </main>
    );
}

'use client';

import { useState } from 'react';
import { VIDEO_IDS } from '@/lib/translations';
import { useLang } from '@/lib/LanguageContext';

export default function VideoPlayer() {
    const { lang } = useLang();
    const [playing, setPlaying] = useState(false);

    const videoId = VIDEO_IDS[lang] || VIDEO_IDS.en;
    const thumbnailUrl = `https://vz-dc6dbfc4-3fd.b-cdn.net/${videoId}/thumbnail.jpg`;
    const iframeSrc = `https://iframe.mediadelivery.net/embed/379534/${videoId}?autoplay=false&loop=true&muted=true&preload=false&responsive=true`;

    function handlePlay() {
        setPlaying(true);
    }

    if (playing) {
        return (
            <div className="video-wrapper">
                <iframe
                    src={iframeSrc}
                    style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="video-wrapper video-placeholder" onClick={handlePlay}>
            <img className="video-thumb" src={thumbnailUrl} alt="Video" />
            <div className="play-btn">{'\u25B6'}</div>
        </div>
    );
}

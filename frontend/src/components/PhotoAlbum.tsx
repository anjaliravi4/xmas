import React, { useEffect, useState } from "react";

const photos = [
    "/photos/1.jpeg",
    "/photos/2.jpeg",
    "/photos/3.jpeg",
    "/photos/4.jpeg",
    "/photos/5.jpeg",
    "/photos/6.jpeg",
    "/photos/7.jpeg",
    "/photos/8.jpeg",
    "/photos/9.jpeg",
    "/photos/10.jpeg",
    "/photos/11.jpeg",
    "/photos/12.jpeg",
    "/photos/13.jpeg",
    "/photos/14.jpeg"
];

const INTERVAL = 4 * 60 * 60 * 1000;

const shuffle = (arr: string[]) =>
    [...arr].sort(() => Math.random() - 0.5);

const PhotoAlbum: React.FC = () => {
    const [shuffledPhotos] = useState(() => shuffle(photos));
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % shuffledPhotos.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, [shuffledPhotos]);

    return (
        <div className="photo-album">
            <img src={shuffledPhotos[index]} alt="Family memory" />
        </div>
    );
};

export default PhotoAlbum;

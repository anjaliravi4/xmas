// src/components/PhotoAlbum.tsx
import React from "react";

const PhotoAlbum: React.FC = () => {
    // Replace this with your Amazon Photos shared album link
    const albumUrl = "https://www.amazon.com/photos/shared/your-album-link";

    return (
        <div>
            <p>
                Open the family photo album:{" "}
                <a href={albumUrl} target="_blank" rel="noreferrer">
                    View Photos
                </a>
            </p>
            {/* Later: you can embed an iframe or show specific images here */}
        </div>
    );
};

export default PhotoAlbum;

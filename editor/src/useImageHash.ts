import { useEffect, useState } from 'react';

type Bitmap = (number | null)[][];

const useImageHash = (sprite: Bitmap): string => {
    const [imageId, setImageId] = useState("");

    useEffect(() => {
        const rehash = async () => {
            const serialized = JSON.stringify(sprite);
            const encoder = new TextEncoder();
            const buffer = encoder.encode(serialized);

            const outputBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
            const outputAsArray = new Uint8Array(outputBuffer);
            const hash = [...outputAsArray]
                .map(c => c.toString(16).padStart(2, '0'))
                .join("");

            setImageId(hash.substring(0, 16));
        };

        rehash();
    }, [sprite]);

    return imageId;
};

export default useImageHash;

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Create the canvas
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext("2d");

const originalImagePath = "../assets/Shrine/shrine.png"; // Images sources

// Image used for the shrine of secrets
const newPerks = [
    { src: "../assets/faerys/Perks/Applepie/iconPerks_Unbound.png", width: 270, height: 270 },
    { src: "../assets/faerys/Perks/Applepie/iconPerks_Undone.png", width: 270, height: 270 },
    { src: "../assets/faerys/Perks/Applepie/iconPerks_Unforeseen.png", width: 270, height: 270 },
    { src: "../assets/faerys/Perks/Applepie/iconsPerks_InvocationWeavingSpiders.png", width: 270, height: 270 }
];

async function loadAndDrawImages() {
    const originalImage = await loadImage(originalImagePath);
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0);

    // Coordonnées des images
    const positions = [
        { x: 815, y: 135 }, // Image at the top
        { x: 815, y: 530 }, // Image at the bottom
        { x: 620, y: 335 }, // Image at the left
        { x: 1015, y: 335 } // Image at the right
    ];

    for (let i = 0; i < newPerks.length; i++) {
        const perkImage = await loadImage(newPerks[i].src);
        ctx.drawImage(perkImage, positions[i].x, positions[i].y, newPerks[i].width, newPerks[i].height);
    }

    // Call the function
    generateImage();
}

// Fonction for generate and save the image edited
function generateImage() {
    const outputPath = 'Shrine_of_Secret.png';
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Image successfully generated : ${outputPath}`);
}

loadAndDrawImages().catch(console.error);

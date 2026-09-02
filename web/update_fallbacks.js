import fs from 'fs';

const pagesDir = 'c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/web/src/pages';

function updateFile(file) {
    let content = fs.readFileSync(`${pagesDir}/${file}`, 'utf8');

    // For Mixture
    content = content.replace(/(name:\s*'[^']*(?:Mixture|Mikser)[^']*',[^}]*image_url:\s*)(bitesPackImg|masalaMurukkuImg|plateDumplingsImg)/g, "$1'/assets/tastraa_mixture.jpg'");
    
    // For Masala Murukku (Wait, Garlic Murukku stays masalaMurukkuImg? User said "add ithukuriya prodect a intha photo e add full type kum". I will update only Masala Murukku and Bites.)
    content = content.replace(/(name:\s*'[^']*(?:Masala Murukku)[^']*',[^}]*image_url:\s*)(masalaMurukkuImg|bitesPackImg|plateDumplingsImg)/g, "$1'/assets/tastraa_masala_murukku.jpg'");
    
    // For Bites
    content = content.replace(/(name:\s*'[^']*(?:Bites)[^']*',[^}]*image_url:\s*)(bitesPackImg|masalaMurukkuImg|plateDumplingsImg)/g, "$1'/assets/tastraa_bites.jpg'");

    fs.writeFileSync(`${pagesDir}/${file}`, content);
}

updateFile('Products.jsx');
updateFile('ProductDetails.jsx');
console.log('Frontend fallbacks updated!');

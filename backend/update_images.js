import fs from 'fs';

let content = fs.readFileSync('c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/backend/db.js', 'utf8');

const regex = /({ id: \d+, name: '([^']+)',[^}]+image_url: ')([^']+)('[^}]+})/g;

content = content.replace(regex, (match, p1, name, p3, p4) => {
    let newUrl = p3;
    const n = name.toLowerCase();
    
    if (n.includes('mixture') || n.includes('mikser')) {
        // Exclude baby mixture maybe? Actually the user said "full type kum" so all mixture types. 
        // Wait, there's "Baby Mixture" and "Mixture". We can just set all mixture to tastraa_mixture.jpg
        newUrl = '/assets/tastraa_mixture.jpg';
    }
    if (n.includes('masala murukku')) {
        newUrl = '/assets/tastraa_masala_murukku.jpg';
    }
    if (n.includes('bites')) {
        newUrl = '/assets/tastraa_bites.jpg';
    }
    
    return p1 + newUrl + p4;
});

fs.writeFileSync('c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/backend/db.js', content);
console.log('Images updated successfully in db.js!');

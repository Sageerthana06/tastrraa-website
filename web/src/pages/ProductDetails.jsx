import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, ShieldCheck, RefreshCw, Phone, Wheat, Award, Star, Sparkles } from 'lucide-react';
import api from '../api';
import hero3dImg from '../assets/tastraa_original_hero.png';
import redRice5kgImg from '../assets/red_rice_flour_5kg.jpg';
import redRice10kgImg from '../assets/red_rice_flour_10kg.jpg';
import redRice25kgImg from '../assets/red_rice_flour_25kg.png';
import redRice2kgImg from '../assets/red_rice_flour_2kg.jpg';
import roastedRice1kgImg from '../assets/roasted_rice_flour_1kg.jpg';
import roastedChilli50gImg from '../assets/roasted_chilli_powder_50g.jpg';
import bengalGram100Img from '../assets/bengal_gram_100.jpg';
import gingellyOil750mlImg from '../assets/gingelly_oil_750ml.jpg';
import gingellyOil375mlImg from '../assets/gingelly_oil_375ml.jpg';
import bengalGramPackImg from '../assets/bengal_gram_pack.jpg';
import redRawRice25kgImg from '../assets/red_raw_rice_25kg.jpg';
import plateDumplingsImg from '../assets/plate_dumplings.jpg';
import bitesPackImg from '../assets/bites_pack.jpg';
import bengalGramYellowImg from '../assets/bengal_gram_yellow.jpg';
import masalaMurukkuImg from '../assets/masala_murukku.jpg';
import tastraaDhalImg from '../assets/tastraa_dhal.jpg';
import tastraaPeanutPakodaImg from '../assets/tastraa_peanut_pakoda.jpg';
import curryPowderImg from '../assets/curry_powder.jpg';

const fallbackDetails = {
  'red-rice-flour-5kg': {
    id: 101,
    slug: 'red-rice-flour-5kg',
    name: 'Red Rice Flour 05KG  (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '1430.00',
    unit: '05KG Sack',
    description: '100% natural locally grown red rice ground into fine flour. Packaged in authentic 05KG green woven sack. MRP LKR 1,430.00.',
    features: ['05KG Woven Sack', '100% Sri Lankan Red Paddy', 'Preservative & Bleach Free', 'Super Fine Texture'],
    image_url: redRice5kgImg
  },
  '101': {
    id: 101,
    slug: 'red-rice-flour-5kg',
    name: 'Red Rice Flour 05KG  (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '1430.00',
    unit: '05KG Sack',
    description: '100% natural locally grown red rice ground into fine flour. Packaged in authentic 05KG green woven sack. MRP LKR 1,430.00.',
    features: ['05KG Woven Sack', '100% Sri Lankan Red Paddy', 'Preservative & Bleach Free', 'Super Fine Texture'],
    image_url: redRice5kgImg
  },
  'red-rice-flour-10kg': {
    id: 102,
    slug: 'red-rice-flour-10kg',
    name: 'Red Rice Flour 10KG  (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '3000.00',
    unit: '10KG Sack',
    description: 'Heavy-duty 10KG blue woven bag of 100% pure Red Rice Flour. Ideal for family gatherings and high volume home cooking. MRP LKR 3,000.00.',
    features: ['10KG Blue Sack', 'High Dietary Fiber', 'Purity Certified', 'Stone Milled'],
    image_url: redRice10kgImg
  },
  '102': {
    id: 102,
    slug: 'red-rice-flour-10kg',
    name: 'Red Rice Flour 10KG (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '3000.00',
    unit: '10KG Sack',
    description: 'Heavy-duty 10KG blue woven bag of 100% pure Red Rice Flour. Ideal for family gatherings and high volume home cooking. MRP LKR 3,000.00.',
    features: ['10KG Blue Sack', 'High Dietary Fiber', 'Purity Certified', 'Stone Milled'],
    image_url: redRice10kgImg
  },
  'red-rice-flour-25kg': {
    id: 103,
    slug: 'red-rice-flour-25kg',
    name: 'Red Rice Flour 25KG (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Commercial Sack',
    description: 'Wholesale commercial 25KG red woven for industrial food production, commercial caterers, and wholesale distributors.',
    features: ['25KG Bulk Sack', 'Commercial Milling', 'Wholesale Pricing', 'Heavy Duty Pack'],
    image_url: redRice25kgImg
  },
  '103': {
    id: 103,
    slug: 'red-rice-flour-25kg',
    name: 'Red Rice Flour 25KG  (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Commercial Sack',
    description: 'Wholesale commercial 25KG red woven for industrial food production, commercial caterers, and wholesale distributors.',
    features: ['25KG Bulk Sack', 'Commercial Milling', 'Wholesale Pricing', 'Heavy Duty Pack'],
    image_url: redRice25kgImg
  },
  'red-rice-flour-2kg': {
    id: 104,
    slug: 'red-rice-flour-2kg',
    name: 'Red Rice Flour 02KG Pack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '800.00',
    unit: '2KG Pack',
    description: 'Fresh sealed 2KG transparent retail package of 100% natural Red Rice Flour for everyday household cooking. MRP LKR 800.00.',
    features: ['2KG Sealed Pack', '100% Natural Red Rice', 'Daily Household Size'],
    image_url: redRice2kgImg
  },
  '104': {
    id: 104,
    slug: 'red-rice-flour-2kg',
    name: 'Red Rice Flour 02KG Pack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '800.00',
    unit: '2KG Pack',
    description: 'Fresh sealed 2KG transparent retail package of 100% natural Red Rice Flour for everyday household cooking. MRP LKR 800.00.',
    features: ['2KG Sealed Pack', '100% Natural Red Rice', 'Daily Household Size'],
    image_url: redRice2kgImg
  },
  'roasted-rice-flour-1kg': {
    id: 1061,
    slug: 'roasted-rice-flour-1kg',
    name: 'Roasted Rice Flour 1KG (வறுத்த அரிசி மா)',
    category: 'Rice Flour',
    price: '400.00',
    wholesale_price: '280.00',
    unit: '1KG Pack',
    description: 'Authentic 100% natural Roasted Rice Flour (வறுத்த அரிசி மா / බැதபு සහල් පිටி) 1KG pack. Ideal for String Hoppers (Idiyappam), Pittu, and traditional delicacies. MRP LKR 400.00.',
    features: ['1KG Retail Pack', '100% Sri Lankan Rice', 'Authentic Jaffna Recipe', 'Fine Texture for Idiyappam & Pittu'],
    image_url: roastedRice1kgImg
  },
  '1061': {
    id: 1061,
    slug: 'roasted-rice-flour-1kg',
    name: 'Roasted Rice Flour 1KG (வறுத்த அரிசி மா)',
    category: 'Rice Flour',
    price: '400.00',
    wholesale_price: '280.00',
    unit: '1KG Pack',
    description: 'Authentic 100% natural Roasted Rice Flour (வறுத்த அரிசி மா / බැதபு සහල් පිටி) 1KG pack. Ideal for String Hoppers (Idiyappam), Pittu, and traditional delicacies. MRP LKR 400.00.',
    features: ['1KG Retail Pack', '100% Sri Lankan Rice', 'Authentic Jaffna Recipe', 'Fine Texture for Idiyappam & Pittu'],
    image_url: roastedRice1kgImg
  },
  'roasted-chilli-powder-50g': {
    id: 107,
    slug: 'roasted-chilli-powder-50g',
    name: 'Roasted Chilli Powder 50g+5g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '140.00',
    unit: '50g + 5g Free',
    description: 'Authentic slow-roasted sun-dried red chilli powder with 5g bonus extra weight. Deep color and rich fiery aroma.',
    features: ['50g + 5g Extra Free', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors'],
    image_url: roastedChilli50gImg
  },
  '107': {
    id: 107,
    slug: 'roasted-chilli-powder-50g',
    name: 'Roasted Chilli Powder 50g+5g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '140.00',
    unit: '50g + 5g Free',
    description: 'Authentic slow-roasted sun-dried red chilli powder with 5g bonus extra weight. Deep color and rich fiery aroma.',
    features: ['50g + 5g Extra Free', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors'],
    image_url: roastedChilli50gImg
  },
  'mikser-200g': {
    id: 159,
    slug: 'Mixture-200g',
    name: 'Mixture 200g (மிக்சர்)',
    category: 'Mixture',
    price: '300.00',
    unit: '200g Pack',
    description: 'Authentic spicy and savory Mikser with curry leaves, roasted nuts & secret spices.',
    features: ['200g Pack', 'Traditional Spiced', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  '159': {
    id: 159,
    slug: 'mikser-200g',
    name: 'Mixture200g (மிக்சர்)',
    category: 'Mixture',
    price: '300.00',
    unit: '200g Pack',
    description: 'Authentic spicy and savory Mikser with curry leaves, roasted nuts & secret spices.',
    features: ['200g Pack', 'Traditional Spiced', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'mikser-400g': {
    id: 160,
    slug: 'mikser-400g',
    name: 'Mikser 400g (மிக்சர்)',
    category: 'Mixture',
    price: '600.00',
    unit: '400g Pack',
    description: 'Crispy savory spicy Mikser packed fresh for tea-time and celebrations.',
    features: ['400g Value Pack', 'Crunchy Fresh', 'Wholesale Rate: LKR 360'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  '160': {
    id: 160,
    slug: 'mikser-400g',
    name: 'Mikser 400g (மிக்சர்)',
    category: 'Mixture',
    price: '600.00',
    unit: '400g Pack',
    description: 'Crispy savory spicy Mikser packed fresh for tea-time and celebrations.',
    features: ['400g Value Pack', 'Crunchy Fresh', 'Wholesale Rate: LKR 360'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'tastraa-bengal-gram-100': {
    id: 112,
    slug: 'tastraa-bengal-gram-100',
    name: 'TASTRAA Bengal Gram (மஞ்சள் கடலை)',
    category: 'Mixture',
    price: '500.00',
    unit: 'Rs 500 Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) seasoned with salt. Crisp, delicious, healthy traditional roasted snack.',
    features: ['Roasted Yellow Gram', '100% Pure & Natural', 'Lightly Salted', 'High Protein Snack'],
    image_url: bengalGramYellowImg
  },
  'gingelly-oil': {
    id: 106,
    slug: 'gingelly-oil',
    name: 'Gingelly Oil (750ml)',
    category: 'Gingelly Oil',
    price: '950.00',
    unit: '750ml Bottle',
    description: '100%  oil extracted using traditional methods. Rich natural aroma and heart-healthy.',
    features: ['Cold Pressed', '100% Pure Sesame', 'Rich Aroma', 'Best for Cooking'],
    image_url: gingellyOil750mlImg
  },
  'gingelly-oil-375ml': {
    id: 113,
    slug: 'gingelly-oil-375ml',
    name: 'Gingelly Oil (375ml)',
    category: 'Gingelly Oil',
    price: '500.00',
    unit: '375ml Bottle',
    description: 'Pure traditional sesame oil in a 375ml retail bottle. 100% natural, unrefined, and chemical-free.',
    features: ['375ml Bottle', 'Cold Pressed', 'Authentic Taste', 'Hygienic Sealed'],
    image_url: gingellyOil375mlImg
  },
  'red-raw-rice-25kg': {
    id: 114,
    slug: 'red-raw-rice-25kg',
    name: 'Red Raw Rice 25KG Sack (சிவப்பு பச்சை அரிசி)',
    category: 'Rice Flour',
    price: '7500.00',
    unit: '25KG Sack',
    description: 'Premium Quality Red Raw Rice (சிவப்பு பச்சை அரிசி) packaged in authentic 25kg yellow woven sack.',
    features: ['25KG Yellow Sack', '100% Red Raw Rice', 'Premium Quality', 'Wholesale Pack'],
    image_url: redRawRice25kgImg
  },
  'tastraa-plate-dumplings-100': {
    id: 115,
    slug: 'tastraa-plate-dumplings-100',
    name: 'TASTRAA Plate Dumplings (தட்டு வடை)',
    category: 'Mixture',
    price: '100.00',
    unit: 'Rs 100 Pack',
    description: 'Authentic traditional crunchy Plate Dumplings (தட்டு வடை) made from dhal, vegetable oil, salt, and spicy red chilli powder.',
    features: ['Authentic Plate Dumplings', '100% Pure & Natural', 'Dhal, Oil, Salt & Chilli', 'Crispy Tea-time Snack'],
    image_url: plateDumplingsImg
  },
  'tastraa-bites-50': {
    id: 116,
    slug: 'tastraa-bites-50',
    name: 'TASTRAA Bites (பைட்ஸ்)',
    category: 'Mixture',
    price: '50.00',
    unit: 'Rs 50 Pack',
    description: 'Crunchy savory snack Bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning.',
    features: ['Crispy Savory Bites', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Rs 50 Pocket Pack'],
    image_url: '/assets/tastraa_bites.jpg'
  },
  'tastraa-masala-murukku-50': {
    id: 117,
    slug: 'tastraa-masala-murukku-50',
    name: 'TASTRAA Masala Murukku (மசாலா முறுக்கு)',
    category: 'Mixture',
    price: '50.00',
    unit: 'Rs 50 Pack',
    description: 'Authentic spicy & crispy Masala Murukku (மசாலா முறுக்கு) made with rice flour, urad flour, gram flour, curry leaves, and traditional spices.',
    features: ['Authentic Masala Murukku', 'Crispy & Crunchy', 'Curry Leaves & Spices', '100% Veg Snack'],
    image_url: '/assets/tastraa_masala_murukku.jpg'
  },
  'thadduvadai-1kg': {
    id: 141,
    slug: 'thadduvadai-1kg',
    name: 'TASTRAA Thadduvadai 1kg (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) made with dhal, pure vegetable oil, salt, and spicy red chilli. MRP LKR 1800.00, Wholesale LKR 1400.00.',
    features: ['Traditional Jaffna Recipe', 'Pure Dhal, Oil, Salt & Chilli', 'Super Crunchy Texture', 'Wholesale Rate: LKR 1400'],
    image_url: plateDumplingsImg
  },
  '141': {
    id: 141,
    slug: 'thadduvadai-1kg',
    name: 'TASTRAA Thadduvadai 1kg (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) made with dhal, pure vegetable oil, salt, and spicy red chilli. MRP LKR 1800.00, Wholesale LKR 1400.00.',
    features: ['Traditional Jaffna Recipe', 'Pure Dhal, Oil, Salt & Chilli', 'Super Crunchy Texture', 'Wholesale Rate: LKR 1400'],
    image_url: plateDumplingsImg
  },
  'thadduvadai-250g': {
    id: 142,
    slug: 'thadduvadai-250g',
    name: 'TASTRAA Thadduvadai 250g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) 250g retail pack. Delicious tea-time snack.',
    features: ['Traditional Jaffna Recipe', 'Pure Dhal, Oil, Salt & Chilli', 'Super Crunchy Texture', 'Wholesale Rate: LKR 400'],
    image_url: plateDumplingsImg
  },
  '142': {
    id: 142,
    slug: 'thadduvadai-250g',
    name: 'TASTRAA Thadduvadai 250g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) 250g retail pack. Delicious tea-time snack.',
    features: ['Traditional Jaffna Recipe', 'Pure Dhal, Oil, Salt & Chilli', 'Super Crunchy Texture', 'Wholesale Rate: LKR 400'],
    image_url: plateDumplingsImg
  },
  'thadduvadai-60g': {
    id: 143,
    slug: 'thadduvadai-60g',
    name: 'TASTRAA Thadduvadai 60g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) 60g pocket pack.',
    features: ['Traditional Jaffna Recipe', 'Pocket Size', 'Crispy & Spicy', 'Wholesale Rate: LKR 75'],
    image_url: plateDumplingsImg
  },
  '143': {
    id: 143,
    slug: 'thadduvadai-60g',
    name: 'TASTRAA Thadduvadai 60g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) 60g pocket pack.',
    features: ['Traditional Jaffna Recipe', 'Pocket Size', 'Crispy & Spicy', 'Wholesale Rate: LKR 75'],
    image_url: plateDumplingsImg
  },
  'thadduvadai-30g': {
    id: 144,
    slug: 'thadduvadai-30g',
    name: 'TASTRAA Thadduvadai 30g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) 30g mini snack pack.',
    features: ['Traditional Jaffna Recipe', 'Mini Snack Size', 'Crispy & Spicy', 'Wholesale Rate: LKR 40'],
    image_url: plateDumplingsImg
  },
  '144': {
    id: 144,
    slug: 'thadduvadai-30g',
    name: 'TASTRAA Thadduvadai 30g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g Pack',
    description: 'Authentic traditional crispy Thadduvadai / Plate Dumplings (தட்டு வடை) 30g mini snack pack.',
    features: ['Traditional Jaffna Recipe', 'Mini Snack Size', 'Crispy & Spicy', 'Wholesale Rate: LKR 40'],
    image_url: plateDumplingsImg
  },
  'dhal-1kg': {
    id: 151,
    slug: 'dhal-1kg',
    name: 'TASTRAA Dhal 1kg (பருப்பு)',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg Pack',
    description: 'Crisp, savory, and golden-fried traditional Dhal (சுவையான வறுத்த பருப்பு) seasoned with salt and spices. 1kg pack. MRP LKR 1000.00, Wholesale LKR 700.00.',
    features: ['Crispy Fried Dhal', '100% Pure & Hygienic', 'Rich in Protein', 'Wholesale Rate: LKR 700'],
    image_url: tastraaDhalImg
  },
  '151': {
    id: 151,
    slug: 'dhal-1kg',
    name: 'TASTRAA Dhal 1kg (பருப்பு)',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg Pack',
    description: 'Crisp, savory, and golden-fried traditional Dhal (சுவையான வறுத்த பருப்பு) seasoned with salt and spices. 1kg pack. MRP LKR 1000.00, Wholesale LKR 700.00.',
    features: ['Crispy Fried Dhal', '100% Pure & Hygienic', 'Rich in Protein', 'Wholesale Rate: LKR 700'],
    image_url: tastraaDhalImg
  },
  'dhal-250g': {
    id: 152,
    slug: 'dhal-250g',
    name: 'TASTRAA Dhal 250g (பருப்பு)',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g Pack',
    description: 'Crisp, savory, and golden-fried traditional Dhal (சுவையான வறுத்த பருப்பு) 250g retail pouch. Perfect snack for tea time.',
    features: ['Crispy Fried Dhal', '100% Pure & Hygienic', 'Rich in Protein', 'Wholesale Rate: LKR 200'],
    image_url: tastraaDhalImg
  },
  '152': {
    id: 152,
    slug: 'dhal-250g',
    name: 'TASTRAA Dhal 250g (பருப்பு)',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g Pack',
    description: 'Crisp, savory, and golden-fried traditional Dhal (சுவையான வறுத்த பருப்பு) 250g retail pouch. Perfect snack for tea time.',
    features: ['Crispy Fried Dhal', '100% Pure & Hygienic', 'Rich in Protein', 'Wholesale Rate: LKR 200'],
    image_url: tastraaDhalImg
  },
  'dhal-40g': {
    id: 153,
    slug: 'dhal-40g',
    name: 'TASTRAA Dhal 40g (பருப்பு)',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Tasty crunchy fried Dhal (சுவையான வறுத்த பருப்பு) 40g pocket snack pack.',
    features: ['Crispy Fried Dhal', 'Pocket Snack Size', 'Traditional Flavor', 'Wholesale Rate: LKR 35'],
    image_url: tastraaDhalImg
  },
  '153': {
    id: 153,
    slug: 'dhal-40g',
    name: 'TASTRAA Dhal 40g (பருப்பு)',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Tasty crunchy fried Dhal (சுவையான வறுத்த பருப்பு) 40g pocket snack pack.',
    features: ['Crispy Fried Dhal', 'Pocket Snack Size', 'Traditional Flavor', 'Wholesale Rate: LKR 35'],
    image_url: tastraaDhalImg
  },
  'dhal-18g': {
    id: 154,
    slug: 'dhal-18g',
    name: 'TASTRAA Dhal 18g (பருப்பு)',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g Pack',
    description: 'Tasty crunchy fried Dhal (சுவையான வறுத்த பருப்பு) 18g mini snack pack.',
    features: ['Crispy Fried Dhal', 'Mini Snack Size', 'Traditional Flavor', 'Wholesale Rate: LKR 16'],
    image_url: tastraaDhalImg
  },
  '154': {
    id: 154,
    slug: 'dhal-18g',
    name: 'TASTRAA Dhal 18g (பருப்பு)',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g Pack',
    description: 'Tasty crunchy fried Dhal (சுவையான வறுத்த பருப்பு) 18g mini snack pack.',
    features: ['Crispy Fried Dhal', 'Mini Snack Size', 'Traditional Flavor', 'Wholesale Rate: LKR 16'],
    image_url: tastraaDhalImg
  },
  'peanut-pakoda-1kg': {
    id: 122,
    slug: 'peanut-pakoda-1kg',
    name: 'TASTRAA Peanut Pakoda 1kg (நிலக்கடலை பகோடா)',
    category: 'Pakoda',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg Pack',
    description: 'Crispy, crunchy spicy Peanut Pakoda (நிலக்கடலை பகோடா) made with whole peanuts coated in spiced chickpea batter. 1kg pack. MRP LKR 1800.00, Wholesale LKR 1400.00.',
    features: ['Crispy Peanut Clusters', '100% Pure & Hygienic', 'Authentic Jaffna Flavor', 'Wholesale Rate: LKR 1400'],
    image_url: tastraaPeanutPakodaImg
  },
  '122': {
    id: 122,
    slug: 'peanut-pakoda-1kg',
    name: 'TASTRAA Peanut Pakoda 1kg (நிலக்கடலை பகோடா)',
    category: 'Pakoda',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg Pack',
    description: 'Crispy, crunchy spicy Peanut Pakoda (நிலக்கடலை பகோடா) made with whole peanuts coated in spiced chickpea batter. 1kg pack. MRP LKR 1800.00, Wholesale LKR 1400.00.',
    features: ['Crispy Peanut Clusters', '100% Pure & Hygienic', 'Authentic Jaffna Flavor', 'Wholesale Rate: LKR 1400'],
    image_url: tastraaPeanutPakodaImg
  },
  'peanut-pakoda-250g': {
    id: 123,
    slug: 'peanut-pakoda-250g',
    name: 'TASTRAA Peanut Pakoda 250g (நிலக்கடலை பகோடா)',
    category: 'Pakoda',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g Pack',
    description: 'Crispy, crunchy spicy Peanut Pakoda (நிலக்கடலை பகோடா) in a 250g retail pouch.',
    features: ['Crispy Peanut Clusters', '100% Pure & Hygienic', 'Authentic Jaffna Flavor', 'Wholesale Rate: LKR 400'],
    image_url: tastraaPeanutPakodaImg
  },
  '123': {
    id: 123,
    slug: 'peanut-pakoda-250g',
    name: 'TASTRAA Peanut Pakoda 250g (நிலக்கடலை பகோடா)',
    category: 'Pakoda',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g Pack',
    description: 'Crispy, crunchy spicy Peanut Pakoda (நிலக்கடலை பகோடா) in a 250g retail pouch.',
    features: ['Crispy Peanut Clusters', '100% Pure & Hygienic', 'Authentic Jaffna Flavor', 'Wholesale Rate: LKR 400'],
    image_url: tastraaPeanutPakodaImg
  },
  'peanut-pakoda-100g': {
    id: 124,
    slug: 'peanut-pakoda-100g',
    name: 'TASTRAA Peanut Pakoda 100g (நிலக்கடலை பகோடா)',
    category: 'Pakoda',
    price: '200.00',
    wholesale_price: '170.00',
    unit: '100g Pack',
    description: 'Crispy, crunchy spicy Peanut Pakoda (நிலக்கடலை பகோடா) 100g pack.',
    features: ['Crispy Peanut Clusters', '100% Pure & Hygienic', 'Authentic Jaffna Flavor', 'Wholesale Rate: LKR 170'],
    image_url: tastraaPeanutPakodaImg
  },
  '124': {
    id: 124,
    slug: 'peanut-pakoda-100g',
    name: 'TASTRAA Peanut Pakoda 100g (நிலக்கடலை பகோடா)',
    category: 'Pakoda',
    price: '200.00',
    wholesale_price: '170.00',
    unit: '100g Pack',
    description: 'Crispy, crunchy spicy Peanut Pakoda (நிலக்கடலை பகோடா) 100g pack.',
    features: ['Crispy Peanut Clusters', '100% Pure & Hygienic', 'Authentic Jaffna Flavor', 'Wholesale Rate: LKR 170'],
    image_url: tastraaPeanutPakodaImg
  },

  // ── Red Raw Rice variants ──
  'red-raw-rice-25kg': {
    id: 101,
    slug: 'red-raw-rice-25kg',
    name: 'Red Raw Rice 25kg (சிவப்பு பச்சரிசி)',
    category: 'Rice',
    price: '7500.00',
    wholesale_price: '4750.00',
    unit: '25kg Sack',
    description: 'Premium Quality Red Raw Rice (சிவப்பு பச்சரிசி) 25kg wholesale sack. 100% natural, traditionally sourced.',
    features: ['25kg Wholesale Sack', '100% Natural Red Rice', 'Premium Quality', 'Wholesale Rate: LKR 6500'],
    image_url: redRawRice25kgImg
  },

  'red-raw-rice-5kg': {
    id: 103,
    slug: 'red-raw-rice-5kg',
    name: 'Red Raw Rice 5kg (சிவப்பு பச்சரிசி)',
    category: 'Rice',
    price: '1500.00',
    wholesale_price: '950.00',
    unit: '5kg Sack',
    description: 'Premium Quality Red Raw Rice (சிவப்பு பச்சரிசி) 5kg household pack.',
    features: ['5kg Sack', '100% Natural Red Rice', 'Premium Quality', 'Wholesale Rate: LKR 1300'],
    image_url: '/assets/tastraa_red_raw_rice_5kg.jpg'
  },

  // ── Red Rice Flour 5kg by slug (existing ids use different slug format) ──
  'red-rice-flour-5kg': {
    id: 106,
    slug: 'red-rice-flour-5kg',
    name: 'Red Rice Flour 5kg (சிவப்பு அரிசி மா)',
    category: 'Flour',
    price: '1200.00',
    wholesale_price: '1140.00',
    unit: '5kg Sack',
    description: '100% natural locally grown red rice ground into fine flour. Packaged in authentic 5kg sack.',
    features: ['5kg Sack', '100% Sri Lankan Red Paddy', 'Preservative & Bleach Free', 'Wholesale Rate: LKR 1140'],
    image_url: redRice5kgImg
  },

  // ── Baby Mixture variants ──
  'baby-mixture-1kg': {
    id: 107,
    slug: 'baby-mixture-1kg',
    name: 'Baby Mixture 1kg (பேபி மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Authentic premium Baby Mixture (பேபி மிக்ஸ்சர்) 1kg pack. Traditional recipe with crunchy noodles, peanuts, and spices.',
    features: ['1kg Pack', 'Traditional Recipe', 'Crunchy & Savory', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'baby-mixture-250g': {
    id: 108,
    slug: 'baby-mixture-250g',
    name: 'Baby Mixture 250g (பேபி மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Authentic premium Baby Mixture (பேபி மிக்ஸ்சர்) 250g retail pack.',
    features: ['250g Pack', 'Traditional Recipe', 'Crunchy & Savory', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'baby-mixture-80g': {
    id: 109,
    slug: 'baby-mixture-80g',
    name: 'Baby Mixture 80g (பேபி மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Authentic premium Baby Mixture (பேபி மிக்ஸ்சர்) 80g snack pack.',
    features: ['80g Pack', 'Traditional Recipe', 'Crunchy & Savory', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_mixture.jpg'
  },

  // ── Mixture variants ──
  'mixture-1kg': {
    id: 112,
    slug: 'mixture-1kg',
    name: 'Mixture 1kg (மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Premium traditional Mixture (மிக்ஸ்சர்) 1kg. Savory spiced snack mix with nuts, sev, and crunchy bits.',
    features: ['1kg Value Pack', 'Traditional Spiced', 'Nuts & Sev Mix', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'mixture-500g': {
    id: 113,
    slug: 'mixture-500g',
    name: 'Mixture 500g (மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '600.00',
    wholesale_price: '460.00',
    unit: '500g Pack',
    description: 'Premium traditional Mixture (மிக்ஸ்சர்) 500g. Family-size snack pack.',
    features: ['500g Pack', 'Traditional Spiced', 'Premium Nuts & Sev', 'Wholesale Rate: LKR 460'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'mixture-250g': {
    id: 114,
    slug: 'mixture-250g',
    name: 'Mixture 250g (மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Premium traditional Mixture (மிக்ஸ்சர்) 250g retail pouch.',
    features: ['250g Pack', 'Traditional Spiced', 'Crunchy Fresh', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'mixture-80g': {
    id: 115,
    slug: 'mixture-80g',
    name: 'Mixture 80g (மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Premium traditional Mixture (மிக்ஸ்சர்) 80g snack pack.',
    features: ['80g Pack', 'Traditional Spiced', 'On-the-go Snack', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'mixture-40g': {
    id: 116,
    slug: 'mixture-40g',
    name: 'Mixture 40g (மிக்ஸ்சர்)',
    category: 'Mixture',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Premium traditional Mixture (மிக்ஸ்சர்) 40g pocket pack.',
    features: ['40g Pocket Pack', 'Traditional Spiced', 'Crunchy Snack', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/tastraa_mixture.jpg'
  },

  // ── Pakoda variants ──
  'pakoda-1kg': {
    id: 117,
    slug: 'pakoda-1kg',
    name: 'Pakoda 1kg (கார பகோடா)',
    category: 'Pakoda',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Authentic crispy Pakoda (கார பகோடா) 1kg bulk pack. Traditional spiced gram flour fritters.',
    features: ['1kg Bulk Pack', 'Traditional Jaffna Recipe', 'Crispy & Spicy', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_pakoda.jpg'
  },
  'pakoda-500g': {
    id: 118,
    slug: 'pakoda-500g',
    name: 'Pakoda 500g (கார பகோடா)',
    category: 'Pakoda',
    price: '600.00',
    wholesale_price: '460.00',
    unit: '500g Pack',
    description: 'Authentic crispy Pakoda (கார பகோடா) 500g family pack.',
    features: ['500g Pack', 'Traditional Jaffna Recipe', 'Crispy & Spicy', 'Wholesale Rate: LKR 460'],
    image_url: '/assets/tastraa_pakoda.jpg'
  },
  'pakoda-250g': {
    id: 119,
    slug: 'pakoda-250g',
    name: 'Pakoda 250g (கார பகோடா)',
    category: 'Pakoda',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Authentic crispy Pakoda (கார பகோடா) 250g retail pack.',
    features: ['250g Pack', 'Traditional Jaffna Recipe', 'Crispy & Spicy', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/tastraa_pakoda.jpg'
  },
  'pakoda-80g': {
    id: 120,
    slug: 'pakoda-80g',
    name: 'Pakoda 80g (கார பகோடா)',
    category: 'Pakoda',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Authentic crispy Pakoda (கார பகோடா) 80g snack pack.',
    features: ['80g Pack', 'Traditional Jaffna Recipe', 'Crispy & Spicy', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_pakoda.jpg'
  },
  'pakoda-40g': {
    id: 121,
    slug: 'pakoda-40g',
    name: 'Pakoda 40g (கார பகோடா)',
    category: 'Pakoda',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Authentic crispy Pakoda (கார பகோடா) 40g pocket pack.',
    features: ['40g Pocket Pack', 'Traditional Jaffna Recipe', 'Crispy & Spicy', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/tastraa_pakoda.jpg'
  },

  // ── Garlic Murukku variants ──
  'garlic-murukku-1kg': {
    id: 125,
    slug: 'garlic-murukku-1kg',
    name: 'Garlic Murukku 1kg (உள்ளி முறுக்கு)',
    category: 'Murukku',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Authentic crispy Garlic Murukku (உள்ளி முறுக்கு) 1kg bulk pack. Made with garlic, rice flour, and traditional spices.',
    features: ['1kg Bulk Pack', 'Authentic Garlic Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/garlic_murukku.jpg'
  },
  'garlic-murukku-160g': {
    id: 126,
    slug: 'garlic-murukku-160g',
    name: 'Garlic Murukku 160g (உள்ளி முறுக்கு)',
    category: 'Murukku',
    price: '200.00',
    wholesale_price: '150.00',
    unit: '160g Pack',
    description: 'Authentic crispy Garlic Murukku (உள்ளி முறுக்கு) 160g retail pack.',
    features: ['160g Pack', 'Authentic Garlic Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 150'],
    image_url: '/assets/garlic_murukku.jpg'
  },
  'garlic-murukku-80g': {
    id: 127,
    slug: 'garlic-murukku-80g',
    name: 'Garlic Murukku 80g (உள்ளி முறுக்கு)',
    category: 'Murukku',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Authentic crispy Garlic Murukku (உள்ளி முறுக்கு) 80g snack pack.',
    features: ['80g Pack', 'Authentic Garlic Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/garlic_murukku.jpg'
  },
  'garlic-murukku-40g': {
    id: 128,
    slug: 'garlic-murukku-40g',
    name: 'Garlic Murukku 40g (உள்ளி முறுக்கு)',
    category: 'Murukku',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Authentic crispy Garlic Murukku (உள்ளி முறுக்கு) 40g pocket pack.',
    features: ['40g Pocket Pack', 'Authentic Garlic Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/garlic_murukku.jpg'
  },

  // ── Masala Murukku variants ──
  'masala-murukku-1kg': {
    id: 129,
    slug: 'masala-murukku-1kg',
    name: 'Masala Murukku 1kg (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Authentic spicy Masala Murukku (மசாலா முறுக்கு) 1kg bulk pack. Made with rice flour, urad flour, and traditional spices.',
    features: ['1kg Bulk Pack', 'Authentic Masala Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 880'],
    image_url: masalaMurukkuImg
  },
  'masala-murukku-250g': {
    id: 130,
    slug: 'masala-murukku-250g',
    name: 'Masala Murukku 250g (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '300.00',
    wholesale_price: '240.00',
    unit: '250g Pack',
    description: 'Authentic spicy Masala Murukku (மசாலா முறுக்கு) 250g retail pack.',
    features: ['250g Pack', 'Authentic Masala Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 240'],
    image_url: masalaMurukkuImg
  },
  'masala-murukku-80g': {
    id: 131,
    slug: 'masala-murukku-80g',
    name: 'Masala Murukku 80g (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Authentic spicy Masala Murukku (மசாலா முறுக்கு) 80g snack pack.',
    features: ['80g Pack', 'Authentic Masala Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 75'],
    image_url: masalaMurukkuImg
  },
  'masala-murukku-40g': {
    id: 132,
    slug: 'masala-murukku-40g',
    name: 'Masala Murukku 40g (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Authentic spicy Masala Murukku (மசாலா முறுக்கு) 40g pocket pack.',
    features: ['40g Pocket Pack', 'Authentic Masala Flavor', 'Crispy & Crunchy', 'Wholesale Rate: LKR 35'],
    image_url: masalaMurukkuImg
  },

  // ── Bites variants ──
  'bites-1kg': {
    id: 133,
    slug: 'bites-1kg',
    name: 'Bites 1kg (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Crunchy savory Bites (பைட்ஸ்) 1kg bulk pack. Made with wheat flour, urad dal, and spicy seasoning.',
    features: ['1kg Bulk Pack', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Wholesale Rate: LKR 880'],
    image_url: bitesPackImg
  },
  'bites-250g': {
    id: 134,
    slug: 'bites-250g',
    name: 'Bites 250g (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '300.00',
    wholesale_price: '240.00',
    unit: '250g Pack',
    description: 'Crunchy savory Bites (பைட்ஸ்) 250g retail pack.',
    features: ['250g Pack', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Wholesale Rate: LKR 240'],
    image_url: bitesPackImg
  },
  'bites-80g': {
    id: 135,
    slug: 'bites-80g',
    name: 'Bites 80g (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Crunchy savory Bites (பைட்ஸ்) 80g snack pack.',
    features: ['80g Pack', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Wholesale Rate: LKR 75'],
    image_url: bitesPackImg
  },
  'bites-40g': {
    id: 136,
    slug: 'bites-40g',
    name: 'Bites 40g (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Crunchy savory Bites (பைட்ஸ்) 40g pocket pack.',
    features: ['40g Pocket Pack', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Wholesale Rate: LKR 35'],
    image_url: bitesPackImg
  },

  // ── Manioc Chips variants ──
  'manioc-chips-1kg': {
    id: 137,
    slug: 'manioc-chips-1kg',
    name: 'Manioc Chips 1kg (மரவள்ளி சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '1400.00',
    wholesale_price: '900.00',
    unit: '1kg Pack',
    description: 'Crispy authentic Manioc Chips (மரவள்ளி சிப்ஸ்) 1kg bulk pack. Thinly sliced and perfectly fried.',
    features: ['1kg Bulk Pack', 'Thinly Sliced Cassava', 'Crispy & Salted', 'Wholesale Rate: LKR 900'],
    image_url: '/assets/tastraa_manioc_chips.jpg'
  },
  'manioc-chips-250g': {
    id: 138,
    slug: 'manioc-chips-250g',
    name: 'Manioc Chips 250g (மரவள்ளி சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '350.00',
    wholesale_price: '300.00',
    unit: '250g Pack',
    description: 'Crispy authentic Manioc Chips (மரவள்ளி சிப்ஸ்) 250g retail pack.',
    features: ['250g Pack', 'Thinly Sliced Cassava', 'Crispy & Salted', 'Wholesale Rate: LKR 300'],
    image_url: '/assets/tastraa_manioc_chips.jpg'
  },
  'manioc-chips-60g': {
    id: 139,
    slug: 'manioc-chips-60g',
    name: 'Manioc Chips 60g (மரவள்ளி சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g Pack',
    description: 'Crispy authentic Manioc Chips (மரவள்ளி சிப்ஸ்) 60g snack pack.',
    features: ['60g Pack', 'Thinly Sliced Cassava', 'Crispy & Salted', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_manioc_chips.jpg'
  },
  'manioc-chips-30g': {
    id: 140,
    slug: 'manioc-chips-30g',
    name: 'Manioc Chips 30g (மரவள்ளி சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g Pack',
    description: 'Crispy authentic Manioc Chips (மரவள்ளி சிப்ஸ்) 30g mini pack.',
    features: ['30g Mini Pack', 'Thinly Sliced Cassava', 'Crispy & Salted', 'Wholesale Rate: LKR 40'],
    image_url: '/assets/tastraa_manioc_chips.jpg'
  },

  // ── Bengal Gram variants ──
  'bengal-gram-1kg': {
    id: 145,
    slug: 'bengal-gram-1kg',
    name: 'Bengal Gram 1kg (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) 1kg bulk pack. Crisp, lightly salted, high-protein snack.',
    features: ['1kg Bulk Pack', 'Roasted Yellow Gram', '100% Pure & Natural', 'Wholesale Rate: LKR 700'],
    image_url: bengalGramYellowImg
  },
  'bengal-gram-500g': {
    id: 146,
    slug: 'bengal-gram-500g',
    name: 'Bengal Gram 500g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '500.00',
    wholesale_price: '350.00',
    unit: '500g Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) 500g family pack.',
    features: ['500g Pack', 'Roasted Yellow Gram', '100% Pure & Natural', 'Wholesale Rate: LKR 350'],
    image_url: bengalGramYellowImg
  },
  'bengal-gram-250g': {
    id: 147,
    slug: 'bengal-gram-250g',
    name: 'Bengal Gram 250g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) 250g retail pack.',
    features: ['250g Pack', 'Roasted Yellow Gram', '100% Pure & Natural', 'Wholesale Rate: LKR 200'],
    image_url: bengalGramYellowImg
  },
  'bengal-gram-80g': {
    id: 148,
    slug: 'bengal-gram-80g',
    name: 'Bengal Gram 80g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) 80g snack pack.',
    features: ['80g Pack', 'Roasted Yellow Gram', '100% Pure & Natural', 'Wholesale Rate: LKR 75'],
    image_url: bengalGramYellowImg
  },
  'bengal-gram-40g': {
    id: 149,
    slug: 'bengal-gram-40g',
    name: 'Bengal Gram 40g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) 40g pocket pack.',
    features: ['40g Pocket Pack', 'Roasted Yellow Gram', '100% Pure & Natural', 'Wholesale Rate: LKR 35'],
    image_url: bengalGramYellowImg
  },
  'bengal-gram-18g': {
    id: 150,
    slug: 'bengal-gram-18g',
    name: 'Bengal Gram 18g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) 18g mini snack pack.',
    features: ['18g Mini Pack', 'Roasted Yellow Gram', '100% Pure & Natural', 'Wholesale Rate: LKR 16'],
    image_url: bengalGramYellowImg
  },

  // ── Peanut variants ──
  'peanut-1kg': {
    id: 155,
    slug: 'peanut-1kg',
    name: 'Peanut 1kg (வேர்க்கடலை)',
    category: 'Dhal & Gram',
    price: '1800.00',
    wholesale_price: '950.00',
    unit: '1kg Pack',
    description: 'Crispy roasted Peanuts (வேர்க்கடலை) 1kg bulk pack. Lightly salted, crunchy, and delicious.',
    features: ['1kg Bulk Pack', 'Crispy Roasted Peanuts', 'Lightly Salted', 'Wholesale Rate: LKR 1300'],
    image_url: '/assets/tastraa_peanut.jpg'
  },
  'peanut-100g': {
    id: 156,
    slug: 'peanut-100g',
    name: 'Peanut 100g (வேர்க்கடலை)',
    category: 'Dhal & Gram',
    price: '200.00',
    wholesale_price: '180.00',
    unit: '100g Pack',
    description: 'Crispy roasted Peanuts (வேர்க்கடலை) 100g retail pack.',
    features: ['100g Pack', 'Crispy Roasted Peanuts', 'Lightly Salted', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/tastraa_peanut.jpg'
  },
  'peanut-50g': {
    id: 157,
    slug: 'peanut-50g',
    name: 'Peanut 50g (வேர்க்கடலை)',
    category: 'Dhal & Gram',
    price: '100.00',
    wholesale_price: '80.00',
    unit: '50g Pack',
    description: 'Crispy roasted Peanuts (வேர்க்கடலை) 50g snack pack.',
    features: ['50g Pack', 'Crispy Roasted Peanuts', 'Lightly Salted', 'Wholesale Rate: LKR 80'],
    image_url: '/assets/tastraa_peanut.jpg'
  },

  // ── Chilli Powder variants ──
  'chilli-powder-1kg': {
    id: 158,
    slug: 'chilli-powder-1kg',
    name: 'Chilli Powder 1kg (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '1400.00',
    wholesale_price: '1000.00',
    unit: '1kg Pack',
    description: 'Authentic slow-roasted sun-dried Chilli Powder (வறுத்த மிளகாய்த்தூள்) 1kg bulk pack. Deep color and rich fiery aroma.',
    features: ['1kg Bulk Pack', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors', 'Wholesale Rate: LKR 1000'],
    image_url: roastedChilli50gImg
  },
  'chilli-powder-250g': {
    id: 159,
    slug: 'chilli-powder-250g',
    name: 'Chilli Powder 250g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '350.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Authentic slow-roasted sun-dried Chilli Powder (வறுத்த மிளகாய்த்தூள்) 250g retail pack.',
    features: ['250g Pack', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors', 'Wholesale Rate: LKR 250'],
    image_url: roastedChilli50gImg
  },
  'chilli-powder-50g': {
    id: 160,
    slug: 'chilli-powder-50g',
    name: 'Chilli Powder 50g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '70.00',
    wholesale_price: '52.00',
    unit: '50g Pack',
    description: 'Authentic slow-roasted sun-dried Chilli Powder (வறுத்த மிளகாய்த்தூள்) 50g pack.',
    features: ['50g Pack', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors', 'Wholesale Rate: LKR 52'],
    image_url: roastedChilli50gImg
  },

  // ── Gingelly Oil variants ──
  'gingelly-oil-750ml': {
    id: 161,
    slug: 'gingelly-oil-750ml',
    name: 'Gingelly Oil 750ml (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '1400.00',
    wholesale_price: '1050.00',
    unit: '750ml Bottle',
    description: '100% pure traditional Gingelly Oil (நல்லெண்ணெய்) 750ml bottle. Cold pressed, rich natural aroma.',
    features: ['750ml Bottle', 'Cold Pressed', '100% Pure Sesame', 'Wholesale Rate: LKR 1050'],
    image_url: gingellyOil750mlImg
  },
  'gingelly-oil-350ml': {
    id: 162,
    slug: 'gingelly-oil-350ml',
    name: 'Gingelly Oil 350ml (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '750.00',
    wholesale_price: '560.00',
    unit: '350ml Bottle',
    description: '100% pure traditional Gingelly Oil (நல்லெண்ணெய்) 350ml bottle. Cold pressed, unrefined.',
    features: ['350ml Bottle', 'Cold Pressed', '100% Pure Sesame', 'Wholesale Rate: LKR 560'],
    image_url: gingellyOil750mlImg
  },
  'gingelly-oil-200ml': {
    id: 163,
    slug: 'gingelly-oil-200ml',
    name: 'Gingelly Oil 200ml (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '400.00',
    wholesale_price: '320.00',
    unit: '200ml Bottle',
    description: '100% pure traditional Gingelly Oil (நல்லெண்ணெய்) 200ml bottle. Cold pressed, unrefined.',
    features: ['200ml Bottle', 'Cold Pressed', '100% Pure Sesame', 'Wholesale Rate: LKR 320'],
    image_url: gingellyOil750mlImg
  }
};

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/slug/${slug}`);
        if (response.data?.success && response.data.product) {
          setProduct(response.data.product);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Fallback product details used:', err);
      }

      const found = fallbackDetails[slug] ||
        Object.values(fallbackDetails).find(p => String(p.id) === String(slug) || p.slug === slug) ||
        null;
      setProduct(found);
      setLoading(false);
    };
    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0', minHeight: '60vh', backgroundColor: '#FAF9F5' }}>
        <RefreshCw size={36} className="spin" style={{ animation: 'spin 1s linear infinite', color: '#0F4A24', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.2rem', color: '#0F4A24', fontWeight: '800' }}>Loading TASTRAA Product...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', backgroundColor: '#FAF9F5' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#0F4A24', fontWeight: '900', marginBottom: '16px' }}>Product Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '24px' }}>The product you requested could not be located in our catalog.</p>
        <Link to="/products" className="btn-green-3d" style={{ display: 'inline-flex', padding: '12px 24px', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
          <span>Back to Products Catalog</span>
        </Link>
      </div>
    );
  }

  const originalUnitPrice = parseFloat(product.price || 0);
  const wholesalePrice = product.wholesale_price ? parseFloat(product.wholesale_price) : null;
  const unitPrice = wholesalePrice || originalUnitPrice;
  const totalPrice = (unitPrice * quantity).toFixed(2);
  const originalTotalPrice = (originalUnitPrice * quantity).toFixed(2);
  const whatsappMessage = `Hi TASTRAA (PVT) LTD, I would like to order:
- Product: ${product.name} (${product.unit})
- Quantity: ${quantity} item(s)
- Total Price: LKR ${totalPrice}

Please let me know availability and delivery options.`;
  const whatsappUrl = `https://wa.me/94779789223?text=${encodeURIComponent(whatsappMessage)}`;

  const getProductImg = (p) => {
    if (!p) return hero3dImg;
    const name = (p.name || '').toLowerCase();
    const url = (p.image_url || '').toLowerCase();
    const slugStr = (p.slug || '').toLowerCase();
    if (
      name.includes('thadduvadai') ||
      slugStr.includes('thadduvadai') ||
      url.includes('plate_dumplings') ||
      name.includes('dumpling')
    ) {
      return plateDumplingsImg;
    }
    if (
      name.includes('dhal') ||
      slugStr.includes('dhal') ||
      url.includes('dhal') ||
      name.includes('paruppu')
    ) {
      return tastraaDhalImg;
    }
    if (
      name.includes('peanut pakoda') ||
      slugStr.includes('peanut-pakoda') ||
      url.includes('peanut_pakoda')
    ) {
      return tastraaPeanutPakodaImg;
    }
    if (
      name.includes('chilli powder 1kg') || 
      name.includes('chilli powder 250g') || 
      name.includes('curry powder')
    ) {
      return curryPowderImg;
    }
    return p.image_url || hero3dImg;
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#FAF9F5', minHeight: '85vh' }}>
      <div className="container">
        {/* Back Link */}
        <Link to="/products" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#0F4A24',
          fontWeight: '800',
          fontSize: '0.95rem',
          marginBottom: '30px',
          transition: 'color 0.2s',
          textDecoration: 'none'
        }}>
          <ArrowLeft size={18} />
          <span>Back to Products Catalog</span>
        </Link>

        {/* Product Details Layout */}
        <div className="product-details-grid" style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          boxShadow: '0 15px 40px rgba(15, 74, 36, 0.08)',
          border: '2px solid #E8F5E9',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px'
        }}>
          {/* Left Column: Product Image */}
          <div style={{
            position: 'relative',
            backgroundColor: '#F8FAFC',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <img
              src={getProductImg(product)}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '420px',
                objectFit: 'contain',
                borderRadius: '16px'
              }}
            />
            <span style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              backgroundColor: '#0F4A24',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: '800',
              padding: '6px 16px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              {product.category}
            </span>
          </div>

          {/* Right Column: Information & Actions */}
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#E8F5E9',
                color: '#0F4A24',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '0.75rem',
                marginBottom: '14px'
              }}>
                <Award size={14} />
                <span>100% PURE QUALITY GUARANTEED</span>
              </div>

              <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24', marginBottom: '16px', lineHeight: '1.2' }}>
                {product.name}
              </h1>

              {/* Price & Unit */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24' }}>
                  LKR {unitPrice.toFixed(2)}
                </span>
                {wholesalePrice && (
                  <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#94A3B8', textDecoration: 'line-through' }}>
                    LKR {originalUnitPrice.toFixed(2)}
                  </span>
                )}
                <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: '700', backgroundColor: '#E8F5E9', padding: '4px 12px', borderRadius: '6px' }}>
                  {product.unit}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F4A24', marginBottom: '8px' }}>Product Overview</h4>
                <p style={{ color: '#475569', fontSize: '1.025rem', lineHeight: '1.65' }}>
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F4A24', marginBottom: '12px' }}>Key Highlights</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {product.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E293B', fontWeight: '700', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} style={{ color: '#0F4A24', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector Section */}
            <div style={{
              marginBottom: '24px',
              padding: '18px 24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '20px',
              border: '2px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Total Price
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F4A24' }}>
                    LKR {totalPrice}
                  </span>
                  {wholesalePrice && (
                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#94A3B8', textDecoration: 'line-through' }}>
                      LKR {originalTotalPrice}
                    </span>
                  )}
                  {quantity > 1 && (
                    <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '700' }}>
                      (LKR {unitPrice.toFixed(2)} each)
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFFFF', padding: '6px 12px', borderRadius: '14px', border: '2px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: quantity > 1 ? '#0F4A24' : '#F1F5F9',
                    color: quantity > 1 ? '#FFFFFF' : '#94A3B8',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '55px',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: '#0F4A24',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#0F4A24',
                    color: '#FFFFFF',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green-3d"
                style={{ width: '100%', padding: '16px 28px', fontSize: '1.05rem', justifyContent: 'center' }}
              >
                <Send size={18} />
                <span>ORDER NOW VIA WHATSAPP ({quantity} ITEM{quantity > 1 ? 'S' : ''})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

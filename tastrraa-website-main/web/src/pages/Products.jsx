import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, CheckCircle2, ShoppingBag, Star, Sparkles, Eye, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api';
import hero3dImg from '../assets/tastraa_original_hero.png';
import redRice5kgImg from '../assets/red_rice_flour_5kg.jpg';
import redRice10kgImg from '../assets/red_rice_flour_10kg.jpg';
import redRice25kgImg from '../assets/red_rice_flour_25kg.png';
import redRice2kgImg from '../assets/red_rice_flour_2kg.jpg';
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

const fallbackProducts = [
  // --- FLOUR ---
  {
    id: 101,
    name: 'Red Rice Flour 5kg (சிவப்பு அரிசி மா)',
    category: 'Flour',
    price: '1200.00',
    wholesale_price: '1140.00',
    unit: '5kg Sack',
    description: '100% Pure Sri Lankan Red Rice Flour stone-milled to smooth perfection.',
    features: ['100% Pure Red Rice', '5kg Woven Sack', 'Wholesale Rate: LKR 1,140'],
    image_url: redRice5kgImg,
    slug: 'red-rice-flour-5kg'
  },
  {
    id: 102,
    name: 'Red Rice Flour 10kg (சிவப்பு அரிசி மா)',
    category: 'Flour',
    price: '3000.00',
    wholesale_price: '2300.00',
    unit: '10kg Sack',
    description: '100% Pure Sri Lankan Red Rice Flour in a durable 10kg family saver sack.',
    features: ['10kg Bulk Sack', 'Rich in Fiber', 'Wholesale Rate: LKR 2,300'],
    image_url: redRice10kgImg,
    slug: 'red-rice-flour-10kg'
  },
  {
    id: 103,
    name: 'Red Rice Flour 25kg (சிவப்பு அரிசி மா)',
    category: 'Flour',
    price: '7000.00',
    wholesale_price: '5600.00',
    unit: '25kg Sack',
    description: 'Heavy duty commercial 25kg bulk sack of premium red rice flour for caterers & large kitchens.',
    features: ['25kg Commercial Pack', 'Strict Hygiene Quality', 'Wholesale Rate: LKR 5,600'],
    image_url: redRice25kgImg,
    slug: 'red-rice-flour-25kg'
  },

  // --- MIXTURE ---
  {
    id: 201,
    name: 'Traditional Jaffna Mixture 1kg',
    category: 'Mixture',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Authentic spicy and savory Jaffna mixture with curry leaves, roasted nuts & secret spices.',
    features: ['1kg Catering Pack', 'Traditional Spiced', 'Wholesale Rate: LKR 880'],
    image_url: bitesPackImg,
    slug: 'jaffna-mixture-1kg'
  },
  {
    id: 202,
    name: 'Traditional Jaffna Mixture 500g',
    category: 'Mixture',
    price: '600.00',
    wholesale_price: '460.00',
    unit: '500g Pack',
    description: 'Crispy savory spicy mixture packed fresh for tea-time and celebrations.',
    features: ['500g Value Pack', 'Crunchy Fresh', 'Wholesale Rate: LKR 460'],
    image_url: bitesPackImg,
    slug: 'jaffna-mixture-500g'
  },
  {
    id: 203,
    name: 'Traditional Jaffna Mixture 250g',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Perfect tea-time family pack of traditional Jaffna mixture.',
    features: ['250g Pack', 'Spicy & Crispy', 'Wholesale Rate: LKR 250'],
    image_url: bitesPackImg,
    slug: 'jaffna-mixture-250g'
  },
  {
    id: 204,
    name: 'Traditional Jaffna Mixture 80g',
    category: 'Mixture',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Convenient 80g snack pouch of authentic Jaffna mixture.',
    features: ['80g Snack Pack', 'Pocket Friendly', 'Wholesale Rate: LKR 75'],
    image_url: bitesPackImg,
    slug: 'jaffna-mixture-80g'
  },
  {
    id: 205,
    name: 'Traditional Jaffna Mixture 40g',
    category: 'Mixture',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Pocket-sized spicy snack pouch for quick bites on the go.',
    features: ['40g Pouch', 'Quick Snack', 'Wholesale Rate: LKR 35'],
    image_url: bitesPackImg,
    slug: 'jaffna-mixture-40g'
  },

  // --- PAKODA ---
  {
    id: 301,
    name: 'TASTRAA Crispy Pakoda 1kg (பகோடா)',
    category: 'Pakoda',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Authentic hot & crispy Pakoda snack made with gram flour, garlic, omam & curry leaves.',
    features: ['1kg Catering Pack', '100% Veg Hot & Crispy', 'Wholesale Rate: LKR 880'],
    image_url: plateDumplingsImg,
    slug: 'pakoda-1kg'
  },
  {
    id: 302,
    name: 'TASTRAA Crispy Pakoda 500g (பகோடா)',
    category: 'Pakoda',
    price: '600.00',
    wholesale_price: '460.00',
    unit: '500g Pack',
    description: 'Golden crunchy pakoda snacks seasoned with authentic Jaffna spices.',
    features: ['500g Family Pack', 'Spicy & Crispy', 'Wholesale Rate: LKR 460'],
    image_url: plateDumplingsImg,
    slug: 'pakoda-500g'
  },
  {
    id: 303,
    name: 'TASTRAA Crispy Pakoda 250g (பகோடா)',
    category: 'Pakoda',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Savory crispy snack perfect for evening tea.',
    features: ['250g Pack', 'Traditional Recipe', 'Wholesale Rate: LKR 250'],
    image_url: plateDumplingsImg,
    slug: 'pakoda-250g'
  },
  {
    id: 304,
    name: 'TASTRAA Crispy Pakoda 80g (பகோடா)',
    category: 'Pakoda',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Crispy crunchy pakoda snack pouch.',
    features: ['80g Pouch', 'Everyday Snack', 'Wholesale Rate: LKR 75'],
    image_url: plateDumplingsImg,
    slug: 'pakoda-80g'
  },
  {
    id: 305,
    name: 'TASTRAA Crispy Pakoda 40g (பகோடா)',
    category: 'Pakoda',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Individual snack size hot & crispy pakoda pouch.',
    features: ['40g Pouch', 'Pocket Pack', 'Wholesale Rate: LKR 35'],
    image_url: plateDumplingsImg,
    slug: 'pakoda-40g'
  },

  // --- GARLIC MURUKKU ---
  {
    id: 401,
    name: 'Garlic Murukku 1kg (பூண்டு முறுக்கு)',
    category: 'Murukku',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Aromatic crunchy spiral murukku infused with authentic fresh garlic flavor.',
    features: ['1kg Bulk Pack', 'Real Garlic Flavor', 'Wholesale Rate: LKR 880'],
    image_url: masalaMurukkuImg,
    slug: 'garlic-murukku-1kg'
  },
  {
    id: 402,
    name: 'Garlic Murukku 160g (பூண்டு முறுக்கு)',
    category: 'Murukku',
    price: '200.00',
    wholesale_price: '150.00',
    unit: '160g Pack',
    description: 'Crispy savory garlic murukku pack for tea time.',
    features: ['160g Pack', 'Garlic Infused', 'Wholesale Rate: LKR 150'],
    image_url: masalaMurukkuImg,
    slug: 'garlic-murukku-160g'
  },
  {
    id: 403,
    name: 'Garlic Murukku 80g (பூண்டு முறுக்கு)',
    category: 'Murukku',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Aromatic garlic spiced murukku pouch.',
    features: ['80g Pouch', 'Crispy Crunch', 'Wholesale Rate: LKR 75'],
    image_url: masalaMurukkuImg,
    slug: 'garlic-murukku-80g'
  },
  {
    id: 404,
    name: 'Garlic Murukku 40g (பூண்டு முறுக்கு)',
    category: 'Murukku',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Handy pocket size garlic murukku pouch.',
    features: ['40g Pouch', 'Pocket Friendly', 'Wholesale Rate: LKR 35'],
    image_url: masalaMurukkuImg,
    slug: 'garlic-murukku-40g'
  },

  // --- MASALA MURUKKU ---
  {
    id: 501,
    name: 'Masala Murukku 1kg (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Spicy seasoned murukku spirals prepared with rice flour, urad dal and traditional spices.',
    features: ['1kg Catering Pack', 'Traditional Spices', 'Wholesale Rate: LKR 880'],
    image_url: masalaMurukkuImg,
    slug: 'masala-murukku-1kg'
  },
  {
    id: 502,
    name: 'Masala Murukku 250g (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '300.00',
    wholesale_price: '240.00',
    unit: '250g Pack',
    description: 'Golden crunchy masala murukku for family gatherings.',
    features: ['250g Pack', 'Spicy & Crispy', 'Wholesale Rate: LKR 240'],
    image_url: masalaMurukkuImg,
    slug: 'masala-murukku-250g'
  },
  {
    id: 503,
    name: 'Masala Murukku 80g (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Everyday crunchy masala murukku pouch.',
    features: ['80g Pouch', 'Crispy Snack', 'Wholesale Rate: LKR 75'],
    image_url: masalaMurukkuImg,
    slug: 'masala-murukku-80g'
  },
  {
    id: 504,
    name: 'Masala Murukku 40g (மசாலா முறுக்கு)',
    category: 'Murukku',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Pocket size spicy masala murukku pouch.',
    features: ['40g Pouch', 'Quick Bite', 'Wholesale Rate: LKR 35'],
    image_url: masalaMurukkuImg,
    slug: 'masala-murukku-40g'
  },

  // --- BITES ---
  {
    id: 601,
    name: 'TASTRAA Crispy Bites 1kg (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Savory spicy wheat flour and urad dal bites fried to crisp perfection.',
    features: ['1kg Catering Pack', 'Spicy Seasoning', 'Wholesale Rate: LKR 880'],
    image_url: bitesPackImg,
    slug: 'bites-1kg'
  },
  {
    id: 602,
    name: 'TASTRAA Crispy Bites 250g (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '300.00',
    wholesale_price: '240.00',
    unit: '250g Pack',
    description: 'Crispy crunchy bite-sized savory snack.',
    features: ['250g Pack', 'Crispy Savory', 'Wholesale Rate: LKR 240'],
    image_url: bitesPackImg,
    slug: 'bites-250g'
  },
  {
    id: 603,
    name: 'TASTRAA Crispy Bites 80g (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Tea time favorite crunchy bite snack pouch.',
    features: ['80g Pouch', 'Spicy Crunch', 'Wholesale Rate: LKR 75'],
    image_url: bitesPackImg,
    slug: 'bites-80g'
  },
  {
    id: 604,
    name: 'TASTRAA Crispy Bites 40g (பைட்ஸ்)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Pocket pack savory bites for on-the-go snackers.',
    features: ['40g Pouch', 'Pocket Size', 'Wholesale Rate: LKR 35'],
    image_url: bitesPackImg,
    slug: 'bites-40g'
  },

  // --- THADDU VADAI ---
  {
    id: 701,
    name: 'Thaddu Vadai 1kg (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg Pack',
    description: 'Traditional flattened crunchy lentil & rice flour disk crackers seasoned with red chilli & curry leaves.',
    features: ['1kg Catering Pack', 'Traditional Recipe', 'Wholesale Rate: LKR 1,400'],
    image_url: plateDumplingsImg,
    slug: 'thaddu-vadai-1kg'
  },
  {
    id: 702,
    name: 'Thaddu Vadai 250g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g Pack',
    description: 'Spicy crisp thaddu vadai disks for family snack time.',
    features: ['250g Pack', 'Crispy Disks', 'Wholesale Rate: LKR 400'],
    image_url: plateDumplingsImg,
    slug: 'thaddu-vadai-250g'
  },
  {
    id: 703,
    name: 'Thaddu Vadai 60g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g Pack',
    description: 'Crispy thaddu vadai snack pouch.',
    features: ['60g Pouch', 'Savory Disks', 'Wholesale Rate: LKR 75'],
    image_url: plateDumplingsImg,
    slug: 'thaddu-vadai-60g'
  },
  {
    id: 704,
    name: 'Thaddu Vadai 30g (தட்டு வடை)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g Pouch',
    description: 'Pocket size thaddu vadai pouch.',
    features: ['30g Pouch', 'Pocket Friendly', 'Wholesale Rate: LKR 40'],
    image_url: plateDumplingsImg,
    slug: 'thaddu-vadai-30g'
  },

  // --- MANIOC CHIPS ---
  {
    id: 801,
    name: 'Manioc Chips 1kg (மரவள்ளி கிழங்கு சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '1400.00',
    wholesale_price: '900.00',
    unit: '1kg Pack',
    description: 'Thinly sliced fresh tapioca / manioc roots fried crisp and seasoned lightly with salt & chilli.',
    features: ['1kg Bulk Pack', 'Fresh Manioc Root', 'Wholesale Rate: LKR 900'],
    image_url: plateDumplingsImg,
    slug: 'manioc-chips-1kg'
  },
  {
    id: 802,
    name: 'Manioc Chips 250g (மரவள்ளி கிழங்கு சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '350.00',
    wholesale_price: '300.00',
    unit: '250g Pack',
    description: 'Crunchy golden manioc chips.',
    features: ['250g Pack', 'Crispy Slices', 'Wholesale Rate: LKR 300'],
    image_url: plateDumplingsImg,
    slug: 'manioc-chips-250g'
  },
  {
    id: 803,
    name: 'Manioc Chips 60g (மரவள்ளி கிழங்கு சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g Pack',
    description: 'Snack pouch of crispy manioc chips.',
    features: ['60g Pouch', 'Golden Crisp', 'Wholesale Rate: LKR 75'],
    image_url: plateDumplingsImg,
    slug: 'manioc-chips-60g'
  },
  {
    id: 804,
    name: 'Manioc Chips 30g (மரவள்ளி கிழங்கு சிப்ஸ்)',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g Pouch',
    description: 'Pocket size manioc chips pouch.',
    features: ['30g Pouch', 'Quick Crunch', 'Wholesale Rate: LKR 40'],
    image_url: plateDumplingsImg,
    slug: 'manioc-chips-30g'
  },

  // --- PEANUT PAKODA ---
  {
    id: 901,
    name: 'Peanut Pakoda 1kg (கடலை பகோடா)',
    category: 'Pakoda',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg Pack',
    description: 'Crunchy whole peanuts coated in spicy gram flour batter & fried to a deep golden crisp.',
    features: ['1kg Catering Pack', 'Spicy Peanut Crunch', 'Wholesale Rate: LKR 1,400'],
    image_url: bengalGramYellowImg,
    slug: 'peanut-pakoda-1kg'
  },
  {
    id: 902,
    name: 'Peanut Pakoda 250g (கடலை பகோடா)',
    category: 'Pakoda',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g Pack',
    description: 'Spicy peanut pakoda snack pack.',
    features: ['250g Pack', 'High Protein Snack', 'Wholesale Rate: LKR 400'],
    image_url: bengalGramYellowImg,
    slug: 'peanut-pakoda-250g'
  },
  {
    id: 903,
    name: 'Peanut Pakoda 100g (கடலை பகோடா)',
    category: 'Pakoda',
    price: '200.00',
    wholesale_price: '170.00',
    unit: '100g Pack',
    description: 'Crispy peanut pakoda pouch for snacks.',
    features: ['100g Pouch', 'Nutty Crunch', 'Wholesale Rate: LKR 170'],
    image_url: bengalGramYellowImg,
    slug: 'peanut-pakoda-100g'
  },

  // --- DHAL ---
  {
    id: 1001,
    name: 'Roasted Dhal Snack 1kg (பருப்பு பைட்ஸ்)',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg Pack',
    description: 'Crispy salted roasted lentils/dhal for healthy high-protein snacking.',
    features: ['1kg Bulk Pack', 'Roasted & Salted', 'Wholesale Rate: LKR 700'],
    image_url: bengalGramYellowImg,
    slug: 'dhal-1kg'
  },
  {
    id: 1002,
    name: 'Roasted Dhal Snack 250g (பருப்பு பைட்ஸ்)',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g Pack',
    description: 'Crunchy dhal snack pack.',
    features: ['250g Pack', 'High Fiber', 'Wholesale Rate: LKR 200'],
    image_url: bengalGramYellowImg,
    slug: 'dhal-250g'
  },
  {
    id: 1003,
    name: 'Roasted Dhal Snack 40g (பருப்பு பைட்ஸ்)',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Small pouch of roasted crunchy dhal.',
    features: ['40g Pouch', 'Pocket Pack', 'Wholesale Rate: LKR 35'],
    image_url: bengalGramYellowImg,
    slug: 'dhal-40g'
  },
  {
    id: 1004,
    name: 'Roasted Dhal Snack 18g (பருப்பு பைட்ஸ்)',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g Mini Pouch',
    description: 'Mini pocket pouch of roasted dhal.',
    features: ['18g Mini Pouch', 'Rs 20 Pouch', 'Wholesale Rate: LKR 16'],
    image_url: bengalGramYellowImg,
    slug: 'dhal-18g'
  },

  // --- BABY MIXTURE ---
  {
    id: 1101,
    name: 'Baby Mixture 1kg (பேபி மிக்சர்)',
    category: 'Mixture',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg Pack',
    description: 'Mildly spiced fine noodle mixture crafted for all ages and sensitive palates.',
    features: ['1kg Catering Pack', 'Mild Spice Recipe', 'Wholesale Rate: LKR 880'],
    image_url: bitesPackImg,
    slug: 'baby-mixture-1kg'
  },
  {
    id: 1102,
    name: 'Baby Mixture 250g (பேபி மிக்சர்)',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Mild crunchy family snack mixture pack.',
    features: ['250g Pack', 'Fine & Mild', 'Wholesale Rate: LKR 250'],
    image_url: bitesPackImg,
    slug: 'baby-mixture-250g'
  },
  {
    id: 1103,
    name: 'Baby Mixture 80g (பேபி மிக்சர்)',
    category: 'Mixture',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Pouch size mild baby mixture.',
    features: ['80g Pouch', 'Mild Snack', 'Wholesale Rate: LKR 75'],
    image_url: bitesPackImg,
    slug: 'baby-mixture-80g'
  },

  // --- BENGAL GRAM ---
  {
    id: 1201,
    name: 'Roasted Bengal Gram 1kg (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg Pack',
    description: 'Aromatic roasted yellow Bengal Gram seasoned lightly with salt.',
    features: ['1kg Bulk Pack', '100% Pure Roasted Gram', 'Wholesale Rate: LKR 700'],
    image_url: bengalGramYellowImg,
    slug: 'bengal-gram-1kg'
  },
  {
    id: 1202,
    name: 'Roasted Bengal Gram 500g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '500.00',
    wholesale_price: '350.00',
    unit: '500g Pack',
    description: 'Crisp roasted yellow gram family pack.',
    features: ['500g Pack', 'High Protein', 'Wholesale Rate: LKR 350'],
    image_url: bengalGramYellowImg,
    slug: 'bengal-gram-500g'
  },
  {
    id: 1203,
    name: 'Roasted Bengal Gram 250g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g Pack',
    description: 'Healthy crunchy roasted gram pack.',
    features: ['250g Pack', 'Salted & Crisp', 'Wholesale Rate: LKR 200'],
    image_url: bengalGramYellowImg,
    slug: 'bengal-gram-250g'
  },
  {
    id: 1204,
    name: 'Roasted Bengal Gram 80g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g Pack',
    description: 'Pocket pouch roasted yellow gram.',
    features: ['80g Pouch', 'Quick Protein', 'Wholesale Rate: LKR 75'],
    image_url: bengalGramYellowImg,
    slug: 'bengal-gram-80g'
  },
  {
    id: 1205,
    name: 'Roasted Bengal Gram 40g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g Pouch',
    description: 'Handy mini pouch roasted yellow gram.',
    features: ['40g Pouch', 'Pocket Friendly', 'Wholesale Rate: LKR 35'],
    image_url: bengalGramYellowImg,
    slug: 'bengal-gram-40g'
  },
  {
    id: 1206,
    name: 'Roasted Bengal Gram 18g (மஞ்சள் கடலை)',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g Mini Pouch',
    description: 'Mini pocket pouch roasted gram.',
    features: ['18g Mini Pouch', 'Rs 20 Pouch', 'Wholesale Rate: LKR 16'],
    image_url: bengalGramYellowImg,
    slug: 'bengal-gram-18g'
  },

  // --- PEANUT ---
  {
    id: 1301,
    name: 'Roasted Salted Peanuts 1kg (வேர்க்கடலை)',
    category: 'Dhal & Gram',
    price: '1800.00',
    wholesale_price: '1300.00',
    unit: '1kg Pack',
    description: 'Selected premium Sri Lankan peanuts roasted to crunchy perfection & lightly salted.',
    features: ['1kg Catering Pack', 'Freshly Roasted', 'Wholesale Rate: LKR 1,300'],
    image_url: bengalGramYellowImg,
    slug: 'peanut-1kg'
  },
  {
    id: 1302,
    name: 'Roasted Salted Peanuts 100g (வேர்க்கடலை)',
    category: 'Dhal & Gram',
    price: '200.00',
    wholesale_price: '180.00',
    unit: '100g Pack',
    description: 'Crunchy roasted peanut snack pack.',
    features: ['100g Pack', 'Rich Flavor', 'Wholesale Rate: LKR 180'],
    image_url: bengalGramYellowImg,
    slug: 'peanut-100g'
  },
  {
    id: 1303,
    name: 'Roasted Salted Peanuts 50g (வேர்க்கடலை)',
    category: 'Dhal & Gram',
    price: '100.00',
    wholesale_price: '80.00',
    unit: '50g Pouch',
    description: 'Convenient pocket size roasted peanut pouch.',
    features: ['50g Pouch', 'Pocket Pack', 'Wholesale Rate: LKR 80'],
    image_url: bengalGramYellowImg,
    slug: 'peanut-50g'
  },

  // --- CHILLI POWDER ---
  {
    id: 1401,
    name: 'Roasted Chilli Powder 1kg (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '1400.00',
    wholesale_price: '1000.00',
    unit: '1kg Pack',
    description: 'Sun-dried red Jaffna chillies slow-roasted & milled for fiery red color & rich aroma.',
    features: ['1kg Catering Pack', 'Sun-Dried Jaffna Chillies', 'Wholesale Rate: LKR 1,000'],
    image_url: roastedChilli50gImg,
    slug: 'chilli-powder-1kg'
  },
  {
    id: 1402,
    name: 'Roasted Chilli Powder 250g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '350.00',
    wholesale_price: '250.00',
    unit: '250g Pack',
    description: 'Authentic Jaffna roasted chilli powder for curry lovers.',
    features: ['250g Pack', 'Deep Fiery Color', 'Wholesale Rate: LKR 250'],
    image_url: roastedChilli50gImg,
    slug: 'chilli-powder-250g'
  },
  {
    id: 1403,
    name: 'Roasted Chilli Powder 50g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '70.00',
    wholesale_price: '52.00',
    unit: '50g Pack',
    description: 'Handy family pack of slow-roasted chilli powder.',
    features: ['50g Pack', 'Aromatic & Spicy', 'Wholesale Rate: LKR 52'],
    image_url: roastedChilli50gImg,
    slug: 'chilli-powder-50g'
  },

  // --- GINGELLY OIL ---
  {
    id: 1501,
    name: 'Pure Cold-Pressed Gingelly Oil 750ml (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '1400.00',
    wholesale_price: '1050.00',
    unit: '750ml Bottle',
    description: 'Wood-pressed 100% pure sesame oil extracted from selected sesame seeds for rich natural aroma.',
    features: ['750ml Bottle', 'Cold-Pressed Unrefined', 'Wholesale Rate: LKR 1,050'],
    image_url: gingellyOil750mlImg,
    slug: 'gingelly-oil-750ml'
  },
  {
    id: 1502,
    name: 'Pure Cold-Pressed Gingelly Oil 350ml (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '750.00',
    wholesale_price: '560.00',
    unit: '350ml Bottle',
    description: '100% natural cold-pressed sesame oil in a 350ml family size bottle.',
    features: ['350ml Bottle', 'Rich Aroma & Taste', 'Wholesale Rate: LKR 560'],
    image_url: gingellyOil375mlImg,
    slug: 'gingelly-oil-350ml'
  },
  {
    id: 1503,
    name: 'Pure Cold-Pressed Gingelly Oil 200ml (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '400.00',
    wholesale_price: '320.00',
    unit: '200ml Bottle',
    description: 'Convenient 200ml bottle of authentic pure cold-pressed Gingelly oil.',
    features: ['200ml Bottle', 'Pure & Unrefined', 'Wholesale Rate: LKR 320'],
    image_url: gingellyOil375mlImg,
    slug: 'gingelly-oil-200ml'
  }
];

const Products = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const categories = ['All', 'Flour', 'Mixture', 'Pakoda', 'Murukku', 'Bites & Chips', 'Dhal & Gram', 'Spices', 'Gingelly Oil'];

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', { timeout: 3000 });
        if (isMounted && response.data?.success && Array.isArray(response.data.products) && response.data.products.length > 0) {
          const apiProducts = response.data.products;
          const combined = [...apiProducts];
          fallbackProducts.forEach((defItem) => {
            const exists = combined.some((p) =>
              (p.id && defItem.id && p.id === defItem.id) ||
              (p.slug && defItem.slug && p.slug === defItem.slug) ||
              (p.name && defItem.name && p.name.toLowerCase() === defItem.name.toLowerCase())
            );
            if (!exists) {
              combined.push(defItem);
            }
          });
          setProducts(combined);
        }
      } catch (error) {
        console.warn('API connection offline or error, using fallback products:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  const filteredProducts = (products || []).filter((item) => {
    if (!item) return false;
    const name = item.name ? String(item.name).toLowerCase() : '';
    const desc = item.description ? String(item.description).toLowerCase() : '';
    const cat = (item.category || '').toLowerCase();
    const searchTerm = (search || '').toLowerCase();

    const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);

    let matchesCategory = selectedCategory === 'All';
    if (!matchesCategory) {
      const sel = selectedCategory.toLowerCase();
      if (sel === 'rice flour' && (cat.includes('rice') || cat.includes('flour'))) matchesCategory = true;
      else if (sel === 'gingelly oil' && cat.includes('oil')) matchesCategory = true;
      else if (sel === 'spices' && (cat.includes('spice') || cat.includes('powder') || cat.includes('chilli'))) matchesCategory = true;
      else if (sel === 'mixture' && (cat.includes('mixture') || cat.includes('snack') || cat.includes('pakoda') || cat.includes('gram') || cat.includes('bites'))) matchesCategory = true;
      else if (cat === sel || cat.includes(sel) || sel.includes(cat)) matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0F4A24 0%, #083117 100%)',
        color: '#FFFFFF',
        padding: '75px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '6px 18px',
            borderRadius: '9999px',
            marginBottom: '16px',
            backdropFilter: 'blur(4px)'
          }}>
            <Sparkles size={16} style={{ color: '#FFD700' }} />
            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '0.825rem', letterSpacing: '1px' }}>
              OUR PRODUCT LINEUP • TASTRAA (PVT) LTD
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
            PRODUCT <span style={{ color: '#FFD700' }}>CATALOG</span>
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#E2E8F0', fontSize: '1.1rem', fontWeight: '600', lineHeight: '1.6' }}>
            Dependable Food Essentials for Households, Retailers & Food Startups
          </p>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {/* Controls Bar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: '24px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
            border: '1px solid #E2E8F0',
            marginBottom: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    transition: 'all 0.25s',
                    backgroundColor: selectedCategory === cat ? '#0F4A24' : '#F1F5F9',
                    color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                    border: selectedCategory === cat ? '1px solid #0F4A24' : '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search food products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 18px 11px 44px',
                  borderRadius: '9999px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#FAF9F5'
                }}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="responsive-grid-auto" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredProducts.map((product) => {
              const formattedPrice = product.price ? parseFloat(product.price).toFixed(2) : '0.00';
              const productSlug = product.slug || product.id;
              const keyId = product.id || product.slug;
              const qty = quantities[keyId] || 1;
              const totalPrice = product.price ? (parseFloat(product.price) * qty).toFixed(2) : '0.00';
              const whatsappMsg = `Hi TASTRAA, I want to order ${qty} x ${product.name || 'Product'} (${product.unit || 'Pack'}). Total Price: LKR ${totalPrice}. Please confirm availability.`;

              const getProductImage = (p) => {
                if (!p) return hero3dImg;
                const url = p.image_url || '';
                if (url === '/assets/gingelly_oil_750ml.jpg' || p.slug === 'gingelly-oil') return gingellyOil750mlImg;
                if (url === '/assets/gingelly_oil_375ml.jpg' || p.slug === 'gingelly-oil-375ml') return gingellyOil375mlImg;
                if (url === '/assets/bengal_gram_yellow.jpg' || url === '/assets/bengal_gram_pack.jpg' || url === '/assets/bengal_gram_100.jpg' || p.slug === 'tastraa-bengal-gram-100') return bengalGramYellowImg;
                if (url === '/assets/plate_dumplings.jpg' || p.slug === 'tastraa-plate-dumplings-100') return plateDumplingsImg;
                if (url === '/assets/bites_pack.jpg' || p.slug === 'tastraa-bites-50') return bitesPackImg;
                if (url === '/assets/masala_murukku.jpg' || p.slug === 'tastraa-masala-murukku-50') return masalaMurukkuImg;
                if (url === '/assets/red_raw_rice_25kg.jpg' || p.slug === 'red-raw-rice-25kg') return redRawRice25kgImg;
                if (url === '/assets/red_rice_flour_5kg.jpg' || p.slug === 'red-rice-flour-5kg') return redRice5kgImg;
                if (url === '/assets/red_rice_flour_10kg.jpg' || p.slug === 'red-rice-flour-10kg') return redRice10kgImg;
                if (url === '/assets/red_rice_flour_25kg.png' || p.slug === 'red-rice-flour-25kg') return redRice25kgImg;
                if (url === '/assets/red_rice_flour_2kg.jpg' || p.slug === 'red-rice-flour-2kg') return redRice2kgImg;
                if (url === '/assets/roasted_chilli_powder_50g.jpg' || p.slug === 'roasted-chilli-powder-50g') return roastedChilli50gImg;
                if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) return url;
                return p.image_url || hero3dImg;
              };

              return (
                <motion.div
                  key={product.id || product.slug}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '2px solid #E8F5E9',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image Box */}
                  <div style={{ position: 'relative', height: '230px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <img
                      src={getProductImage(product)}
                      alt={product.name || 'TASTRAA Product'}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: '#0F4A24',
                      color: '#FFFFFF',
                      fontSize: '0.725rem',
                      fontWeight: '800',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase'
                    }}>
                      {product.category || 'Food Essential'}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: '#0F4A24',
                        marginBottom: '10px'
                      }}>
                        {product.name || 'TASTRAA Product'}
                      </h3>

                      <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '16px' }}>
                        {product.description || ''}
                      </p>

                      {/* Features */}
                      {product.features && Array.isArray(product.features) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                          {product.features.map((feat, fidx) => (
                            <span key={fidx} style={{
                              backgroundColor: '#E8F5E9',
                              color: '#0F4A24',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              padding: '3px 10px',
                              borderRadius: '6px',
                              border: '1px solid #A5D6A7'
                            }}>
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Quantity Selector Bar */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 14px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        marginBottom: '14px'
                      }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>
                          Select Items:
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(keyId, -1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: qty > 1 ? '#0F4A24' : '#F1F5F9',
                              color: qty > 1 ? '#FFFFFF' : '#94A3B8',
                              fontWeight: '900',
                              fontSize: '1rem',
                              cursor: qty > 1 ? 'pointer' : 'not-allowed',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                            disabled={qty <= 1}
                          >
                            -
                          </button>
                          <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '900', fontSize: '1rem', color: '#0F4A24' }}>
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(keyId, 1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: '#0F4A24',
                              color: '#FFFFFF',
                              fontWeight: '900',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Unit */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '16px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0F4A24', lineHeight: '1.2' }}>
                            LKR {totalPrice} <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: '700', display: 'inline-block' }}>(Retail)</span>
                          </div>
                          {product.wholesale_price && (
                            <div style={{ fontSize: '0.775rem', color: '#B91C1C', fontWeight: '800', marginTop: '3px' }}>
                              Production: LKR {(parseFloat(product.wholesale_price) * qty).toFixed(2)}
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: '800', backgroundColor: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {product.unit || 'Pack'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '10px', alignItems: 'center' }}>
                        <Link
                          to={`/products/${productSlug}`}
                          style={{
                            backgroundColor: '#FAF9F5',
                            color: '#0F4A24',
                            border: '2px solid #0F4A24',
                            borderRadius: '9999px',
                            padding: '11px 14px',
                            fontWeight: '800',
                            fontSize: '0.8rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Eye size={14} />
                          <span>DETAILS</span>
                        </Link>

                        <a
                          href={`https://wa.me/94779789223?text=${encodeURIComponent(whatsappMsg)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-green-3d"
                          style={{
                            padding: '12px 20px',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            justifyContent: 'center',
                            borderRadius: '9999px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Send size={15} />
                          <span>ORDER ({qty})</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;

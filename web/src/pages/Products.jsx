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
import garlicMurukkuImg from '../assets/garlic_murukku.jpg';

const fallbackProducts = [
  {
    id: 101,
    name: 'Red Raw Rice 25kg',
    category: 'Rice',
    price: '7500.00',
    wholesale_price: '6500.00',
    unit: '25kg',
    description: 'Premium quality Red Raw Rice 25kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 6500'],
    image_url: '/assets/tastraa_red_raw_rice_25kg.jpg',
    slug: 'red-raw-rice-25kg'
  },
  {
    id: 102,
    name: 'Red Raw Rice 10kg',
    category: 'Rice',
    price: '3000.00',
    wholesale_price: '2600.00',
    unit: '10kg',
    description: 'Premium quality Red Raw Rice 10kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 2600'],
    image_url: '/assets/tastraa_red_raw_rice_5kg.jpg',
    slug: 'red-raw-rice-10kg'
  },
  {
    id: 103,
    name: 'Red Raw Rice 5kg',
    category: 'Rice',
    price: '1500.00',
    wholesale_price: '1300.00',
    unit: '5kg',
    description: 'Premium quality Red Raw Rice 5kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1300'],
    image_url: '/assets/tastraa_red_raw_rice_5kg.jpg',
    slug: 'red-raw-rice-5kg'
  },
  {
    id: 104,
    name: 'Red Rice Flour 25kg',
    category: 'Flour',
    price: '7000.00',
    wholesale_price: '5600.00',
    unit: '25kg',
    description: 'Premium quality Red Rice Flour 25kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 5600'],
    image_url: '/assets/red_rice_flour_5kg.jpg',
    slug: 'red-rice-flour-25kg'
  },
  {
    id: 105,
    name: 'Red Rice Flour 10kg',
    category: 'Flour',
    price: '3000.00',
    wholesale_price: '2300.00',
    unit: '10kg',
    description: 'Premium quality Red Rice Flour 10kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 2300'],
    image_url: '/assets/red_rice_flour_5kg.jpg',
    slug: 'red-rice-flour-10kg'
  },
  {
    id: 106,
    name: 'Red Rice Flour 5kg',
    category: 'Flour',
    price: '1200.00',
    wholesale_price: '1140.00',
    unit: '5kg',
    description: 'Premium quality Red Rice Flour 5kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1140'],
    image_url: '/assets/red_rice_flour_5kg.jpg',
    slug: 'red-rice-flour-5kg'
  },
  {
    id: 107,
    name: 'Baby Mixture 1kg',
    category: 'Mixture',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg',
    description: 'Premium quality Baby Mixture 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'baby-mixture-1kg'
  },
  {
    id: 108,
    name: 'Baby Mixture 250g',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g',
    description: 'Premium quality Baby Mixture 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'baby-mixture-250g'
  },
  {
    id: 109,
    name: 'Baby Mixture 80g',
    category: 'Mixture',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Baby Mixture 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'baby-mixture-80g'
  },
  {
    id: 110,
    name: 'Mikser 400g',
    category: 'Mixture',
    price: '600.00',
    wholesale_price: '360.00',
    unit: '400g',
    description: 'Premium quality Mikser 400g (Mixture)',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 360'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mikser-400g'
  },
  {
    id: 111,
    name: 'Mikser 200g',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '180.00',
    unit: '200g',
    description: 'Premium quality Mikser 200g (Mixture)',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mikser-200g'
  },
  {
    id: 112,
    name: 'Mixture 1kg',
    category: 'Mixture',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg',
    description: 'Premium quality Mixture 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mixture-1kg'
  },
  {
    id: 113,
    name: 'Mixture 500g',
    category: 'Mixture',
    price: '600.00',
    wholesale_price: '460.00',
    unit: '500g',
    description: 'Premium quality Mixture 500g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 460'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mixture-500g'
  },
  {
    id: 114,
    name: 'Mixture 250g',
    category: 'Mixture',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g',
    description: 'Premium quality Mixture 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mixture-250g'
  },
  {
    id: 115,
    name: 'Mixture 80g',
    category: 'Mixture',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Mixture 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mixture-80g'
  },
  {
    id: 116,
    name: 'Mixture 40g',
    category: 'Mixture',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Mixture 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/tastraa_mixture.jpg',
    slug: 'mixture-40g'
  },
  {
    id: 117,
    name: 'Pakoda 1kg',
    category: 'Pakoda',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg',
    description: 'Premium quality Pakoda 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/plate_dumplings.jpg',
    slug: 'pakoda-1kg'
  },
  {
    id: 118,
    name: 'Pakoda 500g',
    category: 'Pakoda',
    price: '600.00',
    wholesale_price: '460.00',
    unit: '500g',
    description: 'Premium quality Pakoda 500g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 460'],
    image_url: '/assets/plate_dumplings.jpg',
    slug: 'pakoda-500g'
  },
  {
    id: 119,
    name: 'Pakoda 250g',
    category: 'Pakoda',
    price: '300.00',
    wholesale_price: '250.00',
    unit: '250g',
    description: 'Premium quality Pakoda 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/plate_dumplings.jpg',
    slug: 'pakoda-250g'
  },
  {
    id: 120,
    name: 'Pakoda 80g',
    category: 'Pakoda',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Pakoda 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/plate_dumplings.jpg',
    slug: 'pakoda-80g'
  },
  {
    id: 121,
    name: 'Pakoda 40g',
    category: 'Pakoda',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Pakoda 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/plate_dumplings.jpg',
    slug: 'pakoda-40g'
  },
  {
    id: 122,
    name: 'Peanut Pakoda 1kg',
    category: 'Pakoda',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg',
    description: 'Premium quality Peanut Pakoda 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1400'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'peanut-pakoda-1kg'
  },
  {
    id: 123,
    name: 'Peanut Pakoda 250g',
    category: 'Pakoda',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g',
    description: 'Premium quality Peanut Pakoda 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 400'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'peanut-pakoda-250g'
  },
  {
    id: 124,
    name: 'Peanut Pakoda 100g',
    category: 'Pakoda',
    price: '200.00',
    wholesale_price: '170.00',
    unit: '100g',
    description: 'Premium quality Peanut Pakoda 100g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 170'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'peanut-pakoda-100g'
  },
  {
    id: 125,
    name: 'Garlic Murukku 1kg',
    category: 'Murukku',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg',
    description: 'Premium quality Garlic Murukku 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'garlic-murukku-1kg'
  },
  {
    id: 126,
    name: 'Garlic Murukku 160g',
    category: 'Murukku',
    price: '200.00',
    wholesale_price: '150.00',
    unit: '160g',
    description: 'Premium quality Garlic Murukku 160g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 150'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'garlic-murukku-160g'
  },
  {
    id: 127,
    name: 'Garlic Murukku 80g',
    category: 'Murukku',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Garlic Murukku 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'garlic-murukku-80g'
  },
  {
    id: 128,
    name: 'Garlic Murukku 40g',
    category: 'Murukku',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Garlic Murukku 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'garlic-murukku-40g'
  },
  {
    id: 129,
    name: 'Masala Murukku 1kg',
    category: 'Murukku',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg',
    description: 'Premium quality Masala Murukku 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'masala-murukku-1kg'
  },
  {
    id: 130,
    name: 'Masala Murukku 250g',
    category: 'Murukku',
    price: '300.00',
    wholesale_price: '240.00',
    unit: '250g',
    description: 'Premium quality Masala Murukku 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 240'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'masala-murukku-250g'
  },
  {
    id: 131,
    name: 'Masala Murukku 80g',
    category: 'Murukku',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Masala Murukku 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'masala-murukku-80g'
  },
  {
    id: 132,
    name: 'Masala Murukku 40g',
    category: 'Murukku',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Masala Murukku 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/tastraa_masala_murukku.jpg',
    slug: 'masala-murukku-40g'
  },
  {
    id: 133,
    name: 'Bites 1kg',
    category: 'Bites & Chips',
    price: '1200.00',
    wholesale_price: '880.00',
    unit: '1kg',
    description: 'Premium quality Bites 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 880'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'bites-1kg'
  },
  {
    id: 134,
    name: 'Bites 250g',
    category: 'Bites & Chips',
    price: '300.00',
    wholesale_price: '240.00',
    unit: '250g',
    description: 'Premium quality Bites 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 240'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'bites-250g'
  },
  {
    id: 135,
    name: 'Bites 80g',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Bites 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'bites-80g'
  },
  {
    id: 136,
    name: 'Bites 40g',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Bites 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'bites-40g'
  },
  {
    id: 137,
    name: 'Manioc Chips 1kg',
    category: 'Bites & Chips',
    price: '1400.00',
    wholesale_price: '900.00',
    unit: '1kg',
    description: 'Premium quality Manioc Chips 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 900'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'manioc-chips-1kg'
  },
  {
    id: 138,
    name: 'Manioc Chips 250g',
    category: 'Bites & Chips',
    price: '350.00',
    wholesale_price: '300.00',
    unit: '250g',
    description: 'Premium quality Manioc Chips 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 300'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'manioc-chips-250g'
  },
  {
    id: 139,
    name: 'Manioc Chips 60g',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g',
    description: 'Premium quality Manioc Chips 60g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'manioc-chips-60g'
  },
  {
    id: 140,
    name: 'Manioc Chips 30g',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g',
    description: 'Premium quality Manioc Chips 30g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 40'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'manioc-chips-30g'
  },
  {
    id: 141,
    name: 'Thadduvadai 1kg',
    category: 'Bites & Chips',
    price: '1800.00',
    wholesale_price: '1400.00',
    unit: '1kg',
    description: 'Premium quality Thadduvadai 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1400'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'thadduvadai-1kg'
  },
  {
    id: 142,
    name: 'Thadduvadai 250g',
    category: 'Bites & Chips',
    price: '450.00',
    wholesale_price: '400.00',
    unit: '250g',
    description: 'Premium quality Thadduvadai 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 400'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'thadduvadai-250g'
  },
  {
    id: 143,
    name: 'Thadduvadai 60g',
    category: 'Bites & Chips',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '60g',
    description: 'Premium quality Thadduvadai 60g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'thadduvadai-60g'
  },
  {
    id: 144,
    name: 'Thadduvadai 30g',
    category: 'Bites & Chips',
    price: '50.00',
    wholesale_price: '40.00',
    unit: '30g',
    description: 'Premium quality Thadduvadai 30g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 40'],
    image_url: '/assets/tastraa_bites.jpg',
    slug: 'thadduvadai-30g'
  },
  {
    id: 145,
    name: 'Bengal Gram 1kg',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg',
    description: 'Premium quality Bengal Gram 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 700'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'bengal-gram-1kg'
  },
  {
    id: 146,
    name: 'Bengal Gram 500g',
    category: 'Dhal & Gram',
    price: '500.00',
    wholesale_price: '350.00',
    unit: '500g',
    description: 'Premium quality Bengal Gram 500g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 350'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'bengal-gram-500g'
  },
  {
    id: 147,
    name: 'Bengal Gram 250g',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g',
    description: 'Premium quality Bengal Gram 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 200'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'bengal-gram-250g'
  },
  {
    id: 148,
    name: 'Bengal Gram 80g',
    category: 'Dhal & Gram',
    price: '100.00',
    wholesale_price: '75.00',
    unit: '80g',
    description: 'Premium quality Bengal Gram 80g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 75'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'bengal-gram-80g'
  },
  {
    id: 149,
    name: 'Bengal Gram 40g',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Bengal Gram 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'bengal-gram-40g'
  },
  {
    id: 150,
    name: 'Bengal Gram 18g',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g',
    description: 'Premium quality Bengal Gram 18g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 16'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'bengal-gram-18g'
  },
  {
    id: 151,
    name: 'Dhal 1kg',
    category: 'Dhal & Gram',
    price: '1000.00',
    wholesale_price: '700.00',
    unit: '1kg',
    description: 'Premium quality Dhal 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 700'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'dhal-1kg'
  },
  {
    id: 152,
    name: 'Dhal 250g',
    category: 'Dhal & Gram',
    price: '300.00',
    wholesale_price: '200.00',
    unit: '250g',
    description: 'Premium quality Dhal 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 200'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'dhal-250g'
  },
  {
    id: 153,
    name: 'Dhal 40g',
    category: 'Dhal & Gram',
    price: '50.00',
    wholesale_price: '35.00',
    unit: '40g',
    description: 'Premium quality Dhal 40g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 35'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'dhal-40g'
  },
  {
    id: 154,
    name: 'Dhal 18g',
    category: 'Dhal & Gram',
    price: '20.00',
    wholesale_price: '16.00',
    unit: '18g',
    description: 'Premium quality Dhal 18g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 16'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'dhal-18g'
  },
  {
    id: 155,
    name: 'Peanut 1kg',
    category: 'Dhal & Gram',
    price: '1800.00',
    wholesale_price: '1300.00',
    unit: '1kg',
    description: 'Premium quality Peanut 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1300'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'peanut-1kg'
  },
  {
    id: 156,
    name: 'Peanut 100g',
    category: 'Dhal & Gram',
    price: '200.00',
    wholesale_price: '180.00',
    unit: '100g',
    description: 'Premium quality Peanut 100g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'peanut-100g'
  },
  {
    id: 157,
    name: 'Peanut 50g',
    category: 'Dhal & Gram',
    price: '100.00',
    wholesale_price: '80.00',
    unit: '50g',
    description: 'Premium quality Peanut 50g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 80'],
    image_url: '/assets/bengal_gram_yellow.jpg',
    slug: 'peanut-50g'
  },
  {
    id: 158,
    name: 'Chilli Powder 1kg',
    category: 'Spices',
    price: '1400.00',
    wholesale_price: '1000.00',
    unit: '1kg',
    description: 'Premium quality Chilli Powder 1kg',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1000'],
    image_url: '/assets/roasted_chilli_powder_50g.jpg',
    slug: 'chilli-powder-1kg'
  },
  {
    id: 159,
    name: 'Chilli Powder 250g',
    category: 'Spices',
    price: '350.00',
    wholesale_price: '250.00',
    unit: '250g',
    description: 'Premium quality Chilli Powder 250g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 250'],
    image_url: '/assets/roasted_chilli_powder_50g.jpg',
    slug: 'chilli-powder-250g'
  },
  {
    id: 160,
    name: 'Chilli Powder 50g',
    category: 'Spices',
    price: '70.00',
    wholesale_price: '52.00',
    unit: '50g',
    description: 'Premium quality Chilli Powder 50g',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 52'],
    image_url: '/assets/roasted_chilli_powder_50g.jpg',
    slug: 'chilli-powder-50g'
  },
  {
    id: 161,
    name: 'Gingelly Oil 750ml',
    category: 'Gingelly Oil',
    price: '1400.00',
    wholesale_price: '1050.00',
    unit: '750ml',
    description: 'Premium quality Gingelly Oil 750ml',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 1050'],
    image_url: '/assets/gingelly_oil_750ml.jpg',
    slug: 'gingelly-oil-750ml'
  },
  {
    id: 162,
    name: 'Gingelly Oil 350ml',
    category: 'Gingelly Oil',
    price: '750.00',
    wholesale_price: '560.00',
    unit: '350ml',
    description: 'Premium quality Gingelly Oil 350ml',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 560'],
    image_url: '/assets/gingelly_oil_750ml.jpg',
    slug: 'gingelly-oil-350ml'
  },
  {
    id: 163,
    name: 'Gingelly Oil 200ml',
    category: 'Gingelly Oil',
    price: '400.00',
    wholesale_price: '320.00',
    unit: '200ml',
    description: 'Premium quality Gingelly Oil 200ml',
    features: ['Premium Quality', 'Traditional Taste', 'Wholesale Rate: LKR 320'],
    image_url: '/assets/gingelly_oil_750ml.jpg',
    slug: 'gingelly-oil-200ml'
  },
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

  const categories = ['All', 'Rice', 'Flour', 'Mixture', 'Pakoda', 'Murukku', 'Bites & Chips', 'Dhal & Gram', 'Spices', 'Gingelly Oil'];

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setProducts(fallbackProducts);
      setLoading(false);
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
            padding: '6px 16px',
            borderRadius: '9999px',
            marginBottom: '16px',
            maxWidth: '95%',
            backdropFilter: 'blur(4px)'
          }}>
            <Sparkles size={16} style={{ color: '#FFD700', flexShrink: 0 }} />
            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: 'clamp(0.7rem, 2.5vw, 0.825rem)', letterSpacing: '0.5px' }}>
              OUR PRODUCT LINEUP • TASTRAA (PVT) LTD
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 5.5vw, 3.4rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
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
              const realPrice = product.wholesale_price ? (parseFloat(product.wholesale_price) * qty).toFixed(2) : totalPrice;
              const whatsappMsg = `Hi TASTRAA, I want to order ${qty} x ${product.name || 'Product'} (${product.unit || 'Pack'}). Total Price: LKR ${realPrice}. Please confirm availability.`;

              const getProductImage = (p) => {
                if (!p) return hero3dImg;
                const url = p.image_url || '';
                if (url === '/assets/gingelly_oil_750ml.jpg' || p.slug === 'gingelly-oil') return gingellyOil750mlImg;
                if (url === '/assets/gingelly_oil_375ml.jpg' || p.slug === 'gingelly-oil-375ml') return gingellyOil375mlImg;
                if (url === '/assets/bengal_gram_yellow.jpg' || url === '/assets/bengal_gram_pack.jpg' || url === '/assets/bengal_gram_100.jpg' || p.slug === 'tastraa-bengal-gram-100') return bengalGramYellowImg;
                if (url === '/assets/plate_dumplings.jpg' || p.slug === 'tastraa-plate-dumplings-100') return plateDumplingsImg;
                if (url === '/assets/bites_pack.jpg' || p.slug === 'tastraa-bites-50') return bitesPackImg;
                if (url === '/assets/garlic_murukku.jpg' || (p.slug && p.slug.includes('garlic-murukku'))) return garlicMurukkuImg;
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
                  transition={{ duration: 0.15 }}
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
                  <div className="product-image-box" style={{ position: 'relative', height: '230px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
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
                  <div className="product-card-body" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="product-title" style={{
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: '#0F4A24',
                        marginBottom: '10px'
                      }}>
                        {product.name || 'TASTRAA Product'}
                      </h3>

                      <p className="product-desc" style={{ color: '#475569', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '16px' }}>
                        {product.description || ''}
                      </p>

                      {/* Features */}
                      {product.features && Array.isArray(product.features) && (
                        <div className="product-features" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
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
                      <div className="qty-selector" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 14px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        marginBottom: '14px'
                      }}>
                        <span className="qty-label" style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>
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
                      <div className="price-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '16px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {product.wholesale_price ? (
                            <>
                              <div className="price-text" style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F4A24', lineHeight: '1.2' }}>
                                LKR {(parseFloat(product.wholesale_price) * qty).toFixed(2)}
                              </div>
                              <div style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: '700', marginTop: '4px', textDecoration: 'line-through' }}>
                                LKR {totalPrice}
                              </div>
                            </>
                          ) : (
                            <div className="price-text" style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F4A24', lineHeight: '1.2' }}>
                              LKR {totalPrice}
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: '800', backgroundColor: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {product.unit || 'Pack'}
                        </span>
                      </div>

                      <div className="action-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '10px', alignItems: 'center' }}>
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

import express from 'express';
import { queryDb } from '../db.js';

const router = express.Router();

const KNOWLEDGE_BASE = {
  company: "TASTRAA (PVT) LTD",
  established: "June 2008",
  registration: "PV 00242273",
  address: "No. 41, Kalasalai Road, Thirunelvely, Kopay, Jaffna, Sri Lanka",
  phone: ["0779789223", "0212052200"],
  email: "tastraa2008@gmail.com",
  products: ["Rice Flour", "Mixture", "Gingelly Oil"],
  about: "TASTRAA (PVT) LTD was established in June 2008 in Jaffna, Sri Lanka. We specialize in processing high-quality, locally sourced food essentials including super-fine Rice Flour, traditional Jaffna Mixture, and pure cold-pressed Gingelly Oil for households and commercial businesses."
};

// POST /api/ai/ask
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ success: false, answer: "Please provide a valid question." });
    }

    const q = question.toLowerCase().trim();

    // Prevent security / secret probing
    if (q.includes('password') || q.includes('admin') || q.includes('database') || q.includes('jwt') || q.includes('secret') || q.includes('credential')) {
      return res.json({
        success: true,
        answer: "I’m sorry, I don’t have that information. Please contact TASTRAA directly."
      });
    }

    // Question matching against official facts
    if (q.includes('location') || q.includes('address') || q.includes('where')) {
      return res.json({
        success: true,
        answer: `TASTRAA (PVT) LTD is located at ${KNOWLEDGE_BASE.address}.`
      });
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('email')) {
      return res.json({
        success: true,
        answer: `You can reach TASTRAA (PVT) LTD by phone at ${KNOWLEDGE_BASE.phone.join(' or ')}, or via email at ${KNOWLEDGE_BASE.email}.`
      });
    }

    if (q.includes('established') || q.includes('when') || q.includes('history') || q.includes('founded') || q.includes('start') || q.includes('reg') || q.includes('registration')) {
      return res.json({
        success: true,
        answer: `TASTRAA (PVT) LTD was established in ${KNOWLEDGE_BASE.established} (Registration No: ${KNOWLEDGE_BASE.registration}).`
      });
    }

    if (q.includes('product') || q.includes('what do you sell') || q.includes('offer')) {
      // Retrieve current live active products
      let dbProducts = [];
      try {
        const result = await queryDb('SELECT name, category, price, unit FROM products WHERE is_active = true');
        dbProducts = result.rows;
      } catch (err) {
        // fallback
      }

      if (dbProducts.length > 0) {
        const prodList = dbProducts.map(p => `${p.name} (${p.unit}) - LKR ${p.price}`).join(', ');
        return res.json({
          success: true,
          answer: `TASTRAA provides locally produced food essentials across three main categories: Rice Flour, Mixture, and Gingelly Oil. Our current active products include: ${prodList}.`
        });
      }

      return res.json({
        success: true,
        answer: `TASTRAA provides locally produced food essentials: Rice Flour, Mixture, and Gingelly Oil. Please check our Products page for current listings!`
      });
    }

    if (q.includes('rice flour')) {
      return res.json({
        success: true,
        answer: `TASTRAA Rice Flour is ground from 100% locally sourced premium Sri Lankan rice. It has a super-fine texture and contains no added preservatives, making it ideal for string hoppers (Idiyappam), pittu, dosa, and traditional snacks.`
      });
    }

    if (q.includes('mixture')) {
      return res.json({
        success: true,
        answer: `TASTRAA Mixture is an authentic spicy and savory Jaffna snack made with high quality peanuts, fried gram, curry leaves, and traditional spice blends for guaranteed crunch and freshness.`
      });
    }

    if (q.includes('gingelly') || q.includes('sesame') || q.includes('oil')) {
      return res.json({
        success: true,
        answer: `TASTRAA Gingelly Oil is 100% pure cold-pressed sesame oil extracted using traditional methods from premium sesame seeds. It features a rich natural aroma and is ideal for healthy cooking and authentic flavor.`
      });
    }

    if (q.includes('about') || q.includes('who are you') || q.includes('company')) {
      return res.json({
        success: true,
        answer: KNOWLEDGE_BASE.about
      });
    }

    // Default response for unverified questions
    return res.json({
      success: true,
      answer: "I’m sorry, I don’t have that information. Please contact TASTRAA directly."
    });

  } catch (error) {
    console.error('AI route error:', error);
    return res.status(500).json({
      success: false,
      answer: "I’m sorry, I don’t have that information. Please contact TASTRAA directly."
    });
  }
});

export default router;

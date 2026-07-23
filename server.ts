import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { COURSES, TESTIMONIALS } from './src/data';

dotenv.config();

const app = express();
const PORT = 3000;

// JSON parser
app.use(express.json());

// Helper function to map Strapi Course to local Course model
function mapStrapiCourse(item: any): any {
  const attrs = item.attributes || item;
  const id = attrs.slug || item.slug || item.id?.toString() || item.documentId || '';
  
  // Resiliently resolve image URLs (can be media object or text URL)
  let image = attrs.image || '';
  if (attrs.image?.data?.attributes?.url) {
    const url = attrs.image.data.attributes.url;
    image = url.startsWith('/') && process.env.STRAPI_API_URL 
      ? `${process.env.STRAPI_API_URL}${url}` 
      : url;
  }
  
  let bannerImage = attrs.bannerImage || '';
  if (attrs.bannerImage?.data?.attributes?.url) {
    const url = attrs.bannerImage.data.attributes.url;
    bannerImage = url.startsWith('/') && process.env.STRAPI_API_URL 
      ? `${process.env.STRAPI_API_URL}${url}` 
      : url;
  }

  // Parse arrays safely
  let tagsAr: string[] = [];
  if (Array.isArray(attrs.tagsAr)) {
    tagsAr = attrs.tagsAr;
  } else if (typeof attrs.tagsAr === 'string') {
    try { tagsAr = JSON.parse(attrs.tagsAr); } catch { tagsAr = attrs.tagsAr.split(',').map((s: string) => s.trim()); }
  } else if (attrs.tags_ar) {
    try { tagsAr = JSON.parse(attrs.tags_ar); } catch { tagsAr = String(attrs.tags_ar).split(',').map((s: string) => s.trim()); }
  }

  let tagsFr: string[] = [];
  if (Array.isArray(attrs.tagsFr)) {
    tagsFr = attrs.tagsFr;
  } else if (typeof attrs.tagsFr === 'string') {
    try { tagsFr = JSON.parse(attrs.tagsFr); } catch { tagsFr = attrs.tagsFr.split(',').map((s: string) => s.trim()); }
  } else if (attrs.tags_fr) {
    try { tagsFr = JSON.parse(attrs.tags_fr); } catch { tagsFr = String(attrs.tags_fr).split(',').map((s: string) => s.trim()); }
  }

  let lessons: any[] = [];
  if (Array.isArray(attrs.lessons)) {
    lessons = attrs.lessons.map((lesson: any) => ({
      titleAr: lesson.titleAr || lesson.title_ar || '',
      titleFr: lesson.titleFr || lesson.title_fr || '',
      durationAr: lesson.durationAr || lesson.duration_ar || '',
      durationFr: lesson.durationFr || lesson.duration_fr || ''
    }));
  }

  return {
    id,
    titleAr: attrs.titleAr || attrs.title_ar || '',
    titleFr: attrs.titleFr || attrs.title_fr || '',
    descriptionAr: attrs.descriptionAr || attrs.description_ar || '',
    descriptionFr: attrs.descriptionFr || attrs.description_fr || '',
    category: attrs.category || 'crafts',
    durationAr: attrs.durationAr || attrs.duration_ar || '',
    durationFr: attrs.durationFr || attrs.duration_fr || '',
    price: Number(attrs.price) || 0,
    currencyAr: attrs.currencyAr || attrs.currency_ar || 'دج',
    currencyFr: attrs.currencyFr || attrs.currency_fr || 'DA',
    instructorId: attrs.instructorId || attrs.instructor_id || '',
    image,
    bannerImage,
    lecturesCount: Number(attrs.lecturesCount || attrs.lectures_count) || 0,
    levelAr: attrs.levelAr || attrs.level_ar || '',
    levelFr: attrs.levelFr || attrs.level_fr || '',
    tagsAr,
    tagsFr,
    accentColor: attrs.accentColor || attrs.accent_color || '#8b5cf6',
    detailsAr: attrs.detailsAr || attrs.details_ar || '',
    detailsFr: attrs.detailsFr || attrs.details_fr || '',
    lessons
  };
}

// Helper to map Strapi Testimonial to local Testimonial model
function mapStrapiTestimonial(item: any): any {
  const attrs = item.attributes || item;
  const id = item.id?.toString() || item.documentId || '';
  
  let avatar = attrs.avatar || '';
  if (attrs.avatar?.data?.attributes?.url) {
    const url = attrs.avatar.data.attributes.url;
    avatar = url.startsWith('/') && process.env.STRAPI_API_URL 
      ? `${process.env.STRAPI_API_URL}${url}` 
      : url;
  }

  return {
    id,
    authorAr: attrs.authorAr || attrs.author_ar || attrs.author || '',
    authorFr: attrs.authorFr || attrs.author_fr || attrs.author || '',
    roleAr: attrs.roleAr || attrs.role_ar || '',
    roleFr: attrs.roleFr || attrs.role_fr || '',
    rating: Number(attrs.rating) || 5,
    contentAr: attrs.contentAr || attrs.content_ar || '',
    contentFr: attrs.contentFr || attrs.content_fr || '',
    avatar
  };
}

// API endpoint: Get Courses (Integrated with Strapi)
app.get('/api/courses', async (req, res) => {
  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  if (strapiUrl) {
    try {
      console.log(`[Strapi Proxy] Fetching courses from: ${strapiUrl}/api/courses`);
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (strapiToken) {
        headers['Authorization'] = `Bearer ${strapiToken}`;
      }

      const response = await fetch(`${strapiUrl}/api/courses?populate=*`, { headers });
      if (response.ok) {
        const json = await response.json();
        const data = json.data;
        if (Array.isArray(data)) {
          const mapped = data.map(mapStrapiCourse);
          console.log(`[Strapi Proxy] Successfully loaded ${mapped.length} courses from Strapi.`);
          return res.json(mapped);
        }
      }
      console.warn(`[Strapi Proxy] Strapi returned status ${response.status}. Falling back to static data.`);
    } catch (error: any) {
      console.error(`[Strapi Proxy] Failed to connect to Strapi for courses: ${error.message}. Falling back to static data.`);
    }
  }

  // Fallback to static courses
  res.json(COURSES);
});

// API endpoint: Get Testimonials (Integrated with Strapi)
app.get('/api/testimonials', async (req, res) => {
  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  if (strapiUrl) {
    try {
      console.log(`[Strapi Proxy] Fetching testimonials from: ${strapiUrl}/api/testimonials`);
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (strapiToken) {
        headers['Authorization'] = `Bearer ${strapiToken}`;
      }

      const response = await fetch(`${strapiUrl}/api/testimonials?populate=*`, { headers });
      if (response.ok) {
        const json = await response.json();
        const data = json.data;
        if (Array.isArray(data)) {
          const mapped = data.map(mapStrapiTestimonial);
          console.log(`[Strapi Proxy] Successfully loaded ${mapped.length} testimonials from Strapi.`);
          return res.json(mapped);
        }
      }
      console.warn(`[Strapi Proxy] Strapi returned status ${response.status}. Falling back to static data.`);
    } catch (error: any) {
      console.error(`[Strapi Proxy] Failed to connect to Strapi for testimonials: ${error.message}. Falling back to static data.`);
    }
  }

  // Fallback to static testimonials
  res.json(TESTIMONIALS);
});

// API endpoint: Submit Registration (Forwarded to Strapi)
app.post('/api/register', async (req, res) => {
  const registrationData = req.body;
  console.log('[Backend] Received Course Registration Submission:', registrationData);

  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  if (strapiUrl) {
    try {
      console.log(`[Strapi Proxy] Forwarding registration to: ${strapiUrl}/api/registrations`);
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      if (strapiToken) {
        headers['Authorization'] = `Bearer ${strapiToken}`;
      }

      const response = await fetch(`${strapiUrl}/api/registrations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: registrationData })
      });

      if (response.ok) {
        const json = await response.json();
        console.log('[Strapi Proxy] Registration successfully saved in Strapi:', json);
        return res.json({ success: true, strapiId: json.data?.id, message: 'Registration saved in Strapi.' });
      } else {
        const errorText = await response.text();
        console.error(`[Strapi Proxy] Strapi returned error (${response.status}):`, errorText);
      }
    } catch (error: any) {
      console.error('[Strapi Proxy] Failed to forward registration to Strapi:', error.message);
    }
  }

  // Fallback / Standalone success response
  res.json({ success: true, message: 'Registration received & logged on server.' });
});

// Mount Vite middleware for dev / static build for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for all other routes
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`   Rafa School Backend Server Running !  `);
    console.log(`   URL: http://localhost:${PORT}        `);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    if (process.env.STRAPI_API_URL) {
      console.log(`   Strapi Target: ${process.env.STRAPI_API_URL}`);
    } else {
      console.log(`   Strapi Target: Not configured (Using local fallback)`);
    }
    console.log(`=========================================`);
  });
}

startServer();

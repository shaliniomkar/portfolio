/**
 * Content collections: Astro reads every Markdown file in a folder and
 * checks its "frontmatter" (the --- block at the top) against a schema.
 * If a project is missing a title or has a typo in `art`, the build stops
 * and tells you which file is wrong, instead of shipping a broken page.
 */
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { artKinds } from './data/projectArt';

const projects = defineCollection({
  // Every .md file in src/content/projects, except ones starting with "_"
  // (so _template.md is a guide, not a project).
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),                     // one line for the card
    stack: z.array(z.string()),              // e.g. ['C++', 'STM32', 'FreeRTOS']
    art: z.enum(artKinds),                   // which clip art to draw
    tint: z.enum(['blue', 'purple', 'coral', 'mint', 'yellow']).default('blue'),
    date: z.coerce.date(),                   // when you finished it (used for sorting)
    course: z.string().optional(),           // e.g. 'EECS 280': marks it as coursework
    term: z.string().optional(),             // e.g. 'Fall 2026', shown for coursework
    repo: z.url().optional(),                // GitHub link (leave out for coursework)
    demo: z.url().optional(),                // live demo or video
    order: z.number().default(100),          // lower numbers show first
    draft: z.boolean().default(false),       // true = hidden from the site
  }),
});

/*
 * Experience: one JSON file (src/data/experience.json) holding a list of
 * roles. Add clubs or leadership as new entries with "kind": "club" or
 * "leadership" (or "program" for things like the Global Career Accelerator). Dates are "YYYY-MM"; leave out "end" for a current role.
 */
const month = z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM, e.g. 2026-08');

const experience = defineCollection({
  loader: file('src/data/experience.json'),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    kind: z.enum(['research', 'work', 'program', 'leadership', 'club']),
    start: month,
    end: month.optional(),
    summary: z.string(),
    points: z.array(z.string()).optional(),
  }),
});

/*
 * Albums for the Record Shop, from src/data/albums.json. `rating` can be any
 * half step from 0 to 5 (4.5 is fine, 4.3 isn't). What's playing right now
 * lives separately, in src/data/now-spinning.json.
 */
const albums = defineCollection({
  loader: file('src/data/albums.json'),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    year: z.number().int(),
    rating: z.number().min(0).max(5).multipleOf(0.5),
    take: z.string(),
    color: z.enum(['blue', 'purple', 'coral', 'mint', 'yellow', 'sky']),
    cover: z.url().optional(), // link to the official cover image
  }),
});

export const collections = { projects, experience, albums };

/**
 * Content collections: Astro reads every Markdown file in a folder and
 * checks its "frontmatter" (the --- block at the top) against a schema.
 * If a project is missing a title or has a typo in `art`, the build stops
 * and tells you which file is wrong, instead of shipping a broken page.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
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

export const collections = { projects };

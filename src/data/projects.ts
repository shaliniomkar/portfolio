import { getCollection } from 'astro:content';

/**
 * All published projects, in display order: by `order` (lowest first),
 * then newest first. Drafts are left out.
 */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime());
}

/** Split projects into personal ones and course projects (anything with `course`). */
export async function getProjectGroups() {
  const all = await getProjects();
  return {
    personal: all.filter((p) => !p.data.course),
    coursework: all.filter((p) => p.data.course),
  };
}

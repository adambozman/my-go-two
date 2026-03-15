/**
 * Local image library — aggregates static template and spare bank images
 * for use in the InlinePhotoSearch component.
 */

// Eagerly import all template images (male) and spare bank
const templateMaleGlob = import.meta.glob<{ default: string }>(
  '/src/assets/templates/male/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const spareGlob = import.meta.glob<{ default: string }>(
  '/src/assets/spare/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

export interface LocalPhoto {
  id: string;
  url: string;
  category: 'template' | 'spare';
  filename: string;
}

function extractFilename(path: string): string {
  return path.split('/').pop()?.replace(/\.\w+$/, '') ?? path;
}

/** Get template images matching a given imageKey (fuzzy match on filename) */
export function getMatchingTemplates(imageKey: string): LocalPhoto[] {
  const results: LocalPhoto[] = [];
  // Normalize key for matching — e.g. "dress-ocbd" should match "dress-ocbd.jpg"
  const normalizedKey = imageKey.toLowerCase().replace(/[^a-z0-9-]/g, '');

  for (const [path, mod] of Object.entries(templateMaleGlob)) {
    const filename = extractFilename(path);
    const normalizedFilename = filename.toLowerCase().replace(/[^a-z0-9-]/g, '');

    // Exact match or prefix match
    if (normalizedFilename === normalizedKey || normalizedFilename.startsWith(normalizedKey)) {
      results.unshift({ id: `tpl-${filename}`, url: mod.default, category: 'template', filename });
    }
    // Partial match (key contained in filename or vice versa)
    else if (normalizedFilename.includes(normalizedKey) || normalizedKey.includes(normalizedFilename)) {
      results.push({ id: `tpl-${filename}`, url: mod.default, category: 'template', filename });
    }
  }

  return results;
}

/** Get all template images */
export function getAllTemplates(): LocalPhoto[] {
  return Object.entries(templateMaleGlob).map(([path, mod]) => {
    const filename = extractFilename(path);
    return { id: `tpl-${filename}`, url: mod.default, category: 'template' as const, filename };
  });
}

/** Get all spare bank images */
export function getSpareBank(): LocalPhoto[] {
  return Object.entries(spareGlob).map(([path, mod]) => {
    const filename = extractFilename(path);
    return { id: `spare-${filename}`, url: mod.default, category: 'spare' as const, filename };
  });
}

/** Get combined library: matching templates first, then remaining templates, then spare bank */
export function getLibraryForKey(imageKey: string): LocalPhoto[] {
  const matching = getMatchingTemplates(imageKey);
  const matchingIds = new Set(matching.map(m => m.id));
  const remaining = getAllTemplates().filter(t => !matchingIds.has(t.id));
  const spare = getSpareBank();
  return [...matching, ...remaining, ...spare];
}

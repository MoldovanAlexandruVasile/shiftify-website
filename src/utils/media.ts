// Files in public/, relative to the page so the site works under any base path.
export const assetUrl = (file: string) => `${import.meta.env.BASE_URL}${file}`;
export const mediaUrl = (file: string) => assetUrl(`media/${file}`);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tommelloul.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://tommelloul.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Add custom metadata for each page
    const customConfig = {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: path === '/' ? 1.0 : 0.8,
    };

    // Add project-specific metadata
    if (path.includes('/#') || path.includes('#')) {
      customConfig.priority = 0.9;
    }

    return customConfig;
  },
};

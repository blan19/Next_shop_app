// 필요한 모듈 로드
const fs = require('fs');
const prettier = require('prettier');
const { firebaseDb } = require('../utils/firebase/clientApp');

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const DOMAIN = process.env.NEXT_PUBLIC_URL;

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });
(async () => {
  const snapshotByCategory = await firebaseDb.collection('products').get();
  const res = snapshotByCategory.docs.map((doc) => doc.data());
  const productsByCategory = JSON.parse(JSON.stringify(res));
  const category = Array.from(
    new Set(productsByCategory.map((product) => product.category)),
  ).map((string) => string.toLowerCase());

  const categorySiteMap = `
  ${category
    .map((str) => {
      return `
        <url>
          <loc>${`${DOMAIN}/category/${str}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>`;
    })
    .join('')}
`;

  const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  	<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${categorySiteMap}
  </urlset>
`;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync(
    '../public/sitemap/sitemap-posts.xml',
    formattedSitemap,
    'utf8',
  );
})();

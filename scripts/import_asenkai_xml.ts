import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

async function importXml() {
  const xmlData = fs.readFileSync('./asenkai.WordPress.2026-02-20.xml', 'utf-8');
  const parser = new XMLParser();
  const jsonObj = parser.parse(xmlData);

  const posts = jsonObj.rss.channel.item;

  console.log(`Found ${posts.length} items to import.`);

  for (const post of posts) {
    const content = post['content:encoded'] || post.description;
    const title = post.title;
    
    // Logic to map to Prisma/Supabase
    // await prisma.post.create({ data: { title, content, ... } });
    
    console.log(`Imported: ${title}`);
  }
}

importXml().catch(console.error);
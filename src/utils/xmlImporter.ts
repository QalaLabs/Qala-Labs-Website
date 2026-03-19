import { supabase } from "@/integrations/supabase/client";

export const parseAsenkaiXML = async (xmlString: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  // 1. Parse Posts (WordPress style XML usually uses <item> or <post>)
  const items = Array.from(xmlDoc.getElementsByTagName("item"));
  const posts = items.map(item => {
    const title = item.getElementsByTagName("title")[0]?.textContent || "";
    const content = item.getElementsByTagName("content:encoded")[0]?.textContent || 
                    item.getElementsByTagName("description")[0]?.textContent || "";
    const slug = item.getElementsByTagName("wp:post_name")[0]?.textContent || 
                 title.toLowerCase().replace(/ /g, '-');
    const postType = item.getElementsByTagName("wp:post_type")[0]?.textContent;

    return {
      title,
      content,
      slug,
      type: postType, // 'post' or 'page'
      category: item.getElementsByTagName("category")[0]?.textContent || "General",
      published_at: item.getElementsByTagName("pubDate")[0]?.textContent
    };
  });

  return posts;
};

export const uploadToSupabase = async (data: any[]) => {
  const results = { success: 0, errors: 0 };

  for (const item of data) {
    // Logic to differentiate between a Blog Post and a Case Study based on XML tags
    if (item.type === 'post') {
      const { error } = await supabase.from('posts').upsert({
        title: item.title,
        slug: item.slug,
        content: item.content,
        category: item.category,
        published_at: item.published_at ? new Date(item.published_at).toISOString() : new Date().toISOString()
      });
      if (error) results.errors++; else results.success++;
    } else if (item.type === 'case_study' || item.category === 'Case Study') {
      // Mapping logic for Case Studies
      const { error } = await supabase.from('case_studies').upsert({
        title: item.title,
        slug: item.slug,
        challenge: item.content.substring(0, 500), // Placeholder mapping
        category: item.category
      });
      if (error) results.errors++; else results.success++;
    }
  }
  return results;
};
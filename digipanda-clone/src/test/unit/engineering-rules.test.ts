import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Qala Labs Web Engineering Rules Validation', () => {
  const rootDir = path.resolve(__dirname, '../../../');

  it('Rule 1: Form submissions do not call setSubmitted(true) in finally blocks', () => {
    const filePaths = [
      path.join(rootDir, 'src/components/ContactSection.tsx'),
      path.join(rootDir, 'src/components/StickyCTA.tsx'),
      path.join(rootDir, 'src/pages/CareersPage.tsx'),
      path.join(rootDir, 'src/pages/CreatorCollectivePage.tsx'),
      path.join(rootDir, 'src/pages/AgencyCollectivePage.tsx'),
      path.join(rootDir, 'src/pages/BlogPage.tsx'),
    ];

    filePaths.forEach((filePath) => {
      const rawCode = fs.readFileSync(filePath, 'utf-8');
      // Strip comments to ensure explanatory comments don't trigger false positives
      const code = rawCode.replace(/\/\/.*$/gm, '');
      const finallyIndex = code.indexOf('finally {');
      if (finallyIndex !== -1) {
        const finallyBlock = code.slice(finallyIndex, code.indexOf('}', finallyIndex) + 1);
        expect(finallyBlock).not.toContain('setSubmitted(true)');
        expect(finallyBlock).not.toContain('setNewsletterSubmitted(true)');
      }
    });
  });

  it('Rule 1: Forms support dual-target endpoints (/api/lead and fallback to /api/lead.php)', () => {
    const filePaths = [
      path.join(rootDir, 'src/components/ContactSection.tsx'),
      path.join(rootDir, 'src/components/StickyCTA.tsx'),
      path.join(rootDir, 'src/pages/CareersPage.tsx'),
      path.join(rootDir, 'src/pages/CreatorCollectivePage.tsx'),
      path.join(rootDir, 'src/pages/AgencyCollectivePage.tsx'),
      path.join(rootDir, 'src/pages/BlogPage.tsx'),
    ];

    filePaths.forEach((filePath) => {
      const code = fs.readFileSync(filePath, 'utf-8');
      expect(code).toContain('/api/lead');
      expect(code).toContain('/api/lead.php');
      expect(code).toContain('response.status === 404');
    });
  });

  it('Rule 2: ChatbotToggle implements responsive floating element safety (bottom-24 sm:bottom-6)', () => {
    const chatbotPath = path.join(rootDir, 'src/components/ChatbotToggle.tsx');
    const code = fs.readFileSync(chatbotPath, 'utf-8');
    expect(code).toContain('bottom-24');
    expect(code).toContain('sm:bottom-6');
  });

  it('Rule 3: vite.config.ts configures dedicated manual chunks for heavy libraries', () => {
    const viteConfigPath = path.join(rootDir, 'vite.config.ts');
    const code = fs.readFileSync(viteConfigPath, 'utf-8');
    expect(code).toContain('manualChunks');
    expect(code).toContain('three');
    expect(code).toContain('vendor');
  });
});

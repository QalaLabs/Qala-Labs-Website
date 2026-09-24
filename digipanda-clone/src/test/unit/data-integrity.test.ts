import { describe, it, expect } from 'vitest';
import { services } from '../../data/services';
import { agents } from '../../data/agents';
import { products } from '../../data/products';
import { caseStudies } from '../../data/caseStudies';

describe('Data Layer Integrity & Cross-References', () => {
  describe('Services Data', () => {
    it('has valid services with non-empty required fields', () => {
      expect(services.length).toBeGreaterThan(0);
      services.forEach((service) => {
        expect(service.slug).toBeTruthy();
        expect(service.slug).toMatch(/^[a-z0-9-]+$/);
        expect(service.name).toBeTruthy();
        expect(service.track).toBeDefined();
        expect(['AI', 'Design', 'Development', 'Marketing']).toContain(service.track);
        expect(service.tagline).toBeTruthy();
        expect(service.description).toBeTruthy();
        expect(Array.isArray(service.deliverables)).toBe(true);
      });
    });

    it('has unique service slugs', () => {
      const slugs = services.map((s) => s.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('cross-references valid agents when defined', () => {
      const validAgentSlugs = new Set(agents.map((a) => a.slug));
      services.forEach((service) => {
        if (service.agents) {
          service.agents.forEach((ag) => {
            expect(
              validAgentSlugs.has(ag.slug),
              `Service "${service.slug}" references unknown agent "${ag.slug}"`
            ).toBe(true);
          });
        }
      });
    });

    it('cross-references valid products and case-studies in proof', () => {
      const validProductSlugs = new Set(products.map((p) => p.slug));
      const validCaseStudySlugs = new Set(caseStudies.map((c) => c.slug));

      services.forEach((service) => {
        if (service.proof) {
          service.proof.forEach((pr) => {
            if (pr.type === 'product') {
              expect(
                validProductSlugs.has(pr.slug),
                `Service "${service.slug}" references non-existent product "${pr.slug}"`
              ).toBe(true);
            } else if (pr.type === 'case-study') {
              expect(
                validCaseStudySlugs.has(pr.slug),
                `Service "${service.slug}" references non-existent case study "${pr.slug}"`
              ).toBe(true);
            }
          });
        }
      });
    });
  });

  describe('Agents Data', () => {
    it('has valid agents with non-empty fields', () => {
      expect(agents.length).toBeGreaterThan(0);
      agents.forEach((agent) => {
        expect(agent.slug).toBeTruthy();
        expect(agent.slug).toMatch(/^[a-z0-9-]+$/);
        expect(agent.name).toBeTruthy();
        expect(agent.tagline).toBeTruthy();
        expect(agent.whatItDoes).toBeTruthy();
        expect(Array.isArray(agent.howBuilt)).toBe(true);
        expect(agent.howBuilt.length).toBeGreaterThan(0);
        expect(Array.isArray(agent.integrations)).toBe(true);
      });
    });

    it('has unique agent slugs', () => {
      const slugs = agents.map((a) => a.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe('Products Data', () => {
    it('has valid products with non-empty fields and features', () => {
      expect(products.length).toBeGreaterThan(0);
      products.forEach((product) => {
        expect(product.slug).toBeTruthy();
        expect(product.slug).toMatch(/^[a-z0-9-]+$/);
        expect(product.name).toBeTruthy();
        expect(product.tagline).toBeTruthy();
        expect(product.category).toBeTruthy();
        expect(product.description).toBeTruthy();
        expect(Array.isArray(product.features)).toBe(true);
        expect(Array.isArray(product.howItWorks)).toBe(true);
      });
    });

    it('has unique product slugs', () => {
      const slugs = products.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe('Case Studies Data', () => {
    it('has valid case studies with metrics and deliverables', () => {
      expect(caseStudies.length).toBeGreaterThan(0);
      caseStudies.forEach((cs) => {
        expect(cs.slug).toBeTruthy();
        expect(cs.slug).toMatch(/^[a-z0-9-]+$/);
        expect(cs.title).toBeTruthy();
        expect(cs.subtitle).toBeTruthy();
        expect(cs.category).toBeTruthy();
        expect(cs.result).toBeTruthy();
        expect(cs.challenge).toBeTruthy();
        expect(Array.isArray(cs.approach)).toBe(true);
        expect(cs.approach.length).toBeGreaterThan(0);
        expect(Array.isArray(cs.results)).toBe(true);
        expect(cs.results.length).toBeGreaterThan(0);
      });
    });

    it('has unique case study slugs', () => {
      const slugs = caseStudies.map((cs) => cs.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });
});

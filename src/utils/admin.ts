import { format } from 'date-fns';

export const calculateLeadScore = (lead: any) => {
  let score = 0;
  const data = lead.data || {};
  const rev = data.revenue || data.budget || '';
  if (rev.includes('50L+') || rev.includes('25L+')) score += 50;
  if (rev.includes('15L-50L') || rev.includes('5-25L')) score += 30;
  if (data.service === 'eCommerce Growth' || data.service === 'Performance Marketing') score += 20;
  if (lead.tool_used === 'agency_network_join' || lead.tool_used === 'creator_onboarding_v2') score += 10;
  return score;
};

export const getLeadInterest = (lead: any) => {
  if (lead.data?.service) return lead.data.service;
  if (lead.tool_used === 'agency_network_join') return "Agency Network";
  if (lead.tool_used === 'creator_onboarding_v2') return "Creator Collective";
  if (lead.tool_used === 'scale_potential_quiz') return "Scale Quiz";
  return "General Inquiry";
};

export const exportLeadsToCSV = (leads: any[]) => {
  const headers = ["Date", "Name", "Email", "Interest", "Score", "Status", "Revenue/Budget", "Source URL"];
  const rows = leads.map(lead => [
    format(new Date(lead.created_at), 'yyyy-MM-dd'),
    lead.data?.name || 'Anonymous',
    lead.email,
    getLeadInterest(lead),
    calculateLeadScore(lead),
    lead.data?.status || 'new',
    lead.data?.revenue || lead.data?.budget || 'N/A',
    lead.data?.source_url || 'Direct'
  ]);

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `qala_leads_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
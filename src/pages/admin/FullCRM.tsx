"use client";

import React, { useState } from 'react';
import { Contact, Plus, Search, Phone, Mail, MapPin, Calendar, DollarSign, TrendingUp, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { showSuccess, showError } from '@/utils/toast';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
  status: 'active' | 'inactive' | 'prospect';
  createdDate: string;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  contactId: string;
  probability: number;
  dueDate: string;
}

const FullCRM = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@company.com',
      phone: '+91-9876543210',
      company: 'Tech Solutions Ltd',
      location: 'Mumbai, India',
      status: 'active',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@brand.com',
      phone: '+91-8765432109',
      company: 'Brand Marketing Co',
      location: 'Delhi, India',
      status: 'active',
      createdDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit@startup.io',
      phone: '+91-7654321098',
      company: 'StartUp Ventures',
      location: 'Bangalore, India',
      status: 'prospect',
      createdDate: '2024-03-10'
    }
  ]);

  const [deals, setDeals] = useState<Deal[]>([
    { id: '1', name: 'Website Redesign', value: 50000, stage: 'qualified', contactId: '1', probability: 75, dueDate: '2024-05-30' },
    { id: '2', name: 'Marketing Campaign', value: 75000, stage: 'proposal', contactId: '2', probability: 60, dueDate: '2024-06-15' },
    { id: '3', name: 'E-commerce Platform', value: 150000, stage: 'lead', contactId: '3', probability: 30, dueDate: '2024-07-30' },
  ]);

  const [activeTab, setActiveTab] = useState('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    status: 'prospect' as const
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stageGroups = {
    lead: deals.filter(d => d.stage === 'lead'),
    qualified: deals.filter(d => d.stage === 'qualified'),
    proposal: deals.filter(d => d.stage === 'proposal'),
    negotiation: deals.filter(d => d.stage === 'negotiation'),
    won: deals.filter(d => d.stage === 'won'),
    lost: deals.filter(d => d.stage === 'lost')
  };

  const totalPipeline = deals.reduce((sum, deal) => sum + deal.value, 0);

  const handleAddContact = () => {
    setEditingContact(null);
    setFormData({ name: '', email: '', phone: '', company: '', location: '', status: 'prospect' });
    setIsOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company || '',
      location: contact.location || '',
      status: contact.status
    });
    setIsOpen(true);
  };

  const handleSaveContact = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      showError('Name and email are required');
      return;
    }

    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id
        ? { ...c, ...formData }
        : c
      ));
      showSuccess('Contact updated');
    } else {
      const newContact: Contact = {
        id: Math.random().toString(),
        ...formData,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setContacts([...contacts, newContact]);
      showSuccess('Contact created');
    }
    setIsOpen(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    setDeals(deals.filter(d => d.contactId !== id));
    showSuccess('Contact deleted');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      prospect: 'bg-blue-100 text-blue-700',
      inactive: 'bg-slate-100 text-slate-700'
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      lead: 'bg-slate-100 text-slate-700',
      qualified: 'bg-blue-100 text-blue-700',
      proposal: 'bg-purple-100 text-purple-700',
      negotiation: 'bg-orange-100 text-orange-700',
      won: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700'
    };
    return colors[stage] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">CRM System</h1>
        <p className="text-slate-500">Manage contacts and sales pipeline</p>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-slate-900">{contacts.length}</div>
            <div className="text-sm text-slate-500">Total Contacts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-slate-900">{deals.length}</div>
            <div className="text-sm text-slate-500">Active Deals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">₹{(totalPipeline / 100000).toFixed(1)}L</div>
            <div className="text-sm text-slate-500">Pipeline Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-slate-900">{deals.filter(d => d.stage === 'won').length}</div>
            <div className="text-sm text-slate-500">Won Deals</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        </TabsList>

        {/* Contacts Tab */}
        <TabsContent value="contacts">
          <Card>
            <CardHeader className="border-b border-slate-200">
              <div className="flex items-center justify-between">
                <CardTitle>Contact List</CardTitle>
                <Button onClick={handleAddContact} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name, email, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContacts.length === 0 ? (
                  <div className="col-span-3 text-center py-8 text-slate-500">
                    No contacts found
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <Card key={contact.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                            <p className="text-xs text-slate-500 mt-1">{contact.company}</p>
                          </div>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </div>
                          {contact.location && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4" />
                              {contact.location}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-slate-400 text-xs">
                            <Calendar className="w-4 h-4" />
                            {new Date(contact.createdDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-200">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditContact(contact)}
                            className="flex-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteContact(contact.id)}
                            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline">
          <div className="grid gap-6">
            {/* Kanban-style columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stageGroups).map(([stage, stageDeal]) => {
                const stageTotal = stageDeal.reduce((sum, d) => sum + d.value, 0);
                return (
                  <Card key={stage}>
                    <CardHeader className="border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base capitalize">{stage}</CardTitle>
                          <p className="text-xs text-slate-500 mt-1">₹{(stageTotal / 100000).toFixed(1)}L</p>
                        </div>
                        <Badge className={getStageColor(stage)} variant="outline">
                          {stageDeal.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {stageDeal.length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-8">No deals</p>
                        ) : (
                          stageDeal.map((deal) => {
                            const contact = contacts.find(c => c.id === deal.contactId);
                            return (
                              <div
                                key={deal.id}
                                className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-sm text-slate-900">{deal.name}</h4>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">{contact?.name}</p>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-semibold text-slate-900">
                                    ₹{(deal.value / 100000).toFixed(1)}L
                                  </span>
                                  <span className="text-xs text-slate-500">{deal.probability}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-500 h-1.5 rounded-full"
                                    style={{ width: `${deal.probability}%` }}
                                  />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                  Due: {new Date(deal.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Contact Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingContact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91-9876543210"
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(status) => setFormData({ ...formData, status: status as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveContact}>{editingContact ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FullCRM;

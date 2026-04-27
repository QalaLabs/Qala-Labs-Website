"use client";

import React, { useState } from 'react';
import { Plug, Mail, MessageCircle, Database, Zap, Save, Eye, EyeOff, TestTube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from '@/utils/toast';

interface IntegrationConfig {
  enabled: boolean;
  apiKey?: string;
  apiSecret?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  email?: string;
  [key: string]: any;
}

interface IntegrationState {
  smtp: IntegrationConfig;
  whatsapp: IntegrationConfig;
  imap: IntegrationConfig;
  ai: IntegrationConfig;
}

const IntegrationsConfig = () => {
  const [configs, setConfigs] = useState<IntegrationState>({
    smtp: {
      enabled: false,
      host: 'smtp.gmail.com',
      port: 587,
      username: '',
      password: '',
      email: ''
    },
    whatsapp: {
      enabled: false,
      apiKey: '',
      accountId: '',
      phoneNumber: ''
    },
    imap: {
      enabled: false,
      host: 'imap.gmail.com',
      port: 993,
      username: '',
      password: '',
      email: ''
    },
    ai: {
      enabled: true,
      apiKey: 'AIzaSy...',
      model: 'gemini-2.0-flash',
      apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
      provider: 'google-gemini'
    }
  });

  const [showPasswords, setShowPasswords] = useState({
    smtp: false,
    whatsapp: false,
    imap: false,
    ai: false
  });

  const [loading, setLoading] = useState(false);

  const handleConfigChange = (service: keyof IntegrationState, field: string, value: any) => {
    setConfigs(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));
  };

  const handleTest = async (service: keyof IntegrationState) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess(`${service.toUpperCase()} integration test successful`);
    } catch (error) {
      showError('Connection test failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('Integration configurations saved');
    } catch (error) {
      showError('Failed to save configurations');
    } finally {
      setLoading(false);
    }
  };

  const ServiceCard = ({
    title,
    description,
    icon: Icon,
    service,
    children
  }: {
    title: string;
    description: string;
    icon: any;
    service: keyof IntegrationState;
    children: React.ReactNode;
  }) => (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="border-b border-slate-700">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-700 rounded-lg">
              <Icon className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">{title}</CardTitle>
              <p className="text-sm text-slate-400 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {configs[service].enabled && (
              <Badge className="bg-green-900 text-green-200">Active</Badge>
            )}
            <Switch
              checked={configs[service].enabled}
              onCheckedChange={(checked) => handleConfigChange(service, 'enabled', checked)}
            />
          </div>
        </div>
      </CardHeader>
      {configs[service].enabled && (
        <CardContent className="pt-6">
          <div className="space-y-4">
            {children}
            <div className="flex gap-2 pt-4 border-t border-slate-700 mt-6">
              <Button
                variant="outline"
                onClick={() => handleTest(service)}
                disabled={loading}
                size="sm"
                className="border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );

  const PasswordField = ({
    label,
    value,
    onChange,
    service
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    service: keyof IntegrationState;
  }) => (
    <div>
      <Label className="text-slate-200">{label}</Label>
      <div className="relative">
        <Input
          type={showPasswords[service] ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
        />
        <button
          onClick={() => setShowPasswords(prev => ({ ...prev, [service]: !prev[service] }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
        >
          {showPasswords[service] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-slate-900 min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Integration Configuration</h1>
        <p className="text-slate-300">Configure external services and APIs for email, messaging, and AI features.</p>
      </div>

      <div className="space-y-6">
        {/* SMTP Configuration */}
        <ServiceCard
          title="Email (SMTP)"
          description="Configure outbound email settings"
          icon={Mail}
          service="smtp"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>SMTP Host</Label>
              <Input
                value={configs.smtp.host}
                onChange={(e) => handleConfigChange('smtp', 'host', e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <Label>Port</Label>
              <Input
                type="number"
                value={configs.smtp.port}
                onChange={(e) => handleConfigChange('smtp', 'port', parseInt(e.target.value))}
                placeholder="587"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={configs.smtp.email}
                onChange={(e) => handleConfigChange('smtp', 'email', e.target.value)}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                value={configs.smtp.username}
                onChange={(e) => handleConfigChange('smtp', 'username', e.target.value)}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div className="md:col-span-2">
              <PasswordField
                label="Password / App Password"
                value={configs.smtp.password}
                onChange={(v) => handleConfigChange('smtp', 'password', v)}
                service="smtp"
              />
            </div>
          </div>
        </ServiceCard>

        {/* WhatsApp Configuration */}
        <ServiceCard
          title="WhatsApp Business API"
          description="Configure WhatsApp messaging service"
          icon={MessageCircle}
          service="whatsapp"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Phone Number ID</Label>
              <Input
                value={configs.whatsapp.phoneNumber}
                onChange={(e) => handleConfigChange('whatsapp', 'phoneNumber', e.target.value)}
                placeholder="1234567890"
              />
            </div>
            <div>
              <Label>Account ID</Label>
              <Input
                value={configs.whatsapp.accountId}
                onChange={(e) => handleConfigChange('whatsapp', 'accountId', e.target.value)}
                placeholder="Your Business Account ID"
              />
            </div>
            <div className="md:col-span-2">
              <PasswordField
                label="API Key / Access Token"
                value={configs.whatsapp.apiKey}
                onChange={(v) => handleConfigChange('whatsapp', 'apiKey', v)}
                service="whatsapp"
              />
            </div>
          </div>
        </ServiceCard>

        {/* IMAP Configuration */}
        <ServiceCard
          title="Email (IMAP)"
          description="Configure inbound email reading"
          icon={Database}
          service="imap"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>IMAP Host</Label>
              <Input
                value={configs.imap.host}
                onChange={(e) => handleConfigChange('imap', 'host', e.target.value)}
                placeholder="imap.gmail.com"
              />
            </div>
            <div>
              <Label>Port</Label>
              <Input
                type="number"
                value={configs.imap.port}
                onChange={(e) => handleConfigChange('imap', 'port', parseInt(e.target.value))}
                placeholder="993"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={configs.imap.email}
                onChange={(e) => handleConfigChange('imap', 'email', e.target.value)}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                value={configs.imap.username}
                onChange={(e) => handleConfigChange('imap', 'username', e.target.value)}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div className="md:col-span-2">
              <PasswordField
                label="Password / App Password"
                value={configs.imap.password}
                onChange={(v) => handleConfigChange('imap', 'password', v)}
                service="imap"
              />
            </div>
          </div>
        </ServiceCard>

        {/* AI Configuration */}
        <ServiceCard
          title="AI & LLM Settings"
          description="Configure AI models and endpoints"
          icon={Zap}
          service="ai"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>API Endpoint</Label>
              <Input
                value={configs.ai.apiEndpoint}
                onChange={(e) => handleConfigChange('ai', 'apiEndpoint', e.target.value)}
                placeholder="https://api.anthropic.com/v1"
              />
            </div>
            <div>
              <Label>Model</Label>
              <Input
                value={configs.ai.model}
                onChange={(e) => handleConfigChange('ai', 'model', e.target.value)}
                placeholder="claude-3-sonnet"
              />
            </div>
            <div className="md:col-span-2">
              <PasswordField
                label="API Key"
                value={configs.ai.apiKey}
                onChange={(v) => handleConfigChange('ai', 'apiKey', v)}
                service="ai"
              />
            </div>
          </div>
        </ServiceCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} size="lg">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save All Configurations'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsConfig;

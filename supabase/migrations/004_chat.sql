-- Migration 4: Chat — conversations, participants, messages

CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'direct' CHECK (type IN ('direct', 'group', 'client_support')),
  title TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_participants (
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  file_url TEXT,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participant access conversations" ON public.chat_conversations
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.chat_participants cp WHERE cp.conversation_id = id AND cp.user_id = auth.uid())
  );

CREATE POLICY "Participants can create conversations" ON public.chat_conversations
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

CREATE POLICY "Participant access participants list" ON public.chat_participants
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.chat_participants cp WHERE cp.conversation_id = conversation_id AND cp.user_id = auth.uid())
  );

CREATE POLICY "Participant access messages" ON public.chat_messages
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.chat_participants cp WHERE cp.conversation_id = chat_messages.conversation_id AND cp.user_id = auth.uid())
  );

CREATE POLICY "Participants can send messages" ON public.chat_messages
  FOR INSERT TO authenticated WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.chat_participants cp WHERE cp.conversation_id = chat_messages.conversation_id AND cp.user_id = auth.uid())
  );

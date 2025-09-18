import { useState } from "react";
import { MessageSquare, Phone, Mail, Instagram, Facebook, Clock, User, Send, Paperclip, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const conversations = [
  {
    id: 1,
    patient: "Maria Silva",
    channel: "whatsapp",
    lastMessage: "Preciso remarcar minha consulta",
    time: "2 min",
    unread: 2,
    status: "waiting",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 2,
    patient: "João Santos",
    channel: "instagram",
    lastMessage: "Qual o valor da consulta?",
    time: "5 min",
    unread: 1,
    status: "active",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 3,
    patient: "Ana Costa",
    channel: "email",
    lastMessage: "Obrigada pelo atendimento!",
    time: "12 min",
    unread: 0,
    status: "resolved",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 4,
    patient: "Pedro Lima",
    channel: "facebook",
    lastMessage: "Preciso de uma segunda via do exame",
    time: "1h",
    unread: 3,
    status: "waiting",
    avatar: "/placeholder-avatar.jpg"
  }
];

const messages = [
  {
    id: 1,
    sender: "patient",
    content: "Boa tarde! Preciso remarcar minha consulta para a próxima semana",
    time: "14:30",
    channel: "whatsapp"
  },
  {
    id: 2,
    sender: "attendant",
    content: "Boa tarde, Maria! Claro, posso ajudá-la. Qual seria o melhor dia e horário?",
    time: "14:32",
    channel: "whatsapp"
  },
  {
    id: 3,
    sender: "patient",
    content: "Teria algum horário na terça-feira de manhã?",
    time: "14:35",
    channel: "whatsapp"
  }
];

const channelIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  phone: Phone
};

const channelColors = {
  whatsapp: "bg-green-500",
  instagram: "bg-pink-500",
  facebook: "bg-blue-600",
  email: "bg-gray-500",
  phone: "bg-blue-500"
};

export function AttendantDashboard() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Conversations List */}
      <Card className="w-96 shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Conversas Ativas</span>
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {conversations.filter(c => c.unread > 0).length} novas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {conversations.map((conversation) => {
              const ChannelIcon = channelIcons[conversation.channel as keyof typeof channelIcons];
              const isSelected = selectedConversation?.id === conversation.id;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                    isSelected ? 'bg-primary-light border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full ${channelColors[conversation.channel as keyof typeof channelColors]} flex items-center justify-center`}>
                        <ChannelIcon className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {conversation.patient}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-muted-foreground">
                            {conversation.time}
                          </span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-primary text-primary-foreground text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge 
                          variant={conversation.status === 'active' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            conversation.status === 'waiting' ? 'bg-warning text-warning-foreground' :
                            conversation.status === 'resolved' ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          {conversation.status === 'waiting' ? 'Aguardando' : 
                           conversation.status === 'active' ? 'Ativo' : 'Resolvido'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col shadow-medium">
        {selectedConversation && (
          <>
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>
                      {selectedConversation.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedConversation.patient}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${selectedConversation.status === 'active' ? 'bg-accent' : 'bg-muted-foreground'}`} />
                      <span className="text-sm text-muted-foreground">
                        {selectedConversation.status === 'active' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Ver Perfil
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Agendar
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'attendant' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'attendant'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'attendant' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="min-h-[80px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-primary hover:bg-primary-hover"
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
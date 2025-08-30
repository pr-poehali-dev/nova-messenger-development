import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  encrypted: boolean;
}

interface Contact {
  id: string;
  name: string;
  status: string;
  avatar: string;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Анна Смирнова',
    lastMessage: 'Привет! Как дела? 👋',
    time: '14:32',
    unread: 2,
    avatar: '',
    online: true,
    encrypted: true
  },
  {
    id: '2',
    name: 'Команда разработки',
    lastMessage: 'Новая версия готова к тестированию',
    time: '13:15',
    unread: 5,
    avatar: '',
    online: false,
    encrypted: true
  },
  {
    id: '3',
    name: 'Михаил Петров',
    lastMessage: 'Отлично, встречаемся завтра',
    time: 'Вчера',
    unread: 0,
    avatar: '',
    online: false,
    encrypted: true
  }
];

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Анна Смирнова',
    status: 'В сети',
    avatar: '',
    online: true
  },
  {
    id: '2',
    name: 'Михаил Петров',
    status: 'Был 2 часа назад',
    avatar: '',
    online: false
  },
  {
    id: '3',
    name: 'Елена Козлова',
    status: 'В сети',
    avatar: '',
    online: true
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const renderChatItem = (chat: Chat) => (
    <Card 
      key={chat.id} 
      className={`mb-3 cursor-pointer transition-all hover:bg-accent/50 ${
        selectedChat === chat.id ? 'ring-2 ring-primary bg-accent/50' : ''
      }`}
      onClick={() => setSelectedChat(chat.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src={chat.avatar} />
              <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {chat.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm truncate">{chat.name}</h3>
              <div className="flex items-center gap-1">
                {chat.encrypted && (
                  <Icon name="Shield" size={14} className="text-green-600" />
                )}
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <Badge variant="default" className="ml-2 px-2 py-0 text-xs">
                  {chat.unread}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContactItem = (contact: Contact) => (
    <Card key={contact.id} className="mb-3 cursor-pointer transition-all hover:bg-accent/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {contact.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.status}</p>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="MessageSquare" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/5d5ecc08-de9f-405a-9c39-027eca806ec1.jpg" 
                alt="Nova" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold">Nova</h1>
                <p className="text-sm text-muted-foreground">Безопасный мессенджер</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Icon name="Shield" size={12} />
                Шифрование активно
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="chats" className="flex items-center gap-1">
                  <Icon name="MessageSquare" size={16} />
                  <span className="hidden sm:inline">Чаты</span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-1">
                  <Icon name="Users" size={16} />
                  <span className="hidden sm:inline">Контакты</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-1">
                  <Icon name="User" size={16} />
                  <span className="hidden sm:inline">Профиль</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Icon name="Settings" size={16} />
                  <span className="hidden sm:inline">Настройки</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chats" className="mt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Поиск чатов..." className="pl-9" />
                  </div>
                  <div className="space-y-0">
                    {mockChats.map(renderChatItem)}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contacts" className="mt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Поиск контактов..." className="pl-9" />
                  </div>
                  <Button className="w-full" variant="outline">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить контакт
                  </Button>
                  <div className="space-y-0">
                    {mockContacts.map(renderContactItem)}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarFallback className="text-2xl">ВИ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">Ваше имя</h3>
                        <p className="text-muted-foreground">@username</p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">В сети</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать профиль
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="Shield" size={20} className="text-green-600" />
                          <div>
                            <h4 className="font-medium">Сквозное шифрование</h4>
                            <p className="text-sm text-muted-foreground">Ваши сообщения защищены</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Активно</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="Moon" size={20} />
                          <div>
                            <h4 className="font-medium">Тёмная тема</h4>
                            <p className="text-sm text-muted-foreground">Переключить оформление</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Включить</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="HelpCircle" size={20} />
                          <div>
                            <h4 className="font-medium">Помощь и поддержка</h4>
                            <p className="text-sm text-muted-foreground">FAQ и контакты</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="ChevronRight" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {mockChats.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{mockChats.find(c => c.id === selectedChat)?.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-muted-foreground">в сети</span>
                            <Icon name="Shield" size={14} className="text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Icon name="Phone" size={18} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Video" size={18} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreHorizontal" size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-muted rounded-2xl rounded-bl-sm p-3">
                          <p className="text-sm">Привет! Как дела? 👋</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 pl-3">14:30</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm p-3">
                          <p className="text-sm">Отлично, спасибо! А у тебя как?</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1 justify-end pr-3">
                          <p className="text-xs text-muted-foreground">14:31</p>
                          <Icon name="Check" size={12} className="text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-muted rounded-2xl rounded-bl-sm p-3">
                          <p className="text-sm">Всё хорошо! Работаю над новым проектом</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 pl-3">14:32</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Paperclip" size={18} />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Напишите сообщение..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="pr-12"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && message.trim()) {
                              console.log('Sending:', message);
                              setMessage('');
                            }
                          }}
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        >
                          <Icon name="Smile" size={18} />
                        </Button>
                      </div>
                      <Button 
                        size="sm"
                        disabled={!message.trim()}
                        onClick={() => {
                          if (message.trim()) {
                            console.log('Sending:', message);
                            setMessage('');
                          }
                        }}
                      >
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Icon name="MessageSquare" size={32} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Выберите чат</h3>
                      <p className="text-muted-foreground">
                        Выберите беседу из списка слева или начните новый чат
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
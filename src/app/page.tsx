'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useRouter} from 'next/navigation';
import { Home, Search, Users, Plus, User, Heart, MessageCircle, Share2 } from 'lucide-react'; // Updated icons
import {cn} from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Added Avatar imports

const tags = ['AI', 'HealthTech', 'EdTech', 'Web3', 'Sustainability', 'IoT']; // Added IoT

interface Idea {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  profilePictureUrl: string;
  isTrending?: boolean;
}

const DUMMY_IDEAS: Idea[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    title: 'AI-Powered Education Platform',
    description:
      'A personalized learning experience using AI to cater to individual student needs and learning styles. Focusing on adaptive testing and customized content delivery.',
    tags: ['AI', 'EdTech'],
    likes: 25,
    comments: 5,
    profilePictureUrl: 'https://picsum.photos/id/237/50/50',
    isTrending: true,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Alice Smith',
    title: 'Sustainable Urban Farming Solutions',
    description:
      'Developing modular urban farms using hydroponics and IoT sensors to optimize resource usage and reduce carbon footprint in cities. Aims to improve local food security.',
    tags: ['Sustainability', 'IoT'],
    likes: 15,
    comments: 3,
    profilePictureUrl: 'https://picsum.photos/id/1027/50/50',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Bob Johnson',
    title: 'Decentralized Healthcare Records on Web3',
    description:
      'A secure and transparent system for managing healthcare records using blockchain technology, giving patients full control over their data and enabling seamless sharing with providers.',
    tags: ['Web3', 'HealthTech'],
    likes: 8,
    comments: 2,
    profilePictureUrl: 'https://picsum.photos/id/1005/50/50',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>(DUMMY_IDEAS);

  useEffect(() => {
    // Simulate fetching ideas from an API or database
    // In a real app, you would replace DUMMY_IDEAS with actual data
    setIdeas(DUMMY_IDEAS);
  }, []);

  const handleTagClick = (tag: string) => {
    // Navigate to a search page or filter ideas based on the selected tag
    console.log(`Clicked tag: ${tag}`);
    // Example: router.push(`/search?tag=${tag}`);
  };

   const handleLike = (ideaId: string) => {
    // Placeholder for like functionality
    console.log(`Liked idea: ${ideaId}`);
    // In a real app, update the like count in the backend and state
    setIdeas(ideas.map(idea =>
      idea.id === ideaId ? { ...idea, likes: idea.likes + 1 } : idea
    ));
  };

  const handleComment = (ideaId: string) => {
     // Placeholder for comment functionality
    console.log(`Comment on idea: ${ideaId}`);
     // Example: router.push(`/idea/${ideaId}#comments`);
  };

  const handleShare = (ideaId: string) => {
    // Placeholder for share functionality
    console.log(`Shared idea: ${ideaId}`);
    // Example: navigator.clipboard.writeText(`${window.location.origin}/idea/${ideaId}`);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20"> {/* Added pb-20 for bottom nav */}
      {/* Top Bar */}
      <div className="bg-secondary p-4 flex items-center justify-between sticky top-0 z-10 border-b">
        <div className="flex-1 text-center font-semibold text-lg">IdeaSpark</div>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Idea Feed */}
      <div className="container mx-auto py-6 flex-1">
        <div className="grid grid-cols-1 gap-6">
          {ideas.map((idea) => (
            <Card key={idea.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                 <Avatar className="w-10 h-10">
                    <AvatarImage src={idea.profilePictureUrl} alt={idea.userName} data-ai-hint="person avatar" />
                    <AvatarFallback>{idea.userName.slice(0, 2)}</AvatarFallback>
                 </Avatar>
                 <div>
                    <CardTitle className="text-lg font-semibold">{idea.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {idea.userName}</p>
                 </div>
                 {idea.isTrending && (
                    <div className="ml-auto px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      🔥 Trending
                    </div>
                  )}
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-sm text-foreground mb-3 line-clamp-3">{idea.description}</p>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="rounded-full px-3 py-1 h-auto text-xs"
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </CardContent>
               <CardContent className="pt-0 flex items-center justify-start space-x-4 border-t pt-3">
                  <Button variant="ghost" size="sm" aria-label="Like" onClick={() => handleLike(idea.id)} className="flex items-center gap-1 text-muted-foreground hover:text-red-500">
                    <Heart className="h-4 w-4" /> {idea.likes}
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Comment" onClick={() => handleComment(idea.id)} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    <MessageCircle className="h-4 w-4" /> {idea.comments}
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Share" onClick={() => handleShare(idea.id)} className="flex items-center gap-1 text-muted-foreground hover:text-blue-500">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-secondary/80 backdrop-blur-sm border-t z-50">
            <div className="container mx-auto flex items-center justify-around p-2 sm:p-4">
                 <Button variant="secondary" size="icon" onClick={() => router.push('/')} className="flex flex-col h-auto py-1 text-xs gap-1">
                    <Home className="h-5 w-5" />
                    Home
                </Button>
                 <Button variant="ghost" size="icon" onClick={() => router.push('/match')} className="flex flex-col h-auto py-1 text-xs gap-1">
                     {/* Placeholder for Match icon */}
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake"><path d="M16 17l5-5-1.41-1.41-3.54 3.54-1.41-1.41-4.24-4.24L7.83 10l-4.24 4.24L5 15.66 7.12 13.5l3.54 3.54L12.07 15.6l4.24 4.24 1.41-1.41L16 17z"/><path d="m18 19 1-1 1 1-1 1-1-1z"/><path d="m7 2 1 1-1 1-1-1 1-1z"/><path d="m19 9 1 1-1 1-1-1 1-1z"/><path d="m5 22 1-1 1 1-1 1-1-1z"/><path d="M9 12l-2 2-1.41-1.41L9 9.05l1.06 1.06L11.53 11.5l1.41 1.41L9 17l-2.12-2.12L9 12.76l1.41-1.41L12.54 13.4l3.54-3.54L17.5 11.27l1.41-1.41-4.95-4.95-1.41 1.41-1.06 1.06-1.06 1.06-1.41 1.41L9 12z"/></svg>
                    Match
                </Button>
                 <Button variant="ghost" size="icon" onClick={() => router.push('/post')} className="flex flex-col h-auto py-1 text-xs gap-1">
                    <Plus className="h-5 w-5" />
                    Post Idea
                </Button>
                <Button variant="ghost" size="icon" onClick={() => router.push('/find-teammates')} className="flex flex-col h-auto py-1 text-xs gap-1">
                    <Users className="h-5 w-5" />
                    Team Up
                </Button>
                <Button variant="ghost" size="icon" onClick={() => router.push('/profile')} className="flex flex-col h-auto py-1 text-xs gap-1">
                    <User className="h-5 w-5" />
                    Profile
                </Button>
            </div>
        </div>
    </div>
  );
}

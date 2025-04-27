'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useRouter} from 'next/navigation';
import {Home, Search} from 'lucide-react';
import {cn} from '@/lib/utils';

const tags = ['AI', 'HealthTech', 'EdTech', 'Web3', 'Sustainability'];

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
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="bg-secondary p-4 flex items-center justify-between">
        <div className="flex-1 text-center font-semibold text-lg">IdeaSpark</div>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Idea Feed */}
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 gap-6">
          {ideas.map((idea) => (
            <Card key={idea.id}>
              <CardHeader className="flex items-center space-x-4">
                <img
                  src={idea.profilePictureUrl}
                  alt={idea.userName}
                  className="rounded-full w-8 h-8"
                />
                <CardTitle className="text-base font-semibold">{idea.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{idea.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="secondary"
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <Button variant="ghost" size="sm" aria-label="Like">
                      ❤️ {idea.likes}
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Comment">
                      💬 {idea.comments}
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Share">
                      🔄
                    </Button>
                  </div>
                  {idea.isTrending && (
                    <div className="px-2 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                      Trending
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-secondary/50 backdrop-blur-sm border-t z-50">
        <div className="container mx-auto flex items-center justify-around p-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <Home className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/match')}>
            🤝
            <span className="sr-only">Match</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/post')}>
            ➕
            <span className="sr-only">Post</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/community')}>
            👥
            <span className="sr-only">Community</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}>
            👤
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

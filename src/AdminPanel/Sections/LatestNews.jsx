import React, { useState } from 'react';
import { Newspaper, ExternalLink, X, Clock, Tag, Plus } from 'lucide-react';

const initialNewsItems = [
  {
    id: 1,
    title: 'New Computer Science Course Launched',
    category: 'Academics',
    content: 'The department is launching a new course on Artificial Intelligence and Machine Learning. The course will cover fundamental concepts and practical applications.',
    timestamp: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
  },
  
  {
    id: 2,
    title: 'Campus Hackathon Winners Announced',
    category: 'Events',
    content: 'Team CodeCrafters wins the annual hackathon with their innovative solution for smart campus management. The winning project will be implemented across campus.',
    timestamp: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Research Paper Published in IEEE',
    category: 'Research',
    content: 'Our faculty members have published a groundbreaking research paper on quantum computing in the prestigious IEEE journal.',
    timestamp: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Industry Partnership Announcement',
    category: 'Partnerships',
    content: 'We are excited to announce our new partnership with leading tech companies to provide internship opportunities for our students.',
    timestamp: '1 day ago',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Student Achievement in International Competition',
    category: 'Achievement',
    content: 'Our students secured first place in the International Programming Competition, showcasing exceptional problem-solving skills.',
    timestamp: '2 days ago',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'New Library Resources Available',
    category: 'Resources',
    content: 'The digital library has been updated with new research papers, e-books, and online courses. Access is now available to all students.',
    timestamp: '2 days ago',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop'
  }
];

function NewsPopup({ news, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-[#4B0082]">
          <X size={20} />
        </button>
        <div className="mb-4">
          <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-[#4B0082]" />
            <span className="text-[#4B0082] font-semibold">{news.category}</span>
          </div>
          <h3 className="text-[#4B0082] font-bold text-2xl mb-2">{news.title}</h3>
          <div className="flex items-center gap-1 text-gray-600 mb-4">
            <Clock size={16} />
            <span>{news.timestamp}</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-gray-800 leading-relaxed">{news.content}</p>
        </div>
        <button className="w-full bg-[#4B0082] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2">
          <ExternalLink size={20} />
          Read Full Article
        </button>
      </div>
    </div>
  );
}

function LatestNews() {
  const [newsItems, setNewsItems] = useState(initialNewsItems);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newNews, setNewNews] = useState({
    title: '',
    category: '',
    content: '',
    timestamp: '',
    image: ''
  });

  const handleAddNews = () => {
    const newNewsItem = {
      ...newNews,
      id: newsItems.length + 1,
      timestamp: 'Just now' // You can replace this with actual timestamp logic
    };
    setNewsItems([...newsItems, newNewsItem]);
    setNewNews({ title: '', category: '', content: '', timestamp: '', image: '' });
  };

  return (
    <div className="flex flex-col items-center bg-[#4B0082] text-white min-h-screen py-10 px-4">
      {/* Admin News Creation Form */}
      <div className="w-full max-w-4xl bg-[#4B0082] p-5 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Plus size={20} />
          <span>Add News</span>
        </h2>
        <div className="mt-4 space-y-4">
          <input
            type="text"
            value={newNews.title}
            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 rounded-md border border-gray-300 text-black"
          />
          <input
            type="text"
            value={newNews.category}
            onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
            placeholder="Category"
            className="w-full p-2 rounded-md border border-gray-300 text-black"
          />
          <textarea
            value={newNews.content}
            onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
            placeholder="Content"
            rows="4"
            className="w-full p-2 rounded-md border border-gray-300 text-black"
          />
          <input
            type="text"
            value={newNews.image}
            onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
            placeholder="Image URL"
            className="w-full p-2 rounded-md border border-gray-300 text-black"
          />
          <button
            onClick={handleAddNews}
            className="w-full bg-[#4B0082] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg"
          >
            Add News
          </button>
        </div>
      </div>

      {/* News Header */}
      <div className="w-full max-w-4xl bg-[#4B0082] p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Newspaper className="mr-2" />
          <span>Latest News</span>
        </h2>
      </div>

      {/* News Content */}
      <div className="w-full max-w-4xl bg-white mt-6 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-gray-100 rounded-lg overflow-hidden transition-all hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedNews(news)}
            >
              <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={16} className="text-[#4B0082]" />
                  <span className="text-[#4B0082] font-semibold">{news.category}</span>
                </div>
                <h3 className="text-[#4B0082] font-bold text-lg mb-2 line-clamp-2">{news.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock size={16} />
                    <span>{news.timestamp}</span>
                  </div>
                  <button className="text-[#4B0082] hover:text-[#3A006B] transition-colors" aria-label="Read more">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Popup */}
      {selectedNews && (
        <NewsPopup news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
}

export default LatestNews;

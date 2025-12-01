import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { Filter, Search } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [sortDate, setSortDate] = useState(false);


    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'ALL');



    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        } else {
            setActiveCategory('ALL');
        }
    }, [categoryParam]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/events');

                if (data && data.length > 0) {
                    setEvents(data);
                } else {
                    setEvents(mockEvents);
                }
            } catch (error) {
                console.error('Failed to fetch events, using mock data', error);
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesCategory = activeCategory === 'ALL' || event.category === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.organizer?.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortDate) {
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50/50 pt-36 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">All Events</h1>
                    <p className="text-gray-600 text-lg">Explore all the happenings at NST.</p>
                </div>


                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSortDate(!sortDate)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${sortDate
                                ? 'bg-teal-100 text-teal-800 border border-teal-200'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <Filter size={16} />
                            <span>Sort by Date</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-medium">Category:</span>
                            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-bold">
                                {activeCategory}
                            </span>
                        </div>
                    </div>
                </div>


                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Loading events...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}

                {!loading && filteredEvents.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Filter size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Try adjusting your search or category filter.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;

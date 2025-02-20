import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Bus, Calendar, MapPin, CreditCard, Info, Ticket, 
  AlertCircle, Loader2, Filter, ArrowRight, Clock, Search
} from "lucide-react";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const { id: userId } = JSON.parse(storedUser);
      fetchTickets(userId);
    } catch {
      setError("Invalid user data.");
      setLoading(false);
    }
  }, []);

  const fetchTickets = async (userId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/ticket/user/${userId}`);
      setTickets(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20';
      case 'completed':
        return 'bg-blue-100 text-blue-800 ring-1 ring-blue-600/20';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 ring-1 ring-rose-600/20';
      case 'pending':
        return 'bg-amber-100 text-amber-800 ring-1 ring-amber-600/20';
      default:
        return 'bg-slate-100 text-slate-800 ring-1 ring-slate-600/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Clock className="w-3 h-3 mr-1" />;
      case 'completed':
        return <Ticket className="w-3 h-3 mr-1" />;
      case 'cancelled':
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'pending':
        return <Info className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const filteredTickets = filterStatus === "all" 
    ? tickets 
    : tickets.filter(ticket => ticket.status.toLowerCase() === filterStatus.toLowerCase());

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="p-8 rounded-xl bg-white shadow-lg flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-6 text-lg font-medium text-slate-700">Loading your tickets...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-rose-50">
      <div className="p-8 rounded-xl bg-white shadow-lg max-w-md">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-rose-100 rounded-full">
            <AlertCircle className="w-8 h-8 text-rose-600" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center text-slate-800 mb-2">Unable to Load Tickets</h2>
        <p className="text-center text-slate-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg shadow hover:bg-slate-700 transition-colors flex items-center justify-center"
        >
          <Loader2 className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );

  if (!tickets.length) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="p-8 rounded-xl bg-white shadow-lg max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-blue-50 rounded-full">
            <Ticket className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center text-slate-800 mb-2">No Tickets Found</h2>
        <p className="text-center text-slate-600 mb-6">You haven't booked any trips yet.</p>
        <button 
          onClick={() => navigate('/search')}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center"
        >
          <Search className="w-4 h-4 mr-2" />
          Search For Trips
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Ticket className="w-6 h-6 text-blue-600" />
          </div>
          My Tickets
          <span className="ml-3 text-sm font-medium px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
            {tickets.length}
          </span>
        </h1>
        
        {/* Filter buttons */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
              filterStatus === "all" ? "bg-white shadow text-slate-800" : "text-slate-600 hover:bg-white/50"
            }`}
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            All
          </button>
          <button
            onClick={() => setFilterStatus("active")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
              filterStatus === "active" ? "bg-white shadow text-emerald-600" : "text-slate-600 hover:bg-white/50"
            }`}
          >
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Active
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
              filterStatus === "pending" ? "bg-white shadow text-amber-600" : "text-slate-600 hover:bg-white/50"
            }`}
          >
            <Info className="w-3.5 h-3.5 mr-1.5" />
            Pending
          </button>
        </div>
      </div>
      
      {/* Grid of tickets */}
      {filteredTickets.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
          <p className="text-slate-600">No tickets match the selected filter.</p>
          <button
            onClick={() => setFilterStatus("all")}
            className="mt-4 px-4 py-2 bg-slate-200 rounded-md text-slate-700 hover:bg-slate-300"
          >
            View All Tickets
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTickets.map(({ _id, route, departureTime, seatNumber, company, price, status }) => {
            const departureDate = new Date(departureTime);
            const isUpcoming = departureDate > new Date();
            
            return (
              <div 
                key={_id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border ${
                  isUpcoming && status.toLowerCase() === 'active' ? 'border-blue-200' : 'border-transparent'
                }`}
              >
                {/* Card header with route */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="p-1.5 bg-white/20 rounded-md">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{route.startPoint}</span>
                        <ArrowRight className="w-3 h-3 mx-1" />
                        <span className="font-medium">{route.endPoint}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                      {status}
                    </span>
                  </div>
                </div>
                
                {/* Card body with details */}
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Departure</p>
                        <p className="text-sm font-medium text-slate-800">{departureDate.toLocaleDateString()}</p>
                        <p className="text-xs text-slate-600">{departureDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                        <Ticket className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Seat</p>
                        <p className="text-sm font-medium text-slate-800">{seatNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-50 rounded-lg flex-shrink-0">
                        <Bus className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Company</p>
                        <p className="text-sm font-medium text-slate-800">{company.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-50 rounded-lg flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Price</p>
                        <p className="text-sm font-medium text-emerald-600">${price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/ticket/${_id}`)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium group"
                  >
                    <Info className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
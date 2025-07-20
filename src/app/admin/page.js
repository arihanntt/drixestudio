"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Eye, EyeOff, ArrowRight, Mail, User, Clock, Search, 
  Download, Trash2, ChevronDown, ChevronUp, Loader2, Check, X, RefreshCw 
} from 'lucide-react';

export default function AdminPortal() {
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [shake, setShake] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [error, setError] = useState(null);

  const handleAuth = useCallback(() => {
    if (pass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAccessGranted(true);
      fetchData();
    } else {
      setShake(true);
      setError('Invalid password');
      setTimeout(() => setShake(false), 500);
    }
  }, [pass]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/submissions', {
        headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
        cache: 'no-store'
      });
      
      if (!res.ok) throw new Error('Failed to fetch submissions');
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
      setInitLoad(false);
    }
  }, []);

  useEffect(() => {
    if (accessGranted && submissions.length === 0) {
      fetchData();
    }
  }, [accessGranted, fetchData, submissions.length]);

  if (!accessGranted) {
    return (
      <SmoothAuthGate 
        pass={pass}
        setPass={setPass}
        showPass={showPass}
        setShowPass={setShowPass}
        handleAuth={handleAuth}
        shake={shake}
        error={error}
      />
    );
  }

  return (
    <Dashboard 
      submissions={submissions} 
      loading={loading}
      initLoad={initLoad}
      refreshData={fetchData}
      setError={setError}
      error={error} // Added error prop
    />
  );
}

const SmoothAuthGate = ({ pass, setPass, showPass, setShowPass, handleAuth, shake, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 p-4 pt-20">
      <motion.div
        key="auth-gate"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          boxShadow: shake ? '0 0 25px rgba(239, 68, 68, 0.7)' : '0 0 25px rgba(124, 58, 237, 0.4)',
          y: shake ? [0, -10, 10, -10, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          type: 'spring',
          stiffness: 500,
          damping: 15
        }}
        className="bg-gray-800/90 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-10 w-full max-w-lg shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: shake ? [0, -5, 5, -5, 0] : 0 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4"
          >
            <Lock size={32} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 mb-2">
            Admin Control Center
          </h1>
          <p className="text-gray-300 text-sm">Enter your security credentials</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2"
          >
            <X size={16} />
            {error}
          </motion.div>
        )}

        <div className="relative mb-6">
          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-100 placeholder-gray-500"
            placeholder="Enter password"
          />
          <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <button 
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-indigo-300 transition-colors"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAuth}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all font-medium"
        >
          Authenticate <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ submissions, loading, initLoad, refreshData, setError, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [expandedRow, setExpandedRow] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const processedData = useMemo(() => {
    let filtered = submissions;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub =>
        sub.name?.toLowerCase().includes(term) ||
        sub.contactInfo?.toLowerCase().includes(term) ||
        sub.message?.toLowerCase().includes(term) ||
        sub.contactMethod?.toLowerCase().includes(term)
      );
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [submissions, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportCSV = () => {
    const headers = "Name,Contact Info,Message,Method,Date\n";
    const csv = processedData.map(s => 
      `"${s.name || ''}","${s.contactInfo || ''}","${(s.message || '').replace(/"/g, '""')}","${s.contactMethod || ''}","${new Date(s.createdAt).toLocaleString()}"`
    ).join('\n');
    
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const deleteSelected = async () => {
    if (!selected.length || isDeleting) return;
    
    setIsDeleting(true);
    setError(null);
    try {
      const response = await fetch('/api/delete-submissions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_TOKEN
        },
        body: JSON.stringify({ ids: selected })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete submissions');
      }

      await refreshData();
      setSelected([]);
    } catch (error) {
      console.error('Delete error:', error.message);
      setError(`Failed to delete submissions: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-15 sm:p-20">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-3">
          Contact Submissions Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search submissions..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-100 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors text-sm font-medium"
              disabled={!processedData.length}
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export CSV</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={deleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              disabled={!selected.length || isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
              <span className="hidden sm:inline">Delete Selected</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2"
          >
            <X size={16} />
            {error}
          </motion.div>
        )}
      </header>

      {initLoad ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-indigo-400" size={40} />
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-indigo-500/20 rounded-xl overflow-x-auto shadow-lg">
          <div className="min-w-[800px] sm:min-w-full">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/70 border-b border-indigo-500/20 font-medium text-sm text-gray-300">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selected.length === processedData.length && processedData.length > 0}
                  onChange={() => {
                    if (selected.length === processedData.length) {
                      setSelected([]);
                    } else {
                      setSelected(processedData.map(item => item._id));
                    }
                  }}
                  className="rounded border-indigo-500/50 focus:ring-indigo-400 h-4 w-4 text-indigo-400"
                />
              </div>
              <div 
                className="col-span-3 flex items-center cursor-pointer hover:text-indigo-300 transition-colors"
                onClick={() => requestSort('name')}
              >
                <span>Name</span>
                {sortConfig.key === 'name' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div 
                className="col-span-4 flex items-center cursor-pointer hover:text-indigo-300 transition-colors"
                onClick={() => requestSort('contactInfo')}
              >
                <span>Contact Info</span>
                {sortConfig.key === 'contactInfo' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-indigo-300 transition-colors"
                onClick={() => requestSort('contactMethod')}
              >
                <span>Method</span>
                {sortConfig.key === 'contactMethod' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div 
                className="col-span-2 flex items-center justify-end cursor-pointer hover:text-indigo-300 transition-colors"
                onClick={() => requestSort('createdAt')}
              >
                <span>Date</span>
                {sortConfig.key === 'createdAt' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
            </div>

            {processedData.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                {searchTerm ? 'No matching submissions found' : 'No submissions yet'}
              </div>
            ) : (
              <div className="divide-y divide-indigo-500/10">
                {processedData.map((submission) => (
                  <div key={submission._id} className="hover:bg-gray-800/70 transition-colors duration-200">
                    <div 
                      className="grid grid-cols-12 gap-4 p-4 items-center cursor-pointer text-sm"
                      onClick={() => toggleExpand(submission._id)}
                    >
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(submission._id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSelected(prev => 
                              prev.includes(submission._id)
                                ? prev.filter(id => id !== submission._id)
                                : [...prev, submission._id]
                            );
                          }}
                          className="rounded border-indigo-500/50 focus:ring-indigo-400 h-4 w-4 text-indigo-400"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="col-span-3 flex items-center gap-2 truncate">
                        <User size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{submission.name || 'N/A'}</span>
                      </div>
                      <div className="col-span-4 flex items-center gap-2 truncate">
                        <Mail size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{submission.contactInfo || 'N/A'}</span>
                      </div>
                      <div className="col-span-2 truncate">
                        {submission.contactMethod || 'N/A'}
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <span className="text-xs text-gray-400 truncate">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedRow === submission._id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRow === submission._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pl-12 bg-gray-800/30 text-sm border-t border-indigo-500/20">
                            <div className="mb-4">
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Full Message</h4>
                              <p className="whitespace-pre-line break-words text-gray-200">{submission.message || 'No message'}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <span className="text-gray-400">Submitted:</span>{' '}
                                <span className="text-gray-200">{new Date(submission.createdAt).toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Method:</span>{' '}
                                <span className="text-gray-200">{submission.contactMethod || 'N/A'}</span>
                              </div>
                              <div className="truncate">
                                <span className="text-gray-400">ID:</span>{' '}
                                <span className="font-mono text-xs text-gray-200">{submission._id}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          Showing {processedData.length} of {submissions.length} submissions
          {searchTerm && ` (filtered)`}
        </div>
        <div className="flex items-center gap-4">
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              <span>Loading...</span>
            </div>
          )}
          <div>
            Sorted by: <span className="text-indigo-300">{sortConfig.key} ({sortConfig.direction})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
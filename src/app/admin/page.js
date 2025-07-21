"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Eye, EyeOff, ArrowRight, Mail, User, Clock, Search, 
  Download, Trash2, ChevronDown, ChevronUp, Loader2, Check, X, RefreshCw, Link,
  HardDrive, LayoutDashboard, CreditCard, Settings, HelpCircle, Terminal, MailIcon
} from 'lucide-react';

export default function AdminPortal() {
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [shake, setShake] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [launchPages, setLaunchPages] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('submissions');
  const [jarvisActive, setJarvisActive] = useState(false);
  const [command, setCommand] = useState('');

  const handleAuth = useCallback(() => {
    if (pass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAccessGranted(true);
      if (activeTab === 'submissions') {
        fetchSubmissions();
      } else if (activeTab === 'launch_pages') {
        fetchLaunchPages();
      } else if (activeTab === 'transactions') {
        fetchTransactions();
      }
    } else {
      setShake(true);
      setError('Invalid credentials. Authentication failed.');
      setTimeout(() => setShake(false), 500);
    }
  }, [pass, activeTab]);

  const fetchSubmissions = useCallback(async () => {
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
      console.error('Fetch submissions error:', error);
      setError('System error. Unable to retrieve submissions.');
    } finally {
      setLoading(false);
      setInitLoad(false);
    }
  }, []);

  const fetchLaunchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/launch-pages', {
        headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch launch pages');
      const data = await res.json();
      setLaunchPages(data);
    } catch (error) {
      console.error('Fetch launch pages error:', error);
      setError('System error. Unable to retrieve launch pages.');
    } finally {
      setLoading(false);
      setInitLoad(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/transactions', {
        headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error('Fetch transactions error:', error);
      setError('System error. Unable to retrieve transactions.');
    } finally {
      setLoading(false);
      setInitLoad(false);
    }
  }, []);

  useEffect(() => {
    if (accessGranted) {
      if (activeTab === 'submissions' && submissions.length === 0) {
        fetchSubmissions();
      } else if (activeTab === 'launch_pages' && launchPages.length === 0) {
        fetchLaunchPages();
      } else if (activeTab === 'transactions' && transactions.length === 0) {
        fetchTransactions();
      }
    }
  }, [accessGranted, activeTab, submissions.length, launchPages.length, transactions.length, fetchSubmissions, fetchLaunchPages, fetchTransactions]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && command.trim()) {
      if (command.toLowerCase().includes('refresh')) {
        if (activeTab === 'submissions') fetchSubmissions();
        else if (activeTab === 'launch_pages') fetchLaunchPages();
        else if (activeTab === 'transactions') fetchTransactions();
      } else if (command.toLowerCase().includes('logout')) {
        setAccessGranted(false);
        setPass('');
      }
      setCommand('');
      setJarvisActive(false);
    }
  };

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
    <div className="min-h-screen bg-gray-950 text-blue-100 p-0 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <AnimatePresence>
        {jarvisActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          >
            <div className="bg-gray-900/90 backdrop-blur-lg border border-blue-500/30 rounded-xl p-4 shadow-2xl shadow-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-blue-400 font-mono text-sm">JARVIS COMMAND INTERFACE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300">{">"}</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-grow bg-transparent border-none outline-none text-blue-100 font-mono placeholder-blue-500/50"
                  placeholder="Enter command..."
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed left-0 top-0 h-full w-16 md:w-20 bg-gray-900/80 backdrop-blur-lg border-r border-blue-500/10 z-10 flex flex-col items-center py-6">
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-blue-500/10 rounded-lg cursor-pointer"
            onClick={() => setJarvisActive(!jarvisActive)}
          >
            <Terminal className="text-blue-400" size={24} />
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg ${activeTab === 'submissions' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('submissions')}
          >
            <LayoutDashboard size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg ${activeTab === 'launch_pages' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('launch_pages')}
          >
            <HardDrive size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg ${activeTab === 'transactions' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('transactions')}
          >
            <CreditCard size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg ${activeTab === 'marketing' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('marketing')}
          >
            <MailIcon size={24} />
          </motion.button>
        </div>
        
        <div className="mt-auto flex flex-col items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 text-gray-400 hover:text-blue-300"
          >
            <Settings size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 text-gray-400 hover:text-blue-300"
            onClick={() => setAccessGranted(false)}
          >
            <Lock size={24} />
          </motion.button>
        </div>
      </div>

      <div className="ml-16 md:ml-20 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs font-mono text-blue-400">SYSTEM STATUS: ONLINE</span>
          </div>
          <div className="text-xs font-mono text-gray-500">
            {new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }).toUpperCase()}
          </div>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 overflow-hidden">
          {activeTab === 'submissions' ? (
            <Dashboard 
              submissions={submissions} 
              loading={loading}
              initLoad={initLoad}
              refreshData={fetchSubmissions}
              setError={setError}
              error={error}
            />
          ) : activeTab === 'launch_pages' ? (
            <LaunchPagesDashboard 
              launchPages={launchPages}
              loading={loading}
              initLoad={initLoad}
              refreshData={fetchLaunchPages}
              setError={setError}
              error={error}
            />
          ) : activeTab === 'transactions' ? (
            <SupportTransactionsDashboard 
              transactions={transactions}
              loading={loading}
              initLoad={initLoad}
              refreshData={fetchTransactions}
              setError={setError}
              error={error}
            />
          ) : (
            <Marketing />
          )}
        </div>
      </div>
    </div>
  );
}

const SmoothAuthGate = ({ pass, setPass, showPass, setShowPass, handleAuth, shake, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-blue-950 p-4 pt-20">
      <motion.div
        key="auth-gate"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          boxShadow: shake ? '0 0 25px rgba(239, 68, 68, 0.7)' : '0 0 25px rgba(56, 182, 255, 0.4)',
          y: shake ? [0, -10, 10, -10, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          type: 'spring',
          stiffness: 500,
          damping: 15
        }}
        className="bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 w-full max-w-lg shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: shake ? [0, -5, 5, -5, 0] : 0 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4"
          >
            <Lock size={32} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-400 mb-2">
            SECURE ADMIN PORTAL
          </h1>
          <p className="text-blue-300/80 text-sm font-mono">ENTER CREDENTIALS TO PROCEED</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2 font-mono"
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
            className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-100 placeholder-blue-500/50 font-mono"
            placeholder="SECURITY PASSCODE"
          />
          <Lock className="absolute left-4 top-3.5 text-blue-400/50" size={20} />
          <button 
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-3.5 text-blue-400/50 hover:text-blue-300 transition-colors"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(56, 182, 255, 0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAuth}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all font-medium"
        >
          AUTHENTICATE <ArrowRight size={20} />
        </motion.button>

        <div className="mt-6 text-center">
          <p className="text-xs text-blue-500/50 font-mono">SYSTEM PROTECTED BY ADVANCED ENCRYPTION</p>
        </div>
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

      await idly();
      setSelected([]);
    } catch (error) {
      console.error('Delete error:', error.message);
      setError(`Failed to delete submissions: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <header className="mb-8 p-6 border-b border-blue-500/20">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 mb-2">
              CONTACT SUBMISSIONS
            </h1>
            <p className="text-blue-400/70 text-sm font-mono">{processedData.length} RECORDS FOUND</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors text-sm font-medium text-blue-300"
              disabled={!processedData.length}
            >
              <Download size={18} />
              <span className="hidden sm:inline">EXPORT</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={deleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium text-red-300"
              disabled={!selected.length || isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
              <span className="hidden sm:inline">DELETE</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/10 hover:bg-gray-700/20 border border-gray-700/30 rounded-lg transition-colors text-sm font-medium text-gray-300"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
              <span className="hidden sm:inline">REFRESH</span>
            </motion.button>
          </div>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2 font-mono"
          >
            <X size={16} />
            {error}
          </motion.div>
        )}
      </header>

      {initLoad ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl overflow-x-auto shadow-lg">
          <div className="min-w-[800px] sm:min-w-full">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/70 border-b border-blue-500/20 font-medium text-sm text-gray-300">
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
                  className="rounded border-blue-500/50 focus:ring-blue-400 h-4 w-4 text-blue-400"
                />
              </div>
              <div 
                className="col-span-3 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
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
                className="col-span-4 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
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
                className="col-span-2 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
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
                className="col-span-2 flex items-center justify-end cursor-pointer hover:text-blue-300 transition-colors"
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
              <div className="divide-y divide-blue-500/10">
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
                          className="rounded border-blue-500/50 focus:ring-blue-400 h-4 w-4 text-blue-400"
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
                          <div className="p-4 pl-12 bg-gray-800/30 text-sm border-t border-blue-500/20">
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
              <Loader2 size={16} className="animate-spin text-blue-400" />
              <span>Loading...</span>
            </div>
          )}
          <div>
            Sorted by: <span className="text-blue-300">{sortConfig.key} ({sortConfig.direction})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LaunchPagesDashboard = ({ launchPages, loading, initLoad, refreshData, setError, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [expandedRow, setExpandedRow] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const processedData = useMemo(() => {
    let filtered = launchPages;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(page =>
        page.owner?.toLowerCase().includes(term) ||
        page.discord?.toLowerCase().includes(term) ||
        page.pageId?.toLowerCase().includes(term)
      );
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [launchPages, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportCSV = () => {
    const headers = "Owner,Discord,Page ID,URL,Has Password,Date\n";
    const csv = processedData.map(page => 
      `"${page.owner || ''}","${page.discord || ''}","${page.pageId || ''}","${window.location.origin}/clients/launch?pageId=${page.pageId}","${page.password ? 'Yes' : 'No'}","${new Date(page.createdAt).toLocaleString()}"`
    ).join('\n');
    
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `launch_pages_${new Date().toISOString().split('T')[0]}.csv`;
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
      const response = await fetch('/api/delete-launch-pages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_TOKEN
        },
        body: JSON.stringify({ ids: selected })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete launch pages');
      }

      await refreshData();
      setSelected([]);
    } catch (error) {
      console.error('Delete launch pages error:', error.message);
      setError(`Failed to delete launch pages: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <header className="mb-8 p-6 border-b border-blue-500/20">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 mb-2">
              LAUNCH PAGES
            </h1>
            <p className="text-blue-400/70 text-sm font-mono">{processedData.length} RECORDS FOUND</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors text-sm font-medium text-blue-300"
              disabled={!processedData.length}
            >
              <Download size={18} />
              <span className="hidden sm:inline">EXPORT</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={deleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium text-red-300"
              disabled={!selected.length || isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
              <span className="hidden sm:inline">DELETE</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/10 hover:bg-gray-700/20 border border-gray-700/30 rounded-lg transition-colors text-sm font-medium text-gray-300"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
              <span className="hidden sm:inline">REFRESH</span>
            </motion.button>
          </div>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2 font-mono"
          >
            <X size={16} />
            {error}
          </motion.div>
        )}
      </header>

      {initLoad ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl overflow-x-auto shadow-lg">
          <div className="min-w-[800px] sm:min-w-full">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/70 border-b border-blue-500/20 font-medium text-sm text-gray-300">
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
                  className="rounded border-blue-500/50 focus:ring-blue-400 h-4 w-4 text-blue-400"
                />
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => requestSort('owner')}
              >
                <span>Owner</span>
                {sortConfig.key === 'owner' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => requestSort('discord')}
              >
                <span>Discord</span>
                {sortConfig.key === 'discord' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div 
                className="col-span-3 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => requestSort('pageId')}
              >
                <span>Page ID</span>
                {sortConfig.key === 'pageId' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div className="col-span-3 flex items-center">
                <span>URL</span>
              </div>
              <div 
                className="col-span-1 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
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
                {searchTerm ? 'No matching launch pages found' : 'No launch pages yet'}
              </div>
            ) : (
              <div className="divide-y divide-blue-500/10">
                {processedData.map((page) => (
                  <div key={page._id} className="hover:bg-gray-800/70 transition-colors duration-200">
                    <div 
                      className="grid grid-cols-12 gap-4 p-4 items-center cursor-pointer text-sm"
                      onClick={() => toggleExpand(page._id)}
                    >
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(page._id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSelected(prev => 
                              prev.includes(page._id)
                                ? prev.filter(id => id !== page._id)
                                : [...prev, page._id]
                            );
                          }}
                          className="rounded border-blue-500/50 focus:ring-blue-400 h-4 w-4 text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="col-span-2 flex items-center gap-2 truncate">
                        <User size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{page.owner || 'N/A'}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 truncate">
                        <Mail size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{page.discord || 'N/A'}</span>
                      </div>
                      <div className="col-span-3 truncate">
                        <span className="font-mono text-xs">{page.pageId || 'N/A'}</span>
                      </div>
                      <div className="col-span-3 flex items-center gap-2 truncate">
                        <Link size={14} className="text-gray-400 flex-shrink-0" />
                        <a 
                          href={`/clients/launch?pageId=${page.pageId}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="truncate text-blue-400 hover:text-blue-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {`/clients/launch?pageId=${page.pageId}`}
                        </a>
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-2">
                        <span className="text-xs text-gray-400 truncate">
                          {new Date(page.createdAt).toLocaleDateString()}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedRow === page._id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRow === page._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pl-12 bg-gray-800/30 text-sm border-t border-blue-500/20">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <span className="text-gray-400">Owner:</span>{' '}
                                <span className="text-gray-200">{page.owner || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Discord:</span>{' '}
                                <span className="text-gray-200">{page.discord || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Has Password:</span>{' '}
                                <span className="text-gray-200">{page.password ? 'Yes' : 'No'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Created:</span>{' '}
                                <span className="text-gray-200">{new Date(page.createdAt).toLocaleString()}</span>
                              </div>
                              <div className="truncate">
                                <span className="text-gray-400">Page ID:</span>{' '}
                                <span className="font-mono text-xs text-gray-200">{page.pageId}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Features:</span>{' '}
                                <span className="text-gray-200">{page.features?.join(', ') || 'None'}</span>
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
          Showing {processedData.length} of {launchPages.length} launch pages
          {searchTerm && ` (filtered)`}
        </div>
        <div className="flex items-center gap-4">
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-blue-400" />
              <span>Loading...</span>
            </div>
          )}
          <div>
            Sorted by: <span className="text-blue-300">{sortConfig.key} ({sortConfig.direction})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportTransactionsDashboard = ({ transactions, loading, initLoad, refreshData, setError, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [expandedRow, setExpandedRow] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const processedData = useMemo(() => {
    let filtered = transactions;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.planName?.toLowerCase().includes(term) ||
        tx.contactDetails?.toLowerCase().includes(term) ||
        tx.message?.toLowerCase().includes(term)
      );
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportCSV = () => {
    const headers = "Plan,Amount,Currency,Contact Method,Contact Details,Message,Date\n";
    const csv = processedData.map(tx => 
      `"${tx.planName || ''}","${tx.amount || ''}","${tx.currency || ''}","${tx.contactMethod || ''}","${tx.contactDetails || ''}","${(tx.message || '').replace(/"/g, '""')}","${new Date(tx.createdAt).toLocaleString()}"`
    ).join('\n');
    
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
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
      const response = await fetch('/api/delete-transactions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_TOKEN
        },
        body: JSON.stringify({ ids: selected })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transactions');
      }

      await refreshData();
      setSelected([]);
    } catch (error) {
      console.error('Delete transactions error:', error.message);
      setError(`Failed to delete transactions: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <header className="mb-8 p-6 border-b border-blue-500/20">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 mb-2">
              SUPPORT TRANSACTIONS
            </h1>
            <p className="text-blue-400/70 text-sm font-mono">{processedData.length} RECORDS FOUND</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors text-sm font-medium text-blue-300"
              disabled={!processedData.length}
            >
              <Download size={18} />
              <span className="hidden sm:inline">EXPORT</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={deleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium text-red-300"
              disabled={!selected.length || isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
              <span className="hidden sm:inline">DELETE</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/10 hover:bg-gray-700/20 border border-gray-700/30 rounded-lg transition-colors text-sm font-medium text-gray-300"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
              <span className="hidden sm:inline">REFRESH</span>
            </motion.button>
          </div>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2 font-mono"
          >
            <X size={16} />
            {error}
          </motion.div>
        )}
      </header>

      {initLoad ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl overflow-x-auto shadow-lg">
          <div className="min-w-[1000px] sm:min-w-full">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/70 border-b border-blue-500/20 font-medium text-sm text-gray-300">
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
                  className="rounded border-blue-500/50 focus:ring-blue-400 h-4 w-4 text-blue-400"
                />
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => requestSort('planName')}
              >
                <span>Plan</span>
                {sortConfig.key === 'planName' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-blue-300 transition-colors"
                onClick={() => requestSort('amount')}
              >
                <span>Amount</span>
                {sortConfig.key === 'amount' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                )}
              </div>
              <div className="col-span-2 flex items-center">
                <span>Currency</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span>Contact Method</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span>Contact Details</span>
              </div>
              <div 
                className="col-span-1 flex items-center justify-end cursor-pointer hover:text-blue-300 transition-colors"
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
                {searchTerm ? 'No matching transactions found' : 'No transactions yet'}
              </div>
            ) : (
              <div className="divide-y divide-blue-500/10">
                {processedData.map((tx) => (
                  <div key={tx._id} className="hover:bg-gray-800/70 transition-colors duration-200">
                    <div 
                      className="grid grid-cols-12 gap-4 p-4 items-center cursor-pointer text-sm"
                      onClick={() => toggleExpand(tx._id)}
                    >
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(tx._id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSelected(prev => 
                              prev.includes(tx._id)
                                ? prev.filter(id => id !== tx._id)
                                : [...prev, tx._id]
                            );
                          }}
                          className="rounded border-blue-500/50 focus:ring-blue-400 h-4 w-4 text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="col-span-2 flex items-center gap-2 truncate">
                        <span className="truncate">{tx.planName || 'N/A'}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 truncate">
                        <span className="truncate">{tx.amount || 'N/A'}</span>
                      </div>
                      <div className="col-span-2 truncate">
                        {tx.currency || 'N/A'}
                      </div>
                      <div className="col-span-2 truncate">
                        {tx.contactMethod || 'N/A'}
                      </div>
                      <div className="col-span-2 truncate">
                        {tx.contactDetails || 'N/A'}
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-2">
                        <span className="text-xs text-gray-400 truncate">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedRow === tx._id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRow === tx._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pl-12 bg-gray-800/30 text-sm border-t border-blue-500/20">
                            <div className="mb-4">
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Message</h4>
                              <p className="whitespace-pre-line break-words text-gray-200">{tx.message || 'No message'}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <span className="text-gray-400">Plan:</span>{' '}
                                <span className="text-gray-200">{tx.planName || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Amount:</span>{' '}
                                <span className="text-gray-200">{tx.amount} {tx.currency}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Contact Method:</span>{' '}
                                <span className="text-gray-200">{tx.contactMethod || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Contact Details:</span>{' '}
                                <span className="text-gray-200">{tx.contactDetails || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Created:</span>{' '}
                                <span className="text-gray-200">{new Date(tx.createdAt).toLocaleString()}</span>
                              </div>
                              <div className="truncate">
                                <span className="text-gray-400">Transaction ID:</span>{' '}
                                <span className="font-mono text-xs text-gray-200">{tx._id}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Razorpay Order ID:</span>{' '}
                                <span className="font-mono text-xs text-gray-200">{tx.razorpayOrderId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Razorpay Payment ID:</span>{' '}
                                <span className="font-mono text-xs text-gray-200">{tx.razorpayPaymentId || 'N/A'}</span>
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
          Showing {processedData.length} of {transactions.length} transactions
          {searchTerm && ` (filtered)`}
        </div>
        <div className="flex items-center gap-4">
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-blue-400" />
              <span>Loading...</span>
            </div>
          )}
          <div>
            Sorted by: <span className="text-blue-300">{sortConfig.key} ({sortConfig.direction})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Marketing = () => {
  const [message, setMessage] = useState('');
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [emailLists, setEmailLists] = useState([]);
  const [emailListName, setEmailListName] = useState('');
  const [singleEmail, setSingleEmail] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [sendHistory, setSendHistory] = useState([]);
  const [emailValidation, setEmailValidation] = useState('');
  const [activeTab, setActiveTab] = useState('compose');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [editTemplate, setEditTemplate] = useState(null);
  const [editEmailList, setEditEmailList] = useState(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduledEmails, setScheduledEmails] = useState([]);
  const fileInputRef = useRef(null);

  // Load data from localStorage and MongoDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
        const savedEmailLists = JSON.parse(localStorage.getItem('emailLists') || '[]');
        const savedHistory = JSON.parse(localStorage.getItem('sendHistory') || '[]');
        if (Array.isArray(savedTemplates)) setTemplates(savedTemplates);
        if (Array.isArray(savedEmailLists)) setEmailLists(savedEmailLists);
        if (Array.isArray(savedHistory)) setSendHistory(savedHistory);

        const response = await fetch('/api/schedule-emails', { method: 'GET' });
        const result = await response.json();
        if (response.ok) {
          setScheduledEmails(result.scheduledEmails || []);
        } else {
          setStatus('Error: Failed to load scheduled emails');
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setStatus('Error: Failed to load data');
      }
    };
    loadData();
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_MAIN_PAGE_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
      setStatus('');
    } else {
      setStatus('Error: Incorrect password');
      setPasswordInput('');
    }
  };

  const handleSaveTemplate = () => {
    if (!templateName || !message) {
      setStatus('Error: Enter a template name and message');
      return;
    }
    if (templates.some((t) => t.name === templateName)) {
      setStatus('Error: Template name already exists');
      return;
    }
    try {
      const newTemplate = {
        name: templateName,
        content: message,
        createdAt: new Date().toISOString(),
      };
      const updatedTemplates = [...templates, newTemplate];
      setTemplates(updatedTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      setTemplateName('');
      setStatus('Template saved successfully!');
    } catch (error) {
      setStatus('Error: Failed to save template');
    }
  };

  const handleEditTemplate = (template) => {
    setEditTemplate(template);
    setTemplateName(template.name);
    setMessage(template.content);
    setActiveTab('compose');
  };

  const handleSaveEditedTemplate = () => {
    if (!templateName || !message) {
      setStatus('Error: Enter a template name and message');
      return;
    }
    try {
      const updatedTemplates = templates.map((t) =>
        t.name === editTemplate.name
          ? { ...t, name: templateName, content: message, updatedAt: new Date().toISOString() }
          : t
      );
      setTemplates(updatedTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      setEditTemplate(null);
      setTemplateName('');
      setMessage('');
      setStatus('Template updated successfully!');
    } catch (error) {
      setStatus('Error: Failed to update template');
    }
  };

  const handleDeleteTemplate = (name) => {
    if (!confirm(`Are you sure you want to delete the template "${name}"?`)) return;
    try {
      const updatedTemplates = templates.filter((t) => t.name !== name);
      setTemplates(updatedTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      setStatus('Template deleted successfully!');
    } catch (error) {
      setStatus('Error: Failed to delete template');
    }
  };

  const handleDuplicateTemplate = (template) => {
    const newName = `${template.name} (Copy)`;
    if (templates.some((t) => t.name === newName)) {
      setStatus('Error: Duplicate template name already exists');
      return;
    }
    try {
      const newTemplate = {
        ...template,
        name: newName,
        createdAt: new Date().toISOString(),
      };
      const updatedTemplates = [...templates, newTemplate];
      setTemplates(updatedTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      setStatus('Template duplicated successfully!');
    } catch (error) {
      setStatus('Error: Failed to duplicate template');
    }
  };

  const handleSaveEmailList = () => {
    if (!emailListName || !emails) {
      setStatus('Error: Enter a list name and emails');
      return;
    }
    if (emailLists.some((l) => l.name === emailListName)) {
      setStatus('Error: List name already exists');
      return;
    }
    try {
      const emailArray = emails
        .split('\n')
        .map((email) => email.trim())
        .filter((email) => email);
      const newList = {
        name: emailListName,
        emails: emailArray,
        createdAt: new Date().toISOString(),
        count: emailArray.length,
      };
      const updatedLists = [...emailLists, newList];
      setEmailLists(updatedLists);
      localStorage.setItem('emailLists', JSON.stringify(updatedLists));
      setEmailListName('');
      setStatus('Email list saved successfully!');
    } catch (error) {
      setStatus('Error: Failed to save email list');
    }
  };

  const handleEditEmailList = (list) => {
    setEditEmailList(list);
    setEmailListName(list.name);
    setEmails(list.emails.join('\n'));
    setActiveTab('compose');
  };

  const handleSaveEditedEmailList = () => {
    if (!emailListName || !emails) {
      setStatus('Error: Enter a list name and emails');
      return;
    }
    try {
      const emailArray = emails
        .split('\n')
        .map((email) => email.trim())
        .filter((email) => email);
      const updatedLists = emailLists.map((l) =>
        l.name === editEmailList.name
          ? {
              ...l,
              name: emailListName,
              emails: emailArray,
              count: emailArray.length,
              updatedAt: new Date().toISOString(),
            }
          : l
      );
      setEmailLists(updatedLists);
      localStorage.setItem('emailLists', JSON.stringify(updatedLists));
      setEditEmailList(null);
      setEmailListName('');
      setEmails('');
      setStatus('Email list updated successfully!');
    } catch (error) {
      setStatus('Error: Failed to update email list');
    }
  };

  const handleDeleteEmailList = (name) => {
    if (!confirm(`Are you sure you want to delete the email list "${name}"?`)) return;
    try {
      const updatedLists = emailLists.filter((l) => l.name !== name);
      setEmailLists(updatedLists);
      localStorage.setItem('emailLists', JSON.stringify(updatedLists));
      setSelectedList('');
      setStatus('Email list deleted successfully!');
    } catch (error) {
      setStatus('Error: Failed to delete email list');
    }
  };

  const handleDuplicateEmailList = (list) => {
    const newName = `${list.name} (Copy)`;
    if (emailLists.some((l) => l.name === newName)) {
      setStatus('Error: Duplicate list name already exists');
      return;
    }
    try {
      const newList = {
        ...list,
        name: newName,
        createdAt: new Date().toISOString(),
      };
      const updatedLists = [...emailLists, newList];
      setEmailLists(updatedLists);
      localStorage.setItem('emailLists', JSON.stringify(updatedLists));
      setStatus('Email list duplicated successfully!');
    } catch (error) {
      setStatus('Error: Failed to duplicate email list');
    }
  };

  const handleDeleteScheduledEmail = async (id) => {
    if (!confirm('Are you sure you want to delete this scheduled email?')) return;
    try {
      const response = await fetch('/api/schedule-emails', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const updatedScheduled = scheduledEmails.filter((email) => email.id !== id);
        setScheduledEmails(updatedScheduled);
        setStatus('Scheduled email deleted successfully!');
      } else {
        const result = await response.json();
        setStatus(`Error: ${result.error || 'Failed to delete scheduled email'}`);
      }
    } catch (error) {
      setStatus('Error: Failed to delete scheduled email');
    }
  };

  const handleLoadTemplate = (templateContent) => {
    setMessage(templateContent);
    setActiveTab('compose');
  };

  const handleLoadEmailList = (listName) => {
    const list = emailLists.find((l) => l.name === listName);
    if (list) {
      setEmails(list.emails.join('\n'));
      setSelectedList(listName);
      setActiveTab('compose');
    }
  };

  const handleAddSingleEmail = () => {
    if (!singleEmail) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(singleEmail)) {
      setEmailValidation(`Invalid email: ${singleEmail}`);
      return;
    }
    setEmails(emails ? `${emails}\n${singleEmail}` : singleEmail);
    setSingleEmail('');
    setEmailValidation('');
  };

  const handleEmailChange = (value) => {
    setEmails(value);
    const validation = validateEmails(value);
    setEmailValidation(
      validation.invalidEmails.length > 0
        ? `Invalid emails: ${validation.invalidEmails.join(', ')}`
        : ''
    );
  };

  const validateEmails = (emailString) => {
    const emailArray = emailString
      .split('\n')
      .map((email) => email.trim())
      .filter((email) => email);
    const invalidEmails = emailArray.filter(
      (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
    return {
      valid: invalidEmails.length === 0,
      invalidEmails,
      count: emailArray.length,
    };
  };

  const handleClearForm = () => {
    setMessage('');
    setEmails('');
    setSubject('');
    setSingleEmail('');
    setTemplateName('');
    setEmailListName('');
    setSelectedList('');
    setEditTemplate(null);
    setEditEmailList(null);
    setScheduleTime('');
    setStatus('Form cleared');
  };

  const handleClearHistory = () => {
    if (!confirm('Are you sure you want to clear send history?')) return;
    try {
      setSendHistory([]);
      localStorage.setItem('sendHistory', JSON.stringify([]));
      setStatus('Send history cleared successfully!');
    } catch (error) {
      console.error('Error clearing send history:', error);
      setStatus('Error: Failed to clear send history');
    }
  };

  const handleSendEmail = async () => {
    if (!subject || !message || !emails) {
      setStatus('Error: Please fill in all fields');
      return;
    }
    const validation = validateEmails(emails);
    if (!validation.valid) {
      setStatus(`Error: Invalid emails detected: ${validation.invalidEmails.join(', ')}`);
      return;
    }
    try {
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          message,
          emails: validation.count > 1 ? emails.split('\n').map((e) => e.trim()) : [emails.trim()],
          scheduleTime: scheduleTime || null,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        const newHistory = {
          id: Date.now().toString(),
          subject,
          recipients: validation.count,
          sentAt: new Date().toISOString(),
        };
        const updatedHistory = [...sendHistory, newHistory];
        setSendHistory(updatedHistory);
        localStorage.setItem('sendHistory', JSON.stringify(updatedHistory));
        if (scheduleTime) {
          setScheduledEmails([...scheduledEmails, { ...newHistory, scheduleTime }]);
          setStatus('Email scheduled successfully!');
        } else {
          setStatus('Email sent successfully!');
        }
        handleClearForm();
      } else {
        setStatus(`Error: ${result.error || 'Failed to send email'}`);
      }
    } catch (error) {
      setStatus('Error: Failed to send email');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const emailArray = text
        .split('\n')
        .map((email) => email.trim())
        .filter((email) => email);
      setEmails(emailArray.join('\n'));
      const validation = validateEmails(emailArray.join('\n'));
      setEmailValidation(
        validation.invalidEmails.length > 0
          ? `Invalid emails in file: ${validation.invalidEmails.join(', ')}`
          : ''
      );
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 w-full max-w-lg"
        >
          <h1 className="text-3xl font-bold text-blue-300 mb-6 text-center">Marketing Access</h1>
          {status && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm flex items-center gap-2">
              <X size={16} />
              {status}
            </div>
          )}
          <form onSubmit={handlePasswordSubmit}>
            <div className="relative mb-6">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                placeholder="Enter marketing password"
              />
              <Lock className="absolute left-4 top-3.5 text-blue-400/50" size={20} />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            >
              Authenticate
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="mb-8 border-b border-blue-500/20">
        <h1 className="text-3xl font-bold text-blue-300 mb-2">MARKETING DASHBOARD</h1>
        <div className="flex gap-4 mb-4">
          {['compose', 'templates', 'emailLists', 'history', 'scheduled'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:text-blue-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 font-mono ${
              status.includes('Error') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
            }`}
          >
            {status.includes('Error') ? <X size={16} /> : <Check size={16} />}
            {status}
          </motion.div>
        )}
      </header>

      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
            <h2 className="text-xl font-bold text-blue-300 mb-4">Compose Email</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100 h-40"
                  placeholder="Email message"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Recipients</label>
                <textarea
                  value={emails}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100 h-20"
                  placeholder="Enter emails (one per line)"
                />
                {emailValidation && (
                  <p className="text-red-300 text-sm mt-1">{emailValidation}</p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-300 mb-1">Add Single Email</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={singleEmail}
                      onChange={(e) => setSingleEmail(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                      placeholder="Add email"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddSingleEmail}
                      className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                    >
                      Add
                    </motion.button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-300 mb-1">Upload Email List</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.csv"
                    className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Schedule Email (Optional)</label>
                <input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSendEmail}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  {scheduleTime ? 'Schedule Email' : 'Send Email'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClearForm}
                  className="px-4 py-2 bg-gray-700/20 text-gray-300 rounded-lg"
                >
                  Clear Form
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                >
                  {editTemplate ? 'Update Template' : 'Save as Template'}
                </motion.button>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-1 bg-gray-800/50 p-4 rounded-xl border border-blue-500/20 ${isSidebarCollapsed ? 'w-16' : 'w-full'}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="mb-4 text-blue-300"
            >
              {isSidebarCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </motion.button>
            {!isSidebarCollapsed && (
              <>
                <h3 className="text-lg font-bold text-blue-300 mb-4">Templates & Lists</h3>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                    placeholder="Template name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1">Email List Name</label>
                  <input
                    type="text"
                    value={emailListName}
                    onChange={(e) => setEmailListName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                    placeholder="Email list name"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={editEmailList ? handleSaveEditedEmailList : handleSaveEmailList}
                    className="mt-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg w-full"
                  >
                    {editEmailList ? 'Update List' : 'Save List'}
                  </motion.button>
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Select Email List</label>
                  <select
                    value={selectedList}
                    onChange={(e) => handleLoadEmailList(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/30 rounded-lg text-blue-100"
                  >
                    <option value="">Select a list</option>
                    {emailLists.map((list) => (
                      <option key={list.name} value={list.name}>
                        {list.name} ({list.count} emails)
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
          <h2 className="text-xl font-bold text-blue-300 mb-4">Email Templates</h2>
          {templates.length === 0 ? (
            <p className="text-gray-400">No templates found</p>
          ) : (
            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.name} className="p-4 bg-gray-900/50 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-blue-300">{template.name}</h3>
                      <p className="text-gray-400 text-sm">{new Date(template.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleLoadTemplate(template.content)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                      >
                        Load
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleEditTemplate(template)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDuplicateTemplate(template)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                      >
                        Duplicate
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDeleteTemplate(template.name)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'emailLists' && (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
          <h2 className="text-xl font-bold text-blue-300 mb-4">Email Lists</h2>
          {emailLists.length === 0 ? (
            <p className="text-gray-400">No email lists found</p>
          ) : (
            <div className="space-y-4">
              {emailLists.map((list) => (
                <div key={list.name} className="p-4 bg-gray-900/50 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-blue-300">{list.name}</h3>
                      <p className="text-gray-400 text-sm">{list.count} emails</p>
                      <p className="text-gray-400 text-sm">{new Date(list.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleLoadEmailList(list.name)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                      >
                        Load
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleEditEmailList(list)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDuplicateEmailList(list)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg"
                      >
                        Duplicate
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDeleteEmailList(list.name)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-300">Send History</h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleClearHistory}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg"
            >
              Clear History
            </motion.button>
          </div>
          {sendHistory.length === 0 ? (
            <p className="text-gray-400">No send history found</p>
          ) : (
            <div className="space-y-4">
              {sendHistory.map((history) => (
                <div key={history.id} className="p-4 bg-gray-900/50 rounded-lg border border-blue-500/30">
                  <h3 className="text-blue-300">{history.subject}</h3>
                  <p className="text-gray-400 text-sm">Sent to {history.recipients} recipients</p>
                  <p className="text-gray-400 text-sm">{new Date(history.sentAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
          <h2 className="text-xl font-bold text-blue-300 mb-4">Scheduled Emails</h2>
          {scheduledEmails.length === 0 ? (
            <p className="text-gray-400">No scheduled emails found</p>
          ) : (
            <div className="space-y-4">
              {scheduledEmails.map((email) => (
                <div key={email.id} className="p-4 bg-gray-900/50 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-blue-300">{email.subject}</h3>
                      <p className="text-gray-400 text-sm">Scheduled for {new Date(email.scheduleTime).toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">To {email.recipients} recipients</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDeleteScheduledEmail(email.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
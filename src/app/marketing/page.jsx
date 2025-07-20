'use client';

import { useState, useEffect, useRef } from 'react';

export default function Marketing() {
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
      setStatus('Error: Failed to clear history');
    }
  };

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/schedule-emails', { method: 'GET' });
      const result = await response.json();
      if (!response.ok) throw new Error('Failed to fetch scheduled emails');
      const data = {
        templates,
        emailLists,
        sendHistory,
        scheduledEmails: result.scheduledEmails || [],
        exportedAt: new Date().toISOString(),
        version: '1.0',
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `email_panel_data_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus('Data exported successfully!');
    } catch (error) {
      setStatus('Error: Failed to export data');
    }
  };

  const handleImportData = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const isValid =
          (Array.isArray(data.templates) || data.templates === undefined) &&
          (Array.isArray(data.emailLists) || data.emailLists === undefined) &&
          (Array.isArray(data.sendHistory) || data.sendHistory === undefined) &&
          (Array.isArray(data.scheduledEmails) || data.scheduledEmails === undefined);
        if (!isValid) throw new Error('Invalid data structure');
        if (data.templates) {
          setTemplates(data.templates);
          localStorage.setItem('emailTemplates', JSON.stringify(data.templates));
        }
        if (data.emailLists) {
          setEmailLists(data.emailLists);
          localStorage.setItem('emailLists', JSON.stringify(data.emailLists));
        }
        if (data.sendHistory) {
          setSendHistory(data.sendHistory);
          localStorage.setItem('sendHistory', JSON.stringify(data.sendHistory));
        }
        if (data.scheduledEmails) {
          await fetch('/api/schedule-emails', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ all: true }),
          });
          for (const email of data.scheduledEmails) {
            await fetch('/api/schedule-emails', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(email),
            });
          }
          setScheduledEmails(data.scheduledEmails);
        }
        setStatus('Data imported successfully!');
      } catch (error) {
        setStatus('Error: Invalid or corrupted data file');
      }
    };
    reader.onerror = () => {
      setStatus('Error: Failed to read file');
    };
    reader.readAsText(file);
    fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateEmails(emails);
    if (!validation.valid) {
      setStatus(`Error: Invalid email addresses: ${validation.invalidEmails.join(', ')}`);
      return;
    }
    if (validation.count > 50) {
      setStatus('Error: Maximum 50 email addresses allowed.');
      return;
    }
    if (!message || !subject.trim()) {
      setStatus('Error: Message and subject are required');
      return;
    }
    if (scheduleTime) {
      const scheduleDate = new Date(scheduleTime);
      if (scheduleDate <= new Date()) {
        setStatus('Error: Schedule time must be in the future');
        return;
      }
    }
    setShowModal(true);
  };

  const handleConfirmSend = async () => {
    setShowModal(false);
    const emailArray = emails
      .split('\n')
      .map((email) => email.trim())
      .filter((email) => email);
    if (scheduleTime) {
      try {
        const newScheduledEmail = {
          id: Date.now().toString(),
          template: templateName || 'Custom',
          recipients: selectedList || `${emailArray.length} emails`,
          emails: emailArray,
          subject: subject.trim(),
          message,
          scheduleTime: new Date(scheduleTime).toISOString(),
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        console.log('Scheduling email with subject:', subject.trim());
        const response = await fetch('/api/schedule-emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newScheduledEmail),
        });
        if (response.ok) {
          setScheduledEmails([...scheduledEmails, newScheduledEmail]);
          setStatus(`Email scheduled for ${new Date(scheduleTime).toLocaleString()}`);
          handleClearForm();
        } else {
          const result = await response.json();
          setStatus(`Error: ${result.error || 'Failed to schedule email'}`);
        }
      } catch (error) {
        setStatus('Error: Failed to schedule email');
      }
    } else {
      setStatus('Sending...');
      try {
        console.log('Sending email with subject:', subject.trim());
        const response = await fetch('/api/send-emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            emails: emailArray,
            subject: subject.trim(),
            timestamp: new Date().toISOString(),
          }),
        });
        const result = await response.json();
        if (response.ok) {
          const newHistory = [
            {
              timestamp: new Date().toISOString(),
              recipients: emailArray.length,
              subject: subject.trim(),
              messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
              status: 'Success',
            },
            ...sendHistory.slice(0, 9),
          ];
          setSendHistory(newHistory);
          localStorage.setItem('sendHistory', JSON.stringify(newHistory));
          setStatus(`Success: Emails sent to ${emailArray.length} recipients!`);
          handleClearForm();
        } else {
          const newHistory = [
            {
              timestamp: new Date().toISOString(),
              recipients: emailArray.length,
              subject: subject.trim(),
              messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
              status: 'Failed',
              error: result.error || 'Unknown error',
            },
            ...sendHistory.slice(0, 9),
          ];
          setSendHistory(newHistory);
          localStorage.setItem('sendHistory', JSON.stringify(newHistory));
          setStatus(`Error: ${result.error || 'Failed to send emails'}`);
        }
      } catch (error) {
        const newHistory = [
          {
            timestamp: new Date().toISOString(),
            recipients: emailArray.length,
            subject: subject.trim(),
            messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
            status: 'Failed',
            error: error.message || 'Connection error',
          },
          ...sendHistory.slice(0, 9),
        ];
        setSendHistory(newHistory);
        localStorage.setItem('sendHistory', JSON.stringify(newHistory));
        setStatus('Error: Failed to connect to server.');
      }
    }
  };

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEmailLists = emailLists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredHistory = sendHistory.filter(
    (entry) =>
      entry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.messagePreview.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredScheduledEmails = scheduledEmails.filter(
    (email) =>
      email.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-16">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Enter Password</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Submit
            </button>
          </form>
          {status && (
            <p
              className={`mt-4 text-center text-sm ${
                status.startsWith('Error') ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex pt-16">
      <div
        className={`fixed ${
          isSidebarCollapsed ? 'w-16' : 'w-80'
        } bg-gray-800 h-full p-4 transition-all duration-300 overflow-y-auto shadow-lg`}
      >
        <div className="flex justify-between items-center mb-4">
          {!isSidebarCollapsed && <h2 className="text-xl font-semibold text-indigo-300">Dashboard</h2>}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-400 hover:text-white text-lg"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {!isSidebarCollapsed && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search templates/lists/schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            {!isSidebarCollapsed && (
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">Saved Templates</h3>
            )}
            {filteredTemplates.length > 0 ? (
              <ul className="space-y-2">
                {filteredTemplates.map((template) => (
                  <li
                    key={template.name}
                    className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className="cursor-pointer flex-1 truncate"
                        onClick={() => handleLoadTemplate(template.content)}
                        title={template.name}
                      >
                        {isSidebarCollapsed ? template.name.charAt(0) : template.name}
                      </span>
                      {!isSidebarCollapsed && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTemplate(template)}
                            className="text-blue-400 hover:text-blue-300"
                            title="Edit template"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDuplicateTemplate(template)}
                            className="text-green-400 hover:text-green-300"
                            title="Duplicate template"
                          >
                            ⧉
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(template.name)}
                            className="text-red-400 hover:text-red-300"
                            title="Delete template"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                    {!isSidebarCollapsed && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {template.content.substring(0, 50)}
                        {template.content.length > 50 ? '...' : ''}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !isSidebarCollapsed && <p className="text-gray-400">No templates found</p>
            )}
          </div>

          <div>
            {!isSidebarCollapsed && (
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">Saved Email Lists</h3>
            )}
            {filteredEmailLists.length > 0 ? (
              <div className="space-y-2">
                {!isSidebarCollapsed && (
                  <select
                    value={selectedList}
                    onChange={(e) => handleLoadEmailList(e.target.value)}
                    className="w-full bg-gray-700 text-white p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  >
                    <option value="">Select a list</option>
                    {filteredEmailLists.map((list) => (
                      <option key={list.name} value={list.name}>
                        {list.name} ({list.count} emails)
                      </option>
                    ))}
                  </select>
                )}
                {selectedList && !isSidebarCollapsed && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditEmailList(emailLists.find((l) => l.name === selectedList))}
                      className="flex-1 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Edit List
                    </button>
                    <button
                      onClick={() =>
                        handleDuplicateEmailList(emailLists.find((l) => l.name === selectedList))
                      }
                      className="flex-1 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition duration-200"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleDeleteEmailList(selectedList)}
                      className="flex-1 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !isSidebarCollapsed && <p className="text-gray-400">No email lists found</p>
            )}
          </div>

          <div>
            {!isSidebarCollapsed && (
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">Scheduled Emails</h3>
            )}
            {filteredScheduledEmails.length > 0 ? (
              <ul className="space-y-2">
                {filteredScheduledEmails.map((email) => (
                  <li
                    key={email.id}
                    className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    {!isSidebarCollapsed && (
                      <>
                        <p className="text-sm">{new Date(email.scheduleTime).toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Template: {email.template}</p>
                        <p className="text-sm text-gray-400">Recipients: {email.recipients}</p>
                        <p className="text-sm text-gray-400 truncate">Subject: {email.subject}</p>
                        <p className="text-sm text-gray-400">Status: {email.status}</p>
                        <button
                          onClick={() => handleDeleteScheduledEmail(email.id)}
                          className="text-red-400 hover:text-red-300 text-sm mt-1"
                          title="Delete scheduled email"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {isSidebarCollapsed && (
                      <span title={`Scheduled: ${email.template} - ${email.recipients}`}>
                        ⏰
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !isSidebarCollapsed && <p className="text-gray-400">No scheduled emails</p>
            )}
          </div>

          <div>
            {!isSidebarCollapsed && (
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-300 mb-2">Send History</h3>
                {sendHistory.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Clear History
                  </button>
                )}
              </div>
            )}
            {filteredHistory.length > 0 ? (
              <ul className="space-y-2">
                {filteredHistory.map((entry, index) => (
                  <li key={index} className="p-3 bg-gray-700 rounded-md">
                    {!isSidebarCollapsed && (
                      <>
                        <p className="text-sm">{new Date(entry.timestamp).toLocaleString()}</p>
                        <p className="text-sm text-gray-400">
                          {entry.status}: {entry.recipients} recipients
                        </p>
                        <p className="text-sm text-gray-400 truncate">Subject: {entry.subject}</p>
                        {entry.error && (
                          <p className="text-sm text-red-400 truncate">Error: {entry.error}</p>
                        )}
                      </>
                    )}
                    {isSidebarCollapsed && (
                      <span
                        title={`${entry.status}: ${entry.recipients} recipients - ${entry.subject}`}
                      >
                        {entry.recipients}✉️
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !isSidebarCollapsed && <p className="text-gray-400">No history found</p>
            )}
          </div>
        </div>
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-80'} p-6`}
      >
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-300">Email Marketing Panel</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('compose')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'compose' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                } transition duration-200`}
              >
                Compose
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                } transition duration-200`}
              >
                Preview
              </button>
            </div>
          </div>

          {activeTab === 'compose' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Email Subject
                </label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter email subject"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="templateName" className="block text-sm font-medium text-gray-300">
                    {editTemplate ? 'Edit Template Name' : 'Template Name (Optional)'}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      id="templateName"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="mt-1 flex-1 border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="Enter template name"
                    />
                    <button
                      type="button"
                      onClick={editTemplate ? handleSaveEditedTemplate : handleSaveTemplate}
                      className="mt-1 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition duration-200"
                    >
                      {editTemplate ? 'Update' : 'Save'}
                    </button>
                    {editTemplate && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditTemplate(null);
                          setTemplateName('');
                          setMessage('');
                        }}
                        className="mt-1 bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700 transition duration-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="emailListName" className="block text-sm font-medium text-gray-300">
                    {editEmailList ? 'Edit Email List Name' : 'Email List Name (Optional)'}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      id="emailListName"
                      value={emailListName}
                      onChange={(e) => setEmailListName(e.target.value)}
                      className="mt-1 flex-1 border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="Enter list name"
                    />
                    <button
                      type="button"
                      onClick={editEmailList ? handleSaveEditedEmailList : handleSaveEmailList}
                      className="mt-1 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition duration-200"
                    >
                      {editEmailList ? 'Update' : 'Save'}
                    </button>
                    {editEmailList && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditEmailList(null);
                          setEmailListName('');
                          setEmails('');
                        }}
                        className="mt-1 bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700 transition duration-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="selectTemplate" className="block text-sm font-medium text-gray-300">
                    Select Template (Optional)
                  </label>
                  <select
                    id="selectTemplate"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setTemplateName(templates.find((t) => t.content === e.target.value)?.name || '');
                    }}
                    className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  >
                    <option value="">Select a template</option>
                    {templates.map((template) => (
                      <option key={template.name} value={template.content}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="selectEmailList" className="block text-sm font-medium text-gray-300">
                    Select Email List (Optional)
                  </label>
                  <select
                    id="selectEmailList"
                    value={selectedList}
                    onChange={(e) => handleLoadEmailList(e.target.value)}
                    className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  >
                    <option value="">Select a list</option>
                    {emailLists.map((list) => (
                      <option key={list.name} value={list.name}>
                        {list.name} ({list.count} emails)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-300">
                  Schedule Send (Optional)
                </label>
                <input
                  type="datetime-local"
                  id="schedule"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Leave blank to send immediately
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="singleEmail" className="block text-sm font-medium text-gray-300">
                    Add Single Email
                  </label>
                  <div className="flex space-x-2">
                    <input
                      id="singleEmail"
                      value={singleEmail}
                      onChange={(e) => setSingleEmail(e.target.value)}
                      className="mt-1 flex-1 border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="Enter one email"
                    />
                    <button
                      type="button"
                      onClick={handleAddSingleEmail}
                      className="mt-1 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Add
                    </button>
                  </div>
                  {emailValidation && (
                    <p className="text-sm text-red-400 mt-1">{emailValidation}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Recipient Count</label>
                  <div className="mt-1 p-2 bg-gray-700 rounded-md text-sm">
                    {validateEmails(emails).count} email addresses
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="emails" className="block text-sm font-medium text-gray-300">
                  Email Addresses (up to 50, one per line)
                </label>
                <textarea
                  id="emails"
                  rows={5}
                  value={emails}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="email1@example.com\nemail2@example.com"
                  required
                />
                <p className="text-sm text-gray-400 mt-1">
                  {validateEmails(emails).count}/50 emails entered
                </p>
                {emailValidation && (
                  <p className="text-sm text-red-400 mt-1">{emailValidation}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-600"
                  disabled={!message || !emails || !subject.trim()}
                >
                  {scheduleTime ? 'Schedule Email' : 'Send Emails'}
                </button>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Clear Form
                </button>
                <button
                  type="button"
                  onClick={handleExportData}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
                >
                  Export Data
                </button>
              </div>

              <div>
                <label className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200 text-center cursor-pointer inline-block">
                  Import Data
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </label>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-700 p-6 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-indigo-300 mb-2">Preview: {subject}</h2>
                <div className="whitespace-pre-line bg-gray-800 p-4 rounded-md">
                  {message || <span className="text-gray-400">No message to preview</span>}
                </div>
              </div>
              <div className="bg-gray-700 p-6 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-indigo-300 mb-2">Recipients</h2>
                <div className="bg-gray-800 p-4 rounded-md max-h-60 overflow-y-auto">
                  {emails ? (
                    emails
                      .split('\n')
                      .map((email, index) => email.trim() && (
                        <div key={index} className="py-1 border-b border-gray-700">
                          {email}
                        </div>
                      ))
                  ) : (
                    <span className="text-gray-400">No recipients to display</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  Total: {validateEmails(emails).count} recipients
                </p>
              </div>
            </div>
          )}

          {status && (
            <div
              className={`mt-4 p-3 rounded-md ${
                status.startsWith('Error') ? 'bg-red-900 text-red-100' : 'bg-green-900 text-green-100'
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-white mb-4">
              {scheduleTime ? 'Confirm Schedule' : 'Confirm Send'}
            </h2>
            <p className="text-gray-300 mb-2">
              {scheduleTime
                ? `Schedule email for ${new Date(scheduleTime).toLocaleString()} to ${validateEmails(emails).count} recipients?`
                : `Send email to ${validateEmails(emails).count} recipients?`}
            </p>
            <div className="bg-gray-700 p-3 rounded-md mb-4">
              <p className="font-medium text-white">{subject.trim()}</p>
              <p className="text-gray-300 text-sm mt-1 line-clamp-3">
                {message.substring(0, 150)}
                {message.length > 150 ? '...' : ''}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmSend}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                {scheduleTime ? 'Confirm Schedule' : 'Confirm Send'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
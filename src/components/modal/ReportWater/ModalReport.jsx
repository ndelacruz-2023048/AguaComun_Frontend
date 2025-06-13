// components/ModalReport.jsx
import React from 'react';
import { Icon } from '@iconify/react'

const ModalReport = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
                <Icon icon="line-md:close-small" width="24" height="24" />
            </button>
            <h2 className="text-xl font-bold mb-4">Create New Water Report</h2>
            <form>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="issueType">
                Type of Issue
                </label>
                <input
                type="text"
                id="issueType"
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Pipe Burst"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
                </label>
                <textarea
                id="description"
                rows="4"
                className="w-full border rounded px-3 py-2"
                placeholder="Describe the issue..."
                ></textarea>
            </div>
            <div className="flex justify-end">
                <button
                type="submit"
                className="bg-[#75BF3B] text-white px-4 py-2 rounded hover:bg-green-700"
                >
                Submit Report
                </button>
            </div>
            </form>
        </div>
        </div>
    )
}

export default ModalReport;
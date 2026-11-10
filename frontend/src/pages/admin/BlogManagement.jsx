import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { useAdminBlogs } from '../../hooks/useBlogs';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import BlogForm from '../../components/admin/BlogForm';
import SEO from '../../components/SEO';

const BlogManagement = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const queryClient = useQueryClient();

    const { data: blogs = [], isLoading: loading } = useAdminBlogs();

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            toast.success('Blog deleted successfully');
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Failed to delete blog');
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingBlog(null);
    };

    const handleFormSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <SEO title="Blog Management | ImageTech Admin" />
                <div className="w-10 h-10 border-4 border-[#0D6EFD] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SEO title="Blog Management | ImageTech Admin" />
            
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#172B4D]">Technical Blogs & Articles</h1>
                    <p className="text-gray-500 text-sm font-medium mt-1">Publish dyne testing guides, surface tension articles, and industrial updates.</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6EFD] text-white hover:bg-blue-600 rounded-xl font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create New Blog
                </button>
            </div>

            {/* Blog List */}
            {blogs.length === 0 ? (
                <div className="bg-white border border-[#DCE5EF] rounded-2xl p-12 text-center shadow-xs">
                    <p className="text-gray-500 mb-4 text-sm">No blogs published yet. Add your first technical guide or news release!</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-5 py-2.5 bg-[#0D6EFD] text-white hover:bg-blue-600 rounded-xl font-semibold text-xs shadow-xs cursor-pointer transition-colors"
                    >
                        Create Blog
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-[#DCE5EF] rounded-2xl overflow-hidden shadow-xs overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F8FAFC] border-b border-[#DCE5EF] text-gray-600 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Views</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCE5EF]">
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-[#F8FAFC] transition-colors">
                                    <td className="px-6 py-4 text-[#172B4D] font-bold">{blog.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-[#0D6EFD] text-xs font-semibold rounded-full border border-blue-100">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${blog.status === 'published'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-amber-50 text-amber-700 border-amber-200'
                                            }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-xs font-mono">{blog.views || 0}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button 
                                                onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                className="p-2 text-gray-600 hover:text-[#0D6EFD] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                title="View Post"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(blog)}
                                                className="p-2 text-[#0D6EFD] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                title="Edit Post"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                title="Delete Post"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Blog Form Modal */}
            {showForm && (
                <BlogForm
                    onClose={handleCloseForm}
                    onSuccess={handleFormSuccess}
                    editBlog={editingBlog}
                />
            )}
        </div>
    );
};

export default BlogManagement;

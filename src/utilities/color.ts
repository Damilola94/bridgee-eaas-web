export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'draft':
      return {
        backgroundColor: '#f59e0b',
        color: '#92400e', 
        borderColor: '#f59e0b'
      };
    case 'paid':
    case 'completed':
      return {
        backgroundColor: '#10b981',
        color: '#064e3b',
        borderColor: '#10b981' 
      };
    case 'processing':
    case 'in-progress':
      return {
        backgroundColor: '#3b82f6',
        color: '#1e3a8a',
        borderColor: '#3b82f6'
      };
    case 'cancelled':
    case 'failed':
      return {
        backgroundColor: '#ef4444', 
        color: '#991b1b',
        borderColor: '#ef4444'
      };
    default:
      return {
        backgroundColor: '#6b7280',
        color: '#374151',
        borderColor: '#6b7280'
      };
  }
};

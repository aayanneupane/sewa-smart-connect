
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ServiceForm } from '@/components/ServiceForm';
import { ServiceList } from '@/components/ServiceList';

const ServiceProvider = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Fetch provider's services
  const { data: services, isLoading } = useQuery({
    queryKey: ['provider-services', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-services'] });
      toast({
        title: 'Success',
        description: 'Service deleted successfully'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive'
      });
    }
  });

  const handleEdit = (service: any) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteServiceMutation.mutate(serviceId);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Provider Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your services and grow your business</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ServiceForm 
              service={editingService}
              onClose={handleFormClose}
              onSuccess={() => {
                handleFormClose();
                queryClient.invalidateQueries({ queryKey: ['provider-services'] });
                queryClient.invalidateQueries({ queryKey: ['all-services'] });
              }}
            />
          </div>
        )}

        <div className="grid gap-6">
          {services?.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No services yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first service to attract clients</p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Service
                </Button>
              </CardContent>
            </Card>
          ) : (
            <ServiceList 
              services={services || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isProvider={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;

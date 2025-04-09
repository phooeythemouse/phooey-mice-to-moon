
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Subscriber } from '../components/SubscribersTable';

export interface SubscriberData {
  email: string;
}

export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    
    // Insert the email to Supabase subscribers table
    const { data, error } = await supabase
      .from('subscribers')
      .insert({ email })
      .select();
    
    if (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error(error.message || "Subscription failed. Please try again later.");
      return false;
    }
    
    console.log('Email subscription:', email);
    toast.success("Successfully subscribed to the PHOOEY newsletter!");
    return true;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    toast.error("Subscription failed. Please try again later.");
    return false;
  }
};

// Function to fetch subscribers
export const fetchSubscribers = async (): Promise<Subscriber[]> => {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching subscribers:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in fetchSubscribers:", error);
    return [];
  }
};

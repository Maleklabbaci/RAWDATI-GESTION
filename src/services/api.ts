
import { supabase } from '../supabaseClient';
import { Child, Staff, Payment, Activity, Meal } from '../types';

/**
 * Service de base de données.
 * Actuellement configuré pour utiliser Supabase (si les clés sont fournies)
 * ou retomber sur le stockage local pour le développement.
 */

export const db = {
  // --- ENFANTS ---
  async getChildren(): Promise<Child[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('children').select('*');
    if (error) throw error;
    return data || [];
  },

  async addChild(child: Omit<Child, 'id'>) {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase.from('children').insert([child]).select();
    if (error) throw error;
    return data[0];
  },

  async updateChild(id: string, updates: Partial<Child>) {
    if (!supabase) throw new Error('Supabase not initialized');
    const { error } = await supabase.from('children').update(updates).eq('id', id);
    if (error) throw error;
  },

  async deleteChild(id: string) {
    if (!supabase) throw new Error('Supabase not initialized');
    const { error } = await supabase.from('children').delete().eq('id', id);
    if (error) throw error;
  },

  // --- PERSONNEL ---
  async getStaff(): Promise<Staff[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('staff').select('*');
    if (error) throw error;
    return data || [];
  },

  // --- PAIEMENTS ---
  async getPayments(): Promise<Payment[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('payments').select('*');
    if (error) throw error;
    return data || [];
  },

  async addPayment(payment: Omit<Payment, 'id'>) {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase.from('payments').insert([payment]).select();
    if (error) throw error;
    return data[0];
  },

  // --- CLASSES ---
  async getClasses() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('classes').select('*');
    if (error) throw error;
    return data || [];
  }
};

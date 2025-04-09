
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Subscriber {
  id: string;
  email: string;
  created_at: string; 
}

interface SubscribersTableProps {
  subscribers: Subscriber[];
  isLoading?: boolean;
}

const SubscribersTable: React.FC<SubscribersTableProps> = ({ subscribers, isLoading = false }) => {
  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableCaption>PHOOEY Newsletter Subscribers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Date Subscribed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-8 text-gray-400">Loading subscribers...</TableCell>
            </TableRow>
          ) : subscribers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-8 text-gray-400">No subscribers yet</TableCell>
            </TableRow>
          ) : (
            subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="text-gray-300">{subscriber.email}</TableCell>
                <TableCell className="text-gray-300">
                  {new Date(subscriber.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubscribersTable;

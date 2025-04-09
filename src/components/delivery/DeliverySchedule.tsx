
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Mock data for schedule
const scheduleData = [
  { id: 1, startTime: '09:00 AM', endTime: '01:00 PM', date: '2025-04-08', status: 'active' },
  { id: 2, startTime: '02:00 PM', endTime: '06:00 PM', date: '2025-04-08', status: 'active' },
  { id: 3, startTime: '09:00 AM', endTime: '01:00 PM', date: '2025-04-09', status: 'active' },
  { id: 4, startTime: '02:00 PM', endTime: '06:00 PM', date: '2025-04-09', status: 'active' },
  { id: 5, startTime: '09:00 AM', endTime: '01:00 PM', date: '2025-04-10', status: 'inactive' },
];

const DeliverySchedule = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Schedule</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-4">Today</h3>
              {scheduleData.filter(s => s.date === '2025-04-08').map((slot) => (
                <div key={slot.id} className="mb-3 p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between">
                    <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                    <Badge className={slot.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {slot.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Tomorrow</h3>
              {scheduleData.filter(s => s.date === '2025-04-09').map((slot) => (
                <div key={slot.id} className="mb-3 p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between">
                    <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                    <Badge className={slot.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {slot.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Day After Tomorrow</h3>
              {scheduleData.filter(s => s.date === '2025-04-10').map((slot) => (
                <div key={slot.id} className="mb-3 p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between">
                    <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                    <Badge className={slot.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {slot.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  {slot.status === 'inactive' && (
                    <Button size="sm" className="mt-2 w-full bg-brand-purple">
                      Set as Available
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <Input type="time" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <Input type="time" />
            </div>
          </div>
          <Button className="mt-6 bg-brand-purple">
            Add Availability
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliverySchedule;

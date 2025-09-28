import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileText, MapPin, Calendar, Thermometer } from 'lucide-react';

const SymptomReportForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    phoneNumber: '',
    symptoms: [] as string[],
    fever: false,
    feverTemperature: '',
    onsetDate: '',
    additionalInfo: '',
  });

  const commonSymptoms = [
    'Fever',
    'Headache',
    'Body ache',
    'Nausea',
    'Vomiting',
    'Diarrhea',
    'Cough',
    'Shortness of breath',
    'Skin rash',
    'Joint pain',
    'Fatigue',
    'Loss of appetite',
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.location || formData.symptoms.length === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields and select at least one symptom.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Report Submitted Successfully",
      description: "Your symptom report has been recorded and sent to health officials.",
    });

    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '',
      location: '',
      phoneNumber: '',
      symptoms: [],
      fever: false,
      feverTemperature: '',
      onsetDate: '',
      additionalInfo: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              Symptom Report Form
            </CardTitle>
            <CardDescription>
              Report your symptoms to help monitor community health and prevent disease outbreaks.
              All information will be kept confidential and used for health monitoring purposes only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location/Address *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter your village/area/address"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Symptom Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Symptom Information
                </h3>
                
                <div className="space-y-2">
                  <Label>Select all symptoms you are experiencing: *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {commonSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={formData.symptoms.includes(symptom)}
                          onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                        />
                        <Label 
                          htmlFor={symptom} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {symptom}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="onsetDate">When did symptoms start?</Label>
                    <Input
                      id="onsetDate"
                      type="date"
                      value={formData.onsetDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, onsetDate: e.target.value }))}
                    />
                  </div>
                  
                  {formData.symptoms.includes('Fever') && (
                    <div className="space-y-2">
                      <Label htmlFor="feverTemperature">Temperature (°F)</Label>
                      <Input
                        id="feverTemperature"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 102.5"
                        value={formData.feverTemperature}
                        onChange={(e) => setFormData(prev => ({ ...prev, feverTemperature: e.target.value }))}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Please describe any other symptoms, recent travel, or relevant information..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto">
                  Submit Symptom Report
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  * Required fields. Your report will be reviewed by health officials and may be used for community health monitoring.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomReportForm;
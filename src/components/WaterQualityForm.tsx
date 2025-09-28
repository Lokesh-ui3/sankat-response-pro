import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Droplets, MapPin, Calendar, TestTube } from 'lucide-react';

const WaterQualityForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    testerId: '',
    location: '',
    waterSource: '',
    testDate: '',
    testTime: '',
    pH: '',
    turbidity: '',
    chlorine: '',
    temperature: '',
    bacteria: '',
    visualInspection: [] as string[],
    odor: '',
    taste: '',
    recommendations: '',
    followUpRequired: false,
    additionalNotes: '',
  });

  const waterSources = [
    'Borewell',
    'Hand pump',
    'Community well',
    'River/Stream',
    'Pond/Lake',
    'Piped water supply',
    'Tanker water',
    'Other',
  ];

  const visualInspectionOptions = [
    'Clear',
    'Cloudy',
    'Colored (specify)',
    'Floating particles',
    'Oil film',
    'Algae growth',
    'Sediment',
  ];

  const handleVisualInspectionChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      visualInspection: checked 
        ? [...prev.visualInspection, option]
        : prev.visualInspection.filter(item => item !== option)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.testerId || !formData.location || !formData.waterSource || !formData.testDate) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Water Quality Test Recorded",
      description: "Test results have been saved and will be reviewed by health officials.",
    });

    // Reset form
    setFormData({
      testerId: '',
      location: '',
      waterSource: '',
      testDate: '',
      testTime: '',
      pH: '',
      turbidity: '',
      chlorine: '',
      temperature: '',
      bacteria: '',
      visualInspection: [],
      odor: '',
      taste: '',
      recommendations: '',
      followUpRequired: false,
      additionalNotes: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Droplets className="h-6 w-6 text-info-cyan" />
              Water Quality Test Form
            </CardTitle>
            <CardDescription>
              Record water quality test results to monitor water safety in the community.
              Complete all relevant fields based on your testing equipment and observations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Test Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Test Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testerId">Tester ID/Name *</Label>
                    <Input
                      id="testerId"
                      type="text"
                      placeholder="Enter your ID or name"
                      value={formData.testerId}
                      onChange={(e) => setFormData(prev => ({ ...prev, testerId: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testDate">Test Date *</Label>
                    <Input
                      id="testDate"
                      type="date"
                      value={formData.testDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, testDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testTime">Test Time</Label>
                    <Input
                      id="testTime"
                      type="time"
                      value={formData.testTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, testTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waterSource">Water Source *</Label>
                    <Select value={formData.waterSource} onValueChange={(value) => setFormData(prev => ({ ...prev, waterSource: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select water source" />
                      </SelectTrigger>
                      <SelectContent>
                        {waterSources.map((source) => (
                          <SelectItem key={source} value={source.toLowerCase()}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location/Address *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter exact location of water source"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Chemical Test Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  Chemical Test Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pH">pH Level</Label>
                    <Input
                      id="pH"
                      type="number"
                      step="0.1"
                      placeholder="6.5 - 8.5 (ideal)"
                      value={formData.pH}
                      onChange={(e) => setFormData(prev => ({ ...prev, pH: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                    <Input
                      id="turbidity"
                      type="number"
                      step="0.1"
                      placeholder="< 1 NTU (ideal)"
                      value={formData.turbidity}
                      onChange={(e) => setFormData(prev => ({ ...prev, turbidity: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chlorine">Free Chlorine (mg/L)</Label>
                    <Input
                      id="chlorine"
                      type="number"
                      step="0.01"
                      placeholder="0.2 - 0.5 mg/L"
                      value={formData.chlorine}
                      onChange={(e) => setFormData(prev => ({ ...prev, chlorine: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="Water temperature"
                      value={formData.temperature}
                      onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bacteria">Bacteria Count</Label>
                    <Select value={formData.bacteria} onValueChange={(value) => setFormData(prev => ({ ...prev, bacteria: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bacteria level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safe">Safe (0 CFU/100ml)</SelectItem>
                        <SelectItem value="moderate">Moderate (1-10 CFU/100ml)</SelectItem>
                        <SelectItem value="high">High (&gt;10 CFU/100ml)</SelectItem>
                        <SelectItem value="not-tested">Not Tested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Physical Inspection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Physical Inspection
                </h3>
                
                <div className="space-y-2">
                  <Label>Visual Inspection (select all that apply):</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {visualInspectionOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.visualInspection.includes(option)}
                          onCheckedChange={(checked) => handleVisualInspectionChange(option, checked as boolean)}
                        />
                        <Label 
                          htmlFor={option} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="odor">Odor</Label>
                    <Select value={formData.odor} onValueChange={(value) => setFormData(prev => ({ ...prev, odor: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select odor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No odor</SelectItem>
                        <SelectItem value="chlorine">Chlorine smell</SelectItem>
                        <SelectItem value="earthy">Earthy/musty</SelectItem>
                        <SelectItem value="chemical">Chemical smell</SelectItem>
                        <SelectItem value="sewage">Sewage-like</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taste">Taste (if safe to test)</Label>
                    <Select value={formData.taste} onValueChange={(value) => setFormData(prev => ({ ...prev, taste: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select taste" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal/neutral</SelectItem>
                        <SelectItem value="salty">Salty</SelectItem>
                        <SelectItem value="metallic">Metallic</SelectItem>
                        <SelectItem value="bitter">Bitter</SelectItem>
                        <SelectItem value="sweet">Sweet</SelectItem>
                        <SelectItem value="not-tested">Not tested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Recommendations and Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommendations & Notes</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    placeholder="Enter recommendations for water treatment or safety measures..."
                    value={formData.recommendations}
                    onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followUpRequired"
                    checked={formData.followUpRequired}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, followUpRequired: checked as boolean }))}
                  />
                  <Label htmlFor="followUpRequired" className="cursor-pointer">
                    Follow-up testing required
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any additional observations or concerns..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto">
                  Submit Water Quality Test
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  * Required fields. Test results will be reviewed and may trigger water safety alerts if necessary.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterQualityForm;
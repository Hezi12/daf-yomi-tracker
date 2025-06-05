import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { useDafData } from '../hooks/useDafData';
import { getMasechetOptions } from '../data/masechet';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

export const DafimListPage: React.FC = () => {
  const { dafimData } = useDafData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMasechet, setSelectedMasechet] = useState('');

  const masechetFilterOptions = [
    { value: '', label: 'כל המסכתות' },
    ...getMasechetOptions()
  ];

  const filteredDafim = useMemo(() => {
    let filtered = dafimData;

    if (searchTerm) {
      filtered = filtered.filter(daf => 
        daf.masechet.includes(searchTerm) || 
        daf.daf.toString().includes(searchTerm)
      );
    }

    if (selectedMasechet) {
      filtered = filtered.filter(daf => daf.masechet === selectedMasechet);
    }

    return filtered.sort((a, b) => (b.lastStudied?.getTime() || 0) - (a.lastStudied?.getTime() || 0));
  }, [dafimData, searchTerm, selectedMasechet]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 hebrew-text">
            הדפים שלי
          </h1>
          <p className="text-gray-600 hebrew-text mt-2">
            כל הדפים שלמדתם עד כה ({dafimData.length} דפים)
          </p>
        </div>
        <Link to="/add">
          <Button>הוספת דף חדש</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="חיפוש לפי מסכת או דף..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              value={selectedMasechet}
              onChange={(e) => setSelectedMasechet(e.target.value)}
              options={masechetFilterOptions}
            />
          </div>
        </CardContent>
      </Card>

      {filteredDafim.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 hebrew-text mb-2">
              אין דפים להצגה
            </h3>
            <p className="text-gray-500 hebrew-text mb-6">
              {dafimData.length === 0 
                ? 'עדיין לא הוספתם דפים. התחילו עכשיו!'
                : 'לא נמצאו דפים התואמים לחיפוש.'
              }
            </p>
            <Link to="/add">
              <Button>הוספת דף ראשון</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredDafim.map((daf) => (
            <Card key={daf.id}>
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 hebrew-text mb-2">
                      {daf.masechet} דף {daf.daf}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{daf.totalStudies}</span> לימודים
                      </div>
                      <div className="text-sm text-gray-600">
                        ממוצע: <span className="font-medium">{daf.averageUnderstanding.toFixed(1)}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {daf.lastStudied 
                          ? format(daf.lastStudied, 'dd/MM/yyyy', { locale: he })
                          : 'לא ידוע'
                        }
                      </div>
                    </div>
                    {daf.notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{daf.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 
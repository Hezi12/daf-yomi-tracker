import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { useDafData } from '../hooks/useDafData';
import { getMasechetOptions } from '../data/masechet';
import { format } from 'date-fns';

export const AddDafPage: React.FC = () => {
  const navigate = useNavigate();
  const { addStudySession } = useDafData();
  
  const [formData, setFormData] = useState({
    masechet: '',
    daf: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    understanding: '3',
    timeSpent: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const masechetOptions = [
    { value: '', label: 'בחר מסכת...', disabled: true },
    ...getMasechetOptions()
  ];

  const understandingOptions = [
    { value: '1', label: '1 - לא הבנתי בכלל' },
    { value: '2', label: '2 - הבנתי מעט' },
    { value: '3', label: '3 - הבנתי בינוני' },
    { value: '4', label: '4 - הבנתי טוב' },
    { value: '5', label: '5 - הבנתי מעולה' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.masechet) {
      newErrors.masechet = 'יש לבחור מסכת';
    }

    if (!formData.daf) {
      newErrors.daf = 'יש להזין מספר דף';
    } else {
      const dafNumber = parseInt(formData.daf);
      if (isNaN(dafNumber) || dafNumber < 1 || dafNumber > 200) {
        newErrors.daf = 'מספר דף לא תקין (1-200)';
      }
    }

    if (!formData.date) {
      newErrors.date = 'יש לבחור תאריך';
    }

    if (formData.timeSpent && (parseInt(formData.timeSpent) < 1 || parseInt(formData.timeSpent) > 600)) {
      newErrors.timeSpent = 'זמן לימוד לא תקין (1-600 דקות)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addStudySession(formData.masechet, parseInt(formData.daf), {
        date: new Date(formData.date),
        understanding: parseInt(formData.understanding),
        timeSpent: formData.timeSpent ? parseInt(formData.timeSpent) : undefined,
        notes: formData.notes || undefined
      });

      // איפוס הטופס
      setFormData({
        masechet: '',
        daf: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        understanding: '3',
        timeSpent: '',
        notes: ''
      });

      // הודעת הצלחה והפניה חזרה
      navigate('/', { 
        state: { message: 'הלימוד נוסף בהצלחה!' }
      });

    } catch (error) {
      console.error('Error adding study session:', error);
      setErrors({ submit: 'אירעה שגיאה בשמירת הנתונים' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // מחיקת שגיאה כשמתחילים להקליד
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 hebrew-text mb-2">
          תיעוד דף חדש
        </h1>
        <p className="text-gray-600 hebrew-text">
          הוסיפו דף שלמדתם והקליטו את כל הפרטים הרלוונטיים
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>פרטי הלימוד</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* בחירת מסכת */}
            <Select
              label="מסכת"
              value={formData.masechet}
              onChange={(e) => handleInputChange('masechet', e.target.value)}
              options={masechetOptions}
              error={errors.masechet}
              required
            />

            {/* מספר דף */}
            <Input
              label="מספר דף"
              type="number"
              min="1"
              max="200"
              value={formData.daf}
              onChange={(e) => handleInputChange('daf', e.target.value)}
              error={errors.daf}
              placeholder="למשל: 15"
              required
            />

            {/* תאריך לימוד */}
            <Input
              label="תאריך לימוד"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              error={errors.date}
              required
            />

            {/* רמת הבנה */}
            <Select
              label="רמת הבנה"
              value={formData.understanding}
              onChange={(e) => handleInputChange('understanding', e.target.value)}
              options={understandingOptions}
              helperText="איך הרגשתם לגבי הבנת החומר?"
            />

            {/* זמן לימוד (אופציונלי) */}
            <Input
              label="זמן לימוד (דקות)"
              type="number"
              min="1"
              max="600"
              value={formData.timeSpent}
              onChange={(e) => handleInputChange('timeSpent', e.target.value)}
              error={errors.timeSpent}
              placeholder="למשל: 45"
              helperText="כמה זמן השקעתם בלימוד (אופציונלי)"
            />

            {/* הערות */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 hebrew-text">
                הערות
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="הערות נוספות על הלימוד (אופציונלי)..."
              />
              <p className="text-sm text-gray-500">
                ניתן להוסיף הערות על הדף, קושי מיוחד, נושאים מעניינים וכו'
              </p>
            </div>

            {/* שגיאת שליחה */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* כפתורי פעולה */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שומר...' : 'שמירת לימוד'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}; 
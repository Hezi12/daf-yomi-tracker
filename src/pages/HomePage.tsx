import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Target,
  Clock,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useDafData } from '../hooks/useDafData';
import { format, isToday } from 'date-fns';

export const HomePage: React.FC = () => {
  const { statistics, dafimData } = useDafData();

  // דפים שנלמדו השבוע
  const thisWeekDafim = dafimData.filter(daf => 
    daf.lastStudied && 
    isToday(daf.lastStudied)
  );

  // דף אחרון שנלמד
  const lastStudiedDaf = dafimData
    .filter(d => d.lastStudied)
    .sort((a, b) => b.lastStudied!.getTime() - a.lastStudied!.getTime())[0];

  const quickStats = [
    {
      title: 'דפים שנלמדו',
      value: statistics.studiedDafim.toLocaleString(),
      subtitle: `מתוך ${statistics.totalDafim.toLocaleString()}`,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'אחוז השלמה',
      value: `${statistics.completionPercentage.toFixed(1)}%`,
      subtitle: 'מכלל השס',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'רצף נוכחי',
      value: statistics.currentStreak.toString(),
      subtitle: 'ימים רצופים',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'לימודים השבוע',
      value: thisWeekDafim.length.toString(),
      subtitle: `מתוך יעד ${statistics.weeklyGoal}`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* כותרת ברוכים הבאים */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 hebrew-text mb-2">
          ברוכים הבאים למעקב דף היומי
        </h2>
        <p className="text-gray-600 hebrew-text text-sm sm:text-base">
          עקבו אחר ההתקדמות שלכם בלימוד השס ושמרו על המוטיבציה
        </p>
      </div>

      {/* סטטיסטיקות מהירות */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start p-1 sm:p-0">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} mb-2 sm:mb-0`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
                <div className="sm:mr-4 text-center sm:text-right">
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 hebrew-text">{stat.title}</p>
                  <p className="text-xs text-gray-400 hidden sm:block">{stat.subtitle}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* פעילות אחרונה */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 ml-2" />
              פעילות אחרונה
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastStudiedDaf ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium hebrew-text">
                      {lastStudiedDaf.masechet} דף {lastStudiedDaf.daf}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(lastStudiedDaf.lastStudied!, 'PPP')}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">מספר לימודים</p>
                    <p className="font-bold text-lg">{lastStudiedDaf.totalStudies}</p>
                  </div>
                </div>
                {dafimData.slice(0, 3).map((daf) => (
                  <div key={daf.id} className="flex justify-between items-center py-2 border-b">
                    <span className="hebrew-text">{daf.masechet} דף {daf.daf}</span>
                    <span className="text-sm text-gray-500">
                      {daf.totalStudies} פעמים
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 hebrew-text">עדיין לא הוספתם לימודים</p>
                <Link to="/add">
                  <Button className="mt-4">הוספת לימוד ראשון</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* פעולות מהירות */}
        <Card>
          <CardHeader>
            <CardTitle>פעולות מהירות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/add" className="block">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-lg ml-3">
                      <Calendar className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium hebrew-text">תיעוד דף חדש</p>
                      <p className="text-sm text-gray-500">הוסיפו דף שלמדתם היום</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/dafim" className="block">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg ml-3">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium hebrew-text">רשימת הדפים</p>
                      <p className="text-sm text-gray-500">צפייה בכל הדפים שלמדתם</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/stats" className="block">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg ml-3">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium hebrew-text">סטטיסטיקות</p>
                      <p className="text-sm text-gray-500">מעקב אחר ההתקדמות</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 
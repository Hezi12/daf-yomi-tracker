import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useDafData } from '../hooks/useDafData';
import { MASECHET_DATA } from '../data/masechet';

export const StatsPage: React.FC = () => {
  const { statistics, dafimData } = useDafData();

  // סטטיסטיקות לפי מסכתות
  const masechetStats = MASECHET_DATA.map(masechet => {
    const studiedDafim = dafimData.filter(daf => daf.masechet === masechet.name);
    const completionPercentage = (studiedDafim.length / masechet.totalPages) * 100;
    
    return {
      ...masechet,
      studiedDafim: studiedDafim.length,
      completionPercentage,
      averageUnderstanding: studiedDafim.length > 0 
        ? studiedDafim.reduce((sum, daf) => sum + daf.averageUnderstanding, 0) / studiedDafim.length 
        : 0
    };
  }).filter(masechet => masechet.studiedDafim > 0)
    .sort((a, b) => b.completionPercentage - a.completionPercentage);

  const progressData = [
    {
      title: 'סה"כ דפים בשס',
      value: statistics.totalDafim.toLocaleString(),
      subtitle: 'דפים',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'דפים שנלמדו',
      value: statistics.studiedDafim.toLocaleString(),
      subtitle: `${statistics.completionPercentage.toFixed(1)}% מהשס`,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'דפים שנותרו',
      value: (statistics.totalDafim - statistics.studiedDafim).toLocaleString(),
      subtitle: 'דפים',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'סה"כ לימודים',
      value: statistics.totalStudySessions.toLocaleString(),
      subtitle: 'פעמים',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 hebrew-text mb-2">
          סטטיסטיקות
        </h1>
        <p className="text-sm sm:text-base text-gray-600 hebrew-text">
          מעקב מפורט אחר ההתקדמות שלכם בלימוד השס
        </p>
      </div>

      {/* סטטיסטיקות כלליות */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {progressData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col sm:flex-row items-center sm:items-start p-3 sm:p-6">
              <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} mb-2 sm:mb-0 sm:ml-4`}>
                <div className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`}>📊</div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 hebrew-text">{stat.title}</p>
                <p className="text-xs text-gray-400 hidden sm:block">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* התקדמות לפי מסכתות */}
        <Card>
          <CardHeader>
            <CardTitle>התקדמות לפי מסכתות</CardTitle>
          </CardHeader>
          <CardContent>
            {masechetStats.length === 0 ? (
              <p className="text-center text-gray-500 hebrew-text py-8">
                עדיין לא התחלתם ללמוד אף מסכת
              </p>
            ) : (
              <div className="space-y-4">
                {masechetStats.slice(0, 10).map((masechet) => (
                  <div key={masechet.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium hebrew-text">{masechet.hebrewName}</span>
                      <span className="text-sm text-gray-500">
                        {masechet.studiedDafim}/{masechet.totalPages} 
                        ({masechet.completionPercentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${masechet.completionPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>ממוצע הבנה: {masechet.averageUnderstanding.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
                {masechetStats.length > 10 && (
                  <p className="text-sm text-gray-500 text-center">
                    ועוד {masechetStats.length - 10} מסכתות...
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* סטטיסטיקות מתקדמות */}
        <Card>
          <CardHeader>
            <CardTitle>נתונים מתקדמים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 hebrew-text mb-2">רצף לימוד</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">
                      {statistics.currentStreak}
                    </div>
                    <div className="text-sm text-gray-500">ימים רצופים</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 hebrew-text mb-2">ממוצעים</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">לימודים לדף:</span>
                    <span className="font-medium">
                      {statistics.averageSessionsPerDaf.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">אחוז השלמה כללי:</span>
                    <span className="font-medium">
                      {statistics.completionPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {dafimData.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 hebrew-text mb-2">דפים מובילים</h4>
                  <div className="space-y-2">
                    {dafimData
                      .sort((a, b) => b.totalStudies - a.totalStudies)
                      .slice(0, 5)
                      .map((daf, index) => (
                        <div key={daf.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                          <span className="hebrew-text">
                            #{index + 1} {daf.masechet} דף {daf.daf}
                          </span>
                          <span className="text-sm font-medium">
                            {daf.totalStudies} לימודים
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 
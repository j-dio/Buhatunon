import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            View your tasks in a calendar format
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Month</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Day</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4 p-4">
            {/* Calendar header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium p-2">
                {day}
              </div>
            ))}
            
            {/* Sample calendar days */}
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="min-h-[100px] border rounded p-2">
                <div className="text-sm font-medium">{(i % 30) + 1}</div>
                {i % 7 === 2 && (
                  <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded mt-1">
                    UVEC Quiz
                  </div>
                )}
                {i % 7 === 4 && (
                  <div className="text-xs bg-green-100 text-green-800 p-1 rounded mt-1">
                    Assignment
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
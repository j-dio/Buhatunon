'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const supabase = createClient()
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Your unified view of tasks from Google Classroom and UVEC/Moodle
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Tasks requiring attention today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Upcoming deadlines
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-xs text-muted-foreground">
              Tasks past their deadline
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Tasks</h2>
        <div className="space-y-4">
          {/* Sample task cards */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-medium">Sample Assignment</h3>
                  <p className="text-sm text-muted-foreground">
                    Due: Tomorrow, 11:59 PM
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="gclassroom">Google Classroom</Badge>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-medium">UVEC Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Due: Next Week
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="uvec">UVEC</Badge>
                  <Badge variant="outline">Not Started</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
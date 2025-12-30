import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TasksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage all your tasks from different platforms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
          <Button>Add Task</Button>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <Badge variant="default" className="cursor-pointer">All</Badge>
        <Badge variant="outline" className="cursor-pointer">Not Started</Badge>
        <Badge variant="outline" className="cursor-pointer">In Progress</Badge>
        <Badge variant="outline" className="cursor-pointer">Done</Badge>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample tasks */}
              <div className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-1">
                  <h3 className="font-medium">Math Assignment Chapter 5</h3>
                  <p className="text-sm text-muted-foreground">Due: Dec 30, 2024</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant="gclassroom">Google Classroom</Badge>
                  <Badge variant="secondary">In Progress</Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-1">
                  <h3 className="font-medium">Science Lab Report</h3>
                  <p className="text-sm text-muted-foreground">Due: Jan 5, 2025</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant="uvec">UVEC</Badge>
                  <Badge variant="outline">Not Started</Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-1">
                  <h3 className="font-medium">Personal Task</h3>
                  <p className="text-sm text-muted-foreground">Due: Jan 1, 2025</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant="manual">Manual</Badge>
                  <Badge variant="default">Done</Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
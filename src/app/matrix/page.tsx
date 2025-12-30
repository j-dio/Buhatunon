import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function MatrixPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Eisenhower Matrix</h1>
        <p className="text-muted-foreground">
          Prioritize your tasks using the Urgent/Important matrix
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Urgent & Important */}
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800">Urgent & Important</CardTitle>
            <p className="text-sm text-red-600">Do First</p>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium text-sm">Overdue Assignment</h3>
              <p className="text-xs text-muted-foreground">Math homework</p>
              <Badge variant="gclassroom" className="mt-1">Google Classroom</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Important, Not Urgent */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-800">Important, Not Urgent</CardTitle>
            <p className="text-sm text-blue-600">Schedule</p>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium text-sm">Research Project</h3>
              <p className="text-xs text-muted-foreground">Due next week</p>
              <Badge variant="uvec" className="mt-1">UVEC</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Urgent, Not Important */}
        <Card className="border-yellow-200">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="text-yellow-800">Urgent, Not Important</CardTitle>
            <p className="text-sm text-yellow-600">Delegate</p>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium text-sm">Group Meeting</h3>
              <p className="text-xs text-muted-foreground">Today 3 PM</p>
              <Badge variant="manual" className="mt-1">Manual</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Not Urgent, Not Important */}
        <Card className="border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-gray-800">Not Urgent, Not Important</CardTitle>
            <p className="text-sm text-gray-600">Eliminate</p>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium text-sm">Optional Reading</h3>
              <p className="text-xs text-muted-foreground">Supplementary material</p>
              <Badge variant="gclassroom" className="mt-1">Google Classroom</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
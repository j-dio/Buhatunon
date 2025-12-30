import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and platform connections
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your full name" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="your.email@example.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <h3 className="font-medium">Google Classroom</h3>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <h3 className="font-medium">UVEC/Moodle</h3>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
              <Button size="sm">Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UVEC Calendar URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">iCal Feed URL</label>
              <Input placeholder="https://uvec.upcebu.edu.ph/calendar/export.php?..." />
              <p className="text-xs text-muted-foreground mt-1">
                Get this URL from your UVEC calendar export settings
              </p>
            </div>
            <Button>Save URL</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically sync tasks every 4 hours
                </p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            
            <div className="pt-2">
              <Button variant="outline">Sync Now</Button>
              <p className="text-xs text-muted-foreground mt-1">
                Last sync: Never
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
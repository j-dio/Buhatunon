export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Buhatunon
        </h1>
        <p className="text-xl text-center text-muted-foreground">
          Your unified task tracker for UP Cebu students
        </p>
        <p className="text-center mt-4 text-muted-foreground">
          Integrating Google Classroom and UVEC/Moodle tasks in one place
        </p>
      </div>
    </main>
  )
}
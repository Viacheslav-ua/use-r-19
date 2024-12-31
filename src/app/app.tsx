fetch('http://localhost:3008/tasks').then(res => {
    console.log(res);
    
})

export default function App() {
    return (
      <h1 className="text-3xl font-bold underline text-red-400">
        Hello world!
      </h1>
    )
  }
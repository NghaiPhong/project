import ExampleCode from "../components/example-code.jsx"

function Index() {
  return (
    <>
      <main className="bg-local p-20">
        <p className="text-white text-8xl font-semibold text-center mt-4 md:mt-16">Code<span className="text-accent">ded</span></p>
        <div className="w-[75%] m-auto">
          <p className="text-white mt-4 text-center text-xl text-wrap">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam tempore tempora illo nisi dicta voluptatibus pariatur ut quis incidunt, itaque amet, doloribus placeat praesentium distinctio at id libero laudantium. Quasi.</p>
        </div>
      <ExampleCode />
      
      </main>
    </>
  )
}

export default Index
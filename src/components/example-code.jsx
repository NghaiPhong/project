function ExampleCode() {
  return (
    <>
      <div
        id="example-code"
        className="text-white text-xl m-auto w-[90%] h-150 bg-primary border-2 border-accent mt-16"
      >
        <div className="flex bg-primary border-b-2 border-b-hover">
          <li>
            <a
              className="flex text-white p-4 text-md border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
              href=""
            >
              Python
            </a>
          </li>
          <li>
            <a
              className="flex text-white p-4 text-md border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
              href=""
            >
              C++
            </a>
          </li>
          <li>
            <a
              className="flex text-white p-4 text-md border-b-2 border-b-primary hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors"
              href=""
            >
              Javascript
            </a>
          </li>
        </div>
        <pre>
          <code className="code p-5">print("hello")</code>
        </pre>
      </div>
    </>
  )
}

export default ExampleCode

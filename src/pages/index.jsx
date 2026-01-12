import ExampleCode from "../components/example-code.jsx"

function Index() {
  return (
    <>
      <main className="p-20">
        <p className="text-white text-8xl font-semibold text-center mt-4 md:mt-16">Code<span className="text-accent">ded</span></p>
        <div className="w-[75%] m-auto">
          <p className="text-white mt-4 text-center text-2xl text-wrap">Nền tảng học lập trình dành riêng cho học sinh</p>
        </div>
        <ExampleCode />
        <div className="w-[75%] m-auto bg-primary mt-80">
          <p className="text-white text-6xl font-semibold">Tại sao chọn chúng tôi?</p>
          <div className="flex">
            <p className="text-white text-xl mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, atque perspiciatis eos, officia ab est doloribus placeat sunt at culpa, voluptatibus vero vel tempora accusantium quos sed dolor optio numquam.</p>
            <img src="src/img/ohno.png" alt="temp" className="" />
          </div>
        </div>
      </main>
    </>
  )
}

export default Index
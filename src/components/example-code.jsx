import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from "react-syntax-highlighter/src/styles/hljs/atom-one-dark.js";

function ExampleCode() {
  return (
    <>
      <div
        id="example-code"
        className="text-white text-xl m-auto w-[90%] h-150 bg-code-background border-2 border-accent mt-16 shadow"
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
        <code className="code p-5">
          <SyntaxHighlighter language="python" style={atomOneDark}>
          {`class TaiKhoan:
  def __init__(self, stk, ten):
    self.stk = stk
    self.ten = ten
    self.soDu = 0

  def rutTien(self, soTien):
    if soTien > self.soDu:
      print("Không đủ tiền")
    else:
      self.soDu -= soTien
      print(f"Tiền {self.soDu}đ")

  def napTien(self, soTien):
    self.soDu += soTien
    print(f"Tiền {self.soDu}đ")`}
        </SyntaxHighlighter></code>
      </div>
    </>
  )
}

export default ExampleCode

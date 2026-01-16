function CoursePage(props) {
  const changePage = () => {
    window.location.href = `/course/${props.id}`;
  }

  return (
    <>
      <div className="flex flex-col bg-primary border-2 border-accent shadow w-75">

        <img
          src="src/img/ohno.png"
          alt=""
          className="h-auto"
        />

        <h1 className="text-white text-4xl font-bold ml-5 mt-5 md-5">{props.title}</h1>

        <p className="text-white text-xl ml-5 md-5">{props.content}</p>
        <button className="m-5 shadow" onClick={changePage}>Xem khoá học</button>
      </div>
    </>
  )
}

export default CoursePage
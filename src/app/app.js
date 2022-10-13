import React from "react";
import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

const App = () => {
  const todoData = [
    { status: "completed", date: "", id: 1 },
    { status: "editing", date: "", id: 2 },
    { status: "", date: "", id: 3 },
  ];

  return (
    <section className="todoapp">
      <Header />
      <TaskList data={todoData} />
      <Footer />
    </section>
  );
};

export default App;
